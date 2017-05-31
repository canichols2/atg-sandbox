window.onload = function(){
  GAME_DATA.elem.body=document.querySelector("body")
  clearPage();
  createMainMenu();
}
//                  0       1       2          3       4           5
var colorName = ["Red", "Blue", "Brown", "Green", "White", "Purple"];
var aCard = {
    "cost": [0, 1, 1, 1, 2]
    , "points": 0
    , "gemColor": 0
    , "deck": 1
    , "id": 103
}
var GAME_DATA = {
    anchor: {
          deck: []
        , inPlay: [[], [], []]
        , token: []
        , player: []
    }
    , cardsInPlay: [[], [], []]
    , cardsInDeck: [[], [], []]
    , cardsInPlayer: [[],[],[],[]]
    , deck: []
    , elem:{
      body:{}
      , hero:{}
      , right:{}
    }
}
