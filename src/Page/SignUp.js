import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
    return (
        <div>
            새 계정 만들기
            <div>
                <input type="text" placeholder="연세대학교 메일 계정" />
                @yonsei.ac.kr
            </div>
            <div>
                <input
                    type="text"
                    placeholder="메일로 도착한 인증 단어를 입력해 주세요"
                />
            </div>
            <div>
                <input type="password" placeholder="비밀번호" />
            </div>
            <div>
                <input type="password" placeholder="비밀번호 확인" />
            </div>
            <Link to="/">
                <button>홈으로 돌아가기</button>
            </Link>
        </div>
    );
}

export default SignUp;
