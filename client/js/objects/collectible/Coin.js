import colors from "../../constants/colors";

export default class Coin {
    static get defaultProps() {
        return {
            radius: 5,
            color: colors.coin,
            speed: 0
        }
    }

    constructor({
        radius = Coin.defaultProps.radius,
        x,
        y,
        color = Coin.defaultProps.color,
        speed = Coin.defaultProps.speed
    }) {
        this.radius = radius;

        this.x = x;
        this.y = y;

        this.color = color;
        this.speed = color;
    }

    render(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
}