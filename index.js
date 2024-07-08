var menu_btn = document.getElementsByClassName("menu_btn");
var game_tab = document.getElementById("game");
var game_tab2 = document.getElementsByTagName("body");
const input = document.querySelector('#answer');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
let wordDisplay = document.querySelector('.q');
let words = [];

let score = 0;
let isPlaying = false;
const GAME_TIME = 7;
let currentTime;


function showWord() {
    wordDisplay.innerText = words[Math.floor(Math.random() * words.length)];
}

for(var i=0;i<menu_btn.length;i++){
    menu_btn[i].addEventListener("click",change_menu_value);
}

fetch('https://random-word-api.herokuapp.com/word?number=100').then((res) => {
  res.json().then((data) => {
    data.forEach((word) => {
      words.push(word);
    });
  });
});

wordDisplay.addEventListener('click',setGame);

function setGame(){
    if(!isPlaying){
        currentTime = GAME_TIME;
        score=0;
        isPlaying = true;
        showWord();
        remaining();
        isPlayingGame();
        isEndingG();
    }
    
}

function startGame(){
    console.log("start Game");
}

var rem
function remaining(){
    rem = setInterval(remainingTime,1000);
}
function remainingTime() {
    wordMatch();
    timeDisplay.innerText = currentTime;
    timeDisplay.innerText > 0 ? currentTime-- : false;
}
var end;
function isEndingG(){
    end = setInterval(isEndingGame,100);
}   
function isEndingGame(){
    if((currentTime==0||score==10)){
        endGame();
    }
}
function isPlayingGame() {
    if (isPlaying) {
        input.focus();
    }
}
function wordMatch() {
    input.addEventListener('input', () => {
        if (isPlaying) {
            if (wordDisplay.innerText.toLowerCase() === input.value.toLowerCase()) {
                score += 1;
                scoreDisplay.innerText = score;
                input.value = '';
                currentTime += GAME_TIME;
                showWord();
            }
        }
    });
}
function endGame(){
    isPlaying=false;
    var res = (score*10)+(currentTime*2);
    wordDisplay.innerText = "Restart?\n"+"Score : "+res;
    remainingTime();
    clearInterval(end);
    clearInterval(rem);
    wordDisplay.addEventListener('click',setGame);
}