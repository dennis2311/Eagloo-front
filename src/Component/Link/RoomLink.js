import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faCaretLeft,
    faCaretRight,
    faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const RoomLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const RoomLinkHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 18px;
    padding: 25px 0;
    margin-bottom: 15px;
    font-size: 22px;
    font-family: "SamlipHopang";
`;

const RoomLinkHeaderDiv = styled.div`
    display: flex;
    align-items: center;
`;

const RoomLinkRowContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 30px;
    margin-bottom: 10px;
`;

const RoomLinkRowContainerHead = styled.div`
    display: flex;
    width: 100%;
    color: ${(props) => props.theme.mainShineBlue};
    font-size: 20px;
    font-family: "SamlipHopang";
    padding: 12px 10px;
`;

const RoomLinkEachRow = styled.div`
    display: flex;
    width: 96%;
    height: 140px;
    overflow-x: auto;
`;

const RoomIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 120px;
    max-width: 120px;
    min-height: 120px;
    max-height: 120px;
    margin: 0 5px;
    border-radius: 15px;
    color: #ffffff;
    background-color: #898989;
    font-size: 15px;
    font-family: "JejuGothic";
    :hover {
        cursor: pointer;
    }
`;

const RoomAddIcon = styled(RoomIcon)`
    position: relative;
    background-color: ${(props) => props.theme.mainLightBlue};
`;

const RoomAddText = styled.div`
    position: absolute;
    top: 44px;
    left: 38.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-size: 15px;
    font-family: "JejuGothic";
`;

const CaretDiv = styled.div`
    position: absolute;
    bottom: 60px;
    color: ${(props) => props.theme.mainShineBlue};
    cursor: pointer;
`;

const LeftArrow = styled(CaretDiv)`
    left: 8px;
`;

const RightArrow = styled(CaretDiv)`
    right: 8px;
`;

function RoomEachLink({ index }) {
    return (
        <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/public/${index}`}
        >
            <RoomIcon>{`스터디룸 ${index}`}</RoomIcon>
        </Link>
    );
}

const TempDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const TempMessage = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-family: "JejuGothic";
    padding-right: 15px;
    padding-bottom: 24px;
`;

export default function RoomLink() {
    // TODO
    // 스터디룸 만들기
    function CreateRoom() {
        toast.warn("😥 서비스 준비 중입니다");
    }

    return (
        <RoomLinkContainer>
            <RoomLinkHeader>
                <RoomLinkHeaderDiv>
                    스터디 참여하기&nbsp;
                    <FontAwesomeIcon icon={faAngleRight} />
                </RoomLinkHeaderDiv>
            </RoomLinkHeader>

            <RoomLinkRowContainer>
                <RoomLinkRowContainerHead>
                    개인 스터디룸&nbsp;
                    <FontAwesomeIcon icon={faAngleRight} />
                </RoomLinkRowContainerHead>
                <RoomLinkEachRow>
                    <RoomAddIcon
                        onClick={() => {
                            CreateRoom();
                        }}
                    >
                        <RoomAddText>
                            스터디
                            <br />
                            만들기
                        </RoomAddText>
                        <FontAwesomeIcon icon={faPlusSquare} size="8x" />
                    </RoomAddIcon>
                    <TempDiv>
                        <TempMessage>서비스 업데이트 예정입니다</TempMessage>
                    </TempDiv>
                </RoomLinkEachRow>
                <LeftArrow>
                    <FontAwesomeIcon icon={faCaretLeft} size="3x" />
                </LeftArrow>
                <RightArrow>
                    <FontAwesomeIcon icon={faCaretRight} size="3x" />
                </RightArrow>
            </RoomLinkRowContainer>

            <RoomLinkRowContainer>
                <RoomLinkRowContainerHead>
                    공용 스터디룸&nbsp;
                    <FontAwesomeIcon icon={faAngleRight} />
                </RoomLinkRowContainerHead>
                <RoomLinkEachRow>
                    <RoomEachLink index="1" />
                    <RoomEachLink index="2" />
                    <RoomEachLink index="3" />
                    <RoomEachLink index="4" />
                    <RoomEachLink index="5" />
                    <RoomEachLink index="6" />
                </RoomLinkEachRow>
                <LeftArrow>
                    <FontAwesomeIcon icon={faCaretLeft} size="3x" />
                </LeftArrow>
                <RightArrow>
                    <FontAwesomeIcon icon={faCaretRight} size="3x" />
                </RightArrow>
            </RoomLinkRowContainer>
        </RoomLinkContainer>
    );
}
