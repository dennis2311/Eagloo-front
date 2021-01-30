import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../Style/MainPage.css";

var hash = require("object-hash");

function MainPage({ setIsLoggedIn }) {
    const server = "https://eaglooserver.herokuapp.com";
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    async function handleLogin() {
        const { data } = await axios.get(
            // (api 원칙이 회원가입 2단계랑 충돌하는 중)
            `${server}/api/user/${emailInput}/${hash(passwordInput)}`
        );
        if (data.success) {
            window.localStorage.setItem("email", emailInput);
            window.localStorage.setItem("isLoggedIn", true);
            setIsLoggedIn(true);
            toast(
                <div>
                    <span role="img" aria-label="smile-face">
                        😀
                    </span>
                    &nbsp; 어서오세요 {emailInput}님!
                    <br />
                    &emsp; 오늘도 이글루와 공부해 볼까요?
                </div>,
                { pauseOnHover: false }
            );
            if (emailInput === "dennis2311") {
                alert("어서 와 세민아 😗");
            }
        } else {
            toast.error(`😥${data.message}`, { pauseOnHover: false });
        }
    }

    return (
        <div className="mainpage">
            <div className="login-container">
                <div className="email-input">
                    <input
                        type="text"
                        value={emailInput}
                        placeholder="연세 메일 주소"
                        onChange={(e) => setEmailInput(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                    />
                    <span className="placeholder">@yonsei.ac.kr</span>
                </div>
                <input
                    className="password-input"
                    type="password"
                    value={passwordInput}
                    placeholder="비밀번호"
                    onChange={(e) => setPasswordInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleLogin();
                        }
                    }}
                />
                <button onClick={() => handleLogin()}>로그인</button>
            </div>
            <div className="string-container">혹은</div>
            <div className="link-container">
                <Link to="/signup">계정 생성하기</Link>
            </div>
        </div>
    );
}

export default MainPage;
