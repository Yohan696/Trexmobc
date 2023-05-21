//introducing the variables 
var trex ,trex_running, ground, ground_running, score, ground_inv, rand_clouds, cloud, cloud_running, restartsp, restartImg, trex_stop;
var obstacle, obst1, obst2, obst3, obst4, obst5, obst6, obst7, obst8, obst, randst, clouds_grp, obstacle_grp, gameoverImage, gameover;
var trex_jump, trex_die, trex_chkpoint; 
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var sound1 = "playsound";
//preloading the graphics of trex for running animation 
function preload(){
  trex_running = loadAnimation ("TRexrun-0p.png", "TRexrun-1p.png", "TRexrun-2p.png", "TRexrun-3p.png", "TRexrun-4p.png", "TRexrun-5p.png", "TRexrun-6p.png", "TRexrun-7p.png", "TRexrun-8p.png", "TRexrun-9p.png");
  ground_running = loadImage ("desert2fin.png");
  trex_stop = loadAnimation ("Trexrun-stop.png");
 trex_die = loadSound ("die.mp3");
trex_jump = loadSound ("jump.mp3");
trex_chkpoint = loadSound ("checkpoint.mp3");

 // cloud_running = loadImage ("Large-cloud1.png");
  cloud1 = loadImage ("Large-cloud1.png");
  cloud2 = loadImage ("Large-cloud2.png");
  cloud3 = loadImage ("Large-cloud3.png");
  obst1 = loadImage ("Stone1-rmbg.png");
  obst2 = loadImage ("Stone2-rmbg.png");
  obst3 = loadImage ("Stone3-rmbg.png");
  obst4 = loadImage ("Stone4-rmbg.png");
  obst5 = loadImage ("Stone5-rmbg.png");
  obst6 = loadImage ("Stone6-rmbg.png");
  obst7 = loadImage ("Stone7-rmbg.png");
  obst8 = loadImage ("Stone8-rmbg.png");

  gameoverImage = loadImage ("gameOver.png");
  restartImg = loadImage ("restart.png");
}

//creating the canvas trex and ground sprites for the setup
function setup() {

  //creating the canvas where trex runs
  createCanvas(windowWidth, windowHeight);
   //initialising the score as 0 
  score = 0;
  
  ground_inv = createSprite (width/2, height-40, width*6, 20);
 
   //creating the ground sprite
  ground = createSprite(width/2,height-20,width*6,30);
  ground.addImage ("GROUNDMOVING", ground_running);
  ground.scale = 1.2;
  ground_inv.visible = false; 
 
  //create a trex sprite
    trex = createSprite(70,height-80, 80, 40);
 
    //trex animation 
    trex.addAnimation ("TREXMOVING", trex_running);
    trex.addAnimation ("TREXSTOPPED", trex_stop);
    //resizing the trex to the canvas
    trex.scale = 0.25;
    obstacle_grp = createGroup();
    clouds_grp = createGroup(); 
 
    gameover = createSprite (450,120, 200, 55);
    gameover.addImage (gameoverImage);
       trex.setCollider ("circle", 0, 0, 150);
   //    trex.debug = true;
  restartsp = createSprite (450,180, 200, 55);
  restartsp.addImage (restartImg);
  restartsp.scale = 0.25;
    }

function draw(){

  //creating background
  background("light blue");
  
  drawSprites();  
//  sound1 = "playsound" ;
  //giving a title to the game
  console.log(sound1); 
  textSize(30);
  fill("red");
     text("THE T-REX RUNNER GAME!", 260, 35); 

  //putting the score on top right   
   textSize(16);
   text ("Score : "+ score, 780, 30); 

   if (gamestate ==PLAY) 
   {
    
    if (keyDown ("space") || (touches.length >0))
    {
      //assigning the Y velocity to the trex on pressing space
      trex.velocityY = -8;
       trex_jump.play();
       touches = [];
     }
   
    //pulling down the trex from the jumping height
    trex.velocityY = trex.velocityY + 0.5;
   // adding the score according to the framecounts covered
      score = score + Math.round(frameCount/100);

    if ((score % 100 === 0) && (score > 0))
    {
      trex_chkpoint.play() ; 
    }
    gameover.visible = false;
   restartsp.visible = false;
   
   ground.velocityX = -(4 + 3 * (score/100));
   
    if (ground.x < 230) {
     ground.x = ground.width/2;
    
     //controlling the trex with space key to jump on facing the obstacles
      
          }
    //fixing the trex to the ground sprite 
    trex.collide (ground_inv);

      //calling the functions rand_clouds and obstacle
      rand_clouds();
    
      obstacle();
       
       if (obstacle_grp.isTouching(trex)) 
      {
        gamestate = END;
      }
   }
   else if (gamestate == END) 
   {
    gameover.visible = true;
    restartsp.visible = true; 
   
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation ("TREXSTOPPED", trex_stop);
     trex_die.play();
    clouds_grp.setVelocityXEach (0);
    obstacle_grp.setVelocityXEach (0);
    clouds_grp.setLifetimeEach(-1);
    obstacle_grp.setLifetimeEach(-1);
                                                                                                                                                                                                                                                                                                                                                  
    trex.collide (ground_inv);

    if (mousePressedOver (restartsp))
    {
      restartgm();
    }
       }
    }

function rand_clouds() 
{
if (frameCount % 70 === 0) 
{
  cloud = createSprite (890, 60, 60, 20);
  cloud.scale = 0.3;
  cloud.velocityX  = -9;
  
  cloud.y = Math.round(random(35,125));

//adjusting the cloud depth
cloud.depth = trex.depth;
trex.depth = trex.depth + 1;
clouds_grp.add(cloud);

var rand = Math.round(random(1,3));

//adding random images to clouds
if (rand == 1) 
{
  cloud.addImage ("1st_Cloud", cloud1);}
  else if (rand == 2) 
  {
    cloud.addImage ("2nd_Cloud", cloud2);}
    else 
     {
      cloud.addImage ("3rd_Cloud", cloud3);} 
    
      cloud.lifetime = 720;
    }
    
  } 
function restartgm ()
{
  //create a function restart 
  gamestate = PLAY;
  gameover.visible = false;
  restartsp.visible = false;
  obstacle_grp.destroyEach();
  clouds_grp.destroyEach();
  score = 0;
  trex.changeAnimation ("TREXMOVING", trex_running);
  trex_die.stop();
}

function obstacle () 
{
  if (frameCount % 50 === 0) 
  {
  //creating obstacle sprite and group
    obst = createSprite (990, 265, 50, 20);
    obst.scale = 0.4;
    obst.velocityX  = -12;
    obst.lifetime = 700; 
    obstacle_grp.add(obst);

 //generating random obstacles on the screen
 var randst = Math.round(random(1,8));
 
 //adding random images to the obstacles
  switch (randst)
  {
  case 1: obst.addImage ("1st_OBSTACLE", obst1);
          break;
  case 2: obst.addImage ("2nd_OBSTACLE", obst2);
          break;
  case 3: obst.addImage ("3rd_OBSTACLE", obst3);
          break;
  case 4: obst.addImage ("4th_OBSTACLE", obst4);
          break;
  case 5: obst.addImage ("5th_OBSTACLE", obst5);
          break;
  case 6: obst.addImage ("6th_OBSTACLE", obst6);
          break;
  case 7: obst.addImage ("6th_OBSTACLE", obst7);
          break;
  case 8: obst.addImage ("6th_OBSTACLE", obst8);
          break;
  default: break;
        }  
    }
  } 
