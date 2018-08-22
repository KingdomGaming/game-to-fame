import { PATHS } from "../../../shared/main";

export default class Router {
    constructor(app) {
        this.app = app;

        this.initRoutes();
    }

    initRoutes() {
        this.app.get("/", (request, response) => {
            response.sendFile(path.join(PATHS.publicRoot, "index.html"));
        });
    }
}