import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Theme from "../Style/Theme";
import { BrowserRouter } from "react-router-dom";
import UserRouter from "./UserRouter";
import CommonRouter from "./CommonRouter";
import Feedback from "../Component/Dialog/Feedback";
import GlobalStyles from "../Style/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
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
            <ThemeProvider theme={Theme}>
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
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
