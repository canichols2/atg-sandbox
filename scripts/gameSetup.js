//                  0       1       2           3           4           5
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
}

function createGameboard() {
    var hero = document.querySelector(".hero")
        , body = document.querySelector("body")
        , playarea = createElement("div", "playarea")
        , decks = createElement("div", "decks")
        , inPlay = createElement("div", "inPlay")
        , tokens = createElement("div", "tokens")
    playarea.appendChild(decks)
    playarea.appendChild(inPlay)
    playarea.appendChild(tokens)
    hero.appendChild(playarea)
        //Create the inPlay anchors
    for (var i = 0; i < 3; i++) {
        var IPDiv = createElement("div", "row")
        for (var j = 0; j < 4; j++) {
            GAME_DATA.anchor.inPlay[i].push(IPDiv.appendChild(createElement("div")))
        }
        inPlay.appendChild(IPDiv)
    }
    //Create the Deck anchors
    for (var i = 0; i < 3; i++) {
        GAME_DATA.anchor.deck.push(decks.appendChild(createElement("div", "deck")))
        GAME_DATA.anchor.deck[i].innerHTML = "Deck" + i
    }
    //    Temporary Code just to get player locations
//    GAME_DATA.player = []
    GAME_DATA.anchor.player.push(document.getElementById("nichols"))
    GAME_DATA.anchor.player.push(document.getElementById("andrew"))
    GAME_DATA.anchor.player.push(document.getElementById("cody"))
    GAME_DATA.anchor.player.push(document.getElementById("trevor"))
        //    Create Cards in the decks
        //    Add them to the DOM
    for (d in GAME_DATA.deck) {
        var deck = GAME_DATA.deck[d]
        for (c in deck) {
            var thisCard = deck[c];
            thisCard.inDeck = true
            thisCard.inPlay = false
            var container = createElement("div", "cardContainer")
            GAME_DATA.cardsInDeck[d][c] = container
            container.card = createCard(thisCard, GAME_DATA.cardsInDeck[d][c])
            container.onclick = cardOnClick(thisCard, container)
            body.appendChild(GAME_DATA.cardsInDeck[d][c])
            moveDiv(GAME_DATA.cardsInDeck[d][c], GAME_DATA.anchor.deck[d])
        }
    }
    //    
    //    GAME_DATA.cardContainer=createElement("div","cardContainer")
    //    GAME_DATA.card = createCard(aCard,GAME_DATA.cardContainer);
    //    body.appendChild(GAME_DATA.cardContainer)
}
// A separate function for onclick because scope doesn't reset in the forloop.
// I don't totally understand this one, but...
function cardOnClick(thisCard, container) {
    return function () {
        console.log("card Clicked")
        console.log(thisCard)
        if (thisCard.inDeck) {
            thisCard.inDeck = false;
            thisCard.inPlay = true;
            var deckIndex=thisCard.deck -1
            , cardIndex = GAME_DATA.cardsInDeck[deckIndex].indexOf(container)
//            console.log("deckIndex: "+deckIndex)
//            console.log("CardIndex: "+cardIndex)
            var removedCard = GAME_DATA.cardsInDeck[deckIndex].splice(cardIndex, 1)
//            console.log("Removed Card: ")
//            console.log(removedCard)
            GAME_DATA.cardsInPlay[deckIndex].push(removedCard[0])
        }
        else if (thisCard.inPlay) {
            console.log("In Play Card Clicked")
            console.log(thisCard)
            thisCard.inDeck=false
            thisCard.inPlay=false
            var deckIndex=thisCard.deck -1
            , cardIndex = GAME_DATA.cardsInPlay[deckIndex].indexOf(container)
//            Need to get Player index...
            var player = 0
            var removedCard = GAME_DATA.cardsInPlay[deckIndex].splice(cardIndex, 1)
            GAME_DATA.cardsInPlayer[player].push(removedCard[0])
        }
        updateCardLocations()
    }
}

