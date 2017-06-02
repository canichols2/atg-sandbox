var app = require('express')();
var express = require('express')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var GAME_DATA={}

app.use(express.static('public'))

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected ');

  socket.on('disconnect', function () {
    console.log('A user disconnected');
    //Run some "remove from lobby/game" command
    lobbyLeave(socket)
  });
  socket.on('joinLobby',function(data,callback){
    if(typeof(GAME_DATA[data.gameName]) != 'undefined'){
      if(!data.isGameboard){
        GAME_DATA[data.gameName].players.push(data.playerName)
      }
    }
  })
  socket.on('createLobby',function(data,callback){
    console.log(data);
    if(typeof(GAME_DATA[data.gameName]) == 'undefined'){
      //create lobby
      GAME_DATA[data.gameName]={}
      GAME_DATA[data.gameName].gameName=data.gameName
      GAME_DATA[data.gameName].players=[]
      if(!data.isGameboard){
        GAME_DATA[data.gameName].players.push(data.playerName)
        socket.playerName=data.playerName
      }
      callback(true,GAME_DATA[data.gameName])
      GAME_DATA[data.gameName].sockets=[]
      GAME_DATA[data.gameName].sockets.push(socket)
      socket.lobby=data.gameName
    }else{
      callback(false,{errMsg:"Game Name already in use"})
    }
  })
  socket.on('reconnect',function(data){
    //Attempt to join player back into lobby/game
    console.log("Reconnected")
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});









////////Player methods///////
/////////////////////////////
function lobbyLeave(socket){
  //remove player from other lobbies.
  if(typeof(socket.lobby) != 'undefined' && typeof(GAME_DATA[socket.lobby]!= 'undefined')){
    var index = GAME_DATA[socket.lobby].sockets.indexOf(socket)
    if(index > -1){
      GAME_DATA[socket.lobby].sockets.splice(index,1)
    }
    if(typeof(socket.playerName) != 'undefined'
      && socket.playerName != null
      && socket.playerName != ''){
      var pIndex = GAME_DATA[socket.lobby].players.indexOf(socket.playerName)
      GAME_DATA[socket.lobby].players.splice(pIndex,1)
    }
    if(GAME_DATA[socket.lobby].sockets.length < 1){
      delete GAME_DATA[socket.lobby];
      console.log("removed game "+socket.lobby);
    }
  }
}
function lobbyJoin(socket,lobby){
    //Join Lobby
    if(typeof(GAME_DATA[lobby]) != 'undefined'){
      GAME_DATA[lobby].sockets.push(socket);

    }



}
function lobbyAddPlayer(lobby,playerName,socket){

  /////////////
  lobbyJoin(socket,lobby);
  /////////////
}
///helperFuncitons////
//////////////////////
function getPlayersInLobby(lobby){
  var playerCount=0
  if(typeof(GAME_DATA[lobby]!=undefined)){
    //Join Lobby
    for(player in GAME_DATA[lobby].sockets){
      if (GAME_DATA[lobby].sockets[player].isPlayer){
        playerCount++;
      }
    }
  }
  return playerCount;
}
