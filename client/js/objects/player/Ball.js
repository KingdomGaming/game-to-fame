import colors from "../../constants/colors";

export default class Ball {
    static get defaultProps() {
        return {
            radius: 15,
            x: 45,
            y: 45,
            color: colors.player,
            speed: 1,
            velX: 0,
            velY: 0
        }
    }

    constructor({
        radius = Ball.defaultProps.radius,
        x = Ball.defaultProps.x,
        y = Ball.defaultProps.y,
        color = Ball.defaultProps.color,
        speed = Ball.defaultProps.speed,
        velX = Ball.defaultProps.velX,
        velY = Ball.defaultProps.velY,
    }) {
        // x=15,//theGameCanvas.width/2,
        // y=15,//theGameCanvas.height/2,
        this.radius 	= radius; 		//15,
        this.x 			= x;			//theGameCanvas.width/2,
        this.y 			= y;			//theGameCanvas.height/2,
        this.color		= color;
        // this.angle		= 0;
        this.speed		= speed;
        this.velX		= velX;
        this.velY		= velY;
        // this.elasticity	= 0.80;  // removed from game
        this.lock_top = false;
        this.lock_left = false;
        this.lock_right = false;
        this.lock_bottom = false;
    }

    move() {
        //X and Y components of the velocity vector are added to the ball x and y values.
		this.x += this.velX;
		this.y += this.velY;
    }

    //Draws the ball
    render(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();
    }
}