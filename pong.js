function draw() {
  background (0);
  showBall ();
  motionBall ();
  crashEdgeBall ();
  showRacket (xRacket, yRacket);
  racketMotion ();
  racketLimit ();
  crashRacketBall ();
  showRacket (xOpponentRacket, yOpponentRacket);
  opponentRacketMotion ();
  crashRacketOpponentBall (); 
  showScoreboard ();
  score ();
  rematch ();
  endgame ();
}

function setup() {
  createCanvas(600, 400);
  track.loop();
}

//Sounds variables and functions 
let track
let scoreSound 
let racketClash

function preload () {
  track = loadSound ("track.mp3");
  scoreSound = loadSound ("scoreSound.mp3"); 
  racketClash = loadSound ("racketClash.mp3");
}

//Ball variables
let xBall = 300
let yBall = 200
let d = 13
let r = d / 2
let vXball = 6
let vYball = 6

//Ball functions
function showBall () {
circle (xBall, yBall, d)
}

function motionBall () {
 xBall += vXball;
 yBall += vYball; 
} 

function crashEdgeBall () {
  if (xBall + r > width || xBall - r < 0) {
      vXball *= -1;
      }
  if (yBall + r > height || yBall - r < 0) {
    vYball *= -1;
  }
}

//Racket variables 
let xRacket = 5 
let yRacket = 150
let widthRacket = 10
let heightRacket = 90

//Racket functions
function showRacket (x, y) {
  rect (x, y, widthRacket, heightRacket)
}

function racketMotion () {
  if (keyIsDown(UP_ARROW)) {
    yRacket -= 10;
  } 
  if (keyIsDown(DOWN_ARROW)) {
    yRacket += 10;
  }
}

function racketLimit () {
  if (yRacket + heightRacket > height) {
    yRacket -= 10
  } else if (yRacket < 0) {
    yRacket += 10
  }
}

function crashRacketBall () {
  if (yBall < yRacket + heightRacket + r && yBall > yRacket - r && xBall - r < xRacket + widthRacket) { 
  vXball *= -1;
  racketClash.play();
  }
} 
//Main Opponent Racket variables 

let xOpponentRacket = 585
let yOpponentRacket = 150
let vYopponent 
  
//Opponent Functions

let opponentRacketDirection = 1;

function opponentRacketMotion(){
  const averageYball = yBall + r;
  const averageYopponentRacket = yOpponentRacket + (heightRacket/2);
  if (averageYball > averageYopponentRacket) {
    opponentRacketDirection = 1;
  } else {
    opponentRacketDirection = -1;
  }
  yOpponentRacket += 6 * random(0.6, 0.95) * opponentRacketDirection;
}

function crashRacketOpponentBall () {
  if (yBall < yOpponentRacket + heightRacket + r && yBall > yOpponentRacket - r && xBall + r > xOpponentRacket) { 
  vXball *= -1;
  racketClash.play();
  }
} 

//Scoreboard/Score
let myScore = 0
let opponentScore = 0

function showScoreboard () {
 stroke(255);
 textAlign(CENTER);
 textSize(16);
 fill(color(32,178,170)); //RGB code blue 
 rect(150, 10, 40, 20); 
 fill(color(178, 34, 34)); //RGB code red
 rect(450, 10, 40 ,20);
 fill(255); 
 text(myScore, 170, 26);
 fill(255); 
 text(opponentScore, 470, 26);
}

function score () {
  if (xBall - r < 0) {
   opponentScore += 1;
   scoreSound.play(); 
  } 
  if (xBall + r > 600) {
   myScore += 1;
   scoreSound.play();
  }
} 

//Rematch setting
function rematch () {
 if (xBall - r < 0 || xBall + r > 600) {
   xBall = 300;
   yBall = 200; 
 let i = random (0, 1)  
    if (i < 0.25) {
     vXball = -6;
     vYball = -6;
    } else if (i > 0.25 && i < 0.5) {
       vXball = -6;
       vYball = 6;
      } else if (i > 0.5 && i < 0.75) {   
          vXball = 6;
          vYball = -6; 
        } else {
           vXball = 6;
           vYball = 6; 
          } 
  }
}

//Endgame 
function endgame() {
  if (myScore == 15 || opponentScore == 15) {
    myScore = 0;
    opponentScore = 0;
  } 
}
