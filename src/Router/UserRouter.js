import React from "react";
import { Route, Switch } from "react-router-dom";
import Lobby from "../Page/Lobby";
import Room from "../Page/Room";
import About from "../Page/About";
import WrongPath from "../Page/WrongPath";

function UserRouter({ setIsLoggedIn }) {
    function handleLogout() {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }
    return (
        <>
            <header>
                <h2>유저들은 이 헤더를 보게 됩니다 ㅋㅋㄹㅃㅃ</h2>
                <button
                    onClick={() => {
                        handleLogout();
                    }}
                >
                    로그아웃
                </button>
            </header>
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
