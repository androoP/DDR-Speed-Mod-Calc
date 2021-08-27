//The maximum read speed that we set at the beginning
var maxSpeed;
//The BPM entered by users
var songBpm;
//The 'risky' speed mod; The first mod that exceeds a user's read speed preferences
var riskyMod;
//The 'safe' speed mod; This is an index - 1 of our risky mod.
var safeMod;
//We multiply our risky mod by the actual song speed to offer this as a potentially unsafe option
var riskySpeed;
//Our 'safe' speed that does not exceed a user's read speed preference. We multiply safeMod by songBpm
var safeSpeed;
//An array of all speed mods in DDR A (Premium mode) MUST be in order
//Would be easy to add/remove mods depending on game types (Or if DDR adds new mods some day...)
var availableSpeedMods = 
[
0.25,
0.50,
0.75,
1.00,
1.25,
1.50,
1.75,
2.00,
2.25,
2.50,
2.75,
3.00,
3.25,
3.50,
3.75,
4.00,
4.50,
5.00,
5.50,
6.00,
6.50,
7.00,
7.50,
8.00
];


//We set up some elements and hide them.
$(document).ready(function(){
    $( "#thanks" ).hide();
    $( "#yesReadSet" ).hide();
//We check our cookies, which save our maximum read speed
if (checkCookie() === false) {
    introNoCookie();
} else {
    showNext();
}

});
//We set up our canvas
function setUpDisplay(){
    $("#noReadSet").fadeOut(500);
    //The thanks var just provides which pointless message to display as we transition
    var thanks = ["Radical","Neato","Cool beans","Thanks, friendo","Niceee","Excellent.","Awww yis","AYYYY lmao","LOL SO RANDOM","Alright, that makes sense!","APPLYING BABY POWDER","Wipe the bar when you're done.","Don't forget to drink your ovaltine.","SAWNIC-SPEED","Wax on, wax off.","Right on","Gotta step FAST"]
    //Here, we randomly choose which message to display, based on the length of the 'thanks' array
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
//We pull the speed entered in our max speed and set a cookie
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
//We reset divs
function resetDivs(){
    clearAll();
    $("#yesReadSet").fadeOut(500);
    setTimeout(removeNumbers, 500);
    $("#noReadSet").delay(500).fadeIn(500);
    introNoCookie()
}
//This clears our numbers for the BPM entry screen
function removeNumbers(){
document.getElementById("speedMod").innerHTML = "x-.--";
document.getElementById("actualBpm").innerHTML = "--- BPM";
document.getElementById("bpmEntry").value = "";
$("#speedMod").removeClass();
$("#actualBpm").removeClass();
$("#speedMod").addClass("numbersBlank");
$("#actualBpm").addClass("numbersBlank");
}

//Our initial screen animation if no cookies are detected
 function introNoCookie(){
        $("#welcome2").hide(0).delay(200).fadeIn(1000);
        $("#welcome3").hide(0).delay(400).fadeIn(1000);
    }
//If we detect a cookie, we set up the display
function introYesCookie(){
    setUpDisplay();
    }
//Here, we check for our recalled bpm cookie and if we don't have one, we clear everything
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

//This clears local storage. We call this when someone resets their read speed.
function clearAll(){
window.localStorage.clear();
};
//We get our cookie and return our saved bpm.
    function getCookie() {
        var savedBpm = window.localStorage.getItem("myBpm");
        return savedBpm;
};
//We pull the number entered in the bpmEntry field and set it to our var
function getSongBpm() {
    songBpm = document.getElementById("bpmEntry").value;
}

//We get the speed mod to use for a given bpm
function getSpeedMod() {
    //We call our BPM function to pull the latest song bpm
    getSongBpm();
    //We run a for loop to go through our availableSpeedMods array, multiplying the song BPM by the speed mods, seeing if it exceeds the user's max read speed
    for (let i = 0; i <= availableSpeedMods.length; i++) {
        //If we exceed the max speed, we've found our risky speed.
        if(availableSpeedMods[i]*songBpm > maxSpeed){
            //We set our risky speed and our 'safe' speed that won't exceed our max
            riskyMod = availableSpeedMods[i]
            safeMod = availableSpeedMods[i-1]
            break;
        } else if(i == availableSpeedMods.length){
            //If we reach the end of our loop, set everything to 8. We won't reach or exceed our max speed.
            riskyMod = 8;
            safeMod = 8;
            break;
        }
    }
    //We call our calculateScroll function to get our scroll speeds
    calculateScroll();
}

function calculateScroll() {

    safeSpeed = songBpm*safeMod;
    riskySpeed = songBpm*riskyMod;
    //We update the values on our HTML
    updateValues();
}
//We fill in the info to the appropriate divs, based on the functions
function updateValues(){
document.getElementById("speedMod").innerHTML = "x"+safeMod;
document.getElementById("actualBpm").innerHTML = safeSpeed + " bpm";
if (safeMod == riskyMod) {
    document.getElementById("riskyMod").innerHTML = "MAX Risk Achieved";
} else {
    document.getElementById("riskyMod").innerHTML = "x"+riskyMod+" for "+riskySpeed+" bpm";
}
$("#speedMod").removeClass();
$("#actualBpm").removeClass();
$("#speedMod").addClass("numbers");
$("#actualBpm").addClass("numbers");
}