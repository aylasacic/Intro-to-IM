let w = 1000;
let h = 950;
let start = 25;
let rotation = 10; // based on mercury rotation
let opacity = 70

class Celestial {
  constructor(x, y, r, d, a, s, c) {
    // Initial x and y coordinates
    this.xPos = x;
    this.yPos = y;
    
    // Radius of celestial bodies
    this.radius = r;
    
    // Distance from center
    this.distance = d;
    
    // Angle at which the celestial bodies spawn
    // Also used for rotation -> constantly updated
    this.angle = a;
    
    // Speed of revolution
    this.speed = s;
    
    // Variables for rotation
    // Since xPos and yPos designate intial position, i.e., center of ellipses
    this.x = 0;
    this.y = 0;
    
    // Colour of objects
    this.color = c;

    // Display function
    this.display = function () {
      fill(this.color);
      ellipse(this.x, this.y, this.radius);
    };
  }

  // Move objects in a circle by updating the angle
  move() {
    this.x = this.xPos + this.distance * cos(this.angle / this.speed);
    this.y = this.yPos + this.distance * sin(this.angle / this.speed);

    this.angle++;
  }
}

// Asteroid belt 
class Belt {
  constructor(m, n) {
    // Number of belts
    this.n_belts = m;
    
    // Number of asteroids in belt
    this.n_rocks = n;
    
    // Array for storing asteroid objects
    this.beltArray = [];
  }

  // Produces a 2d array - this.beltArray[] 
  add_asteroids() {
    for (let i = 1; i <= this.n_belts + 1; i++) {
      let belt = [];
      for (let j = 1; j <= this.n_rocks; j++) {
        belt[j] = new Celestial(
          width / 2,
          height / 2,
          random(2, 4),
          i * (start - 10) + 170,
          j * 130 + i * random(10, 15),
          random(12.5, 37.5) * rotation,
          random(100, 200)
        );
      }
      this.beltArray.push(belt);
    }
  }

  // Displays each meteor by calling Celestial
  display_meteors() {
    for (let i = 1; i <= this.n_belts; i++) {
      for (let j = 1; j <= this.n_rocks; j++) {
        this.beltArray[i][j].move();
        this.beltArray[i][j].display();
      }
    }
  }
}

// Celestial object variables
let sun;
let mercury;
let venus;
let earth;
let mars;
let jupiter;
let saturn;
let uran;
let neptune;

// Asteroid belt
let belt;

// Alpha value for orbits when clicking screen
let val = 0;

function setup() {
  createCanvas(w, h);
  noStroke();
  sun = new Celestial(width / 2, height / 2, 45, 0, 1, 1, "#f15d22");
  mercury = new Celestial(
    width / 2,
    height / 2,
    5,
    start * 2,
    random(0, 360),
    rotation,
    "#8d8a88"
  );
  
  venus = new Celestial(
    width / 2,
    height / 2,
    10,
    start * 3,
    random(0, 360),
    2.56 * rotation,
    "#d9b292"
  );
  
  earth = new Celestial(
    width / 2,
    height / 2,
    10,
    start * 5,
    random(0, 360),
    4.15 * rotation,
    "#6388a8"
  );
  
  mars = new Celestial(
    width / 2,
    height / 2,
    8,
    start * 7,
    random(0, 360),
    7.81 * rotation,
    "#f27b5f"
  );

  belt = new Belt(5, 30);
  belt.add_asteroids();

  jupiter = new Celestial(
    width / 2,
    height / 2,
    20,
    start * 12,
    random(0, 360),
    (49.7 / 3) * rotation,
    "#c08237"
  );
  
  saturn = new Celestial(
    width / 2,
    height / 2,
    15,
    start * 14,
    random(0, 360),
    (120.4 / 3) * rotation,
    "#dab778"
  );
  
  uran = new Celestial(
    width / 2,
    height / 2,
    13,
    start * 16,
    random(0, 360),
    (348.6 / 5) * rotation,
    "#d0ecf0"
  );
  neptune = new Celestial(
    width / 2,
    height / 2,
    12,
    start * 18,
    random(0, 360),
    (684.8 / 7) * rotation,
    "#4e5d74"
  );
}

function draw() {
  randomSeed(99);
  
  // Opacity can change for trail effect of moving objects
  background(0,0,0, opacity);

  // Stars
  for (let i = 0; i < 1000; i++) {
    fill(255, 255, 255, random(10, 70));
    ellipse(random(0, width), random(0, height), random(1, 2));
  }

  // If screen is pressed orbits show
  orbits();

  // Move and display each celestial body
  fill("#f28320");
  sun.move();
  sun.display();

  noStroke();

  fill("#8d8a88");
  mercury.move();
  mercury.display();

  fill("#d9b292");
  venus.move();
  venus.display();

  fill("#6388a8");
  earth.move();
  earth.display();

  fill("#f27b5f");
  mars.move();
  mars.display();

  fill("#8d8a88");
  belt.display_meteors();

  fill("#c08237");
  jupiter.move();
  jupiter.display();

  fill("#dab778");
  saturn.move();
  saturn.display();

  fill("#d0ecf0");
  uran.move();
  uran.display();

  fill("#4e5d74");
  neptune.move();
  neptune.display();
  
  // Sorry Pluto (T⌓T)
}

function orbits() {
  // Sun glow
  for (let i = 0; i < 50; i++) {
    fill(241, 93, 34, 3);
    ellipse(width / 2, height / 2, i * 1.3);
  }
  
  noFill();
  stroke(255, 255, 255, val);
  ellipse(width / 2, height / 2, start * 4);
  ellipse(width / 2, height / 2, start * 6);
  ellipse(width / 2, height / 2, start * 10);
  ellipse(width / 2, height / 2, start * 14);
  ellipse(width / 2, height / 2, start * 24);
  ellipse(width / 2, height / 2, start * 28);
  ellipse(width / 2, height / 2, start * 32);
  ellipse(width / 2, height / 2, start * 36);
  noStroke();
}

function mousePressed() {
  val = 20;
}

function mouseReleased() {
  val = 0;
}
