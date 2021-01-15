import React, { useState, useEffect } from "react";
import axios from "axios";

function Scheduler(mail) {
    const server = "https://eaglooserver.herokuapp.com";
    const [loadComlete, setLoadComplete] = useState(true);

    useEffect(() => {
        try {
            const { data } = axios.get(`${server}/api/schedule/${mail}/`);
        } catch (err) {
            console.log(err);
            setLoadComplete(false);
        }
    }, []);

    return (
        <>
            {loadComlete ? (
                <div>당신의 스케쥴러입니다</div>
            ) : (
                <div>
                    네트워크 연결 상태를 확인해주세요. 문제가 반복되면
                    관리자에게 문의해 주세요
                </div>
            )}
        </>
    );
}

export default Scheduler;
