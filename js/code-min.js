var maxSpeed,songBpm,readSpeed,scrollSpeed,speedMod,hasTwoFive,speedSubs,speedDec,inputBpm;function setUpDisplay(){$("#noReadSet").fadeOut(500);var e=["Radical","Neato","Cool beans","Thanks, friendo","Niceee","Excellent.","Awww yis","AYYYY lmao","LOL SO RANDOM","Alright, that makes sense!","APPLYING BABY POWDER","Wipe the bar when you're done.","Don't forget to drink your ovaltine.","SAWNIC-SPEED","Wax on, wax off.","Right on","Gotta step FAST"],t=e.length,o=Math.floor(Math.random()*(+t-1))+1;$("#thanks").text(e[o]),$("#thanks").fadeIn(1e3),$("#thanks").fadeOut(500),$("#yesReadSet").delay(1500).fadeIn(500),document.getElementById("currentRead").innerHTML="Your MAX speed is: "+maxSpeed+" bpm"}function showNext(){$("#noReadSet").hide(),document.getElementById("currentRead").innerHTML="Your MAX speed is: "+maxSpeed+" bpm",$("#yesReadSet").show()}function speedGet(){inputBpm=document.getElementById("maxBpmEntry").value,null!=(maxSpeed=inputBpm)?(window.localStorage.setItem("myBpm",maxSpeed),setUpDisplay()):clearAll()}function resetDivs(){clearAll(),$("#yesReadSet").fadeOut(500),setTimeout(removeNumbers,500),$("#noReadSet").delay(500).fadeIn(500),introNoCookie()}function removeNumbers(){document.getElementById("speedMod").innerHTML="x-.--",document.getElementById("actualBpm").innerHTML="--- BPM",document.getElementById("bpmEntry").value="",$("#speedMod").removeClass(),$("#actualBpm").removeClass(),$("#speedMod").addClass("numbersBlank"),$("#actualBpm").addClass("numbersBlank")}function introNoCookie(){$("#welcome2").hide(0).delay(200).fadeIn(1e3),$("#welcome3").hide(0).delay(400).fadeIn(1e3)}function introYesCookie(){setUpDisplay()}function checkCookie(){var e=window.localStorage.getItem("myBpm");return null!=e?(console.log("checkCookie "+e),maxSpeed=e,!0):(clearAll(),!1)}function clearAll(){window.localStorage.clear()}function getCookie(){return window.localStorage.getItem("myBpm")}function calculateSpeed(){getSongBpm();var e=speedModAdjust(maxSpeed/songBpm),t=songBpm*e;t>maxSpeed&&(0==hasTwoFive?e-=.25==speedDec||.75==speedDec?.25:.5:1==hasTwoFive&&(e-=.25)),updateValues(e,t=songBpm*e)}function getSongBpm(){songBpm=document.getElementById("bpmEntry").value}function updateValues(e,t){document.getElementById("speedMod").innerHTML="x"+e,document.getElementById("actualBpm").innerHTML=t+" bpm",$("#speedMod").removeClass(),$("#actualBpm").removeClass(),$("#speedMod").addClass("numbers"),$("#actualBpm").addClass("numbers")}function speedModAdjust(e){var t=e;return t>=8?(hasTwoFive=!1,t=8):t>4&&t<8?(t=(Math.round(4*t)/4).toFixed(2),speedSubs=t.toString(),"25"!=(speedDec=speedSubs.substring(2,4))&&"75"!=speedDec||(t-=.25),hasTwoFive=!1,t):t<=4?(t=(Math.round(4*t)/4).toFixed(2),hasTwoFive=!0,t):void 0}$(document).ready(function(){$("#thanks").hide(),$("#yesReadSet").hide(),!1===checkCookie()?introNoCookie():showNext()});