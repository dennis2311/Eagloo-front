import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import Header from "../Component/Header/Header";
import Lobby from "../Page/Lobby/Lobby";
import About from "../Page/About";
import Forum from "../Page/Forum/Forum";
import PublicRoom from "../Page/PublicRoom/PublicRoom";
import WrongPath from "../Page/WrongPath";
import Chatting from "../Component/Chatting/Chatting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

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

const ChattingOpenButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 160px;
    right: 0;
    width: 65px;
    height: 65px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    color: #ffffff;
    background-color: ${(props) => props.theme.mainBlue};
    :hover {
        cursor: pointer;
    }
`;

export default function UserRouter({ setIsLoggedIn, setFeedbackOpen }) {
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
                <Route path="/public/:index" component={PublicRoom} />
                <Route component={WrongPath} />
            </Switch>
            <Chatting socket={socket} chattingOpen={chattingOpen} />
            <ChattingOpenButton
                onClick={() => {
                    toggleChatting();
                }}
            >
                <FontAwesomeIcon icon={faCommentDots} size="2x" />
            </ChattingOpenButton>
        </UserRouterContainer>
    );
}
