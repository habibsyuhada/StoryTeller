var list_player = [];
var list_player_wait = [];
var list_player_name = [];
var turn_player = "";
var play = 0;
var playing = 0;

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

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')
  list_player.push(socket.id);
  list_player_wait.push(socket.id);
  io.sockets.emit('num player', {num: list_player.length})

  // var clients = io.sockets.clients();
  // var clientdata = clients.connected
  // console.log(Object.keys(clientdata));
  // Object.keys(clientdata).map(function(objectKey, index) {
  //   var value = clientdata[objectKey];
  //   console.log(value.id);
  // });
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
    io.sockets.emit('notif chat', {notif_text: (list_player_name[socket.id] ? list_player_name[socket.id] : "New Player") + " Left The Game", id: "System"})
    list_player.splice(list_player.indexOf(socket.id), 1);
    list_player_wait.splice(list_player_wait.indexOf(socket.id), 1);
    list_player_name.splice(list_player_wait.indexOf(socket.id), 1);
    if(list_player.length < 2){
      play = 0;
    }
    io.sockets.emit('num player', {num: list_player.length})
  })

  socket.on('set name player', ({name}) => {
    list_player_name[socket.id] = name;
  })

  socket.on('start game', ({name}) => {
    if(list_player.length > 1){
      play = 1;
      if(playing == 0){
        var num_player = Math.floor(Math.random() * list_player_wait.length)
        if(num_player > -1){
          turn_player = list_player_wait[num_player];
          io.sockets.emit('set turn player', {player: turn_player, playername: list_player_name[turn_player]})
        }
      }
    }
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
    list_player_wait.splice(list_player_wait.indexOf(data), 1);
    if(play == 1){
      if(list_player_wait.length < 1){
        list_player_wait = list_player;
      }
      var num_player = Math.floor(Math.random() * list_player_wait.length)
      if(num_player > -1){
        turn_player = list_player_wait[num_player];
        io.sockets.emit('find name turn player', {player: turn_player})
      }
    }
    else{
      playing = 0;
    }
  })

})

server.listen(port, () => console.log(`Listening on port ${port}`))