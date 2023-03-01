song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristY=0;
rightWristX=0;
scoreLeftwrist=0;
scoreRightwrist=0;
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(500,500);
    canvas.position(560,150);
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function modelLoaded(){
    console.log("poseNet has been intialized");
}
function gotPoses(results){
    if (results.length>0){
        console.log(results);

    scoreLeftwrist=results[0].pose.keypoints[9].score;
    console.log("Left wrist's score is "+scoreLeftwrist);
    scoreRightwrist=results[0].pose.keypoints[10].score;
    console.log("Right wrist's score is "+scoreRightwrist);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("left wrist x = "+leftWristX, "left wrist y = "+leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("right wrist x = "+rightWristX, "right wrist y = "+rightWristY);
    }
}
function draw(){
    image(video,0,0,500,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    fill("FF0000");
    stroke("FF0000");

    if (scoreRightwrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="Play Harry Potter theme song";
        }
      }
   

    if (scoreLeftwrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="Play Peter Pan theme song";
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}