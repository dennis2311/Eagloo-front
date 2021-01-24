import React, { useState } from "react";
import styled from "styled-components";

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
        <ScheduleEachRow color={stateToColor(scheduleState)}>
            <div className="schedule-each-row__content">
                <h2>{schedule.content}</h2>
            </div>
            <ButtonsContainer>
                <button
                    onClick={() => {
                        changeScheduleState(1);
                    }}
                >
                    진행중
                </button>

                <button
                    onClick={() => {
                        changeScheduleState(2);
                    }}
                >
                    완료
                </button>

                <button
                    onClick={() => {
                        deleteSchedule();
                    }}
                >
                    삭제
                </button>
            </ButtonsContainer>
        </ScheduleEachRow>
    );
}

export default ScheduleEach;
