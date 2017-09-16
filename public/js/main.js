var socket = io();


function send(message){
    return socket.emit("value", {"message": message});
}

socket.on("reverseValue", function(value){
    console.log(value);
});