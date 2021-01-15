import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import UserRouter from "./Router/UserRouter";
import CommonRouter from "./Router/CommonRouter";
import "./Style/App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({ email: "" });

    return (
        <BrowserRouter>
            <div className="app">
                {isLoggedIn ? (
                    <UserRouter
                        userInfo={userInfo}
                        setIsLoggedIn={setIsLoggedIn}
                        setUserInfo={setUserInfo}
                    />
                ) : (
                    <CommonRouter
                        setIsLoggedIn={setIsLoggedIn}
                        setUserInfo={setUserInfo}
                    />
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;
