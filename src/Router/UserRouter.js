import React from "react";
import { Route, Switch } from "react-router-dom";
import Lobby from "../Page/Lobby";
import Room from "../Page/Room";
import About from "../Page/About";
import WrongPath from "../Page/WrongPath";

function UserRouter({ setIsLoggedIn }) {
    return (
        <>
            <header>유저들은 이 헤더를 보게 됩니다 ㅋㅋㄹㅃㅃ</header>
            <Switch>
                <Route exact path="/" component={Lobby} />
                <Route path="/group/:colname" component={Room} />
                <Route path="/about" component={About} />
                <Route component={WrongPath} />
            </Switch>
        </>
    );
}

export default UserRouter;
