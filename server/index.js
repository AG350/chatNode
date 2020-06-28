// crear el server
var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);

//indicar los archivos que se ultilizaran para la vista
app.use(express.static('client'));

//app.get("/",(req,res)=>res.status(200).send("Hola mundo"));

// crear el array donde se almacenan los mjes mientras corra el servicio
let messages = [{
    id:1,
    text: "Bienvenido al chat",
    nickname: "Bot"
}]

//logica de comunicacion, se detecta los dispositivos, se envian los archivos actuales
//y se reciben los nuevos
io.on('connection',(socket)=>{
    //informar el dispositivo
    console.log("El nodo: "+ socket.handshake.address +" se ha conectado...");
    //enviar los mjes existentes
    socket.emit('messages',messages);
    // recibir los nuevos mjes
    socket.on('add-message',(data)=>{
        //almacenar en el array los nuevos mjes
        messages.push(data);
        //enviar al resto de los participantes los nuevos mjes
        io.sockets.emit('messages', messages);
    });
});


// escucha activa del servidor
server.listen(6677,()=>console.log("servidor corriendo en localhost:6677"));
