img = "";
status ="";
objects =[];


function preload() {
    alarm = loadSound("Alarm.mp3");
}
function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded() {
    console.log("Model loaded!");
    status = true;
}

function gotResult(error , results) {
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw() {

    image(video,0,0,380,380);

    if(status != ""){
        objectDetector.detect(video, gotResult);
        for ( i = 0; i< objects.length ; i++) {
            human = objects[i].label;
            if(human = "Human"){
                document.getElementById("status").innerHTML= "Baby Is Here";
                fill(r,g,b);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%",objects[i].x + 10 , objects[i].y +10);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            }else{
                alarm.play();
            }
            
        }
    }
}