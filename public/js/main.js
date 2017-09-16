var socket = io("http://localhost:3000");

socket.on('connect', function () {
    console.log("connected");
    send("Connected from client");
});

function send(message){
    return socket.emit("value", {"message": message});
}

socket.on("reverseValue", function(value){
    console.log(value);
});

socket.on("user connected", function(value){
    console.log(value);
});