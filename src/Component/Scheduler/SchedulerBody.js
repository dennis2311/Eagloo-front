import React from "react";
import ScheduleEach from "./ScheduleEach";
import styled from "styled-components";

const SchedulerBodyRow = styled.div`
    border: 2px solid darkolivegreen;
    overflow: auto;
`;

function SchedulerBody({ schedules, setSchedules }) {
    return (
        <SchedulerBodyRow>
            {schedules.map((schedule) => (
                <ScheduleEach
                    key={schedule.id}
                    schedule={schedule}
                    schedules={schedules}
                    setSchedules={setSchedules}
                />
            ))}
        </SchedulerBodyRow>
    );
}

export default SchedulerBody;
