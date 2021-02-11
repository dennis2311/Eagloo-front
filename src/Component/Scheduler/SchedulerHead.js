import React from "react";
import styled from "styled-components";

const SchedulerHeadRow = styled.div`
    border: 2px solid darkslateblue;
    height: 120px;
    padding: 5px 30px;
`;

export default function SchedulerHead({ email, schedules, loadSuccess }) {
    return (
        <SchedulerHeadRow>
            <h2>{`${email}님, 환영합니다`}</h2>
            {schedules.length === 0 && loadSuccess && (
                <div>
                    아직 당신의 일정이 없습니다. 새로운 일정을 등록해보세요!
                </div>
            )}
        </SchedulerHeadRow>
    );
}
