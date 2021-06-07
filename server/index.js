const express = require('express')
const socketio = require("socket.io");
const http = require('http');
const router = require('./router')
const cors = require('cors');
const PORT = process.env.PORT || 8080

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
    console.log("new user: ",i++)

    socket.on('join', ({nombre,cuarto},callback) => {
        console.log(nombre,cuarto)
       
    })

    socket.on('disconnect', () => {
        console.log('bye')
    })
})

app.use(router)
server.listen(PORT, () => console.log('server io running'))