import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import UserRouter from "./Router/UserRouter";
import CommonRouter from "./Router/CommonRouter";
import "./Style/App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <div className="app">
                {isLoggedIn ? (
                    <UserRouter setIsLoggedIn={setIsLoggedIn} />
                ) : (
                    <CommonRouter setIsLoggedIn={setIsLoggedIn} />
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;
