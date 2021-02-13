import React from "react";
import styled from "styled-components";

const CalendarBodyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: #e6f1ff;
    font-size: 22px;
    font-family: "JejuGothic";
    padding-bottom: 150px;
`;

export default function CalendarBody() {
    return (
        <CalendarBodyContainer>
            월간 스케쥴러 업데이트 예정입니다
        </CalendarBodyContainer>
    );
}
