import React, { useState, useEffect } from "react";
import axios from "axios";

function Scheduler() {
    const server = "https://eaglooserver.herokuapp.com";
    const [userEmail, setUserEmail] = useState("");
    const [newSchedule, setNewSchedule] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [loadComlete, setLoadComplete] = useState(true);

    function ScheduleRow(schedule) {
        return (
            <div id={schedule.id} className="schedule">
                <div className="schedule__content">{schedule.content}</div>
                <div className="schedule__btns">
                    <div className="btn-schedule-reset">초기화</div>
                    <div className="btn-schedule-ongoing">진행중</div>
                    <div className="btn-schedule-done">완료</div>
                    <div className="btn-schedule-delete">삭제</div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        const email = window.localStorage.getItem("email");
        setUserEmail(email);
        async function getSchedules(email) {
            try {
                const { data } = await axios.get(
                    `${server}/api/schedule/${email}/`
                );
            } catch (err) {
                setLoadComplete(false);
            }
        }
        getSchedules(email);
    }, []);

    return (
        <>
            <div className="scheduler-header">
                <h3>{`${userEmail}님, 환영합니다`}</h3>
            </div>
            {loadComlete ? (
                <div>
                    <div>당신의 스케쥴이 이곳에 나타납니다</div>
                    <div>{schedules}</div>
                </div>
            ) : (
                <div>
                    네트워크 연결 상태를 확인해주세요. 문제가 반복되면
                    관리자에게 문의해 주세요
                </div>
            )}
            <div className="scheduler-modifier">
                <div className="scheduler-modifier__input">
                    <input
                        type="text"
                        value={newSchedule}
                        onChange={(e) => {
                            setNewSchedule(e.target.value);
                        }}
                    />
                </div>
                <div className="scheduler-modifier__btns">
                    <button>일정 추가하기</button>
                    <button>변경사항 저장하기</button>
                </div>
            </div>
        </>
    );
}

export default Scheduler;
