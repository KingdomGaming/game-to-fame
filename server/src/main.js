// Require Dependencies
import path from "path";
import express from "express";
import http from "http";
import socketIo from "socket.io";

import { PATHS } from "../../shared/main";
import Router from "./router/Router";

// Setup
const app = express();
const server = http.Server(app);
const io = socketIo(server);
const port = 3000;

app.set("port", port);
app.use(express.static(PATHS.publicRoot));

new Router(app);

// Start Server
server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});