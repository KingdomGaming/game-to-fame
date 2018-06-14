import path from "path";

export const PATHS = {
    clientRoot: path.resolve("client"),
    serverRoot: path.resolve("server"),
    sharedRoot: path.resolve("shared"),
    publicRoot: path.resolve("public"),
    serverSource: path.resolve("server", "src"),
    serverDist: path.resolve("server", "dist"),
    clientSource: path.resolve("client"),
    clientDist: path.resolve("public", "js")
}