var inc = 0.002;
var x;
var y
var particles = [];
var fullAlphaDistance = 40;
var mediumAlphaDistance = 100;

function setup() {
  createCanvas(innerWidth, innerHeight);
  generateParticles();
}

var mouse = {
  x: undefined,
  y: undefined
}

//EventListener
window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})


function Particle(x, y, radius, xoff1, xoff2) {
  this.startX = x;
  this.startY = y;
  this.x = x;
  this.y = y;
  this.xoff1 = xoff1;
  this.xoff2 = xoff2;
  this.radius = radius;
  // this.color = color;

  this.create = function() {
    strokeWeight(0);
    if (mouse.x - x < fullAlphaDistance && mouse.x - x > -fullAlphaDistance && mouse.y - y < fullAlphaDistance && mouse.y - y > -fullAlphaDistance) {
      fill(255, 255, 255, 255);
      if (this.radius < 5)
        this.radius += 0.1;
    } else if (mouse.x - x < mediumAlphaDistance && mouse.x - x > -mediumAlphaDistance && mouse.y - y < mediumAlphaDistance && mouse.y - y > -mediumAlphaDistance) {
      fill(255, 165, 0, 100);
    } else {
      fill(255, 165, 0, 40);
    }
    noStroke();
    ellipse(this.x, this.y, this.radius);
  }

  this.update = function() {
    xoff1 += inc;
    xoff2 += inc;
    this.x = map(noise(xoff1), 0, 1, this.startX - 200, this.startX + 200);
    this.y = map(noise(xoff2), 0, 1, this.startY - 200, this.startY + 200);
    this.create();
  }
}

function generateParticles() {
  for (i = 0; i < 800; i++) {
    var xoff1 = Math.random() * innerWidth;
    var xoff2 = Math.random() * innerHeight;
    var radius = Math.random() * 2 + 3;
    x = map(noise(xoff1), 0, 1, -(innerWidth/2), innerWidth *1.5);
    y = map(noise(xoff2), 0, 1, -(innerHeight/2), innerHeight *1.5);
    particles.push(new Particle(x, y, radius, xoff1, xoff2));
  }
}

var closestFriends = [];

function draw() {
  clear();
  strokeWeight(0.3);
  stroke(255, 255, 255, 255);
  for (i = 0; i < particles.length; i++) {
    particles[i].update();
  }
  for (l = 0; l < particles.length; l++) {
    closestFriends = [];
    findFriends(l);
    for (k = 0; k < closestFriends.length; k++) {
      var mouseDistanceX = mouse.x - particles[l].x;
      var mouseDistanceY = mouse.y - particles[l].y;
      if (mouseDistanceX < fullAlphaDistance && mouseDistanceX > -fullAlphaDistance && mouseDistanceY < fullAlphaDistance && mouseDistanceY > -fullAlphaDistance) {
strokeWeight(0.2);
        stroke(255, 255, 255, 255);
      } else if (mouseDistanceX < mediumAlphaDistance && mouseDistanceX > -mediumAlphaDistance && mouseDistanceY < mediumAlphaDistance && mouseDistanceY > -mediumAlphaDistance) {
strokeWeight(0.1);
        stroke(255, 255, 255, 100);
      } else {
        stroke(255, 255, 255, 40);
      }

      line(particles[l].x, particles[l].y, closestFriends[k].x, closestFriends[k].y);
    }
  }
}

function findFriends(number) {
  var distance = 60;
  for (i = 0; i < particles.length; i++) {
      if ((particles[number].x - particles[i].x < distance) && (particles[number].x - particles[i].x > -distance) &&
        (particles[number].y - particles[i].y < distance) && (particles[number].y - particles[i].y > -distance)) {
        closestFriends.push(particles[i]);
    }
  }
}
