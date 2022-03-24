import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import {getBrainTreeClientToken} from './apiCore'
import DropIn from "braintree-web-drop-in-react";
import 'braintree-web'

const Checkout=({products})=>{
    const [data, setData]=useState({
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:''
    })
    const userId=isAuthenticated()&& isAuthenticated().user._id;
    const token=isAuthenticated()&& isAuthenticated().token

    const getToken=(userId,token)=>{
        getBrainTreeClientToken(userId,token).then(data=>{
            if(data.error){
                setData({...data, error: data.error})
            }else{
                setData({...data, clientToken: data.clientToken})
            }
        })
    }

    useEffect(()=>{
        getToken(userId, token)
    }, [])
    const getTotal = () =>{
        return products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price 
        } ,0)
    }



    const showDropIn=()=>{
        <div>
            {data.clientToken !== null && products.length > 0 ? (
                 <div>
                 <DropIn
                   options={{ authorization: data.token}}
                   onInstance={(instance) => (data.instance = instance)}
                 />
                 <button onClick="btn btn-success">Submit</button>
               </div>
            ):null}
        </div>
    }
    const showCheckout=()=>{
        return isAuthenticated() ? (<div>{showDropIn()}</div>):(
              <Link to="/signin">
                  <button className="btn btn-primary">Sign in to checkout</button>
              </Link>)
              }
    return(
        <div><h2>Total:${getTotal()}</h2>
         {showCheckout()}
        </div>
    )
}
export default Checkout