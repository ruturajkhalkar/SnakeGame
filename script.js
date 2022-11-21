let inputDir  = {x: 0, y: 0};
const foodSound = new Audio('food.mp3'); 
const gameOverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const musicSound = new Audio("music.mp3");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let sneckArray = [
   {x:13,y:15}
];
food = {x:6,y:7};
//game logic 
function main(ctime){
 window.requestAnimationFrame(main);
 if((ctime-lastPaintTime)/1000 < 1/speed){
    return;
 }
 //console.log(ctime)
 lastPaintTime = ctime;
 gameEngine();

}
//display the sneck
function isCollide(snake){
   //if you bump yourself
   for (let i = 1; i < sneckArray.length; i++) {
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
          return true;
      }
  }
   //if  you bump to wall
   if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
      return true;
  }
      
  return false;
}

function gameEngine(){
   //part 1- updating sneke Array & food
   if(isCollide(sneckArray)){
      gameOverSound.play();
      musicSound.pause();
      inputDir = {x: 0, y: 0};
      alert("Game Over.Press Any Key to play again!");
      sneckArray=[{x: 13, y:15}];
      musicSound.play();
      score= 0;
   }

   // if you have eaten the food increament score and 
   //regenerate the food
   if(sneckArray[0].y===food.y && sneckArray[0].x===food.x){
      foodSound.play();
      score += 1;
      scoreBox.innerHTML = "Score " + score;
      sneckArray.unshift({x: sneckArray[0].x + inputDir.x, y:sneckArray[0].y + inputDir.y})
       let a = 2;
       let b = 16;
      food =  {x:Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
      
   }
   //moving the sneck
   for(let i =sneckArray.length-2;i>=0;i--){
       sneckArray[i+1] = {...sneckArray[i]};
   }
   sneckArray[0].x += inputDir.x;
   sneckArray[0].y += inputDir.y;
   //part 2: Display the snake and food 
   //Display the snake 
 board.innerHTML = "";
 sneckArray.forEach((e,index)=>{
  sneckElement = document.createElement('div');
   sneckElement.style.gridRowStart = e.y;
   sneckElement.style.gridColumnStart = e.x;
    //sneckElement.classList.add('sneck');
   
    if(index===0){
      sneckElement.classList.add('head');
    }
    else{
      sneckElement.classList.add('sneck');
    }
    board.appendChild(sneckElement)
 
 });
 //display the food
 FoodElement = document.createElement('div');
 FoodElement.style.gridRowStart = food.y;
 FoodElement.style.gridColumnStart = food.x;
 FoodElement.classList.add('food');
    board.appendChild(FoodElement)
}

//main logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
 inputDir = {x:0 ,y:1}
 moveSound.play();
 switch(e.key){
 case "ArrowUp":
    //   console.log('AarroeUp')
       inputDir.x=0;
       inputDir.y=-1;
       break;

   case "ArrowDown":
      inputDir.x=0;
      inputDir.y=1;
      //console.log('AarrowDown')
      break;

   case "ArrowLeft":
      inputDir.x=-1;
      inputDir.y=0;
       //console.log('ArrowLeft')
       break;

   case "ArrowRight":
      inputDir.x=1;
      inputDir.y=0;
      //console.log('AarroRight')
      break;
    default:
         break;
 }
});