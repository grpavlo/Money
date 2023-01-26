const express = require('express')
const app = express()
const server = require("http").createServer(app)
const userRouter = require('./routes/user.routes')
const io = require("socket.io")(server,{
    cors: {
        origin: "*"
    }
})

const PORT  = 3001
app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
})

app.use('/api', userRouter)

io.on("connection", (socket)=>{
    console.log(`Client ${socket.id} connected`)

    socket.on("disconnect", () =>{
        console.log(`Client ${socket.id} disconnect`)
    })
})


server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})