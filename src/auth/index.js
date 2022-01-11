

import { useState } from "react/cjs/react.development";
import { API } from "../Config";

export const signup=(user)=>{
    return fetch(`${API}/signup`,{
         method:'POST',
         headers:{
             Accept:'application/json',
             "Content-Type":"application/json"
         },
         body:JSON.stringify(user)
     }).then(response=>{
         return response.json()
     })
     .catch(err=>{
         console.log(err)
     })
 }

 export const signin=(user)=>{
     return fetch(`${API}/signin`,{
         method:'POST',
         headers:{
             Accept:'application/json',
             "Content-Type":"application/json"
         },
         body:JSON.stringify(user)
     }).then(response=>{
         return response.json()
     }).catch(err=>{
         console.log(err)
     })
 }

 export const authenticate=(data,next)=>{
     if(typeof window !=='undefined'){
         localStorage.setItem('jwt',JSON.stringify(data))
         next()
     }
 }

 export const signOut=(next)=>{
     if(typeof window !=='undefined'){
         localStorage.removeItem('jwt')
         next()
         return fetch(`${API}/signout`,{
            method:'GET', 
         })
         .then(response=>{
             console.log("sign out",response)
         })
         .catch(err=>{
             console.log(err)
         })
     }
 }

 export const isAuthenticated=()=>{
     if(typeof window == 'undefined'){
         console.log("jwt checkpoint in false position")
         return false
     }
     if(localStorage.getItem('jwt')){
         console.log(JSON.parse(localStorage.getItem('jwt')))
        return JSON.parse(localStorage.getItem('jwt'))
     }
     else{
         console.log('in else')
         return false
     }
 }