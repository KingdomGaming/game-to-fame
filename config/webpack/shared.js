import path from "path";

const PATHS = {
    clientRoot: path.resolve("client"),
    serverRoot: path.resolve("server"),
    sharedRoot: path.resolve("shared"),
    publicRoot: path.resolve("public"),
    serverSource: path.join("server", "src"),
    serverDist: path.join("server", "dist"),
    clientSource: path.join("client"),
    clientDist: path.join("public", "js")
}

const PLUGINS = {

}


export {
    PATHS,
    PLUGINS
}