var socket = io();
socket.on('message', function(data){
  // document.getElementById("message").innerHTML = data;
});
socket.on('game',function(data){

})

function joinLobby(){
  socket.emit('eventToEmit', {name:"cody"}, function(error, message){
    console.log("Error: "+error);
    console.log("Message: "+message);
  });
}
function cont_createGame(){
  var gameName = document.getElementById("GameName").value
  var playerName = document.getElementById("PlayerName").value
  var isGameboard = document.getElementById("GameBoard").checked
  if(gameName == ''){
    document.getElementById("GameName").classList.add("error")
    // var gameNameParent =document.getElementById("GameName").parentElement
    // createElement("p","error",gameNameParent).innerHTML="Game Name cannot be blank"
  }else{
    document.getElementById("GameName").classList.remove("error")
  }
  if(!isGameboard && playerName == ''){
    document.getElementById("PlayerName").classList.add("error")
    // var gameNameParent =document.getElementById("PlayerName").parentElement
    // createElement("p","error",gameNameParent).innerHTML="Player Name cannot be blank"
  }else{
    document.getElementById("PlayerName").classList.remove("error")
  }
  if((playerName != '' || isGameboard) && gameName != ''){
    socket.emit('createLobby',{
      "gameName":gameName
      ,"playerName":playerName
      ,"isGameboard":isGameboard
      ,"gameType":"Splendor"
    },function(created,obj){
      if(created){
        //run function to create lobby divs
        //Make it look nice.
        lobbyMenu(obj)
      }else if(!created){
        var gameNameParent = document.getElementById("GameName").parentElement
        createElement("p","error",gameNameParent).innerHTML=obj.errMsg
      }
    })
  }
}

function cont_startGame(){
  socket.emit('startGame',function(started,obj){
    console.log("Started: "+started);
    console.log("msg:");
    console.log(obj);
  })
}
