import React from "react";
import { Route, Switch } from "react-router-dom";
import Lobby from "../Page/Lobby";
import Room from "../Page/Room";
import About from "../Page/About";
import WrongPath from "../Page/WrongPath";
import "../Style/UserRouter.css";

function UserRouter({ setIsLoggedIn }) {
    function handleLogout() {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }
    return (
        <>
            <header>
                <div className="header__common">
                    <h2>
                        유저들은 이 헤더를 보게 됩니다 ㅋㅋㄹㅃㅃ 대략 이글루
                        아이콘 넣을거임
                    </h2>
                    <button
                        onClick={() => {
                            handleLogout();
                        }}
                    >
                        로그아웃
                    </button>
                </div>
                <div className="header__notice">
                    <h4>공지사항이 있는 경우, 이 곳에 나타납니다</h4>
                </div>
            </header>
            <Switch>
                <Route exact path="/" component={Lobby} />
                <Route path="/public/:colname" component={Room} />
                <Route path="/about" component={About} />
                <Route component={WrongPath} />
            </Switch>
        </>
    );
}

export default UserRouter;
