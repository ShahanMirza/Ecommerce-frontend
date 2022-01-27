import React,{useState,useEffect} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {createProduct} from "./apiAdmin"

const AddProduct=()=>{
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
    useEffect(()=>{
        setValues({...values,formData:new FormData()})
    },[])
    const{name,description,price,categories,category,shipping,quantity,loading,error,createdProduct,redirectToProfile,formData}=values
    const handleChange=(name)=>(event)=>{
        const value= name === 'photo'? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }
    const clickSubmit=(event)=>{
        event.preventdefault()
        setValues({...values,error:'',loading:true})
        createProduct(user._id,token,formData).then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({...values,name:'',description:'',photo:'',price:'',quantity:'',loading:false,createdProduct:data.name})
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
                    <option value='61e87003bc8933a24ab5ee8b'>Node</option>
                    <option value='61e87003bc8933a24ab5ee8b'>Node</option>
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
            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )
    return(
        <Layout title="Add a new Product" description={`G'day ${user.name}, ready to add new product`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">{newPostForm()}</div>
            </div>
        </Layout> 
     )
}
export default AddProduct