import path from "path";

export const PATHS = {
    clientRoot: path.resolve("client"),
    serverRoot: path.resolve("server"),
    sharedRoot: path.resolve("shared"),
    publicRoot: path.resolve("public"),
    publicStyles: path.resolve("public", "css"),
    serverSource: path.resolve("server", "src"),
    serverDist: path.resolve("server", "dist"),
    clientSource: path.resolve("client", "js"),
    clientDist: path.resolve("public", "js"),
    clientHtml: path.resolve("client", "html_templates")
}