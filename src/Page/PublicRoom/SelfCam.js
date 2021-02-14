import React from "react";
import styled from "styled-components";

const SelfCamContainer = styled.video`
    width: 100%;
    height: auto;
    border-radius: 15px;
`;

export default function SelfCam({ selfCamRef }) {
    return <SelfCamContainer ref={selfCamRef} autoPlay playsInline />;
}
