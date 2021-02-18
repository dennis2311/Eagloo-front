import React, { useState } from "react";
import styled from "styled-components";
import { StylelessButton } from "../../Component/Icon/button";

const UserSpaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
`;

const LocationNoticer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    font-family: "SamlipHopang";
    border-radius: 12px;
    padding: 0 45px;
    margin-bottom: 15px;
    background-color: ${(props) => props.theme.headerGray};
`;

const LocationHeader = styled.div`
    font-size: 20px;
`;

const LocationContent = styled.div`
    font-size: 32px;
`;

const UserCamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    min-height: 360px;
    padding: 15px;
    margin-bottom: 20px;
    border: 2px solid ${(props) => props.theme.headerGray};
    border-radius: 15px;
`;

const CamRequestMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: "JejuGothic";
`;

const UserCam = styled.video`
    width: 100%;
    height: auto;
    border-radius: 15px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: ${(props) =>
        !props.camAccepted ? "center" : "space-between"};
    align-items: center;
    width: 100%;
    padding: 0 20px;
`;

const UserSpaceButton = styled(StylelessButton)`
    height: 50px;
    color: #ffffff;
    font-size: 16px;
    font-family: "JejuGothic";
    border-radius: 8px;
`;

const GetUserCamBtn = styled(UserSpaceButton)`
    width: 80%;
    background-color: ${(props) => props.theme.mainDarkBlue};
`;

const EnterRoomBtn = styled(UserSpaceButton)`
    width: 45%;
    background-color: ${(props) =>
        !props.roomEntered ? props.theme.mainBlue : "#c4c4c4"};
    :hover {
        cursor: ${(props) => props.roomEntered && "auto"};
    }
`;

const QuitRoomBtn = styled(UserSpaceButton)`
    width: 45%;
    background-color: ${(props) => (props.roomEntered ? "#f27872" : "#c4c4c4")};
    :hover {
        cursor: ${(props) => !props.roomEntered && "auto"};
    }
`;

export default function UserSpace({
    roomNo,
    getUserCam,
    userCamRef,
    camAccepted,
    enterRoom,
    quitRoom,
}) {
    const [roomEntered, setRoomEntered] = useState(false);

    return (
        <UserSpaceContainer>
            <LocationNoticer>
                <LocationHeader>현재 위치 :</LocationHeader>
                <LocationContent>
                    {`${roomNo} 번`}
                    {roomEntered ? " 독서실" : " 대기실"}
                </LocationContent>
            </LocationNoticer>
            <UserCamContainer camAccepted={camAccepted}>
                {!camAccepted ? (
                    <CamRequestMessage>
                        입장하기 위해 먼저 카메라 이용 권한을 설정해주세요
                    </CamRequestMessage>
                ) : (
                    <UserCam ref={userCamRef} autoPlay playsInline />
                )}
            </UserCamContainer>
            <ButtonsContainer camAccepted={camAccepted}>
                {!camAccepted ? (
                    <GetUserCamBtn
                        onClick={() => {
                            getUserCam();
                        }}
                    >
                        내 화면 받아오기
                    </GetUserCamBtn>
                ) : (
                    <>
                        <EnterRoomBtn
                            onClick={() => {
                                enterRoom();
                                setRoomEntered(true);
                            }}
                            roomEntered={roomEntered}
                            disabled={roomEntered}
                        >
                            방 입장하기
                        </EnterRoomBtn>
                        <QuitRoomBtn
                            onClick={() => {
                                quitRoom();
                                setRoomEntered(false);
                            }}
                            roomEntered={roomEntered}
                            disabled={!roomEntered}
                        >
                            방 나가기
                        </QuitRoomBtn>
                    </>
                )}
            </ButtonsContainer>
        </UserSpaceContainer>
    );
}
