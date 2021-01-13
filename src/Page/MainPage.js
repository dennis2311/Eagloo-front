import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function MainPage({ setIsLoggedIn, setUserInfo }) {
    const server = "https://eaglooserver.herokuapp.com";
    const [mailInput, setMailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    async function handleLogin() {
        const { data } = await axios.get(
            // (api 원칙이 회원가입 2단계랑 충돌하는 중)
            `${server}/api/auth/${mailInput}/${passwordInput}`
        );
        if (data.success) {
            setIsLoggedIn(true);
            setUserInfo({ email: mailInput });
        } else {
            alert(data.message);
        }
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={mailInput}
                    placeholder="연세 메일 주소"
                    onChange={(e) => setMailInput(e.target.value)}
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
