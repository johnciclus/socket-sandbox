(function () {
    const express = require("express");
    const app = express();
    const server = require("http").createServer(app);
    const io = require("socket.io")(server);
    const engines = require("consolidate");
    const routes = require("./server/routes.js");
    const AppPort = 3000;

    app.use(express.static(__dirname + "/public"));
    app.engine("html", engines.ejs);
    app.set("view engine", "ejs");

    io.on("connection", function (socket) {
        process.stdout.write("\n Socket stared\n");
        socket.broadcast.emit('user connected', 'new user connected');
        socket.join('room');

        socket.on("value", function(value){

            var reverse_message = value.message.split("").reverse().join("");
            console.log(reverse_message);
            io.to('room').emit("reverseValue", {"value": reverse_message})
        });

        socket.once("disconnect", function () {
            process.stdout.write("\n Socket disconnected");
        });
    });

    routes(app);

    server.listen(AppPort, function () {
        process.stdout.write(["Server running on port: " + AppPort].join(" "));
    });
}());