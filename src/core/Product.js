import React,{useState,useEffect} from "react";
import Layout from "./Layout";
import  {read,listRelated }from "./apiCore";
import Card from "./Card";
const Product=(props)=>{
    const [product,setPoduct]=useState({})
    const [realtedProduct,setRelatedProduct]=useState([])
    const [error,setError]=useState(false)

    const loadSingleProduct=productId=>{
        read(productId).then(data=>{
            // console.log(data)
            if(data?.error){
                 setError(data.error)
                // console.log(data.error)
            }else{
                setPoduct(data)
                listRelated(data._id).then(data=>{
                    if(data?.error){
                        setError(data.error)
                    }else{
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }
    useEffect(()=>{
        const productId=props.match.params.productId
        loadSingleProduct(productId)
        console.log(loadSingleProduct(productId))
    },[props])
    return(
        <Layout title={product && product.name} description={product&& product.description && product.description.substring(0,30)} className='container-fluid'>
            <h2 className="mb-4">Single Page</h2>
            <div className="row">
                <div className="col-8">
                    
                {product && product.description && 
                <Card product={product} showProductViewButton={false}/>}
                </div>
                <div className="col-4">
                    <h4>Related Products</h4>
                    {realtedProduct?.map((p,i)=>(
                        <div className="mb-3">
                        <Card key={i} product={p}/>
                        </div>
    ))}
                </div>
            </div>
        </Layout>
    )
}
export default Product