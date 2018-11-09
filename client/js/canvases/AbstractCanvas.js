export default class AbstractCanvas {
    constructor(id) {
        this.canvas = document.querySelector(`#${id}`);
        this.context = this.canvas.getContext("2d");

        const canvasBounds = this.canvas.getBoundingClientRect();
        this.bounds = {
            top: parseInt(canvasBounds.top),
            right: parseInt(canvasBounds.right),
            bottom: parseInt(canvasBounds.bottom),
            left: parseInt(canvasBounds.left)
        }

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.clearFill = "rgba(0, 0, 0, 1)";
    }

    render() {

    }

    clear() {
        this.context.fillStyle = this.clearFill;
        this.context.fillRect(0, 0, this.width, this.height);
    }
}