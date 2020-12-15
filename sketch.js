var PLAY =1;
var END =0;
var gameState =1;

var fruit1,fruit1Image,fruit2,fruit2Image, fruit3,fruit3Image, fruit4,fruit4Image;
var alien1,alien1Image,alien2,alien2Image;
var sword,swordImage;
var gameover,gameoverImage;
var gameoverSound,knifeSwooshSound;

function preload(){
//loading fruits images  
 fruit1Image = loadImage("fruit1.png");
 fruit2Image = loadImage("fruit2.png");
 fruit3Image = loadImage("fruit3.png");
 fruit4Image = loadImage("fruit4.png"); 

//loading alien images
  alien1Image = loadImage("alien1.png");
  alien2Image = loadImage("alien2.png");
  
//loading gameover and sword image
  gameoverImage = loadImage("gameover.png");
  swordImage = loadImage("sword.png");
  
//loading gameover and knifeswoosh sound 
  gameoverSound = loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
}

function setup(){
 createCanvas(600,600);
 
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;

//setting collider for sword
  sword.setCollider("rectangle",0,0,40,40);

// score varaibles and groups
  score=0;
  fruitsGroup=new Group();
  enemyGroup=new Group();
}

function draw(){
background("lightblue"); 
  
if(gameState===PLAY){
  
sword.y=World.mouseY;
 sword.x=World.mouseX;
  
fruits();
Enemy();

if(sword.isTouching(fruitsGroup)){
  score=score+2;
  fruitsGroup.destroyEach();
  
  knifeSwooshSound.play();
  score=score+2;
}  
  
} 
     
if(enemyGroup.isTouching(sword)){
  gameState=END;
  
  gameoverSound.play();
    fruitsGroup.destroyEach();
   enemyGroup.destroyEach();
   fruitsGroup.setVelocityXEach(0);
   enemyGroup.setVelocityYEach(0);
    
//change the animation of sword to gameover and reset its position    
 sword.addImage(gameoverImage);
 sword.x=200;
 sword.y=200;
    
 sword.velocityX=0;
 sword.velocityY=0;   
}   
drawSprites();              


//display score
text("Score:"+score,300,30);  
  
  
}

function fruits(){
if(World.frameCount%80===0){
  fruit=createSprite(400,200,20,20);
  fruit.scale=0.2;
  //fruit.debug=true;
  r=Math.round(random(1,4));
  if(r==1) {
  fruit.addImage(fruit1Image);
  }else if(r == 2){
  fruit.addImage(fruit2Image);
  } else if(r == 3){
  fruit.addImage(fruit3Image);  
  } else if(r == 4){ 
  fruit.addImage(fruit4Image);  
  }
 
 fruit.y=Math.round(random(50,340));
  
  fruit.velocityX=-7;
  fruit.setLifetime=100;
  
  fruitsGroup.add(fruit);
 } 
}

function Enemy(){
if(World.frameCount%200===0){
 alien=createSprite(400,200,20,20);
 alien.scale=0.8;
r=Math.round(random(1,2));
  if(r==1) {
  alien.addImage(alien1Image);
  }else if(r == 2){
  alien.addImage(alien2Image);
  }
  
  alien.y=Math.round(random(100,300));
  alien.velocityX=-8;
  alien.setLifetime=50;
  
  enemyGroup.add(alien);
}  
    
}
