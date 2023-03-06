let meteors;
let r = 300;
let angle = 0;
let step = 10;
let upper_mass_color = 200000;
let upper_mass_size = 60000000;
let n;

let flag = false;

function preload() {
  meteors = loadTable("M_New.csv", "csv");
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  frameRate(240);
  colorMode(HSB);

  n = meteors.getRowCount();
}

function draw() {
  background(0);

  orbitControl(10, 10); //Mouse control
  let mass = meteors.getColumn(0);
  let lat = meteors.getColumn(1);
  let lng = meteors.getColumn(2);

  for (let i = 2; i < n; i += step) {
    let lat_ = lat[i];
    let lng_ = lng[i];

    strokeWeight(map(mass[i], 0, upper_mass_size, 0.7, 5));
    if (flag == true) {
      stroke(map(mass[i], 0, upper_mass_color, 120, 30), 100, 90);
    } else {
      stroke(255);
    }

    let z = r * cos(lat_);
    let y = r * sin(lat_) * sin(lng_);
    let x = r * sin(lat_) * cos(lng_);
    point(x, y, z);
  }
}

function mousePressed() {
  flag = true;
}

function mouseReleased() {
  flag = false;
}
