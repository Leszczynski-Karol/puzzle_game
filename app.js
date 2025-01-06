//pobranie wszystkich elementow
var gameBoard = document.querySelector("#gameBoard");
var tiles = document.querySelectorAll(".title");
var resetButton = document.querySelector('button');


//stworznie tablicy elementow
var gameState = [
    [tiles[0], tiles[1], tiles[2]],
    [tiles[3], tiles[4], tiles[5]],
    [tiles[6], tiles[7], tiles[8]],
];

//zmienne 
var tileSize = 200;
var winState = [];
var inGame = false;

function render(board, state) {
    state.forEach(function(row, rowIndex) {
        row.forEach(function(item, itemIndex) {
            item.style.top = tileSize * rowIndex + 'px';
            item.style.left = tileSize * itemIndex + 'px';
            board.appendChild(item);
            if(item.innerText != "" && item.style.backgroundImage ==='') {
                item.style.backgroundImage = "url('image.jpg')";
                item.style.backgroundSize = "600px 600px";
                item.style.backgroundPosition = (-tileSize * itemIndex) + "px " + (-tileSize * rowIndex) + "px";
            }
        });
    });
}
gameBoard.addEventListener('click', function(e) {
     var target = e.target;
     var x, y, xEmpty, yEmpty;
     gameState.forEach(function(row, rowIndex) {
        row.forEach(function(item, itemIndex) {
            if(item === target) {
                x = itemIndex;
                y = rowIndex;
            }
            if(item.innerText == "") {
                xEmpty = itemIndex;
                yEmpty = rowIndex;
            }
        });
     });
     if((x == xEmpty && (y+1 == yEmpty|| y-1 == yEmpty)
     ||
     y == yEmpty && (x+1 == xEmpty || x-1 == xEmpty)) && inGame)
     {
        var temp = gameState[y][x];
        gameState[y][x] = gameState[yEmpty][xEmpty];
        gameState[yEmpty][xEmpty] = temp;

        var tempTop = gameState[y][x].style.top;
        var tempLeft = gameState[y][x].style.left;
        gameState[y][x].style.top = gameState[yEmpty][xEmpty].style.top;
        gameState[y][x].style.left = gameState[yEmpty][xEmpty].style.left;
        gameState[yEmpty][xEmpty].style.top = tempTop;
        gameState[yEmpty][xEmpty].style.left = tempLeft;
     }
});

function randomize() {
    var newOrder = [];
    newOrder.push(Math.floor(Math.random() * 9));
    while(newOrder.length < 9) {
        var rand = Math.floor(Math.random() * 9);
        if(!newOrder.includes(rand))
        newOrder.push(rand);
    }
    gameState = [
        [tiles[newOrder[0]],tiles[newOrder[1]],tiles[newOrder[2]]],
        [tiles[newOrder[3]],tiles[newOrder[4]],tiles[newOrder[5]]],
        [tiles[newOrder[6]],tiles[newOrder[7]],tiles[newOrder[8]]]
    ];
    render(gameBoard, gameState);
    inGame = true;
}

render(gameBoard, gameState);
winState = gameState;
setTimeout(randomize, 3000);