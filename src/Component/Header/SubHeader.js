import React from "react";
import styled from "styled-components";

const SubHeaderContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 90%;
    height: 52px;
    padding: 0 350px;
    background-color: #0043a5;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

const SubThreadButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    font-size: 17px;
    font-family: "JejuGothic";
    color: #ffffff;
`;

export default function SubHeader() {
    return (
        <SubHeaderContainer>
            <SubThreadButtonContainer>HOME</SubThreadButtonContainer>
            <SubThreadButtonContainer>Service</SubThreadButtonContainer>
            <SubThreadButtonContainer>About Us</SubThreadButtonContainer>
            <SubThreadButtonContainer>FAQ</SubThreadButtonContainer>
        </SubHeaderContainer>
    );
}
