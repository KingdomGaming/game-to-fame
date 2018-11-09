import Game from "./baselogic/Game";

//Function in charge of doing all the drawing.
function game()
{
	this.drawScreen = function(gameContext, scoreContext, coinMap, ball, playerScore, theGameCanvas, friction, keyEventMap)
	{

		// Define key handling variables
		const maxVel = 10;
		const maxNegativeVel = maxVel * -1;
		const addVel = 1;


		//Check for activated keys
		if(keyEventMap['w'] && !ball.lock_top)
		{
			ball.velY -= addVel;
			if(ball.velY < maxNegativeVel) ball.velY = maxNegativeVel;
		}



		if(keyEventMap['a'] && !ball.lock_left)
		{
			ball.velX -= addVel;
			 if(ball.velX < maxNegativeVel) ball.velX = maxNegativeVel;
		}



		if(keyEventMap['d'] && !ball.lock_right)
		{
			ball.velX += addVel;
			 if(ball.velX > maxVel) ball.velX = maxVel;
		}



		if(keyEventMap['s'] && !ball.lock_bottom)
		{
			ball.velY += addVel;
			 if(ball.velY > maxVel) ball.velY = maxVel;
		}




















		//Friction is proportionally substracted from the X component of the velocity vector.
		ball.velY = ball.velY - (ball.velY*friction);
		ball.velX = ball.velX - (ball.velX*friction);



		//X and Y components of the velocity vector are added to the ball x and y values.
		ball.x += ball.velX;
		ball.y += ball.velY;











		//Check for element collisions
		playerScore = checkCoinCollision(ball, playerScore, coinMap);

		var scoreToString = playerScore.toString();


		if(playerScore >= 1000)
		{
			playerScoreString = scoreToString;
		}
		else if(playerScore >= 100)
		{
			playerScoreString = '0' + scoreToString;
		}
		else if(playerScore >= 10)
		{
			playerScoreString = '00' + scoreToString;
		}
		else
		{
			playerScoreString = '000' + scoreToString;
		}


		//Pain player score
		scoreContext.font = "30px Arial";

		var scoreColor;
		if(playerScore >= 100)
		{
			scoreColor = '#ff7644';
		}
		else if(playerScore >= 50)
		{
			scoreColor = '#f9bc40';
		}
		else if(playerScore >= 25)
		{
			scoreColor = '#f9ef3f';
		}
		else if(playerScore >= 10)
		{
			scoreColor = '#89f93f';
		}
		else
		{
			scoreColor = '#3ff9a5';
		}


		scoreContext.fillStyle = scoreColor;

		scoreContext.fillText(playerScoreString, 15, 35);


		return playerScore;
	}












}

















function checkCoinCollision(collidingBall, objectScore, coinMap)
{
	var ballLeft 	= collidingBall.x - collidingBall.radius;
	var ballRight 	= collidingBall.x + collidingBall.radius;
	var ballTop 	= collidingBall.y - collidingBall.radius;
	var ballBottom 	= collidingBall.y + collidingBall.radius;

	for(var i=0; i<coinMap.length; i++)
	{
		var coin 		= coinMap[i];
		var coinLeft 	= coin.x - coin.radius;
		var coinRight 	= coin.x + coin.radius;
		var coinTop 	= coin.y - coin.radius;
		var coinBottom 	= coin.y + coin.radius;




		var yCollide = 	ballTop <= coinTop && coinBottom <= ballBottom ||
						coinTop <= ballTop && ballTop <= coinBottom ||
						coinTop <= ballBottom && ballBottom <= coinBottom;

		var xCollide = 	ballLeft <= coinLeft && coinRight <= ballRight 	||
						coinLeft <= ballLeft && ballLeft <= coinRight 	||
						coinLeft <= ballRight && ballRight <= coinRight;



		var roundCollide = Math.sqrt(Math.pow((collidingBall.x - coin.x), 2) + Math.pow((collidingBall.y - coin.y), 2)) <= ((collidingBall.radius + coin.radius) - ((coin.radius*2) - 2));


		// if(yCollide && xCollide)
		if(roundCollide)
		{
			objectScore ++;
		  	coinMap.splice(i, 1);
		}

	}

	return objectScore;
}





















export const KG__CanvasApp = function()
{
	const myGame = new Game();

	if (!myGame.checkPreconditions()) {
		console.error("Cannot run game. Failed checks.");

		return;
	}

	myGame.run();


	//Begins the game loop.
	//gameLoop();





	// //Handle key events
	// window.onkeydown = window.onkeyup = function(keyEvent)
	// {
	// 	//Add key event to map
	// 	keyEventMap[keyEvent.key] = keyEvent.type == 'keydown';

	// 	var box = document.getElementById("theGameCanvas").getBoundingClientRect();
	// }





	// function gameLoop()
	// {
	// 	window.setTimeout(gameLoop, 20);

	// 	playerScore = myGame.drawScreen(gameContext, scoreContext, coinMap, ball, playerScore, theGameCanvas, friction, keyEventMap)
	// }






	// function getMousePosition(canvas, event)
	// {
	// 	var box = canvas.getBoundingClientRect();
	// 	var coordinates = 	{
	// 							x : event.clientX - box.left,
	// 							y : event.clientY - box.top
	// 						};
	// }
}