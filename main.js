prediction1 = ""
prediction2 = ""

Webcam.set({
width:350,
height:300,
image_format: "png",
png_quality:100
});

webcamera = document.getElementById("webcamera");

Webcam.attach("webcamera");

function takePhoto()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("imageshow").innerHTML = '<img id = "imagecaptured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/GTdwLDtla/model.json",modelLoaded);

function modelLoaded()
{
    console.log("Model Is Loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak1 = "The First Prediction is - " + prediction1;
    speak2 = "The Second Prediction is - " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("imagecaptured");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
if (error)
{
    console.error(error);
} else {
    console.log(results);
    document.getElementById("emotionName").innerHTML = results[0].label;
    document.getElementById("emotionName2").innerHTML = results[1].label;
    prediction1 = results[0].label;
    prediction2 = results[1].label;
    speak();
    if(results[0].label == "Happy")
    {
        document.getElementById("emojiEmotion").innerHTML = "&#128522;"
    }
    if(results[0].label == "Sad")
    {
        document.getElementById("emojiEmotion").innerHTML = "&#128532;"
    }
    if(results[0].label == "Angry")
    {
        document.getElementById("emojiEmotion").innerHTML = "&#128548;"
    }

    if(results[1].label == "Happy")
    {
        document.getElementById("emojiEmotion2").innerHTML = "&#128522;"
    }
    if(results[1].label == "Sad")
    {
        document.getElementById("emojiEmotion2").innerHTML = "&#128532;"
    }
    if(results[1].label == "Angry")
    {
        document.getElementById("emojiEmotion2").innerHTML = "&#128548;"
    }

}
}