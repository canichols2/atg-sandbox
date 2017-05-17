var socket = io();
var signDiv = document.getElementById('signDiv');
var signDivUsername = document.getElementsByName('username');
var signDivSignIn = document.getElementsByTagName('input');
var startGameDiv = document.getElementById('startGameButton');

signDivSignIn[1].onclick = function () {
    event.preventDefault();
    socket.emit('signIn', signDivUsername[0].value);
    // createPlayer(signDivUsername[0].value, 0);
};

socket.on('signInResponse', function () {
    signDiv.style.display = 'none';
    startGameDiv.style.display = 'inline'
});

socket.on('gameData', function (game) {
    // ******************** CARDS IN PLAY ************************
    for (var i in game.inPlay) {
        console.log("Loop :" + i);
        console.log(game.inPlay[i]);
        createCard(game.inPlay[i], document.querySelector("playArea").children[game.inPlay[i].deck - 1].children[i % 4]);
    }
    // ******************PLAYER NAMES ****************************
//    createPlayer(game.playerList[this.socket.id], 0);
    var index = 1;
    for (var playerObj in game.playerList) {
        if (game.playerList[playerObj] != null) {
            if (playerObj.name != signDivUsername[0].value) {
                if (index < 4) {
                    createPlayer(game.playerList[playerObj], index++)
                }
            }
            else {
                createPlayer(game.playerList[playerObj], 0)
            }
        }
    }
    // ******************** TOKENS IN PILE ************************
    for (var tokenPile in game.token) {
        tokenCount[tokenPile].innerHTML = game.token[tokenPile];
    }
//    updatePlayers();
});

socket.on('cLog' , function (myString) {
    console.log(myString);
});

socket.on('removeCard', function (cardID) {
    var oldCard = document.getElementById(cardID + "CardID");
    oldCard.parentNode.removeChild(oldCard);
});

socket.on('createCard', function (card) {
    var index = getEmptyCardSlot(document.querySelector("playArea").children[card.deck - 1]);
    createCard(card, document.querySelector("playArea").children[card.deck - 1].children[index]);
});

socket.on('startGameReceived', function () {
    startGameDiv.style.display = 'none';
});

socket.on('updateToken', function (color, count) {
    tokenCount[color].innerHTML = count;
});

socket.on('lobbyUpdate', function (playersArray){
    console.log("lobby Players: ");
    for (var playerName in playersArray) {
        console.log(playersArray[playerName]);
    }
    updateLobby(playersArray);
});