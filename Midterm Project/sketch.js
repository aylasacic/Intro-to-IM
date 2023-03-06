/*
============================================================================
Name           : Midterm Project: Boy Who Cried Wolf: The Game
Author         : Ajla Šačić
Date Created   : 1/03/2023
Date Modified  : 6/03/2023
Version        : 1.0.0
============================================================================    
*/

// Sheep related variables
let sheep_images = [];
let number_sheep;
let sheep_size;
let step;

// Player related variables
let player_speed = 2.5;
let boy_size;
let w;
let h;

let trees = [];

let end = false;

// Timer variables
let timer = 0;
let endTime = 120;
let startTime;

// Movement and Game State
let game_state = 0;
let up;
let down;
let right;
let left;

function preload() {
  soundFormats("mp3");
  white_sheep = loadImage("images/white_sheep.png");
  black_sheep = loadImage("images/black_sheep.png");
  brown_sheep = loadImage("images/brown_sheep.png");
  boy = loadImage("images/boy.gif");
  grass = loadImage("images/grass.jpg");
  wolf = loadImage("images/wolf.png");
  wolf_head = loadImage("images/wolf_head.png")
  fence = loadImage("images/fence.png");
  tree = loadImage("images/tree.png");
  sheep_sounds = loadSound("sheep_sounds.mp3");
  
  start_screen = loadImage('images/game_start.png')
  won_screen = loadImage('images/game_won.gif')
  
  lost_screen = loadImage('images/game_over.png')

}

function setup() {
  frameRate(144);
  
  
  won_screen.resize(800,800)
  wolf_head.resize(45,40)
  
  // Filling up variables
  sheep_images = [white_sheep, black_sheep, brown_sheep];
  w = 800;
  h = 800;
  sheep_size = 30;
  step = 5;
  boy_size = 50;
  number_sheep = 10;
  
  // Creating Canvas (The game is not yet responsive)
  createCanvas(w, h);

  // Coordinates of trees on the edges of the screen
  for (let i = 0; i < 20; i++) {
    trees[i] = [random(120, 150), random(120, 150)];
  }
}

function draw() {
  
  // Ig game_state == 0, display the start screen
  if(game_state == 0){
    cursor()
    image(start_screen,0,0)
    timer = 0;
    
    // Hard coded due to time restraint :(
    // If the Start "button" is pressed, the game state changes and game is initialized
    if(mouseIsPressed && mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
      mouseY > height/2+75 && mouseY< height/2+170){
      startTime = millis();
      game_state += 1;
      g = new Game();
      
    }
  }
  // If game_state == 1, the game starts and the bacground is displayed, as well as the 
  // timer at the top of the screen -> set to 120 seconds or 2 minutes
  else if(game_state == 1){
    // Cursor is hidden while game is in progress
    noCursor()
    
    // Grass displayed
    // Grass image link: https://www.dreamstime.com/pixel-art-grass-background-seamless-lawn-texture-backdrop-vector-illustration-image223655094
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 4; j++) {
          image(grass, i * 400, j * 200, 400, 200);
        }
      }

      // Timer display at the top of the screen with wolf head approaching
      noStroke()
      fill(0);
      rect(width/2-250, 5, endTime*4+40, 40);
      fill("#9DC3E6");
      rect(width/2-240, 10, timer*4, 30);
      image(wolf_head, width/2-250+timer*4, 0)

      // Trees
      for (let i = 0; i < 20; i++) {
        image(tree, -10, i * 50 - trees[i][0], trees[i][0], trees[i][1]);
        image(
          tree,
          width - trees[i][0] + 10,
          i * 50 - trees[i][0],
          trees[i][0],
          trees[i][1]
        );
        image(tree, -50, i * 50 - trees[i][0], trees[i][0], trees[i][1]);
        image(
          tree,
          width - trees[i][0] + 50,
          i * 50 - trees[i][0],
          trees[i][0],
          trees[i][1]
        );
      }

      // Game running
      push()
      // Game is scaled down so that the trees a can be seen
      scale(0.7, 0.7);
      translate(width / 5, height / 4);
      g.game();

      scale(1.3, 1.3);
      // Trees at the bottom of the screen that "hide" the player
      for (let i = 0; i < 20; i++) {
        image(
          tree,
          i * 50 - trees[i][0],
          height - trees[i][1],
          trees[i][0],
          trees[i][1]
        );
        image(
          tree,
          i * 50 - trees[i][0],
          height - trees[i][1] + 40,
          trees[i][0],
          trees[i][1]
        );
      }
      pop()
  }
  // If game state == 2, the player lost, i.e., the timer ran out
  else if(game_state == 2){
    sheep_sounds.stop()
    
    // Cursor revealed
    cursor()
    image(lost_screen,0,0)
    // If restart "button" is pressed, the game and timer restar
    if(mouseIsPressed && mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
      mouseY > height/2-225 && mouseY< height/2-125){
      game_state = 0;
      timer = 0;
    }
  }
  // If the game state is 3, i.e., not one of the above, the player won
  // The player wins if they push all the sheep into the pen before the timer runs out
  else{
    sheep_sounds.stop()
    cursor()
    image(game_won,0,0)
    timer = 0;
    // If restart "button" is pressed, the game and timer restar
    if(mouseIsPressed && mouseX > width/2 - 100 && mouseX < width/2 + 100 &&
      mouseY > height/2-225 && mouseY< height/2-125){
      game_state = 0;
      timer = 0;
    }
  }
  
}

