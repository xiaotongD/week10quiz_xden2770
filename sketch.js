let song;
let fft;
let canvasInteracted = false; 

function preload() {
    song = loadSound('audio/sample-visualisation.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    fft = new p5.FFT();
    song.connect(fft);
}

function draw() {
    if (!canvasInteracted) {
        background(0);
        fill(255);
        textAlign(CENTER);
        textSize(20);
        text('Tap anywhere to play some sound!', width / 2, height / 2);
        return;
    }

    background(0);
    // Change the line shading based on user's mouseX position
    stroke(mouseX / 8);
    noFill();

    //put the shape on the center of the screen
    translate(width / 2, height / 2);

    // Analyze the audio waveform and spectrum
    let wave = fft.waveform();
    let spectrum = fft.analyze();

    beginShape();

    for (let i = 0; i < width; i++) {
        let index = floor(map(i, 0, 360, 0, wave.length));
    // Adjust shape radius based on mouseY
        let r = map(wave[index], -1, 1, 150, mouseY);
        let x = r * sin(i);
        let y = r * cos(i);
        vertex(x, y);
    }
    endShape();

    colorMode(HSB);
    for (let i = 0; i < spectrum.length; i++) {
        fill(i * (255 / spectrum.length), 255, 255);
        let angle = map(i, 0, 60, 0, spectrum.length, 0, 360);
        let r = map(spectrum[i], 0, 255, 100, 250);
        let x = r * cos(angle);
        let y = r * sin(angle);
        rect(x, y, 20, 20); 
        noStroke();
    }
    colorMode(HSB);
}

function mousePressed() {
    canvasInteracted = true; 
    if (song.isPlaying()) {
        song.pause();
        noLoop();
    } else {
        song.play();
        loop();
    }
}






