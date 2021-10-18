import React from "react";
import { JwtHandler } from "../../jwt-handler/JwtHandler";

export default function Logout(props) {
    JwtHandler.clearJwt()

    props.history.psuh("/login");

    return <div>Logout</div>;
}