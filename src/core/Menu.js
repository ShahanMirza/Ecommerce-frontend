import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Fragment } from "react/cjs/react.development";
import { signOut,isAuthenticated } from "../auth/index";

const isActive=(history,path)=>{
    if(history.location.pathname === path){
        return {color: '#ff9900'}
    }else{
        return {color:'#ffffff'}
    }
}

const Menu=({history})=>(
    
<div>
    
    <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
            <Link className="nav-link" style={isActive( history , '/')} to='/'>Home</Link>
        </li>
        
         {/* {isAuthenticated() && isAuthenticated().user.role===0 &&(
            <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/user/dashboard')} to='/user/dashboard'>DashBoard</Link>
        </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role===1 &&(
            <li className="nav-item">
            <Link className="nav-link" style={isActive(history,'/admin/dashboard')} to='/admin/dashboard'>DashBoard</Link>
        </li>
        )}  */}
        {!isAuthenticated()&& (
            <Fragment>
        <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/Signin')} to='/Signin'>Signin</Link>
    </li>
    <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/Signup')} to='/Signup'>SignUp</Link>
    </li>
    </Fragment>
        )}
       {isAuthenticated()&&(
           
            <li className="nav-item">
                {/* <li className="nav-item"><h2>{isAuthenticated().user.role}</h2></li> */}
            <span className="nav-link" style={{cursor:'pointer', color:'#ffffff'}} onClick={()=>signOut(()=>{
                history.push('/')
            })}>Signout</span>
        </li>
       )}
    </ul>
    </div>
)

export default withRouter(Menu);