const http = require("http");
const WebSocketServer = require("websocket").server;
const httpServer = http.createServer();
const websocketServer = new WebSocketServer({"httpServer": httpServer});

let connection = null;
// node index.js PORT
const PORT = process.argv[2] || 8080;

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`))

websocketServer.on("request", request => {
    // accept the request to upgrade
    // null -> accepts everything
    // request.origin -> anyone can send us requests
    connection = request.accept(null, request.origin);

    // if i receive a message, do this
    connection.on("message", data => {
        console.log(`Hey I received a message ${data.utf8Data}`);
        connection.send(`Hey Client! Received your message. ${data.utf8Data} on ${PORT}`)
    })
})