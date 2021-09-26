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




$(document).ready(function(){
    //We hide our divs
    $( "#thanks" ).hide();
    $( "#yesReadSet" ).hide();
//We check our cookies, which save our maximum read speed
if (checkCookie() === false) {
    //If there's no cookie, we show the no cookie intro
    introNoCookie();
} else {
    //Otherwise, we showNext and jump into the bpm entry
    showNext();
}
//We add an event listener for the bpm entry (On key up).
//This lets us update our speed mods automatically, without having to use a button to confirm
$( "#bpmEntry" ).keyup(function() {
    //Songs don't have single digit bpms, so we ignore the first character
    if(document.getElementById('bpmEntry').value.length > 1){
    //We set the songBpm var to what's entered
    songBpm = document.getElementById("bpmEntry").value;
    //And we ship the BPM into our getSpeedMod function
    getSpeedMod();
    } else {
        //We don't change the divs
        document.getElementById("numHead").innerHTML = "Safe: --- bpm";
        document.getElementById("speedMod").innerHTML = "x-.--";
        document.getElementById("riskyHead").innerHTML = "Risky: --- bpm";
        document.getElementById("riskyMod").innerHTML = "x-.--";
        $("#speedMod").removeClass();
        $("#speedMod").addClass("numbersBlank");
        $("#riskyMod").removeClass();
        $("#riskyMod").addClass("riskynumbersBlank");
    }
    //When we click on our BPM entry, we clear our divs and entry
    $( "#bpmEntry" ).focus(function() {
        document.getElementById("numHead").innerHTML = "Safe: --- bpm";
        document.getElementById("speedMod").innerHTML = "x-.--";
        document.getElementById("riskyHead").innerHTML = "Risky: --- bpm";
        document.getElementById("riskyMod").innerHTML = "x-.--";
        document.getElementById("bpmEntry").value = "";
        $("#speedMod").removeClass();
        $("#speedMod").addClass("numbersBlank");
        $("#riskyMod").removeClass();
        $("#riskyMod").addClass("riskynumbersBlank");
});

});
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
    //We display the message and add fade in/out animations
    $("#thanks").text(thanks[random]);
     $("#thanks").fadeIn(1000);
     $("#thanks").fadeOut(500);
             document.getElementById("numHead").innerHTML = "Safe: --- bpm";
        document.getElementById("speedMod").innerHTML = "x-.--";
        document.getElementById("riskyHead").innerHTML = "Risky: --- bpm";
        document.getElementById("riskyMod").innerHTML = "x-.--";
     $("#yesReadSet").delay( 1500 ).fadeIn(500);
     $("#bottomReset").delay( 1500 ).fadeIn(500);
     document.getElementById("currentRead").innerHTML = "MAX speed: " + maxSpeed + " bpm";
}
//We hide the first screen and jump straight to our song bpm entry
function showNext() {
    $("#noReadSet").hide();
    document.getElementById("currentRead").innerHTML = "MAX speed: " + maxSpeed + " bpm";
    $("#yesReadSet").show();
}
//We pull the speed entered in our max speed and set a cookie
function speedGet(){
        //We get our inputBpm from the maxBpmEntry HTML element
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
    $("#bottomReset").fadeOut(500);
    introNoCookie()
}
//This clears our numbers for the BPM entry screen
function removeNumbers(){
document.getElementById("speedMod").innerHTML = "x-.--";
document.getElementById("bpmEntry").value = "";
document.getElementById("riskyMod").innerHTML = "x-.--";
$("#speedMod").removeClass();
$("#speedMod").addClass("numbersBlank");
$("#riskyMod").removeClass();
$("#riskyMod").addClass("riskynumbersBlank");
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
    //We have this var to determine if we'll be unable to reach our safe speed
    //eg. If we set our song bpm to 2401, .25 will not being us below 600
    //This means all speed mods are 'unsafe'. Only risky will do!
    var safeExists = true;
    //We call our BPM function to pull the latest song bpm
    getSongBpm();
    //We run a for loop to go through our availableSpeedMods array, multiplying the song BPM by the speed mods, seeing if it exceeds the user's max read speed
    for (let i = 0; i <= availableSpeedMods.length; i++) {
        //If we exceed the max speed, we've found our risky speed.
        if(availableSpeedMods[i]*songBpm > maxSpeed){
            //We set our risky speed and our 'safe' speed that won't exceed our max
            riskyMod = availableSpeedMods[i]
            safeMod = availableSpeedMods[i-1]
            //If no safe mod will being us to our defined 'safe' bpm, only risky will do
            if (safeMod == undefined) {
                //All speed mods are unsafe. So we set safeExists to false
                safeExists = false;
            }
            break;
        } else if(i == availableSpeedMods.length){
            //If we reach the end of our loop, set everything to 8. We won't reach or exceed our max speed.
            riskyMod = 8;
            safeMod = 8;
            break;
        } 
    }
    //We call our calculateScroll function to get our scroll speeds
    //We also include safeExists
    calculateScroll(safeExists);
}

function calculateScroll(safeExists) {
    safeSpeed = songBpm*safeMod;
    riskySpeed = songBpm*riskyMod;
    //We update the values on our HTML
    //We didn't use safeExists in this function, but we'll shuffle it over...
    updateValues(safeExists);
}
//We fill in the info to the appropriate divs, based on the functions
function updateValues(safeExists){
if(safeExists == true){
   // document.getElementById("speedMod").innerHTML =  "x"+safeMod+" / "+safeSpeed+" bpm";
   document.getElementById("numHead").innerHTML =  "Safe: "+safeSpeed+" bpm";
   document.getElementById("speedMod").innerHTML =  "x"+safeMod;
} else if (safeExists == false) {
    //safeExists is false! No safe speed mods exist! We set our div to 'UNSAFE'
    document.getElementById("riskyMod").innerHTML = "x"+riskyMod;
   document.getElementById("speedMod").innerHTML =  "UNSAFE"; 
}
if (safeMod == riskyMod) {
    document.getElementById("riskyMod").innerHTML = "MAX Risk Achieved";
} else {
   // document.getElementById("riskyMod").innerHTML = "x"+riskyMod+" / "+riskySpeed+" bpm";
   document.getElementById("riskyHead").innerHTML =  "Risky: "+riskySpeed+" bpm";
   document.getElementById("riskyMod").innerHTML = "x"+riskyMod;
}
$("#actualBpm").removeClass();
$("#actualBpm").addClass("numbers");
$("#speedMod").removeClass();
$("#speedMod").addClass("numbers");
$("#riskyMod").removeClass();
$("#riskyMod").addClass("riskynumbers");
}