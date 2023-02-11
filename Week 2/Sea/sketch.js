// Background and star variables
let stars = [];
let sunset = [
  [219, 55, 13],
  [264, 22.3, 30.8],
  [4, 97.7, 65.9],
  [26, 96.6, 65.9],
  [55, 100, 72.5],
];
const power = 1.4;
let shrink = 0.11;
let z_off = 0.0;
let transp = 0;

// Wave variables
let angles = [];
let speeds = [];
let r = 4;
let nr_waves = 13;
const x_step = 60;
let d = 70;

function setup() {
  frameRate(144);
  randomSeed(23); 
  colorMode(HSL);
  createCanvas(600, 800);
  rectMode(CENTER);

  // Array of star coordinates and sizes
  for (let s = 0; s < 150; s++) {
    stars[s] = [random(0, width), random(0, height / 2), random(0, 1.2)];
  }

  // total number of points -> stored in array
  let total = round(width / r);
  for (let i = 0; i < nr_waves; i++) {
    let angle = [];
    
    // Adjecent rows move in opposite directions
    if (i % 2 == 0) {
      speeds[i] = 0.05;
    } else {
      speeds[i] = -0.05;
    }

    // 10 full sine waves on screen when it is not streched in wave function
    for (let j = 0; j < total + 1; j++) {
      angle[j] = map(j, 0, total, 0, 10 * TWO_PI);
    }
    angles[i] = angle;
  }
  noCursor();
}

function draw() {
  
  
  stary();

  sun_setting();

  waves();
  
  // Sunset color over the sea
  noStroke()
  fill(4, 97.7, 65.9, map(mouseY,  height, 0,  0.1, 0.4))
  translate(100,100)
  rect(width/2, height/2, 800, 1000)
}

function sun_setting() {
  // vertical mouse constraint
  let m_y = constrain(mouseY, height / 2, height);
  noStroke();
  for (let k = 1; k < sunset.length; k++) {
    
    // color gotten from sunset array
    let c = color(sunset[k][0], sunset[k][1], sunset[k][2]);
    fill(c);
    
    // ellipses move according to mouseY
    ellipse(width / 2, m_y, width - d * pow(k, power));
  }
}

function stary() {
  background(219, 55, map(mouseY, height / 2, height, 20, 5));
  noStroke();
  
  // stars transparent before height/2 -> increase in alpha with mouse movement
  fill(255, 255, 255, map(mouseY,  height / 2, height,  0, 1));
  for (let i = 0; i < stars.length; i++) {
    
    // shining effect (+ random(-0.1, 0.1))
    ellipse(stars[i][0], stars[i][1], stars[i][2] + random(-0.1, 0.1));
  }
}

function waves() {
  scale(0.8);

  noFill();
  
  // translates the shapes underneath 300px to the right and 500px downwards
  translate(300, 500);
  for (let i = 1; i < nr_waves; i++) {
    beginShape();

    for (let j = 0; j < angles[i].length; j++) {
      // maps the vertical points -> increasing last two parameters increases amplitude
      let y = map(sin(angles[i][j]), -1, 1, -15, 15);
      
      strokeWeight(70);
      
      // streches the waves across x axis from -1000 to 1000
      let x = map(j, 0, angles[i].length, -1000, 1000);

      // plots vertices that are connected
      stroke(210, 60, 15 + (x_step / 20) * i);
      curveVertex(x, y + i * 40);

      angles[i][j] += speeds[i];
    }
    endShape();
  }
  // translated back to originial so nothing is corrupted
  translate(-300, -500);
}
