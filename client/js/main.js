import io from "socket.io-client";

import * as Shared from "../../shared/main";

import "../styles/main.sass";

const socket = io();

socket.on("message", (data) => {
	console.log(data.message);
});