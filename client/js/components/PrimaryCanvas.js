import AbstractCanvas from "./AbstractCanvas";

export default class PrimaryCanvas extends AbstractCanvas {
    constructor(id) {
        super(id);

        this.clearFill = "rgba(0, 0, 0, 0.75)";
    }
}