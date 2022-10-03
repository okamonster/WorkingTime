import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { LogInScreen } from "../Screens/LogInScreen";
import { SignupScreen } from "../Screens/SignupScreen";
import { WorkScreen } from "../Screens/WorkScreen";

export const Router = ()=> {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<LogInScreen/>}/>
                <Route path={"/signup"} element={<SignupScreen/>}/>
                <Route path={"/working"} element={<WorkScreen/>}/>
            </Routes>
        </BrowserRouter>
    )

}