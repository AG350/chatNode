var express = require("express");
var app = express();

var server = require("http").Server(app);

var io = require('socket.io')(server);

app.use(express.static('client'))
app.get("/",(req,res)=>res.status(200).send("Hola mundo"));

let messages = [{
    id:1,
    text: "Bienvenido al chat",
    nickname: "Bot"
}]

io.on('connection',(socket)=>{
    console.log("El nodo: "+ socket.handshake.address +" se ha conectado...");
    socket.emit('messages',messages);
});



server.listen(6677,()=>console.log("servidor corriendo en localhost:6677"));
