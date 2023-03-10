var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", trex_collided);
  trex.scale = 0.6;

  ground = createSprite(200,180,400,20);
  ground.addImage("chao", groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -6;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.7;

  restart = createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale = 0.7;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  gameOver.visible = false
  restart.visible = false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();

  score = 0


}

function draw() {
  
  background(180);

  text("point " + score, 500,50);

if(gameState === PLAY){

  score = score + Math.round(getFrameRate()/60);
  ground.velocityX = -(6 + 3*score/100);


  trex.collide(invisibleGround);

  if(keyDown("space")&& trex.y >= 150){

  trex.velocityY = -12  

  }

  trex.velocityY = trex.velocityY +0.8

  if(ground.x < 0){

    ground.x = ground.width/2
  }

SpawnCloud();
spawnObstacles()

if(obstaclesGroup.isTouching(trex)){

  gameState = END;
}
 





}

else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;
  
  //defina a velocidade da cada objeto do jogo para 0
  ground.velocityX = 0;
  trex.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  
  //mude a anima????o do trex
  trex.changeAnimation("collided",trex_collided);
  
  //defina o tempo de vida dos objetos para que eles nunca sejam destru??dos
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);


  
  
}
}

function SpawnCloud(){

if( frameCount%60 === 0){

cloud = createSprite(600,120,40,10);
cloud.velocityX = -5
cloud.y = Math.round(random(80,120));
cloud.addImage(cloudImage);


}






}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //gere um obst??culo aleat??rio
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    //designe o escalonamento e tempo de vida ao obst??culo           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //adicione cada obst??culo ao grupo
    obstaclesGroup.add(obstacle);
  }
}
