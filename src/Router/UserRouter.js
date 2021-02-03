import React from "react";
import { Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import Lobby from "../Page/Lobby";
import About from "../Page/About";
import Forum from "../Page/Forum/Forum";
import Room from "../Page/Room";
import WrongPath from "../Page/WrongPath";
import Chatting from "../Component/Chatting/Chatting";

const socket = io.connect(`http://localhost:8000`);

const UserRouterContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const ChattingOpenButton = styled.button`
    position: absolute;
    top: 10px;
    right: 0;
`;

function UserRouter() {
    return (
        <UserRouterContainer>
            <Switch>
                <Route exact path="/" component={Lobby} />
                <Route path="/about" component={About} />
                <Route path="/forum" component={Forum} />
                <Route path="/public/:colname" component={Room} />
                <Route component={WrongPath} />
            </Switch>
            <Chatting socket={socket} />
            <ChattingOpenButton>채팅 열기</ChattingOpenButton>
        </UserRouterContainer>
    );
}

export default UserRouter;