// Sheep pen class 
class Pen {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = fence;
  }

  display() {
    noFill();
    strokeWeight(0);
    stroke(0);
    rect(this.x, this.y, this.width, this.height);

    // Displays the fence according to the width and height difference
    strokeWeight(10);
    stroke("black");
    // Vertically if width < height
    if (this.width < this.height) {
      line(
        this.x + this.width / 2,
        this.y,
        this.x + this.width / 2,
        this.y + this.height - this.width
      );
      for (let i = this.y; i < this.height * 1.45; i += 22) {
        image(this.image, this.x, i, 20, 20);
      }
    }
    // Horizontally if width > height
    else {
      line(
        this.x + this.height,
        this.y + this.height / 2,
        this.x + this.width - this.height,
        this.y + this.height / 2
      );
      for (let j = this.x; j < this.width * 1.7; j += 22) {
        image(this.image, j, this.y, 20, 20);
      }
    }
  }
}

// Player class
class Player {
  constructor(radius, x, y) {
    this.radius = radius;
    this.x = x;
    this.y = y;
  }

  // Move method that utilized keyPressed and keyReleased functions outside the class
  move() {
    if (this.x - this.radius / 2 == -50) {
      left = false;
    }
    if (this.x + this.radius / 2 == width + 50) {
      right = false;
    }
    if (this.y - this.radius / 2 == -50) {
      up = false;
    }
    if (this.y + this.radius / 2 == height + 50) {
      down = false;
    }

    if (up == true) {
      this.y -= player_speed;
    } else if (down == true) {
      this.y += player_speed;
    } else if (right == true) {
      this.x += player_speed;
    } else if (left == true) {
      this.x -= player_speed;
    }
  }

  // Display method for the player
  display() {
    noFill();
    noStroke();
    ellipse(this.x, this.y, this.radius, 2 * this.radius);
    this.image = image(
      boy,
      this.x - boy_size,
      this.y - boy_size - 5,
      2 * boy_size,
      2 * boy_size
    );
  }
}

// Sheep class
class Sheep {
  constructor(radius, x, y) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.image = random(sheep_images);
    this.step = 0;
  }

  // Sheep are constrained to move in a square box around the pen
  move(new_x, new_y) {
    this.x = constrain(new_x, 50 + sheep_size / 2, width - sheep_size / 2 - 50);
    this.y = constrain(
      new_y,
      50 + sheep_size / 2,
      height - sheep_size / 2 - 50
    );
  }

  // Display method for the sheep
  display() {
    noFill();
    noStroke();
    fill(255);
    ellipse(this.x, this.y, this.radius);
    image(
      this.image,
      this.x - sheep_size,
      this.y - sheep_size,
      2 * sheep_size,
      2 * sheep_size
    );
  }
}

