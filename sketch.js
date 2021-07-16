var tower,towerImg;

var door,doorImg,doorsGroup;

var climber,climberImg,climbersGroup;

var ghost,ghostImg;

var invisibleBlock,invisibleBlocksGroup;

var gameState = "play";

var spookySound;

function preload(){  
  towerImg = loadImage("tower.png");
  
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  doorsGroup = new Group();  
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(300,300,20,20);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  spookySound.loop();
  
}

function draw(){
  background(0);
  
  if(gameState === "play"){    
    if(tower.y > 600){
    tower.y = tower.width/2 ;   
    }

    spawnDoors();

    if(keyDown("left_arrow")){
      ghost.x = ghost.x -2;
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x +2;
    }

    if(keyDown("space")){
      ghost.velocityY = -3;
    }

    ghost.velocityY = ghost.velocityY +0.5;

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    
    drawSprites();
    
  }
  
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(28);
    text("Gameover",250,250);
  }  
  
}

function spawnDoors(){  
  if(frameCount %240 === 0){
    door = createSprite(300,-60);
    door.x = Math.round(random(100,500));
    door.addImage(doorImg);
    door.velocityY = 1;
    door.lifetime = 900;
    doorsGroup.add(door);
    
    climber = createSprite(300,-10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    
    invisibleBlock = createSprite(300,0);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 800;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true;
  }
  
}