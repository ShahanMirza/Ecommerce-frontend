import React,{useState} from "react";
import { signup } from "../auth/index";
import Layout from "../core/Layout";

const Signup=()=>{
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success: false
    })
    const {name,email,password,error,success}=values
    const handleChange= name=>event=>{
         setValues({...values,error:false,[name]:event.target.value})
    }
   
    const clickSubmit=(event)=>{
        event.preventDefault();
        setValues({...values,error:false,success:false})
        signup({name ,email,password})
        .then(data=>{
               if(data?.err){
                   console.log('data.error response'+data.err)
                   setValues({...values, error:data.err, success:false})
               }else{
                // console.log('data.error response in else'+JSON.stringify(data)
                // console.log('data.err response'+data.err)
                   setValues({
                       ...values,
                       name:"",
                       email:'',
                       password:'',
                       error:"",
                       success:true
                   })
               }
           } 
        )
    }
    const signUpForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input value={name} onChange={handleChange('name')} type='text' className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input value={email} onChange={handleChange('email')} type='email' className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input value={password} onChange={handleChange('password')} type='password' className="form-control"/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ?'':'none'}}>
            {JSON.stringify(error)}
        </div>
    )
    const showSuccess= () => (
        <div className="alert alert-info" style={{display: success ? '':'none'}}>New Account is created. Please Signin</div>
    )
    return (
        <Layout title="Signup" description="Signup to Node E-Commerce App" className='container col-md-8 offset-md-2'>
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signup;