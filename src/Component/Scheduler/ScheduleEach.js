import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toastErrorMessage } from "../../Util/ToastMessages";

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

export default function ScheduleEach({
    scheduleEach,
    schedules,
    setSchedules,
}) {
    const [scheduleProgress, setScheduleProgress] = useState(
        scheduleEach.progress
    );

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

    // TODO
    // 중복 코드 줄일 것
    function changeScheduleState(scheduleEach, progress) {
        if (
            scheduleProgress === PROGRESS.SCRATCH ||
            scheduleProgress !== progress
        ) {
            setScheduleProgress(progress);

            try {
                axios.put(`${server}/api/schedule`, {
                    scheduleId: scheduleEach.id,
                    content: scheduleEach.content,
                    progress,
                });
            } catch (error) {
                toastErrorMessage(serverErrorMessage);
            }
        } else {
            setScheduleProgress(PROGRESS.SCRATCH);

            try {
                axios.put(`${server}/api/schedule`, {
                    scheduleId: scheduleEach.id,
                    content: scheduleEach.content,
                    progress: PROGRESS.SCRATCH,
                });
            } catch (error) {
                toastErrorMessage(serverErrorMessage);
            }
        }
    }

    function deleteSchedule(scheduleEach) {
        setSchedules(
            schedules.filter(
                (originalSchedule) => originalSchedule.id !== scheduleEach.id
            )
        );

        try {
            axios.delete(`${server}/api/schedule/${scheduleEach.id}`);
        } catch (error) {
            toastErrorMessage(serverErrorMessage);
        }
    }

    return (
        <ScheduleEachRow color={progressToColor(scheduleProgress)}>
            <ScheduleContent>
                <h2>{scheduleEach.content}</h2>
            </ScheduleContent>
            <ButtonsContainer>
                <button
                    onClick={() => {
                        changeScheduleState(scheduleEach, "ONGOING");
                    }}
                >
                    진행중
                </button>

                <button
                    onClick={() => {
                        changeScheduleState(scheduleEach, "DONE");
                    }}
                >
                    완료
                </button>

                <button
                    onClick={() => {
                        deleteSchedule(scheduleEach);
                    }}
                >
                    삭제
                </button>
            </ButtonsContainer>
        </ScheduleEachRow>
    );
}
