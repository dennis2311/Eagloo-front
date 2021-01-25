import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import toastErrorMessage from "../../Util/ToastErrorMessage";

const server = "https://eaglooserver.herokuapp.com";
const serverErrorMessage = "서버 통신 중 오류가 발생하였습니다";

const ScheduleEachRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    padding: 10px 30px;
    border: 2px solid moccasin;
    background-color: ${(props) => props.color};
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

function ScheduleEach({ schedule, schedules, setSchedules }) {
    const [scheduleState, setScheduleState] = useState(
        parseInt(schedule.state)
    );

    function stateToColor(state) {
        switch (state) {
            case 1:
                return "blue";
            case 2:
                return "green";
            default:
                return "white";
        }
    }

    // TODO
    // 전체 schedules에 반영되어야 함
    function changeScheduleState(schedule, state) {
        if (scheduleState === 0 || scheduleState !== state) {
            setScheduleState(state);
        } else {
            setScheduleState(0);
        }

        try {
            axios.put(`${server}/api/schedule`, {
                scheduleId: schedule.id,
                content: schedule.content,
                state,
            });
        } catch (error) {
            toastErrorMessage(serverErrorMessage);
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
        <ScheduleEachRow color={stateToColor(scheduleState)}>
            <div className="schedule-each-row__content">
                <h2>{schedule.content}</h2>
            </div>
            <ButtonsContainer>
                <button
                    onClick={() => {
                        changeScheduleState(schedule, 1);
                    }}
                >
                    진행중
                </button>

                <button
                    onClick={() => {
                        changeScheduleState(schedule, 2);
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
