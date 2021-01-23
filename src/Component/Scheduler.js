import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/Scheduler.css";

function Scheduler() {
    const server = "https://eaglooserver.herokuapp.com";
    const [userEmail, setUserEmail] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [loadComlete, setLoadComplete] = useState(true);

    function ScheduleHeaderRow({ userEmail, schedules }) {
        return (
            <>
                <h2>{`${userEmail}님, 환영합니다`}</h2>
                {schedules.length === 0 && loadComlete && (
                    <div>
                        아직 당신의 일정이 없습니다. 새로운 일정을 등록해보세요!
                    </div>
                )}
            </>
        );
    }

    function ScheduleRow({ schedule, schedules, setSchedules }) {
        const [scheduleState, setScheduleState] = useState(
            parseInt(schedule.state)
        );

        function changeScheduleState(input) {
            if (scheduleState === 0 || scheduleState !== input) {
                setScheduleState(input);
            } else {
                setScheduleState(0);
            }
        }

        function deleteSchedule() {
            setSchedules(
                schedules.filter(
                    (originalSchedule) => originalSchedule.id !== schedule.id
                )
            );
        }

        return (
            <div id={schedule.id} className="schedule-each-row">
                <div className="schedule-each-row__content">
                    <h2>{schedule.content}</h2>
                </div>
                <div className="schedule-each-row__btns">
                    <div className="btn-schedule-ongoing">
                        <button
                            onClick={() => {
                                changeScheduleState(1);
                            }}
                        >
                            진행중
                        </button>
                    </div>
                    <div className="btn-schedule-done">
                        <button
                            onClick={() => {
                                changeScheduleState(2);
                            }}
                        >
                            완료
                        </button>
                    </div>
                    <div className="btn-schedule-delete">
                        <button
                            onClick={() => {
                                deleteSchedule();
                            }}
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function ScheduleCreateRow({ schedules, setSchedules }) {
        const [newScheduleInput, setNewScheduleInput] = useState("");

        function createSchedule() {
            if (newScheduleInput !== "") {
                const newSchedule = { content: newScheduleInput, state: 0 };
                setSchedules([...schedules, newSchedule]);
                setNewScheduleInput("");
            }
            return;
        }

        return (
            <>
                <input
                    className="schedule-create-row__input"
                    type="text"
                    value={newScheduleInput}
                    onChange={(e) => {
                        setNewScheduleInput(e.target.value);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            createSchedule();
                        }
                    }}
                    placeholder="새로운 일정을 입력 후 엔터를 눌러주세요"
                />
            </>
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
                setSchedules(data.schedules);
            } catch (err) {
                setLoadComplete(false);
            }
        }
        getSchedules(email);
    }, []);

    return (
        <section>
            <div className="scheduler-upper">
                <div className="schedule-header-row">
                    <ScheduleHeaderRow
                        userEmail={userEmail}
                        schedules={schedules}
                    />
                </div>
                <div className="schedule-body-row">
                    {loadComlete ? (
                        <>
                            {schedules.map((schedule) => (
                                <ScheduleRow
                                    schedule={schedule}
                                    key={schedule.id}
                                    schedules={schedules}
                                    setSchedules={setSchedules}
                                />
                            ))}
                        </>
                    ) : (
                        <div>
                            <h3>
                                네트워크 연결 상태를 확인해주세요. 문제가
                                반복되면 관리자에게 문의해 주세요
                            </h3>
                            <button onClick={() => {}}>다시 시도</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="scheduler-bottom">
                <div className="schedule-create-row">
                    <ScheduleCreateRow
                        schedules={schedules}
                        setSchedules={setSchedules}
                    />
                </div>
            </div>
        </section>
    );
}

export default Scheduler;
