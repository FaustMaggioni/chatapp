const express = require('express')
const socketio = require("socket.io");
const http = require('http');
const router = require('./router')
const cors = require('cors');
const PORT = process.env.PORT || 8080
const {addUser,removeUser,getUser,getUsersInRoom} = require('./users.js')
const app = express()
app.use(cors())

let i = 0

const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
      },
})
io.on('connect', (socket) => { //todo el codigo aca, manejando ese especifico socket q se conectó
    socket.on('join', ({nombre,cuarto},callback) => {
        console.log('join')
        const {error,user} = addUser({id: socket.id, nombre, cuarto})
        console.log(user)
        if(error){
            console.log(error)
            return callback(error)
        }
        socket.join(user.room)
        console.log(user)
        socket.emit('message', {user: 'Admin', text:`${user.name} welcome to the room ${user.room}`})
        socket.broadcast.to(user.room.emit('message', {user: 'admin', text: `${user.name} has joined the room`})) // envia un mensaje a todos menos al q lo emite
        
        callback()

    })
 // on recibe, emit emite xd
    socket.on('sendMessage', (message,callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('message', {user: user.name, text: message})

        callback()
    })

    socket.on('disconnect', () => {
        console.log('bye')
    })
})

app.use(router)
server.listen(PORT, () => console.log('server io running'))