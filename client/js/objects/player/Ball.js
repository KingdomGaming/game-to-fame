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
            velY: 0,
            friction: 0.05
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
        friction = Ball.defaultProps.friction
    }) {
        this.radius 	= radius;
        this.x 			= x;
        this.y 			= y;
        this.color		= color;
        this.speed		= speed;
        this.velX		= velX;
        this.velY		= velY;
        this.friction   = friction;

        this.lock_top = false;
        this.lock_left = false;
        this.lock_right = false;
        this.lock_bottom = false;
    }

    move() {
        this.applyFriction();

		this.x += this.velX;
		this.y += this.velY;
    }

    applyFriction() {
        this.velY = this.velY - (this.velY * this.friction);
        this.velX = this.velX - (this.velX * this.friction);
    }

    //Draws the ball
    render(context) {
		context.fillStyle = this.color;
		context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.closePath();
		context.fill();
    }
}