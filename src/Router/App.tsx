import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { UserRouter } from "./UserRouter";
import { CommonRouter } from "./CommonRouter";

export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem("isLoggedIn")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    // useEffect(() => {
    //     socket.on("coming_res", (data) => {
    //         console.log("coming_res: ", data);
    //     });
    //     // fetch("http://localhost:3001/room/coming", {
    //     //     method: "POST",
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     //     },
    //     //     body: JSON.stringify({ room: "power", age: 123 }),
    //     // });
    // }, []);
    return (
        <BrowserRouter>
            <AppContainer>
                {isLoggedIn ? (
                    <UserRouter setIsLoggedIn={setIsLoggedIn} />
                ) : (
                    <CommonRouter setIsLoggedIn={setIsLoggedIn} />
                )}
            </AppContainer>
        </BrowserRouter>
    );
};

const AppContainer = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.backgroundWhite};
`;
