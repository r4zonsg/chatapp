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


server.listen(3003, () => {
    console.log("server läuft")
})

var sendname = ""
io.on("connection", (socket) => {
    console.log(socket.id)
    
    socket.on("sendMessage", (message, room, name) => {
        sendname = name;
        socket.broadcast.to(room).emit("recievedMessage", message, sendname)

    })




    socket.on("joinRoom", (room, name) => {
        sendname = name;
        socket.join(room)
        socket.broadcast.to(room).emit("userjoin", name)
    })
})