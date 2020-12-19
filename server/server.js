let players = [];
let current_turn = 0;
let timeOut;
let _turn = 0;
const MAX_WAITING = 30000;

const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 4001

const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

function next_turn(){
  _turn = current_turn++ % players.length;
  players[_turn].emit('your_turn');
  console.log("next turn triggered " , _turn);
  triggerTimeout();
}

function triggerTimeout(){
 timeOut = setTimeout(()=>{
   next_turn();
 },MAX_WAITING);
}

function resetTimeOut(){
  if(typeof timeOut === 'object'){
    console.log("timeout reset");
    clearTimeout(timeOut);
  }
}


// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('user connected')
  if(players.length == 1){
    resetTimeOut();
    next_turn();
  }
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
    if(players.length == 0){
      resetTimeOut();
    }

    players.splice(players.indexOf(socket),1);
    _turn--;
  })

  socket.on('chat message', ({name, text_chat}) => {
    io.sockets.emit('chat message', {name: name, text_chat: text_chat})
  })

  socket.on('notif chat', ({notif_text, id}) => {
    io.sockets.emit('notif chat', {notif_text: notif_text, id: id})
  })

  socket.on('typing story', ({id, name, text_story}) => {
    io.sockets.emit('typing story', {id: id, name: name, text_story: text_story})
  })

  socket.on('refresh story', data => {
    io.sockets.emit('refresh story', data)
  })

  players.push(socket);
  socket.on('pass_turn',function(){
     if(players[_turn] == socket){
        resetTimeOut();
        next_turn();
     }
  })

  socket.on('send name turn player', ({id, name}) => {
    io.sockets.emit('get name turn player', {id: id, name: name})
  })

})

server.listen(port, () => console.log(`Listening on port ${port}`))