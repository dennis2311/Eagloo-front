import React from "react";
import { Route, Switch } from "react-router-dom";
import Lobby from "../Page/Lobby";
import About from "../Page/About";
import Forum from "../Page/Forum/Forum";
import Room from "../Page/Room";
import WrongPath from "../Page/WrongPath";

function UserRouter() {
    return (
        <Switch>
            <Route exact path="/" component={Lobby} />
            <Route path="/about" component={About} />
            <Route path="/forum" component={Forum} />
            <Route path="/public/:colname" component={Room} />
            <Route component={WrongPath} />
        </Switch>
    );
}

export default UserRouter;
