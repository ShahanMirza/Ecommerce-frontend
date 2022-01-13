import React from "react";
import { BrowserRouter,Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/PrivateRoute";
import DashBoard from './user/UserDashboard'
import AdminDashboard from "./user/AdminDashboard";
import AdminRoute from "./auth/AdminRoute";
const Routess =()=>{
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
            <PrivateRoute path='/user/dashboard' exact component={DashBoard}/>
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
        </Switch>
    </BrowserRouter>
    )
}
export default Routess;