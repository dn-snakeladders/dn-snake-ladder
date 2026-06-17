const homeScreen = document.getElementById("homeScreen");
const playerScreen = document.getElementById("playerScreen");
const gameScreen = document.getElementById("gameScreen");

const board = document.getElementById("board");
const dice = document.getElementById("dice");
const statusText = document.getElementById("status");

let totalPlayers = 2;
let currentPlayer = 0;

let positions = [1,1,1,1];

const snakes = {
16:6,
47:26,
49:11,
56:53,
62:19,
64:60,
87:24,
93:73,
95:75,
98:78
};

const ladders = {
1:38,
4:14,
9:31,
21:42,
28:84,
36:44,
51:67,
71:91,
80:100
};

function showPlayers(){
homeScreen.classList.add("hidden");
playerScreen.classList.remove("hidden");
}

function startGame(players){

totalPlayers = players;

playerScreen.classList.add("hidden");
gameScreen.classList.remove("hidden");

positions = [1,1,1,1];
currentPlayer = 0;

createBoard();
renderPlayers();

statusText.innerHTML =
`Player ${currentPlayer+1} Turn`;
}

function createBoard(){

board.innerHTML = "";

for(let row=9; row>=0; row--){

let numbers=[];

for(let col=0; col<10; col++){
numbers.push(row*10+col+1);
}

if((9-row)%2===1){
numbers.reverse();
}

numbers.forEach(num=>{

const cell=document.createElement("div");

cell.className="cell";
cell.id="cell-"+num;
cell.innerHTML=num;

board.appendChild(cell);

});
}
}

function renderPlayers(){

document.querySelectorAll(
".player1,.player2,.player3,.player4"
).forEach(e=>e.remove());

for(let i=0;i<totalPlayers;i++){

let token=document.createElement("div");

token.className="player"+(i+1);

document
.getElementById(
"cell-"+positions[i]
)
.appendChild(token);

}
}

function rollDice(){

let roll =
Math.floor(Math.random()*6)+1;

dice.innerHTML =
"🎲 "+roll;

positions[currentPlayer]+=roll;

if(positions[currentPlayer] > 100){
positions[currentPlayer] = 100;
}

if(
ladders[positions[currentPlayer]]
){
positions[currentPlayer] =
ladders[positions[currentPlayer]];
}

if(
snakes[positions[currentPlayer]]
){
positions[currentPlayer] =
snakes[positions[currentPlayer]];
}

renderPlayers();

if(
positions[currentPlayer] >= 100
){

setTimeout(()=>{

alert(
`🏆 Player ${
currentPlayer+1
} Wins!`
);

location.reload();

},300);

return;
}

currentPlayer++;

if(
currentPlayer >= totalPlayers
){
currentPlayer = 0;
}

statusText.innerHTML =
`Player ${currentPlayer+1} Turn`;
}

createBoard();