// Game class (most complex)
class Game {
  // Constructor initializes a player, the sheep and the sheep pen
  constructor() {
    // The boy is placed at the same point at the beginning of every game
    this.player = new Player(boy_size, 5, 10, 40);
    this.sheep = [];

    // Three sheep pen are initialized - left, right and bottom
    // Due to time restraint they are hard coded, but this will change in the future
    this.pen = [
      (this.bottom_pen = new Pen(300, 20, width / 2 - 160, height / 2 + 220)),
      (this.left_pen = new Pen(20, 440, width / 2 - 160, height / 2 - 200)),
      (this.right_pen = new Pen(20, 440, width / 2 + 120, height / 2 - 200)),
    ];

    // Sheep are added randomly around the pen
    for (let i = 0; i < number_sheep; i++) {
      let x = random(sheep_size / 2, width - sheep_size / 2);
      let y = random(sheep_size / 2, height - sheep_size / 2);
      let flag = false;

      while (flag == false) {
        if (
          x + sheep_size / 2 < this.left_pen.x ||
          x - sheep_size / 2 > this.right_pen.x + this.right_pen.width ||
          y + sheep_size / 2 < this.left_pen.y ||
          y - sheep_size / 2 > this.bottom_pen.y + this.bottom_pen.height
        ) {
          this.sheep.push(new Sheep(sheep_size, x, y));
          flag = true;
        } else {
          x = random(sheep_size / 2, width - sheep_size / 2);
          y = random(sheep_size / 2, height - sheep_size / 2);
        }
      }
    }
    
  }

  // Method that restrict the player from coming too close to the sheep
  sheep_player_contact() {
    for (let j = 0; j < this.sheep.length; j++) {
      for (let i = 0; i < this.pen.length; i++) {
        // The function id from collide2d library and checks whether the ellipse
        // of the sheep has interacted with the rectangle of the pen
        // if they did, it calls sheep_pen_interaction method which prevents the 
        // sheep from going through the pen
        if (
          collideRectCircle(
            this.pen[i].x,
            this.pen[i].y,
            this.pen[i].width,
            this.pen[i].height,
            this.sheep[j].x,
            this.sheep[j].y,
            30
          )
        ) {
          step = 0;
          this.sheep_pen_interaction();
        } 
        // Sheep is pushed away form the boy depending on their position in relation
        // to him
        else {
          for (let i = 0; i < number_sheep; i++) {
            step = 1;
            if (
              dist(
                this.sheep[i].x,
                this.sheep[i].y,
                this.player.x,
                this.player.y
              ) <= 75
            ) {
              if (this.sheep[i].y < this.player.y) {
                if (this.sheep[i].x < this.player.x) {
                  this.sheep[i].move(
                    this.sheep[i].x - step,
                    this.sheep[i].y - step
                  );
                } else {
                  this.sheep[i].move(
                    this.sheep[i].x + step,
                    this.sheep[i].y - step
                  );
                }
              } else {
                if (this.sheep[i].x < this.player.x) {
                  this.sheep[i].move(
                    this.sheep[i].x - step,
                    this.sheep[i].y + step
                  );
                } else {
                  this.sheep[i].move(
                    this.sheep[i].x + step,
                    this.sheep[i].y + step
                  );
                }
              }
            }
          }
        }
      }
    }
  }

