import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import UserRouter from "./UserRouter";
import CommonRouter from "./CommonRouter";
import Feedback from "../Component/Feedback";
import styled from "styled-components";
import GlobalStyles from "../Style/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    padding-top: 140px;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
`;

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem("isLoggedIn")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <BrowserRouter>
            <AppContainer>
                {isLoggedIn ? (
                    <UserRouter
                        setIsLoggedIn={setIsLoggedIn}
                        setFeedbackOpen={setFeedbackOpen}
                    />
                ) : (
                    <CommonRouter setIsLoggedIn={setIsLoggedIn} />
                )}
            </AppContainer>
            <Feedback
                feedbackOpen={feedbackOpen}
                setFeedbackOpen={setFeedbackOpen}
            />
            <GlobalStyles />
            <ToastContainer
                position="bottom-left"
                closeOnClick
                newestOnTop={true}
                pauseOnFocusLoss={false}
            />
        </BrowserRouter>
    );
}

export default App;
