var noseX = 0;
var noseY = 0;
var difference = 0;
var rightWristX = 0;
var leftWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 550);
    canvas = createCanvas(550, 400);
    canvas.position(560, 150);
    poseNet = ml5.poseNet(video, model_loaded);
    poseNet.on('pose', got_poses);
}

function model_loaded() {
    console.log("PoseNet is initialised!")
}

function got_poses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX: " + noseX + ", NoseY: " + noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("leftWristX: " + leftWristX + ", rightWristX: " + rightWristX + ", Difference = " + difference);
    }
}

function draw() {
    // background('red');
    clear();
    document.getElementById('text_side').innerHTML = "Font size of the text will be " + difference/5 + "px";
    fill('#F90093');
    stroke('#F90093');
    // square(noseX / 2, noseY / 2, difference);
    textSize(difference/5);
    text("nose position", noseX/2, noseY/2)
}
