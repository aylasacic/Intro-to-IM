function setup() {
  createCanvas(400, 400);
  frameRate(144);

  // Credit: u/ty_is_fly (Reddit)
  // https://www.reddit.com/r/p5js/comments/p8a2jj/comment/hz341cd/?utm_source=share&utm_medium=web2x&context=3
  // enlarges the screen if the inner window is bigger than 800 pixels
  // if (window.innerWidth > 800) {
  //   document.querySelector("canvas").style.height = `${innerHeight - 150}px`;
  //   document.querySelector("canvas").style.width = `${innerHeight - 150}px`;
  // } else {
  //   document.querySelector("canvas").style.height = `${innerHeight - 100}px`;
  //   document.querySelector("canvas").style.width = `${innerHeight - 100}px`;
  // }
}

function draw() {
  // easter egg (the position of the sun on the blue canves looks like the flag of Palau)
  if (round(mouseX) == round((2 * 400) / 6)) {
    console.log("Palau :D");
  }
  
  // if the mouse is over the inner window
  if ( mouseX > 0 && mouseX < width && 0 < mouseY && mouseY < height) {
    background("#87CEEB");
    sun();

    // background

    // palms
    fill("#937747");
    ellipse(350, 350, 30, 300);
    fill("#436630");
    arc(350, 185, 30, 40, (3 * PI) / 2, HALF_PI);
    arc(350, 185, 30, 40, HALF_PI, (3 * PI) / 2);
    fill("#5D8E43");
    arc(415, 205, 130, 60, PI, 2 * PI);
    arc(285, 205, 130, 60, PI, 2 * PI);
    fill("#78B756");
    arc(350, 265, 100, 130, HALF_PI + QUARTER_PI, (3 * PI) / 2, CHORD);
    arc(350, 265, 100, 130, (3 * PI) / 2, HALF_PI - QUARTER_PI, CHORD);

    fill("#937747");
    ellipse(width - 350, 350, 30, 300);
    fill("#436630");
    arc(width - 350, 185, 30, 40, (3 * PI) / 2, HALF_PI);
    arc(width - 350, 185, 30, 40, HALF_PI, (3 * PI) / 2);
    fill("#5D8E43");
    arc(width - 415, 205, 130, 60, PI, 2 * PI);
    arc(width - 285, 205, 130, 60, PI, 2 * PI);
    fill("#78B756");
    arc(width - 350, 265, 100, 130, HALF_PI + QUARTER_PI, (3 * PI) / 2, CHORD);
    arc(width - 350, 265, 100, 130, (3 * PI) / 2, HALF_PI - QUARTER_PI, CHORD);
  } else {
    background("#13294B");
    fill("#FEFCD7");
    ellipse(320, 90, 100);
    fill("#13294B");
    ellipse(290, 90, 100);
    fill(255);

    // back snow
    for (let i = 0; i < 50; i++) {
      ellipse(random(0, 400), random(0, 400), random(1, 4));
    }
  }
  noStroke();

  // hair
  fill("#cc9966");
  bezier(108, 315, 0, 350, 90, 350, 30, 400);
  bezier(110, 250, 0, 340, 200, 400, 50, 400);
  triangle(67, 350, 130, 200, 200, 400);
  rect(96, 265, 100, 200);

  bezier(width - 108, 315, width, 350, width - 90, 350, width - 30, 400);
  bezier(width - 110, 250, width, 340, width - 200, 400, width - 50, 400);
  triangle(width - 68, 350, width - 130, 200, width - 201, 400);
  rect(width / 2 + 96, 265, 100, 0);

  //neck
  fill("#FFDABF");
  rect(width / 2 - 40, height / 2 + 80, 80, 100);

  // neck shadow
  fill("#E1BDA2");
  beginShape();
  vertex(width / 2 - 50, height / 2 + 70);
  vertex(width / 2 + 50, height / 2 + 70);
  vertex(width / 2 + 25, height / 2 + 105);
  vertex(width / 2 - 25, height / 2 + 105);
  endShape();
  arc(width / 2, height / 2 + 103, 50, 20, 0, PI);

  // head
  fill("#FFDABF");
  ellipse(width / 2, height / 2, 150, 200);

  // eyes
  if(frameCount%100==0){
    // blinking
    closed_eyes()
  }
  else{
    eyes();
  }

  noStroke();

  // nose
  fill("#E1BDA2");
  triangle(
    width / 2 - 10,
    height / 2 + 50,
    width / 2,
    height / 2 + 55,
    width / 2 + 10,
    height / 2 + 50
  );

  // nose shading according to sun position
  // if the x mouse xoordinate is less than width/2, shading is on the left side
  // otherwise it is on the right
  if (mouseX > 0 && mouseX < width / 2 && mouseY > 0 && mouseY < height) {
    fill("#FAE9DC");
    triangle(
      width / 2,
      height / 2 + 50,
      width / 2,
      height / 2,
      width / 2 - 10,
      height / 2 + 50
    );
  } else {
    fill("#FAE9DC");
    triangle(
      width / 2,
      height / 2 + 50,
      width / 2,
      height / 2,
      width / 2 + 10,
      height / 2 + 50
    );
  }

  // mouth
  fill("#E6A5A5");
  triangle(
    width / 2 - 30,
    height / 2 + 70,
    width / 2,
    height / 2 + 62,
    width / 2,
    height / 2 + 70
  );
  triangle(
    width / 2 + 30,
    height / 2 + 70,
    width / 2,
    height / 2 + 62,
    width / 2,
    height / 2 + 70
  );

  // cupids bow
  fill("#FFDABF");
  triangle(
    width / 2 - 7,
    height / 2 + 62,
    width / 2 + 7,
    height / 2 + 62,
    width / 2,
    height / 2 + 65
  );

  fill("#C89191");
  triangle(
    width / 2 - 30,
    height / 2 + 70,
    width / 2 - 5,
    height / 2 + 80,
    width / 2 - 5,
    height / 2 + 70
  );
  
  triangle(
    width / 2 + 30,
    height / 2 + 70,
    width / 2 + 5,
    height / 2 + 80,
    width / 2 + 5,
    height / 2 + 70
  );
  
  rect(width / 2 - 5, height / 2 + 70, 10, 10);

  // bangs
  fill("#E3B98E");
  bezier(width / 2, height / 2 - 100, 40, 100, 160, 300, 50, 400);
  bezier(
    width / 2,
    height / 2 - 100,
    width - 40,
    100,
    width - 160,
    300,
    width - 50,
    400
  );
  
  fill("#cc9966");
  arc(90, 300, 50, 120, 0, HALF_PI + 0.4);
  arc(width - 90, 300, 50, 120, HALF_PI - 0.4, PI);

  // torso
  fill(0);
  rect(50, height - 43, 300, 50);
  rect(width / 2 - 41, height - 80, 81, 40);
  fill("#FFDABF");
  arc(width / 2, height - 80, 80, 20, 0, PI);

  // left shoulder
  fill(0);
  ellipse(50, height - 18, 50);
  rect(25, height - 20, 30, 50);
  triangle(
    40,
    height - 41,
    width / 2 - 40,
    height - 80,
    width / 2 - 40,
    height - 41
  );

  // right shoulder
  fill(0);
  ellipse(width - 50, height - 18, 50);
  rect(width - 55, height - 20, 30, 50);
  triangle(
    width - 40,
    height - 41,
    width / 2 + 40,
    height - 80,
    width / 2 + 40,
    height - 41
  );

  if (0 < mouseX && mouseX < 400 && 0 < mouseY && mouseY < 400) {
    
  } else {
    
    // scarf shows on top when the mouse is not on the screen
    // scarf
    fill("#5a0000");
    rect(width / 2 - 75, height - 105, 35, 20);
    rect(width / 2 + 40, height - 105, 35, 20);
    quad(
      width / 2,
      height - 90,
      width / 2 + 40,
      height - 90,
      width / 2 + 75,
      height,
      width / 2 + 25,
      height
    );
    fill("#800000");
    rect(width / 2 - 60, height - 95, 120, 50);
    arc(width / 2 - 75, height - 80, 50, 50, HALF_PI, 2 * PI - HALF_PI);
    arc(width / 2 + 75, height - 80, 50, 50, -HALF_PI, 2 * PI + HALF_PI);
    quad(
      width / 2 - 75,
      height - 105,
      width / 2 - 60,
      height - 95,
      width / 2 - 60,
      height - 45,
      width / 2 - 85,
      height - 57
    );
    quad(
      width / 2 + 75,
      height - 105,
      width / 2 + 60,
      height - 95,
      width / 2 + 60,
      height - 45,
      width / 2 + 85,
      height - 57
    );

    // hat
    fill("#800000");
    arc(width / 2, height / 2 - 45, 175, 180, PI, PI * 2);

    // nose overlay
    // since the previous code is on the face, the shade will remain on the side the mouse is removed from the screen.
    // since the moon is to the right, this prevents it from looking unrealistic
    fill("#FFDABF");
    triangle(
      width / 2,
      height / 2 + 50,
      width / 2,
      height / 2,
      width / 2 + 10,
      height / 2 + 50
    );
    fill("#FAE9DC");
    triangle(
      width / 2,
      height / 2 + 50,
      width / 2,
      height / 2,
      width / 2 + 10,
      height / 2 + 50
    );

    // front snowflakes
    fill(255);
    for (let i = 0; i < 30; i++) {
      ellipse(random(0, 400), random(0, 400), random(2, 5));
    }
  }
}

