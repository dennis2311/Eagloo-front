import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Component/Header/Header";
import UserRouter from "./Router/UserRouter";
import CommonRouter from "./Router/CommonRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Style/App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem("isLoggedIn")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className="app">
                {isLoggedIn ? (
                    <UserRouter />
                ) : (
                    <CommonRouter setIsLoggedIn={setIsLoggedIn} />
                )}
            </div>
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
