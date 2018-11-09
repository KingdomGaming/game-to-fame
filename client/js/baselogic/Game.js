import Ball from "../objects/player/Ball";
import Coin from "../objects/collectible/Coin";

export default class Game {
    constructor() {
        this.fps = 30;

        //Creates the canvas objects and gets their context.
        this.theGameCanvas = document.querySelector("#theGameCanvas");
        this.theScoreCanvas = document.querySelector("#theScoreCanvas");
        this.gameContext = this.theGameCanvas.getContext("2d");
        this.scoreContext = this.theScoreCanvas.getContext("2d");

        //Get the boundaries
		const gameBox = this.theGameCanvas.getBoundingClientRect();
		this.bound_top = parseInt(gameBox.top);
		this.bound_left = parseInt(gameBox.left);
		this.bound_right = parseInt(gameBox.right);
		this.bound_bottom = parseInt(gameBox.bottom);

        //Creates our ball object.
        this.ball = new Ball({});

        //Init coin collection
	    this.coinMap = [];
        this.maxCoins = 75;
        this.generateCoins();

        //Init player's score
        this.playerScore = 0;
        this.playerScoreString = '0000';

        //Sets our starting friction value - originally 0.01
        this.friction = 0.05;

        this.keyEventMap = {};
        this.setupListeners();
    }

    setupListeners() {
        window.addEventListener("keydown", this.addKeyToMap.bind(this));
        window.addEventListener("keyup", this.removeKeyFromMap.bind(this));
    }

    addKeyToMap(event) {
        console.log(this.keyEventMap)
        this.keyEventMap[event.key] = true;
    }

    removeKeyFromMap(event) {
        this.keyEventMap[event.key] = false;
    }

    generateCoins() {
        //Define coin values
        const coin_min_x = 0 + (this.ball.radius * 2);
        const coin_max_x = this.bound_right - this.bound_left - (this.ball.radius * 3);
        const coin_min_y = 0 + (this.ball.radius * 2);
        const coin_max_y = this.bound_bottom - this.bound_top - (this.ball.radius * 3);

        if(this.coinMap.length < this.maxCoins)
        {
            const xPos = Math.floor(Math.random() * coin_max_x) + coin_min_x;
            const yPos = Math.floor(Math.random() * coin_max_y) + coin_min_y;

            this.coinMap.push(
                new Coin({
                    x: xPos,
                    y: yPos
                })
            );
        }
    }

    checkPreconditions() {
        return hasCanvasSupport();
    }

    run() {
        this.checkBoundary(this.ball, this.theGameCanvas);

        this.handleInput();
        this.handleFriction();

        this.ball.move();

        this.checkCoinCollision();
        this.generateCoins();

        this.render(this.gameContext, this.scoreContext);

        setTimeout(this.run.bind(this), 1000 / this.fps);
    }

    render(gameContext, scoreContext) {
        this.clearCanvas();
        this.renderPlayer(gameContext);
        this.renderCoins(gameContext);
        this.renderScore(scoreContext);
    }

    handleInput() {
        // Define key handling variables
		const maxVel = 10;
		const maxNegativeVel = maxVel * -1;
		const addVel = 1;


		//Check for activated keys
		if(this.keyEventMap['w'] && !this.ball.lock_top)
		{
            this.ball.velY -= addVel;

			if(this.ball.velY < maxNegativeVel) {
                this.ball.velY = maxNegativeVel;
            }
		}



		if(this.keyEventMap['a'] && !this.ball.lock_left)
		{
            this.ball.velX -= addVel;

			if(this.ball.velX < maxNegativeVel) {
                this.ball.velX = maxNegativeVel;
            }
		}



		if(this.keyEventMap['d'] && !this.ball.lock_right)
		{
            this.ball.velX += addVel;

			if(this.ball.velX > maxVel) {
                this.ball.velX = maxVel;
            }
		}



		if(this.keyEventMap['s'] && !this.ball.lock_bottom)
		{
            this.ball.velY += addVel;

			if(this.ball.velY > maxVel) {
                this.ball.velY = maxVel;
            }
		}
    }

    handleFriction() {
        //Friction is proportionally substracted from the X component of the velocity vector.
		this.ball.velY = this.ball.velY - (this.ball.velY * this.friction);
		this.ball.velX = this.ball.velX - (this.ball.velX * this.friction);
    }

    clearCanvas() {
        //Clears the canvas on every call. make use of alpha to create trailing effect.
		this.gameContext.fillStyle = "rgba(0, 0, 0, 0.75)";
		this.scoreContext.fillStyle = "rgba(0, 0, 0, 1)";
		this.gameContext.fillRect(0,0, this.theGameCanvas.width, this.theGameCanvas.height);
		this.scoreContext.fillRect(0,0, this.theGameCanvas.width, this.theGameCanvas.height);
    }

    renderPlayer(context) {
        this.ball.render(context);
    }

    renderCoins(context) {
        this.coinMap.forEach((coin) => coin.render(context));
    }

    renderScore(context) {
        const scoreToString = this.playerScore.toString();


		if(this.playerScore >= 1000)
		{
			this.playerScoreString = scoreToString;
		}
		else if(this.playerScore >= 100)
		{
			this.playerScoreString = '0' + scoreToString;
		}
		else if(this.playerScore >= 10)
		{
			this.playerScoreString = '00' + scoreToString;
		}
		else
		{
			this.playerScoreString = '000' + scoreToString;
		}


		//Pain player score
		context.font = "30px Arial";

		let scoreColor;
		if(this.playerScore >= 100)
		{
			scoreColor = '#ff7644';
		}
		else if(this.playerScore >= 50)
		{
			scoreColor = '#f9bc40';
		}
		else if(this.playerScore >= 25)
		{
			scoreColor = '#f9ef3f';
		}
		else if(this.playerScore >= 10)
		{
			scoreColor = '#89f93f';
		}
		else
		{
			scoreColor = '#3ff9a5';
		}


		context.fillStyle = scoreColor;

		context.fillText(this.playerScoreString, 15, 35);
    }

    //Function in charge of checking the ball against walls.
	checkBoundary(object, theGameCanvas)
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

    checkCoinCollision() {
        this.coinMap.forEach((coin, index) => {
            const isCollision = Math.sqrt(Math.pow((this.ball.x - coin.x), 2) + Math.pow((this.ball.y - coin.y), 2)) <= ((this.ball.radius + coin.radius) - ((coin.radius*2) - 2));

            if (isCollision) {
                this.playerScore ++;
                this.coinMap.splice(index, 1);
            }
        });
    }
}

const hasCanvasSupport = () => {
    return Modernizr.canvas;
}