function eyes() {
  fill(255);

  // sclera left (white part of the eye)
  beginShape();
  vertex(145, 200);
  vertex(150, 198);
  vertex(155, 196);
  vertex(165, 195);
  vertex(170, 193);
  vertex(182, 200);
  vertex(182, 202);
  vertex(179, 213);
  vertex(175, 218);
  vertex(170, 217);
  vertex(165, 217);
  vertex(160, 216);
  vertex(155, 215);
  vertex(150, 214);

  endShape();

  // sclera right
  beginShape();
  vertex(width - 145, 200);
  vertex(width - 150, 198);
  vertex(width - 155, 196);
  vertex(width - 165, 195);
  vertex(width - 170, 193);
  vertex(width - 182, 200);
  vertex(width - 182, 202);
  vertex(width - 179, 213);
  vertex(width - 175, 218);
  vertex(width - 170, 217);
  vertex(width - 165, 217);
  vertex(width - 160, 216);
  vertex(width - 155, 215);
  vertex(width - 150, 214);
  endShape();

  // the eye is mapped to move in accordance to the cursos, in a small area
  // iris
  fill("#00C9A4");
  ellipse(map(mouseX, 0, 500, 162, 168), map(mouseY, 0, 400, 202, 207), 20);
  ellipse(map(mouseX, 0, 500, 232, 238), map(mouseY, 0, 400, 202, 207), 20);

  // pupil
  fill(0);
  ellipse(map(mouseX, 0, 500, 162, 168), map(mouseY, 0, 400, 202, 207), 10);
  ellipse(map(mouseX, 0, 500, 232, 238), map(mouseY, 0, 400, 202, 207), 10);

  // highlight
  fill(255);
  ellipse(
    map(mouseX + 200, 0, 500, 162, 168),
    map(mouseY - 250, 0, 400, 202, 207),
    5
  );
  ellipse(
    map(mouseX + 200, 0, 500, 232, 238),
    map(mouseY - 250, 0, 400, 202, 207),
    5
  );

  // eyelids
  noFill();
  stroke(90, 71, 71, 240);
  strokeWeight(5);
  arc(164, 203, 40, 18, PI + 0.1, TWO_PI - 0.15, OPEN);
  arc(236, 203, 40, 18, PI + 0.15, TWO_PI - 0.1, OPEN);

  stroke(90, 71, 71, 160);
  strokeWeight(3.5);
  arc(169, 212, 40, 15, HALF_PI - 0.7, PI - 0.1);
  arc(231, 212, 40, 15, 0.1, HALF_PI + 0.7);

  // eyelashes
  line(148, 215, 145, 217);
  line(152, 218, 149, 220);
  line(width - 148, 215, width - 145, 217);
  line(width - 152, 218, width - 149, 220);

  // eyebrows
  stroke(170, 127, 85, 200);
  strokeWeight(6);
  arc(164, 190, 50, 20, PI + 0.1, TWO_PI - 0.2, OPEN);
  arc(236, 190, 50, 20, PI + 0.2, TWO_PI - 0.1, OPEN);
}

function closed_eyes(){
  // closed eyes (arcs are flipped from the eye function, just flipped)
  noFill();
  stroke(90, 71, 71, 240);
  strokeWeight(5);
  arc(164, 210, 40, 18, TWO_PI+0.15, PI, OPEN);
  arc(236, 210, 40, 18, TWO_PI, PI-0.15, OPEN);
  
  // eyebrows
  stroke(170, 127, 85, 200);
  strokeWeight(6);
  arc(164, 190, 50, 20, PI + 0.1, TWO_PI - 0.2, OPEN);
  arc(236, 190, 50, 20, PI + 0.2, TWO_PI - 0.1, OPEN);
}

function sun() {
  fill("#FFE87C");
  // angle is mapped from PI to 2PI in accordance to mouseX
  var angle = map(mouseX, -400, 800, PI, 2 * PI);

  // the sun moves with the x coordinate of the mouse
  var sunX = width / 2 + cos(angle) * 550;
  var sunY = height + sin(angle) * 350;

  ellipse(sunX, sunY, 70);
}
