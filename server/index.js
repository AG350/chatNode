const express = require("express");
const app = express();

const server = require("http").Server(app);

const io = require('socket.io')(server);

app.get("/",(req,res)=>res.status(200).send("Hola mundo"));



server.listen(6677,()=>console.log("servidor corriendo en localhost:6677"));