  // Method that prevents the sheep from going over each other by pushing them
  // away from each other if they get too close
  // The method also makes sure that other sheep get moved as well if the player 
  // is moving a sheep close to them
  // This is done by calculating the distanve from the player to the closes sheep to
  // them and moving them accordingly -> same movement from method above
  sheep_sheep_contact() {
    for (let i = 0; i < number_sheep; i++) {
      for (let j = i + 1; j < number_sheep; j++) {
        if (
          dist(
            this.sheep[i].x,
            this.sheep[i].y,
            this.sheep[j].x,
            this.sheep[j].y
          ) <= 75
        ) {
          let s1 = dist(
            this.sheep[i].x,
            this.sheep[i].y,
            this.player.x,
            this.player.y
          );
          let s2 = dist(
            this.sheep[j].x,
            this.sheep[j].y,
            this.player.x,
            this.player.y
          );

          let closest_sheep = min(s1, s2);

          if (closest_sheep == s2) {
            if (this.sheep[i].y < this.sheep[j].y) {
              if (this.sheep[i].x < this.sheep[j].x) {
                this.sheep[i].move(
                  this.sheep[i].x - step,
                  this.sheep[i].y - step
                );
              } else {
                this.sheep[i].move(
                  this.sheep[i].x + step,
                  this.sheep[i].y - step
                );
              }
            } else {
              if (this.sheep[i].x < this.sheep[j].x) {
                this.sheep[i].move(
                  this.sheep[i].x - step,
                  this.sheep[i].y + step
                );
              } else {
                this.sheep[i].move(
                  this.sheep[i].x + step,
                  this.sheep[i].y + step
                );
              }
            }
          } else {
            if (this.sheep[j].y < this.sheep[i].y) {
              if (this.sheep[j].x < this.sheep[i].x) {
                this.sheep[j].move(
                  this.sheep[j].x - step,
                  this.sheep[j].y - step
                );
              } else {
                this.sheep[j].move(
                  this.sheep[j].x + step,
                  this.sheep[j].y - step
                );
              }
            } else {
              if (this.sheep[j].x < this.sheep[j].x) {
                this.sheep[j].move(
                  this.sheep[j].x - step,
                  this.sheep[j].y + step
                );
              } else {
                this.sheep[j].move(
                  this.sheep[j].x + step,
                  this.sheep[j].y + step
                );
              }
            }
          }
        }
      }
    }
  }

  // Method for preventing sheep going through their pen.
  // By calculating the distances from the sheep to the sides of the pen
  // the method stops them at their exact contact point before they go through the pen
  sheep_pen_interaction() {
    for (let j = 0; j < this.sheep.length; j++) {
      for (let i = 0; i < this.pen.length; i++) {
        if (
          this.sheep[j].x + this.sheep[j].radius / 2 >= this.pen[i].x &&
          this.sheep[j].x + this.sheep[j].radius / 2 <=
            this.pen[i].x + this.pen[i].width &&
          this.sheep[j].y + this.sheep[j].radius / 2 >= this.pen[i].y &&
          this.sheep[j].y - this.sheep[j].radius / 2 <=
            this.pen[i].y + this.pen[i].height
        ) {
          this.sheep[j].x -= 5;
        }
        if (
          this.sheep[j].x - this.sheep[j].radius / 2 <=
            this.pen[i].x + this.pen[i].width &&
          this.sheep[j].x - this.sheep[j].radius / 2 >= this.pen[i].x &&
          this.sheep[j].y + this.sheep[j].radius / 2 >= this.pen[i].y &&
          this.sheep[j].y - this.sheep[j].radius / 2 <=
            this.pen[i].y + this.pen[i].height
        ) {
          this.sheep[j].x += 5;
        }
        if (
          this.sheep[j].y - this.sheep[j].radius / 2 <=
            this.pen[i].y + this.pen[i].height &&
          this.sheep[j].y - this.sheep[j].radius / 2 >= this.pen[i].y &&
          this.sheep[j].x + this.sheep[j].radius / 2 >= this.pen[i].x &&
          this.sheep[j].x - this.sheep[j].radius / 2 <=
            this.pen[i].y + this.pen[i].width
        ) {
          this.sheep[j].y += 5;
        }
        if (
          this.sheep[j].y + this.sheep[j].radius / 2 >= this.pen[i].y &&
          this.sheep[j].y + this.sheep[j].radius / 2 <=
            this.pen[i].y + this.pen[i].height &&
          this.sheep[j].x + this.sheep[j].radius / 2 >= this.pen[i].x &&
          this.sheep[j].x - this.sheep[j].radius / 2 <=
            this.pen[i].x + this.pen[i].width
        ) {
          this.sheep[j].y -= 5;
        }
      }
    }
  }

