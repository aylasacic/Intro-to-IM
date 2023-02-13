Object Oriented Programming Art

Concept:
Object Oriented Programming (OOP) and art are two separate concepts to me. I have only ever used it to create games, or different data structures, so when it came to creating art, I was in an art block. Since OOP is extremely useful when it comes to motion of objects and graphics on the screen, I was immediately drawn to something dynamic. But what? Since all of my friends are taking Foundations of Science, I am continuously surrounded by physics. This month, the topic was circular motion. When I think about circular motion, I think about rotation and revolution of celestial bodies. Hence, for this week's project, I have created a small work that depicts the motion of planets (Mercury through Neptune, sorry Pluto :( ) around the Sun.

The Solar System 
Link: https://editor.p5js.org/ajlasacic/full/GIWVhC73H

Challenges:
To start off, circular motion was hard to think about when working with OOP. Since I was working with many orbits, it was a struggle to spread them adequately across the screen. The model is obviously scaled down, it is an artistic representation of the system, but managing the distances between the planets and setting up the asteroid belt was really tricky and took some fiddling to get right.

```
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
```

The asteroid belt was another point of concern. I wanted to contain it in one place, so that it can be considered one object. Although I could have just used for loops outside of the code, I created another class which made it easier to control the specific parameters of the belt such as the size and number of circles.



```
    // Asteroid belt 
    class Belt {
    constructor(m, n) {
    // Number of asteroids in belt
    this.n_rocks = n;
    // Number of belts
    this.n_belts = m;
    
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
```

Unfortunately, when I came to that point, my code got deleted. In all honesty, it was my fault since I did not save the file once before leaving my workstation. From then on, it took another couple of hours to get back to my original progress, but I was devastated for quite some time because a split second was all it took to lose hours of work.
I was struggling to create the trail effect. In the beginning, I was trying to write more code in order to make it appear behind the celestial object. In the end, I realized that if I decrease the alpha of the background, a nice trail should be left behind by the celestial objects.

```
// Opacity can change for trail effect of moving objects
  background(0,0,0, opacity);
 ```
 
Finally, in order to introduce some creativity, I wondered whether an orbit can be drawn for each planet. For some time I tried to create it within the class, but since my Belt class creates instances of the Celestial class, it would make an orbit for each asteroid as well. I settled for creating a separate orbit() function that uses the start variable to size the orbits. Unlike C++ I could not make getter functions, so I could not extract radii for the planets.

```
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
  ellipse(width / 2, height / 2, start * 37);
  noStroke();
}

function mousePressed() {
  val = 20;
}

function mouseReleased() {
  val = 0;
}
```

Reflection:
Overall, I am satisfied by the look of the project. I altered some CSS parameters to make the canvas corners rounded which gives a nice effect to the piece. Although we can intuitively realize that this is our solar system, I wished to add more detail to the planets. For example, Saturn's rings and Earth's life, i.e., greenery. Unfortunately, since I lost all of my progress and had to trace my steps in order to remake the piece, I was left with little time to try and achieve that. Although I could have created a Saturn class, I wanted to make use of OOP and use one class for all planets. I am very happy with the trail and glow effect I created by utilizing the alpha variable of fill. In the future, I wish to create pieces that are more artistic, perhaps expressionist, but since I am not used to combining art with OOP, I know it will take some time. 
