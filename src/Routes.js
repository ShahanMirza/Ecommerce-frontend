import React from "react";
import { BrowserRouter,Switch, Route} from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import PrivateRoute from "./auth/PrivateRoute";
import DashBoard from './user/UserDashboard'
const Routess =()=>{
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
            <PrivateRoute path='/dashboard' exact component={DashBoard}/>
        </Switch>
    </BrowserRouter>
    )
}
export default Routess;