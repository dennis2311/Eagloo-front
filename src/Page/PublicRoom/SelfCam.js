import React from "react";
import styled from "styled-components";

const SelfCamContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SelfCamStream = styled.video`
    width: 100%;
    height: auto;
    border-radius: 15px;
`;

export default function SelfCam({ selfCamRef, camAccepted, enterRoom }) {
    return (
        <SelfCamContainer>
            <SelfCamStream ref={selfCamRef} autoPlay playsInline />
            {camAccepted && (
                <button
                    onClick={() => {
                        enterRoom();
                    }}
                >
                    방 입장하기
                </button>
            )}
        </SelfCamContainer>
    );
}
