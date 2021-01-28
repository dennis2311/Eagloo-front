import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../Page/LoginPage";
import SignUp from "../Page/SignUp";
import About from "../Page/About";
import WrongPath from "../Page/WrongPath";

function CommonRouter({ setIsLoggedIn }) {
    return (
        <>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <LoginPage setIsLoggedIn={setIsLoggedIn} />}
                ></Route>
                <Route path="/signup" component={SignUp}></Route>
                <Route path="/about" component={About}></Route>
                <Route component={WrongPath}></Route>
            </Switch>
        </>
    );
}

export default CommonRouter;
