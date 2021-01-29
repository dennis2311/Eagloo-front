import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import toastErrorMessage from "../../Util/ToastErrorMessage";

const server = "https://eaglooserver.herokuapp.com";
const serverErrorMessage = "서버 통신 중 오류가 발생하였습니다";
const PROGRESS = {
    SCRATCH: "SCRATCH",
    ONGOING: "ONGOING",
    DONE: "DONE",
};

const ScheduleEachRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 10px 30px;
    border: 2px solid moccasin;
    background-color: ${(props) => props.color};
`;

const ScheduleContent = styled.div``;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

function ScheduleEach({ schedule, schedules, setSchedules }) {
    const [scheduleProgress, setScheduleProgress] = useState(schedule.progress);

    function progressToColor(progress) {
        switch (progress) {
            case "ONGOING":
                return "blue";
            case "DONE":
                return "green";
            default:
                return "white";
        }
    }

    // TODO
    // 전체 schedules에 반영되어야 함
    // ?????? 왜 버그 없이 되는건지 알 수가 없음
    // 서버 통신하면서 state가 초기화되는건가?
    function changeScheduleState(schedule, progress) {
        if (
            scheduleProgress === PROGRESS.SCRATCH ||
            scheduleProgress !== progress
        ) {
            setScheduleProgress(progress);

            try {
                axios.put(`${server}/api/schedule`, {
                    scheduleId: schedule.id,
                    content: schedule.content,
                    progress,
                });
            } catch (error) {
                toastErrorMessage(serverErrorMessage);
            }
        } else {
            setScheduleProgress(PROGRESS.SCRATCH);

            try {
                axios.put(`${server}/api/schedule`, {
                    scheduleId: schedule.id,
                    content: schedule.content,
                    progress: PROGRESS.SCRATCH,
                });
            } catch (error) {
                toastErrorMessage(serverErrorMessage);
            }
        }
    }

    function deleteSchedule(schedule) {
        setSchedules(
            schedules.filter(
                (originalSchedule) => originalSchedule.id !== schedule.id
            )
        );

        try {
            axios.delete(`${server}/api/schedule/${schedule.id}`);
        } catch (error) {
            toastErrorMessage(serverErrorMessage);
        }
    }

    return (
        <ScheduleEachRow color={progressToColor(scheduleProgress)}>
            <ScheduleContent>
                <h2>{schedule.content}</h2>
            </ScheduleContent>
            <ButtonsContainer>
                <button
                    onClick={() => {
                        changeScheduleState(schedule, "ONGOING");
                    }}
                >
                    진행중
                </button>

                <button
                    onClick={() => {
                        changeScheduleState(schedule, "DONE");
                    }}
                >
                    완료
                </button>

                <button
                    onClick={() => {
                        deleteSchedule(schedule);
                    }}
                >
                    삭제
                </button>
            </ButtonsContainer>
        </ScheduleEachRow>
    );
}

export default ScheduleEach;
