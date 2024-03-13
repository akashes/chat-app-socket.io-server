const express = require('express')
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')     // import Server class from socket.io library
const dotenv = require('dotenv').config()

const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        // origin:process.env.ORIGIN,
        methods:["GET","POST"]
    }
})

io.on('connection',(socket)=>{
    console.log(`user connected :  ${socket.id} `);

    //joining room
    socket.on('join-room',(room)=>{
        socket.join(room)
        console.log(`user with id ${socket.id} joined room ${room}`);
    })

    //receiving and broadcasting message
    socket.on('sendMessage',(data)=>{
        // socket.to(data.room).emit('room-msg',data.message)
        socket.to(data.room).emit('receive-message',data)
        
        console.log(data);
    })


    //disconnection event
    socket.on('disconnect',()=>{
        console.log(`user disconnected : ${socket.id}`);
    })
})

server.listen(8080,()=>{
    console.log(`server started and listening in the port 8080`);
})