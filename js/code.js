var maxSpeed;
var songBpm;
var readSpeed;
var scrollSpeed;
var speedMod;
var hasTwoFive;
var speedSubs;
var speedDec;
var inputBpm;

$(document).ready(function(){
    $( "#thanks" ).hide();
    $( "#yesReadSet" ).hide();
if (checkCookie() === false) {
    introNoCookie();
} else {
    showNext();
}

});

function setUpDisplay(){
    $("#noReadSet").fadeOut(500);
    var thanks = ["Radical","Neato","Cool beans","Thanks, friendo","Niceee","Excellent.","Awww yis","AYYYY lmao","LOL SO RANDOM","Alright, that makes sense!","APPLYING BABY POWDER","Wipe the bar when you're done.","Don't forget to drink your ovaltine.","SAWNIC-SPEED","Wax on, wax off.","Right on","Gotta step FAST"]
    var min=1; 
    var max=thanks.length;
    var random =Math.floor(Math.random() * (+max - +min)) + +min; 
    $("#thanks").text(thanks[random]);
     $("#thanks").fadeIn(1000);
     $("#thanks").fadeOut(500);
     $("#yesReadSet").delay( 1500 ).fadeIn(500);
     document.getElementById("currentRead").innerHTML = "Your MAX speed is: " + maxSpeed + " bpm";
}

function showNext() {
    $("#noReadSet").hide();
    document.getElementById("currentRead").innerHTML = "Your MAX speed is: " + maxSpeed + " bpm";
    $("#yesReadSet").show();
}

function speedGet(){
        inputBpm = document.getElementById("maxBpmEntry").value;
        maxSpeed = inputBpm;
        if(maxSpeed != null){
        window.localStorage.setItem("myBpm", maxSpeed);
        setUpDisplay();
    } else {
        clearAll();
    }
}

function resetDivs(){
    clearAll();
    $("#yesReadSet").fadeOut(500);
    setTimeout(removeNumbers, 500);
    $("#noReadSet").delay(500).fadeIn(500);

    introNoCookie()
}

function removeNumbers(){
document.getElementById("speedMod").innerHTML = "x-.--";
document.getElementById("actualBpm").innerHTML = "--- BPM";
document.getElementById("bpmEntry").value = "";
$("#speedMod").removeClass();
$("#actualBpm").removeClass();
$("#speedMod").addClass("numbersBlank");
$("#actualBpm").addClass("numbersBlank");
}

 function introNoCookie(){
        $("#welcome2").hide(0).delay(200).fadeIn(1000);
        $("#welcome3").hide(0).delay(400).fadeIn(1000);
    }

function introYesCookie(){
    setUpDisplay();
    }

function checkCookie() {
    var recalledBpm = window.localStorage.getItem("myBpm");
    if (recalledBpm != null) {
        maxSpeed = recalledBpm;
         return true;
    } 
    else {
        clearAll();
        return false;
    }
}

function clearAll(){
window.localStorage.clear();
};

    function getCookie() {
        var savedBpm = window.localStorage.getItem("myBpm");
        return savedBpm;
}

function calculateSpeed() {
    getSongBpm();
    var rawSpeedMod = (maxSpeed/songBpm);
    var speedModAdjusted = speedModAdjust(rawSpeedMod);
    var actualBpm = (songBpm*speedModAdjusted);
    if (actualBpm > maxSpeed){
    if(hasTwoFive == false){
        if(speedDec == .25 || speedDec == .75){
            speedModAdjusted = speedModAdjusted-.25;
        } else{
            speedModAdjusted = speedModAdjusted-.5;
        }
    }else if(hasTwoFive == true){
            speedModAdjusted = (speedModAdjusted - 0.25);
    }
}
    actualBpm = (songBpm*speedModAdjusted);
    updateValues(speedModAdjusted, actualBpm);
}

function getSongBpm() {
    songBpm = document.getElementById("bpmEntry").value;
}

function updateValues(speedMod, scrollSpeed){
document.getElementById("speedMod").innerHTML = "x"+speedMod;
document.getElementById("actualBpm").innerHTML = scrollSpeed + " bpm";
$("#speedMod").removeClass();
$("#actualBpm").removeClass();
$("#speedMod").addClass("numbers");
$("#actualBpm").addClass("numbers");
}

function speedModAdjust(rawSpeed) {
var finalSpeed = rawSpeed;

if (finalSpeed >= 8) {
    finalSpeed = 8;
    hasTwoFive = false;
    return finalSpeed;
}else if(finalSpeed > 4 && finalSpeed < 8){
finalSpeed = (Math.round(finalSpeed * 4) / 4).toFixed(2);
speedSubs = finalSpeed.toString();
speedDec = speedSubs.substring(2,4);
if(speedDec == "25" || speedDec == "75"){
            finalSpeed = (finalSpeed-.25);
        }
hasTwoFive = false;
return finalSpeed;
} else if(finalSpeed <= 4){
    finalSpeed = (Math.round(finalSpeed * 4) / 4).toFixed(2);
    hasTwoFive = true;
    return finalSpeed;
}

}