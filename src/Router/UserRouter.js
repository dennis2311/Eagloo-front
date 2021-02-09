import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import Header from "../Component/Header/Header";
import Lobby from "../Page/Lobby";
import About from "../Page/About";
import Forum from "../Page/Forum/Forum";
import Room from "../Page/Room";
import WrongPath from "../Page/WrongPath";
import Chatting from "../Component/Chatting/Chatting";

// 소켓은 유저당 하나씩
const socket = io.connect(`https://eaglooserver.herokuapp.com`);

const UserRouterContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-top: 140px;
`;

const ChattingOpenButton = styled.button`
    position: absolute;
    top: 10px;
    right: 0;
`;

function UserRouter({ setIsLoggedIn, setFeedbackOpen }) {
    const [chattingOpen, setChattingOpen] = useState(false);

    function toggleChatting() {
        setChattingOpen(!chattingOpen);
    }

    return (
        <UserRouterContainer>
            <Header
                setIsLoggedIn={setIsLoggedIn}
                setFeedbackOpen={setFeedbackOpen}
            />
            <Switch>
                <Route exact path="/" component={Lobby} />
                <Route path="/about" component={About} />
                <Route path="/forum" component={Forum} />
                <Route path="/public/:colname" component={Room} />
                <Route component={WrongPath} />
            </Switch>
            <Chatting socket={socket} chattingOpen={chattingOpen} />
            <ChattingOpenButton
                onClick={() => {
                    toggleChatting();
                }}
            >
                채팅
            </ChattingOpenButton>
        </UserRouterContainer>
    );
}

export default UserRouter;