function updateCardLocations() {
    //Move inPlay
    for (var d in ["anything","Goes","Here"]){
        for (var i in GAME_DATA.cardsInPlay[d]){
            var a=i;
            if(i < 4) {
                moveDiv(GAME_DATA.cardsInPlay[d][i],GAME_DATA.anchor.inPlay[d][a])
            }else{
                moveDiv(GAME_DATA.cardsInPlay[d][i],GAME_DATA.anchor.inPlay[d][3])
            }
            
        }
    }
    //Move Player Anchors
        //For each of ammount of players. 
        //Should still be able to be 4,
            //since nothing will be put into players hands who don't exist.
    for (var p in [1,2,3,4]){
        for (var i in GAME_DATA.cardsInPlayer[p]){
            moveDiv(GAME_DATA.cardsInPlayer[p][i],GAME_DATA.anchor.player[p])
        }
    }
}








function createElement() {
    var newElement = document.createElement(arguments[0])
    for (var i = 1; i < arguments.length; i++) {
        newElement.classList.add(arguments[i])
    }
    return newElement;
}
/*      Normal Create Card Function... I need a card object....   */
function createCard(card, div) {
    var cardDiv = document.createElement("card");
    cardDiv.onclick = function () {
        //        socket.emit('cardClicked', card);
    };
    /*cardDiv.addEventListener("click", this.myFunction);
    this.myfunction = function() {
        //put the code here
    };*/
    var points = document.createElement("points"); {
        var innerDiv1 = document.createElement("div");
        var innerDiv2 = document.createElement("div");
        //        if (card.points != 0){
        innerDiv2.innerHTML = card.points;
        //        };
        innerDiv1.appendChild(innerDiv2);
        points.appendChild(innerDiv1)
    }
    //Switch statement pick backgroundImg
    var gem = document.createElement("gem");
    var gemDiv = document.createElement("div");
    gem.appendChild(gemDiv);
    var background;
    switch (card.gemColor) {
    case 0:
    case '0':
        background = img_create("./images/bg_red.png");
        gemDiv.appendChild(img_create("./images/red.png"));
        break;
    case 1:
    case '1':
        background = img_create("./images/bg_blue2.png");
        gemDiv.appendChild(img_create("./images/blue.png"));
        break;
    case 2:
    case '2':
        background = img_create("./images/bg_brown.png");
        gemDiv.appendChild(img_create("./images/brown.png"));
        break;
    case 3:
    case '3':
        background = img_create("./images/bg_green.png");
        gemDiv.appendChild(img_create("./images/green.png"));
        break;
    case 4:
    case '4':
        background = img_create("./images/bg_white.png");
        gemDiv.appendChild(img_create("./images/white.png"));
        break;
    case 5:
    case '5':
        background = img_create("./images/bg_yellow.png");
        gemDiv.appendChild(img_create("./images/yellow.png"));
        break;
    }
    var cost = document.createElement("cost");
    cardDiv.appendChild(points);
    cardDiv.appendChild(cost);
    cardDiv.id = card.id + "CardID";
    for (var colors in card.cost) {
        if (card.cost[colors] > 0) {
            var costColorDiv = document.createElement(colorName[colors]);
            var colorIcon = document.createElement("div");
            var colorImg = img_create("./images/" + colorName[colors] + ".png");
            colorIcon.appendChild(colorImg)
            costColorDiv.appendChild(colorIcon)
            var costNumDivInner = document.createElement("div")
            var costNumDivOuter = document.createElement("div")
            costNumDivInner.innerHTML = card.cost[colors]
            costNumDivOuter.appendChild(costNumDivInner)
            costColorDiv.appendChild(costNumDivOuter)
            cost.appendChild(costColorDiv);
        }
    }
    cardDiv.appendChild(background);
    cardDiv.appendChild(gem);
    div.appendChild(cardDiv)
    return cardDiv
}

function img_create(src, alt, title) {
    var img = document.createElement('img');
    img.src = src;
    if (alt != null) img.alt = alt;
    if (title != null) img.title = title;
    return img;
}