require("dotenv").config();
const express = require('express');
const app = express();

const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);
const path =require('path');


const debug = require('debug')("development:app.js")

app.set("view engine", "ejs");

const router = require("./routes/index");
app.use(express.static(path.join(__dirname,"public")))

let userId = {};
let socketId = [];

io.on("connection",function(socket){
    socket.on("name", function(name){
        userId[socket.id] = name;
        socketId.push(socket.id)
        io.emit("people",socketId.length)
    })
    socket.on("disconnect", function(){
        delete userId[socket.id];
        const index = socketId.indexOf(socket.id);
        if(index !== -1){
            socketId.splice(index,1);
        }
        io.emit("people", socketId.length);
    })
    socket.on("message", function(data){
        const messageData = {
            username : userId[socket.id],
            message:data
        };
        io.emit("message", messageData)
    })
})

app.use('/', router)

server.listen(process.env.PORT, ()=>{
    debug("listening on port " + process.env.PORT)
});