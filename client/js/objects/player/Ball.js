import Colors from "../../constants/colors";

export default class Ball {
	// x=15,//theGameCanvas.width/2,
    // y=15,//theGameCanvas.height/2,
    static get defaultProps() {
        return {
            radius: 15,
            x: 45,
            y: 45,
            color: Colors.playerColor,
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


}