import React, { useState } from "react";
import styled, { css } from "styled-components";
import { StylelessButton } from "../../Component/Icon/button";

const UserSpaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20px;
`;

const CamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    min-height: 400px;
    padding-bottom: 10px;
`;

const SelfCam = styled.video`
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

const GetSelfCamBtn = styled(UserSpaceButton)`
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
    getSelfCam,
    selfCamRef,
    camAccepted,
    enterRoom,
    quitRoom,
}) {
    const [roomEntered, setRoomEntered] = useState(false);

    return (
        <UserSpaceContainer>
            <CamContainer>
                {!camAccepted ? (
                    <div>
                        입장하기 위해 먼저 카메라 이용 권한을 설정해주세요
                    </div>
                ) : (
                    <SelfCam ref={selfCamRef} autoPlay playsInline />
                )}
            </CamContainer>
            <ButtonsContainer camAccepted={camAccepted}>
                {!camAccepted ? (
                    <GetSelfCamBtn
                        onClick={() => {
                            getSelfCam();
                        }}
                    >
                        내 화면 받아오기
                    </GetSelfCamBtn>
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
