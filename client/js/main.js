//Imports
import io from "socket.io-client";

import * as Shared from "../../shared/main";

import "../styles/main.sass";

import "./vendor";

import Game from "./baselogic/Game";



//Disable context menu - context menu locks in movement commands - this is just a precaution
//document.addEventListener('contextmenu', event => event.preventDefault());



//Run the game
document.addEventListener("DOMContentLoaded", () => {
	const myGame = new Game();

	if (!myGame.checkPreconditions()) {
		console.error("Cannot run game. Failed checks.");

		return;
	}

	myGame.run();
});