  // Method that prevents the player from going through the pen.
  // By using the movement direction of the player (from keyPressed function)
  // the function also stops the player from teleporting through the pen if 
  // the opposite direction key is pressed
  player_pen_interaction() {
    for (let i = 0; i < 3; i++) {
      if (
        collideRectCircle(
          this.pen[i].x,
          this.pen[i].y,
          this.pen[i].width,
          this.pen[i].height,
          this.player.x,
          this.player.y,
          40
        )
      ) {
        if (right == true) {
          if (this.player.x < this.pen[i].x) {
            left = false;
            this.player.x = this.pen[i].x - this.player.radius / 2;
          }
        } else if (left == true) {
          if (this.player.x > this.pen[i].x + this.pen[i].width) {
            right = false;
            this.player.x =
              this.pen[i].x + +this.pen[i].width + this.player.radius / 2;
          }
        } else if (down == true) {
          if (this.player.y < this.pen[i].y) {
            up = false;
            this.player.y = this.pen[i].y - this.player.radius;
          }
        } else if (up == true) {
          if (this.player.y > this.pen[i].y + this.pen[i].height) {
            down = false;
            this.player.y =
              this.pen[i].y + this.pen[i].height / 2 + this.player.radius;
          }
        }
      }
    }
  }

  // Method that checks whether the player won the game
  // If the counter is equal to the number of sheep, then all the sheep are inside 
  // the walls of the pen and the game_state is set to 3 -> winning screen
  game_won() {
    let counter = 0;
    for (let i = 0; i < number_sheep; i++) {
      if (
        this.sheep[i].x > this.pen[1].x &&
        this.sheep[i].x < this.pen[2].x &&
        this.sheep[i].y > this.pen[1].y &&
        this.sheep[i].y < this.pen[0].y
      ) {
        counter++;
      }
    }

    if (counter == number_sheep) {
      game_state = 3;
      return true;
    }
  }
  
  // Method that checks whether the player lost
  // If the timer exceeds 120 seconds, the time is up and the game was not won,
  // so the game_over screen is set
  game_over() {
    if (timer == 120) {
      game_state = 2;
      return true;
    }
  }

  // Method that runs the game by running all of the methods
  game() {
    // Timer is started
    timer_clock()
    // Winning or losing
    this.game_won();
    this.game_over();
    // Interactions
    this.player_pen_interaction();
    this.sheep_pen_interaction();
    this.sheep_player_contact();
    this.sheep_sheep_contact();
    
    // Move and display methods
    this.player.move();
    
    for (let p = 0; p < this.pen.length; p++) {
      this.pen[p].display();
    }

    for (let i = 0; i < number_sheep; i++) {
      this.sheep[i].display();
    }

    

    this.player.display();
  }
}

// Getting key input from the keyboard and translating it to player movements
// up, down, left and right are global variables that are used inside the player
// class to move him
function keyPressed() {
  if (keyPressed) {
    if (keyCode == UP_ARROW) {
      up = true;
      down = false;
    }
    if (keyCode == DOWN_ARROW) {
      down = true;
      up = false;
    }
    if (keyCode == RIGHT_ARROW) {
      right = true;
      left = false;
    }
    if (keyCode == LEFT_ARROW) {
      left = true;
      right = false;
    }
  }
}

// Once the key is realeased, the player should not move in any direction
// This function prevents the player from moving my setting the released key variables
// to false
function keyReleased() {
  if (keyReleased) {
    if (keyCode == UP_ARROW) {
      up = false;
    }
    if (keyCode == DOWN_ARROW) {
      down = false;
    }
    if (keyCode == LEFT_ARROW) {
      left = false;
    }
    if (keyCode == RIGHT_ARROW) {
      right = false;
    }
  }
}

// Timer function that calculates the time passed onve game_state = 1
function timer_clock() {

  timer = int((millis() - startTime) / 1000);

  return timer;
}

// Sound is played once game starts
function mouseClicked(){
  if(game_state == 1){
    sheep_sounds.loop()
  }
}
