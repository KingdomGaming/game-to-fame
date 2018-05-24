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

app.set("port", port);
app.use("/public", express.static(__dirname + "/public"));

// Routes
app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "index.html"));
});

// Start Server
server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});