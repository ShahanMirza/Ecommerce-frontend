import React,{useState} from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signin,authenticate,isAuthenticated } from "../auth/index";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const Signin=()=>{
    const[values,setValues]=useState({
        email:"shahan@yahoo.com",
        password:"Test@123",
        error:"",
        loading:false,
        redirectToReferrer:false

    })
    const {email,password,error,loading,redirectToReferrer}=values
    const {users}=isAuthenticated();
    const handleChange=name=>event=>{
        setValues({...setValues,error:false,[name]:event.target.value})
    }

    const clickSubmit=(event)=>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password}).then(data=>{
            if(data.err){
                setValues({...values,error:data.err,loading:false})
            }else{
                authenticate(data,()=>setValues({...values,redirectToReferrer:true}))
            }
        })
    }
const signInForm=()=>(
    <form>
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input className="form-control" onChange={handleChange('email')} type='email' value={email}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Password</label>
            <input className="form-control" onChange={handleChange('password')} type='password' value={password}/>
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
    </form>
)

const showError=()=>(
    <div className="alert alert-danger" style={{ display:error?"":"none"}}>{error}
    </div>
)
const showLoding=()=>(
    loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
)

const redirectUser=()=>{
    if(redirectToReferrer){
        if(users && users.role === 1){
            console.log('admin role')
            return <Redirect to='/admin/dashboard'/>
        }else{
            console.log('user role')
            return <Redirect to='/user/dashboard'/>
        }
    }
}
return(
<Layout title="Signin" description="Signin to Node E-commerce App" className='container col-md-8 offset-md-2'>
    {showLoding()}
    {showError()}
    {signInForm()}
    {redirectUser()}</Layout>
)}
export default Signin