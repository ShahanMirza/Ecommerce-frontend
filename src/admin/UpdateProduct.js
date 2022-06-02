import React,{useState,useEffect} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import {getProduct,getCategories,updateProduct} from "./apiAdmin"

const UpdateProduct=({match})=>{
    const {user,token}=isAuthenticated()
    const [values,setValues]=useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''
    })

    const init=(productId)=>{
        getProduct(productId).then(data=>{
            if(data?.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,
                    name:data.name,
                    description:data.description,
                    price:data.price,
                    category:data.category._id,
                    shipping:data.shipping,
                    quantity:data.quantity,
                    formData:new FormData()
            ,})
                initCategories()
            }
        })
    }
    const initCategories=()=>{
        getCategories().then(data=>{
            if(data?.error){
                setValues({...values,error:data.error})
            }else{
                setValues({categories:data,formData:new FormData()})
            }
        })
    }
    useEffect(()=>{
        init(match.params.productId)
        // setValues({...values,formData:new FormData()})
    },[])
    const{name,description,price,categories,category,shipping,quantity,loading,error,createdProduct,redirectToProfile,formData}=values
    const handleChange=(name)=>(event)=>{
        const value= name === 'photo'? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }
    const clickSubmit=(event)=>{
        event.preventDefault()
        setValues({...values,error:'',loading:true})
        updateProduct(match.params.productId,user._id,token,formData).then(data=>{
            if(data?.error){
                // console.log('values in if '+values)
                setValues({...values,error:data.error})
            }else{
                // console.log('values in else '+values)
                setValues({...values,name:'',description:'',photo:'',price:'',quantity:'',loading:false,redirectToProfile:true,createdProduct:data.name})
            }
        })
    }
    const newPostForm=()=>(
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4 >Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                <input type='file' name="photo" accept="image/*" onChange={handleChange('photo')}/>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type='text' className="form-control" value={name} onChange={handleChange('name')}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input className="form-control" value={description} onChange={handleChange('description')}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type='number' className="form-control" value={price} onChange={handleChange('price')}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select className="form-control" onChange={handleChange('category')}>
                <option >Please Select</option>
                   {categories && categories?.map((c,i)=>(<option key={i} value={c._id}>{c.name}</option>))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select className="form-control" onChange={handleChange('shipping')}>
                    <option value='0'>No</option>
                    <option value='1'>Yes</option>
                </select>

            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input className="form-control" type='number' value={quantity} onChange={handleChange('quantity')}/>
            </div>
            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    )
    const showError=()=>(
        <div className="alert alert-danger" style={{display: error ?'': 'none'}}>
            {error}
        </div>
    )
    const showSuccess=()=>(
        <div className="alert alert-info" style={{display:createdProduct?"":"none"}}>
            <h4>{`${createdProduct}`} is Updated!</h4>
        </div>
    )
    const showLoading=()=>(
        loading && (<div className="alert alert-success"><h2>Loading...</h2></div>)
    )
    
    const redirectUser=()=>{
        if(redirectToProfile){
            if(!error){
                return <Redirect to="/"/>
            }
        }
    }

    return(
        <Layout title="Add a new Product" description={`G'day ${user.name}, ready to add new product`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {showSuccess()}
                    {newPostForm()}
                    {redirectUser()}
                    </div>
            </div>
        </Layout> 
     )
}
export default UpdateProduct