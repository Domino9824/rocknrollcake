let img;
let imgReady = false;
let meltRate = 0.1;
let blurEffect = false; 

function preload() {
  img = loadImage('Cake-min.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, windowHeight);
  imgReady = true;
  textFont("courier new");
  textSize(5);
}

function draw() {
  if (imgReady) {
    let bgColor = lerpColor(color(1, 10, 0), color(10, 139, 80), mouseX / width);
    background(bgColor);

    if (blurEffect) {
      for (let i = 0; i < 5; i++) { 
        applyBlurEffect(img, 10, 20); 
      }
    } else {
      image(img, 0, 0); 
    }

    drawMeltingText("Click me.", 30, 60, 30);   
    drawMeltingLinesFromAbove();
    meltImage(); 
  }
}

function drawMeltingText(txt, x, y, fontSize) {
  textSize(fontSize);
  let spacing = textWidth('A'); 
  let meltEffect = 0; 

  fill('tomato'); // Set text color to tomato red
  for (let i = 0; i < txt.length; i++) {
    let charX = x + i * spacing;
    let charY = y + sin(frameCount * 0.1 + i) * meltEffect; 
    text(txt[i], charX, charY);

    meltEffect += random(-4, 3); 
  }
}

function meltImage() {
  if (mouseIsPressed) {
    meltRate = 1; 
  } else {
    meltRate = 0.1; 
  }

  img.loadPixels();
  for (let x = 0; x < img.width; x++) {
    for (let y = img.height - 1; y > 0; y--) {
      if (random() < meltRate) {
        let index = (x + y * img.width) * 4;
        let belowIndex = (x + (y + 1) * img.width) * 4;
        for (let i = 0; i < 4; i++) {
          img.pixels[belowIndex + i] = img.pixels[index + i];
        }
      }
    }
  }
  img.updatePixels();
}

function drawMeltingLinesFromAbove() {
  stroke(255);
  strokeWeight(3);

  for (let x = 0; x < width; x += 20) {
    let startY = 0;
    let endY = random(height / 2, height);
    let wobble = 0;

    beginShape();
    vertex(x, startY);
    for (let y = startY; y < endY; y += 5) {
      wobble += random(-2, 2);
      vertex(x + wobble, y);
    }
    endShape();
  }
}

function applyBlurEffect(img, intensity, alpha) {
  for (let i = 0; i < intensity; i++) {
    tint(255, alpha);
    image(img, random(-5, 5), random(-5, 5));
  }
  noTint();
}

function mouseClicked() {
  blurEffect = !blurEffect;
}

function keyPressed() {
  if (key === 's') {
    saveCanvas('myCanvas', 'png');
  }
}
