import React from "react";
import styled from "styled-components";
import { StylelessButton } from "../../Style/component/button";
import { Link } from "react-router-dom";

const SubHeaderContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 90%;
    height: 52px;
    padding: 0 350px;
    background-color: #0043a5;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    box-shadow: 0 5px 10px -3px black;
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

export default function SubHeader({ setFeedbackOpen }) {
    return (
        <SubHeaderContainer>
            <SubThreadButtonContainer>HOME</SubThreadButtonContainer>
            <SubThreadButtonContainer>
                <StylelessButton
                    onClick={() => {
                        setFeedbackOpen(true);
                    }}
                >
                    Feedback
                </StylelessButton>
            </SubThreadButtonContainer>
            <SubThreadButtonContainer>
                <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    to="/about"
                >
                    About Us
                </Link>
            </SubThreadButtonContainer>
            <SubThreadButtonContainer>FAQ</SubThreadButtonContainer>
        </SubHeaderContainer>
    );
}
