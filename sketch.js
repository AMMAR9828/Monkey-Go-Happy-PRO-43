var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var banana_IMG, obstacle_IMG;
var FoodGroup, obstacleGroup;
var score=0

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_IMG = loadImage("banana.png");
  obstacle_IMG = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
}

function draw() { 
  background(0);
 
  drawSprites();

  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    player.collide(ground);
    spawnFood();
    spawnObstacle();

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 5;
      player.scale += +0.1
    }
    if(obstacleGroup.isTouching(player)){
      obstacleGroup.destroyEach();
      gameState = END;
    }
    textSize(30);
    stroke("red");
    fill("orange");
    text("Score : "+ score, 560,30)
  }else if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(50);
    stroke("black");
    fill("red")
    text("Game Over !!", 300, 220);
  }
}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(banana_IMG);
    banana.scale = 0.1;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);

  }
}
function spawnObstacle(){
  if(frameCount % 95 === 0){
    var stone = createSprite(600, 165, 40,20);
    stone.y = random(350,350);
    stone.addImage(obstacle_IMG);
    stone.scale = 0.2;
    stone.velocityX = -6;
    stone.lifetime = 300;
    player.depth = stone.depth +1;
    obstacleGroup.add(stone);
  }
}
