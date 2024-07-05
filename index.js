var menu = "korean";
var menu_btn = document.getElementsByClassName("menu_btn");
var game_tab = document.getElementById("game");
var game_tab2 = document.getElementsByTagName("body");
change_menu_tab();

const input = document.querySelector('#answer');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
let wordDisplay = document.querySelector('.q');
let words = [];

let score = 0;
let isPlaying = false;
const GAME_TIME = 9;
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
function change_menu_value(){
    menu=this.value;
    console.log(menu);
    change_menu_tab();
}

function change_menu_tab(){
    if(menu=="korean"){
        document.body.style.backgroundColor="#FFD6A5";
    }else if(menu=="english"){
        document.body.style.backgroundColor="#FDFFB6";
    }
}

var ans="Start!";

function getEnter(e){
    if(e.keyCode==13){
        if(document.getElementById("answer").value==ans){
            if(ans=="Start!"){
                currentTime = GAME_TIME;
                isPlaying = true;
                showWord();
                remainingTime();
                isPlayingGame();
            }
        }
        document.getElementById("answer").value="";
    }
}

function startGame(){
    console.log("start Game");
}




function remainingTime() {
    setInterval(() => {
        wordMatch(); // 정답이 맞는지 계속 확인
  
        timeDisplay.innerText = currentTime;
        timeDisplay.innerText > 0 ? currentTime-- : false;
    }, 1000);
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
          currentTime = GAME_TIME;
          showWord();
        }
      }
    });
  }