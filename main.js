//Code written by kinora sen

//Variables
let img = "";
let detection_status = "";
let label = "";
let x_value = "";
let y_value = "";
let width = "";
let height = "";

function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(600, 400);
    canvas.center();

    //Initializing the model
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Current status: Detecting objects";
}
function modelLoaded(){ //Showing that the model is loaded
    console.log("Model Loaded");
    detection_status = "active";

    objectDetector.detect(img,gotResult); //Detecting objects
}
function gotResult(error, results){ //Initializing gotResults function
    //Checking if error, if not, return results
    if(error){ 
        console.error(error);
    }
    else{
        console.log(results);

        //Assinging results
        label = results[0].label;
        x_value = results[0].x;
        y_value = results[0].y;
        width = results[0].width;
        height = results[0].height;
    }
}
function draw(){

    //Manual detecting for dog
    image(img,0,0,600,400);
    fill("red");
    text("Dog", 180, 90);
    noFill();
    stroke("red");
    rect(170,70,300,300);

    //Detection with cocossd model
    fill("red");
    text(label,Math.round(x_value) - 100, Math.round(y_value) + 40);
    noFill();
    stroke("red");
    rect(Math.round(x_value) - 120, Math.round(y_value) + 20, Math.round(width) - 100, Math.round(height) - 100);
}
