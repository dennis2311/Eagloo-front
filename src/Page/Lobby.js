import React from "react";
import { Link } from "react-router-dom";

function Lobby() {
    return (
        <div>
            <p>
                <span>
                    자신이 속한 대학, 혹은 듣고 있는 강의가 열린 대학으로 들어가
                    공부하세요!
                </span>
            </p>
            <Link to={`/group/business`}>경영대학</Link>
            <Link to={`/group/engineer`}>공학대학</Link>
            <Link to={`/group/underwood`}>국제대학</Link>
            <Link to={`/group/socsci`}>사회과학대학</Link>
        </div>
    );
}

export default Lobby;
