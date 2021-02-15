import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import SelfCam from "./SelfCam";
import Calendar from "../../Component/Calendar/Calendar";

const PublicRoomContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 1200px;
    height: 100%;
    min-height: 720px;
    padding: 0 max(50px, 4%);
    padding-top: 117px;
    background-color: ${(props) => props.theme.backgroundWhite};
`;

const LeftRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 33.25%;
    min-width: 337.5px;
    border: 1px solid red;
`;

const MiddleRoomContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 33.25%;
    min-width: 337.5px;
    padding: 0 15px;
    border: 1px solid red;
`;

const RightRoomContainer = styled.div`
    display: flex;
    width: 36.5%;
    min-width: 365px;
    height: 720px;
    min-height: 640px;
`;

export default function PublicRoom({ socket }) {
    const selfCamRef = useRef();
    const [camAccepted, setCamAccepted] = useState(false);

    // TODO
    // 접근 거부시 다시 물어볼 수 있는 장치 필요
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                selfCamRef.current.srcObject = stream;
                setCamAccepted(true);
            })
            .catch(() => {});

        return () => {
            if (selfCamRef.current.srcObject) {
                const tracks = selfCamRef.current.srcObject.getTracks();
                tracks.forEach((track) => {
                    track.stop();
                });
                selfCamRef.current.srcObject = null;
            }
        };
    }, []);

    return (
        <PublicRoomContainer>
            <LeftRoomContainer></LeftRoomContainer>
            <MiddleRoomContainer>
                <SelfCam selfCamRef={selfCamRef} camAccepted={camAccepted} />
            </MiddleRoomContainer>
            <RightRoomContainer>
                <Calendar />
            </RightRoomContainer>
        </PublicRoomContainer>
    );
}
