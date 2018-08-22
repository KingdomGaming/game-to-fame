function BallClass(radius)
{
	// x=15,//theGameCanvas.width/2,
	// y=15,//theGameCanvas.height/2,



	this.radius 	= radius; 		//15,
	this.x 			= 45;			//theGameCanvas.width/2,
	this.y 			= 45;			//theGameCanvas.height/2,
	this.color		= "#4286f4";
	// this.angle		= 0;
	this.speed		= 1;
	this.velX		= 0;
	this.velY		= 0;
	// this.elasticity	= 0.80;  // removed from game
	this.lock_top = false;
	this.lock_left = false;
	this.lock_right = false;
	this.lock_bottom = false;
}




//Function in charge of doing all the drawing.
function game()
{
	this.drawScreen = function(gameContext, scoreContext, coinMap, ball, playerScore, theGameCanvas, friction, keyEventMap)
	{
		//Checks if it has hit any of the wall boundaries
		checkBoundary(ball, theGameCanvas);



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




		//Clears the canvas on every call. make use of alpha to create trailing effect.
		gameContext.fillStyle = "rgba(0, 0, 0, 0.75)";
		scoreContext.fillStyle = "rgba(0, 0, 0, 1)";
		gameContext.fillRect(0,0, theGameCanvas.width, theGameCanvas.height);
		scoreContext.fillRect(0,0, theGameCanvas.width, theGameCanvas.height);



		//Defin coin values
		const maxCoins = 75;
		const coin_Radius = 5;
		const coin_dblRadius = coin_Radius * 4;



		//Get the boundaries
		const gameBox = theGameCanvas.getBoundingClientRect();
		const bound_top = parseInt(gameBox.top);
		const bound_left = parseInt(gameBox.left);
		const bound_right = parseInt(gameBox.right);
		const bound_bottom = parseInt(gameBox.bottom);



		//Define coin values
		const coin_min_x = 0 + (ball.radius * 2);
		const coin_max_x = bound_right - bound_left - (ball.radius * 3);
		const coin_min_y = 0 + (ball.radius * 2);
		const coin_max_y = bound_bottom - bound_top - (ball.radius * 3);



		if(coinMap.length < maxCoins)
		{
			// var xPos = Math.floor(Math.random() * (theGameCanvas.width - coin_dblRadius) + coin_dblRadius);
			// var yPos = Math.floor(Math.random() * (theGameCanvas.height - coin_dblRadius) + coin_dblRadius);
			var xPos = Math.floor(Math.random() * coin_max_x) + coin_min_x;
			var yPos = Math.floor(Math.random() * coin_max_y) + coin_min_y;

			var coin = 	{
							radius:coin_Radius,
							x:xPos,
							y:yPos,
							color:"#faff00",
							// angle:0,
							speed:0,
							// elasticity:0.80  //removed from game
						};


			coinMap.push(coin);
		}



		//Friction is proportionally substracted from the X component of the velocity vector.
		ball.velY = ball.velY - (ball.velY*friction);
		ball.velX = ball.velX - (ball.velX*friction);



		//X and Y components of the velocity vector are added to the ball x and y values.
		ball.x += ball.velX;
		ball.y += ball.velY;



		//Iterate and draw coins
		for(var i=0; i<coinMap.length; i++)
		{
			gameContext.fillStyle = coinMap[i].color;
			gameContext.beginPath();
			gameContext.arc(coinMap[i].x, coinMap[i].y, coinMap[i].radius, 0, Math.PI*2, true);
			gameContext.closePath();
			gameContext.fill();
		}



		//Draws the ball
		gameContext.fillStyle = ball.color;
		gameContext.beginPath();
		gameContext.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
		gameContext.closePath();
		gameContext.fill();



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











	//Function in charge of checking the ball against walls.
	function checkBoundary(object, theGameCanvas)
	{
		//Get the boundaries
		var box = theGameCanvas.getBoundingClientRect();
		var bound_top = parseFloat(box.top);
		var bound_left = parseFloat(box.left);
		var bound_right = parseFloat(box.right);
		var bound_bottom = parseFloat(box.bottom);



		//Get object coords
		var object_top = parseFloat(object.y - object.radius) + bound_top;
		var object_left = parseFloat(object.x - object.radius) + bound_left;
		var object_right = parseFloat(object.x + object.radius) + bound_left;
		var object_bottom = parseFloat(object.y + object.radius) + bound_top;



		//Get maximum values
		var max_top = bound_top + object.radius - bound_top;
		var max_left = bound_left + object.radius - bound_left;
		var max_right = bound_right - object.radius - bound_left;
		var max_bottom = bound_bottom - object.radius - bound_top;



		//Check Top Boundary
		if(object_top <= bound_top)
		{
			object.velY = 0;
			object.y = max_top;
			object.lock_top = true;

		}
		else if(object.lock_top)
		{
			object.lock_top = false;
		}



		//Check Left Boundary
		if(object_left <= bound_left)
		{
			object.velX = 0;
			object.x = max_left;
			object.lock_left = true;
		}
		else if(object.lock_left)
		{
			object.lock_left = false;
		}



		//Check Left Boundary
		if(object_right >= bound_right)
		{
			object.velX = 0;
			object.x = max_right;
			object.lock_right = true;
		}
		else if(object.lock_right)
		{
			object.lock_right = false;
		}



		//Check Bottom Boundary
		if(object_bottom >= bound_bottom)
		{
			object.velY = 0;
			object.y = max_bottom;
			object.lock_bottom = true;
		}
		else if(object.lock_bottom)
		{
			object.lock_bottom = false;
		}
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










//Function part of the modernizr to check if canvas is supported.
function canvasSupport ()
{
	return Modernizr.canvas;
}










export const KG__CanvasApp = function()
{
	//If the opposite of canvas support is true, means there is no support and exits the program.
	if(!canvasSupport())
	{
		return;
	}

	var myGame = new game();


	//Creates the canvas objects and gets their context.
	var theGameCanvas = document.getElementById("theGameCanvas");
	var theScoreCanvas = document.getElementById("theScoreCanvas");

	var gameContext = theGameCanvas.getContext("2d");
	var scoreContext = theScoreCanvas.getContext("2d");




	//Creates our ball object.
	var ball = new BallClass(15);



	//Init coin collection
	var coinMap = [];



	//Init player's score
	var playerScore 		= 0;
	var playerScoreString 	= '0000';



	//Sets our starting friction value - originally 0.01
	var friction = 0.05;
	var keyEventMap ={};



	//Begins the game loop.
	gameLoop();





	//Handle key events
	window.onkeydown = window.onkeyup = function(keyEvent)
	{
		//Add key event to map
		keyEventMap[keyEvent.key] = keyEvent.type == 'keydown';

		var box = document.getElementById("theGameCanvas").getBoundingClientRect();
	}





	function gameLoop()
	{
		window.setTimeout(gameLoop, 20);

		playerScore = myGame.drawScreen(gameContext, scoreContext, coinMap, ball, playerScore, theGameCanvas, friction, keyEventMap)
	}






	function getMousePosition(canvas, event)
	{
		var box = canvas.getBoundingClientRect();
		var coordinates = 	{
								x : event.clientX - box.left,
								y : event.clientY - box.top
							};
	}
}