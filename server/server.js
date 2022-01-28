const express = require("express")
const { Socket } = require("socket.io")
const app = express()
app.use(express.static(__dirname + '/views/'));
const server = require("http").createServer(app)
const io = require("socket.io")(server, {cors: {origin: "*"}})

app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

//app.use('/img', express.static(__dirname + '/Images'));

app.get("/", (req, res) => {
    res.render("chatapp")
})


server.listen(2022, () => {
    console.log("server läuft")
})


io.on("connection", (socket) => {
    console.log(socket.id)
    
    socket.on("sendMessage", (message, room) => {
       
        socket.broadcast.to(room).emit("recievedMessage", message)

    })




    socket.on("joinRoom", (room, name) => {
        socket.join(room)
        socket.broadcast.to(room).emit("userjoin", name)
    })
})