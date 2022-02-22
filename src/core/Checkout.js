import React from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getProducts } from "./apiCore";

const Checkout=({products})=>{
    const getTotal=()=>{
        return products.reduce((currentValue,nextValue)=>{return currentValue+nextValue.count*nextValue.price},0)
    }
    return(
        <div><h2>Total:${getTotal()}</h2></div>
    )
}
export default Checkout