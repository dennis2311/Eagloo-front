import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import peerOfflineImage from "../../resource/img/peer-offline.gif";
import CircularProgress from "@material-ui/core/CircularProgress";

const PeerSpaceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 180px;
    min-height: 180px;
    margin-bottom: 20px;
`;
const PeerCamContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 20px;
    border: 2px solid ${(props) => props.theme.mainDarkBlue};
    border-radius: 12px;
    overflow: hidden;
`;

const PeerOfflineImageContainer = styled.div`
    height: 100%;
    width: 100%;
`;

const PeerOfflineImage = styled.img`
    width: auto;
    height: 100%;
    max-height: 100%;
    display: block;
`;

const PeerCam = styled.video`
    width: 60%;
    height: auto;
    border-radius: 12px;
`;

function PeerUnready({ peerOnline }) {
    return (
        <>
            {!peerOnline ? (
                <PeerOfflineImageContainer>
                    <PeerOfflineImage
                        src={peerOfflineImage}
                        alt="peer-offline-image"
                    />
                </PeerOfflineImageContainer>
            ) : (
                <CircularProgress />
            )}
        </>
    );
}

function PeerReady({ peerStream }) {
    const camRef = useRef(null);
    useEffect(() => {
        if (!camRef.current) return;
        camRef.current.srcObject = peerStream ? peerStream : null;
    }, [peerStream]);

    return <PeerCam ref={camRef} autoPlay playsInline />;
}

export default function PeerSpace({ peerOnline, peerLoading, peerStream }) {
    return (
        <PeerSpaceContainer>
            <PeerCamContainer>
                {!peerOnline || peerLoading ? (
                    <PeerUnready peerOnline={peerOnline} />
                ) : (
                    <PeerReady peerStream={peerStream} />
                )}
            </PeerCamContainer>
        </PeerSpaceContainer>
    );
}
