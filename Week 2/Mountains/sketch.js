// INSPIRATION
// https://levelup.gitconnected.com/generative-art-3-fundamental-concepts-to-get-you-started-44205dae167b

const w = 600;
const h = 600;
const x_step = 30;
const y_step = 20;

// constant for increasing or decreaseing the starting point of mountains
const distance_variance_factor = 270;

// scale mountains vertically
const scale_factor = 1.8;

// starting point from center
const start = 30;

// increment y_off for different noise values
const y_factor = 0.4;
let y_off = 0;

const nr_stars = 200;

function setup() {
  createCanvas(w, h);
  colorMode(HSB);

  // FOR NO LOOPING
  noLoop();

  // FOR LOOPING
  //frameRate(1);

  let button = createButton("Generate New");
  button.position(0, h - 20);
  button.mousePressed(loop);
  button.mouseReleased(noLoop);
}

function draw() {
  background("black");

  fill(0, 0, 255, 150);
  noStroke();

  // stars across the sky
  for (let i = 0; i < nr_stars; i++) {
    ellipse(random(0, w), random(0, h - x_step * (x_step / 10)), random(1, 2));
  }

  // Get points for mountains
  const mountains = [];
  for (let i = 0; i <= w; i += x_step) {
    let mountain = [];
    for (let j = -y_step; j <= h + y_step; j += y_step) {
      
      // horizontal points distributed along the midpoint of canvas
      let c = abs(j - h / 2) - start;

      // HELP FROM INSPIRATION CODE
      let variance = -1 * max(distance_variance_factor - c, 0);
      
      let p = [j, i + noise(y_off) * round(variance / scale_factor)];

      mountain.push(p);
      y_off += y_factor;
    }
    mountains.push(mountain);
  }

  // Draw the mountains
  for (let i = 5; i < mountains.length - 5; i++) {
    beginShape();
    fill(191, 38, 58 - (x_step / 10) * i);
    for (let j = 0; j < mountains[i].length; j++) {
      noStroke();

      // fill underneath the mountains
      rect(mountains[i][0][0], mountains[i][0][1], w + x_step);

      // COMMENT OUT FOR NO STROKE
      // stroke(0)
      // strokeWeight(1)
      curveVertex(mountains[i][j][0], mountains[i][j][1]);
    }
    endShape();
  }
}
