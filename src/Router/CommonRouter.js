import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "../Page/MainPage";
import SignUp from "../Page/SignUp";
import About from "../Page/About";
import WrongPath from "../Page/WrongPath";

function CommonRouter({ setIsLoggedIn, setUserInfo }) {
    return (
        <>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <MainPage
                            setIsLoggedIn={setIsLoggedIn}
                            setUserInfo={setUserInfo}
                        />
                    )}
                ></Route>
                <Route path="/signup" component={SignUp}></Route>
                <Route path="/about" component={About}></Route>
                <Route component={WrongPath}></Route>
            </Switch>
        </>
    );
}

export default CommonRouter;
