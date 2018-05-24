// Require Dependencies
const path = require("path");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Setup
const app = express();
const server = http.Server(app);
const io = socketIo(server);
const port = 3000;

const publicDirectory = path.resolve("public");
const serverDirectory = path.resolve("server");
const sharedDirectory = path.resolve("shared");

app.set("port", port);
app.use(express.static(publicDirectory));

// Routes
app.get("/", (request, response) => {
    response.sendFile(path.join(publicDirectory, "index.html"));
});

// Start Server
server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});