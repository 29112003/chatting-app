require("dotenv").config();
const express = require('express');
const app = express();

// soketIo


const socketIo = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);



const debug = require('debug')("development:app.js")

app.set("view engine", "ejs");

const router = require("./routes/index");

app.use('/', router)

server.listen(process.env.PORT, ()=>{
    debug("listening on port " + process.env.PORT)
});