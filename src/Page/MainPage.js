import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

var hash = require("object-hash");

function MainPage({ setIsLoggedIn }) {
    const server = "https://eaglooserver.herokuapp.com";
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    async function handleLogin() {
        const { data } = await axios.get(
            // (api 원칙이 회원가입 2단계랑 충돌하는 중)
            `${server}/api/auth/${emailInput}/${hash(passwordInput)}`
        );
        if (data.success) {
            window.localStorage.setItem("email", emailInput);
            window.localStorage.setItem("isLoggedIn", true);
            setIsLoggedIn(true);
        } else {
            alert(data.message);
        }
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={emailInput}
                    placeholder="연세 메일 주소"
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                @yonsei.ac.kr
                <input
                    type="password"
                    value={passwordInput}
                    placeholder="비밀번호"
                    onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button onClick={() => handleLogin()}>로그인</button>
            </div>
            혹은
            <div>
                <Link to="/signup">계정 생성하기</Link>
            </div>
        </div>
    );
}

export default MainPage;
