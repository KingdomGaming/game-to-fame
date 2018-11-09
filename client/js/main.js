//Imports
import io from "socket.io-client";

import * as Shared from "../../shared/main";

import "../styles/main.sass";

import "./vendor";

import { KG__CanvasApp } from "./BallClass";



//Disable context menu - context menu locks in movement commands - this is just a precaution
//document.addEventListener('contextmenu', event => event.preventDefault());



//Run the game
document.addEventListener("DOMContentLoaded", () => {
	KG__CanvasApp();
});





/*
const socket = io();

socket.on("message", (data) =>
{
	console.log(data.message);
});
*/