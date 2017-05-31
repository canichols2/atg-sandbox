var socket = io();
socket.on('message', function(data){
  document.getElementById("message").innerHTML = data;
});
function button21(){
  socket.emit('toall','This message is from a single client.')
}
function button1(){
  socket.emit('toallingroup','This message is from a single client to their group.')
}
function joinLobby(data){
  socket.emit('joinLobby',{lobby:data})
  document.getElementById("content").innerHTML = data;
}
function joinLobby(){
  socket.emit('eventToEmit', {name:"cody"}, function(error, message){
    console.log("Error: "+error);
    console.log("Message: "+message);
  });
}
