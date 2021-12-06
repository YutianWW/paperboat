let pallete = ["#E1E0DC", "#496B84", "#96AfBD", "#516A83", "#E6AAA3", "#A6BECF", "#DED0B4"];
let sep = 3;
let rs;

function setup() {
    let myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent("canvas-homepage");
    background(0);
    colorMode(HSB, 360, 100, 100, 100);
    rs = random(1000);
}


function draw() {
    background(0);
    randomSeed(rs);

    drawingContext.shadowColor = color(0, 0, 5);
    drawingContext.shadowBlur = 100;
    drawingContext.shadowOffsetY = 50;
    drawingContext.shadowOffsetX = 0;

    for (let y = -height / 2; y < height; y += height / 10) {
        let c1 = random(pallete);
        let c2 = random(pallete);
        let c3 = random(pallete);
        while (c1 == c2 || c2 == c3 || c3 == c1) {
            c1 = random(pallete);
            c2 = random(pallete);
            c3 = random(pallete);
        }
        let gradient = drawingContext.createLinearGradient(0, 0, width, 0);

        gradient.addColorStop(0.0, c1);
        gradient.addColorStop(random(0.3, 0.7), c2);
        gradient.addColorStop(1.0, c3);
        //Substitute the gradient content specified above for the fill style
        drawingContext.fillStyle = gradient;
        noStroke();
        beginShape();
        for (let x = -200; x <= width + 200; x += 3) {
            let yy = y + map(noise(rs + y, x / 400, frameCount / 300), 0, 1, -height / sep, height / sep);
            vertex(x, yy);
        }
        vertex(width + 200, height);
        vertex(0 - 200, height);
        endShape();
    }
    // noLoop();
}


function autoPlay() {
    var myAuto = document.getElementById('myaudio');
    myAuto.src = '/media/v2/sss.mp3';
    myAuto.play();
}



//check for scrolling on the window
window.addEventListener('scroll', function() {
    //console.log('user is scorlling')
    console.log(window.scrollY)
    document.body.style.background = "hsl(" + window.scrollY % 115 + " ," + window.scrollY % 126 + "," + window.scrollY % 156 + ")";

})