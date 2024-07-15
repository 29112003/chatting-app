require("dotenv").config();
const express = require('express');
const app = express();

// soketIo


const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);
const path =require('path');


const debug = require('debug')("development:app.js")

app.set("view engine", "ejs");

const router = require("./routes/index");
app.use(express.static(path.join(__dirname,"public")))

let userId = [];
let socketId = [];

io.on("connection",function(socket){
    socket.on("name", function(name){
        userId.push(name)
        socketId.push(socket.id)
        console.log(userId, socketId)
    })
    socket.on("disconnect", function(name){
        userId.splice(userId.indexOf(name),1)
        socketId.splice(socketId.indexOf(socket.id),1)
        console.log(userId, socketId)
    })
    socket.on("message", function(data){
        io.emit("message",data);
    })
})

app.use('/', router)

server.listen(process.env.PORT, ()=>{
    debug("listening on port " + process.env.PORT)
});