// version 1.2 (lite)
// 2008-05-21
// author - immortalnights
// contributions by - wphilipw and ecamanaut
//
// homepage - http://www.ikaraimlibrary.com/
// for up to date details and version, please check the home page.
//
// Please do not remove the above details; it is impossible to ensure
// all copys of this script are kept upto date, people need to know
// where they can go to get the most up to date version.
//
// For full version history please see, http://www.ikariamlibrary.com/
//
// ==UserScript==
// @name           IkariamInlineScore v1.2
// @namespace      ikariamScript
// @description    Displays a selected players score in the Info section when either their town is selected on the map, or you are viewing their town.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var post = {
    score: "score",
 military: "army_score_main",
     gold: "trader_score_secondary" };
     
var updateCounter =0;
var scoreTypes = {
    0: "score", 
    1: "military", 
    2: "gold" };

var scoreShown = false;

getElementsByClass = function(inElement, className, findIn) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (findIn == true) {
        if (all[e].className.indexOf(className) > 0) {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

// called using player name, score type, 
function requestScore(playerName, type, onload) {
    GM_xmlhttpRequest({
      method:'POST',
      url:'http://' + gameServer + '/index.php',
      data:"view=highscore&highscoreType=" + post[type] + "&searchUser=" + playerName,
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/atom+xml,application/xml,text/xml',
        'Referer': 'http://' + gameServer + '/index.php'
      },
      onload:onload
    });
}

function fmtNumber(n) {
  n += "";
  for (var i = (n.length - 3); i > 0; i -= 3) {
    n = n.slice(0, i) +","+ n.slice(i);
  }
  return n;
}

function createBaseDiv() {
    baseDivCreated = true;
    
    scoreElement = document.createElement("div");
    
    var scoreDiv = <>
        <li style="margin: 2px 10px;font-size:11px" id="total_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['score']}:</span>
            <div id="score">Unknown</div>
        </li>
        <li style="margin: 2px 10px;font-size:11px" id="army_score_main" class="ally">
            <span style="float:left;" class="textLabel">{lang['military']}:</span>
            <div id="military">Unknown</div>
        </li>
        <li style="margin: 2px 10px;font-size:11px" id="trader_score_secondary" class="ally">
            <span style="float:left;" class="textLabel">{lang['gold']}:</span>
            <div id="gold">Unknown</div>
        </li>
    </>;
    
    scoreElement.innerHTML = scoreDiv;
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) { 
        informationContainer = document.getElementById('information'); 
    }
    
    var allyClass = getElementsByClass(informationContainer, "ally") 
    
    insertAfter(scoreElement, allyClass[0]);
    scoreShown = true;
}

function insertAfter(newElement,targetElement) {
	//target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
	
	//if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
		//add the newElement after the target element.
		parent.appendChild(newElement);
		} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
		}
}

function updateScoreDiv(lang, score, military, gold, lootable) {

    document.getElementById('score').innerHTML = score;
    document.getElementById('military').innerHTML = military;
    
    if (lootable !== "") {
        gold = gold + " (" + lootable + ")"; 
    }
    document.getElementById('gold').innerHTML = gold;
}

function updateScore(type, score) {
    document.getElementById(type).innerHTML = score;
}

function updateDetails(type, playerName, townLevel, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: none;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var score = getElementsByClass(hiddenDiv, "score", false);
    var pname = getElementsByClass(hiddenDiv, "name", false);
    for (var e = 0; e < pname.length; e++) {
        if (pname[e].innerHTML == playerName) {
            var totalScore = score[e].innerHTML;
        }
    }
    document.body.removeChild(hiddenDiv);

    if (type == "gold") {
        gold = parseInt(totalScore.replace(/,/g, ""),10);
        lootable = Math.round(townLevel * (townLevel - 1) / 10000 * gold);
        totalScore += " (" + fmtNumber(lootable) + ")";
    }
    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore;
}

function cityInformation() {
    createBaseDiv();
    
    // Get the lanugage
    lang = defineLanguage(domain);
    
    var playerScore = -1;
    // Remove the "points" information (as of 0.2.8), and get the value for later
    var infoContainer = document.getElementById("infocontainer");
    if (infoContainer) {
        var pointsLi = getElementsByClass(infoContainer, "name", false);
        if (pointsLi[1]) {
            playerScore = parseInt(pointsLi[1].innerHTML.split(/>/)[2].replace(/,/g, ""),10);
            pointsLi[1].style.display = "none";
        }
    }
    
    // Remove the disabled actions... looks messy when it happens
    var actions = document.getElementById("actions");
    if (actions) {
        textSpans = getElementsByClass(actions, "disabled", true);
        for (var cnt = 0; cnt < textSpans.length;cnt++) {
            //textSpans[cnt].style.display = "none";
        }
    }
    
    // Removes the report player link, again causes a fliker
    var reportPlayer = getElementsByClass(document, "reportPlayer");
    //reportPlayer[0].style.display = "none";
    
    
    updateScore("score", lang.fetch); updateScore("military", lang.fetch); updateScore("gold", lang.fetch); 

    var listParts = "";
    // Get the players name
    listParts = getElementsByClass(document,"owner", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name// get the players name
            
    // Get the players town level for gold pillage data
    listParts = getElementsByClass(document,"citylevel", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var townLevel = parseInt(listParts[2].replace(/^\s+|\s+$/g, ''), 10); // trim up the town level
            
    var checkedTime = (new Date().getTime() - (1000*60*10));
    if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("lastCheckedTimestamp") < checkedTime || GM_getValue("lastServerCheck") != gameServer) {

        if (playerScore > -1) {
            updateScore('score', fmtNumber(playerScore));
        } else {
            requestScore(playerName, 'score', function(responseDetails) {
                updateDetails('score', playerName, townLevel, responseDetails.responseText);
            });
        }
        
        requestScore(playerName, 'military', function(responseDetails) {
            updateDetails('military', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'gold', function(responseDetails) {
            updateDetails('gold', playerName, townLevel, responseDetails.responseText);
        });
        
        GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for (var interation = 0;interation < 3; interation++) {
            var type = scoreTypes[interation];
            document.getElementById(type).innerHTML = GM_getValue(type);
        }
    }
}

function defineLanguage(langTDL) {
    switch (langTDL) {
        case "fr":
            language = { inline:"Inline Score",
            fetch:"cargando...",
            score:"Points",
            military:"Troupes",
            gold:"Oro" };
            break;
        case "gr":
            language = { inline:"Inline Score",
            fetch:"Î±Î½Î¬ÎºÏ„Î·ÏƒÎ·...",
            score:"Î’Î±Î¸Î¼Î¿Î»Î¿Î³Î¯Î±",
            military:"Î£Ï„ÏÎ±Ï„ÎµÏÎ¼Î±Ï„Î±",
            gold:"Î§ÏÏ…ÏƒÏŒÏ‚" };
            break;
        case "de":
            language = { inline:"Inline Score",
            fetch:"Laden...",
            score:"Gesamtpunkte",
            military:"GenerÃ¤le",
            gold:"Goldbestand" }
            break;
        case "tr":
            language = { inline:"Inline Score",
            fetch:"Yukleniyor...",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Altin Puani" };
            break;
        case "cz":
            language = { inline:"Inline Score",
            fetch:"naÄÃ­tavam...",
            score:"CelkovÃ© SkÃ³re",
            military:"VojenskÃ½ skÃ³re",
            gold:"ZlatÃ¡ zÃ¡soba" };
            break;
        case "sk":
            language = { inline:"Inline Score",
            fetch:"nahrÃ¡vam...",
            score:"CelkovÃ© SkÃ³re",
            military:"VojenskÃ© skÃ³re",
            gold:"ZlatÃ¡ zÃ¡soba" };
            break;
        case "tw":
            language = { inline:"åˆ†æ•¸é¡¯ç¤º",
            fetch:"è®€å–ä¸­...",
            score:"ç¸½ç©åˆ†",
            military:"æˆ°çˆ­å°‡è»",
            gold:"é»ƒé‡‘å­˜é‡" };
            break;
        case "hu":
            language = { inline:"Inline Score",
            fetch:"TÃ¶ltÃ©s...",
            score:"Ã–sszpontszÃ¡m",
            military:"Katonai pont",
            gold:"Arany" };
            break;
        case "se":
            language = { inline:"Inline Score",
            fetch:"hÃ¤mtar...",
            score:"TotalpoÃ¤ng",
            military:"GeneralspoÃ¤ng",
            gold:"GuldmÃ¤ngd" }
            break;
        case "pl":
            language = { inline:"Inline Score",
            fetch:"Åadowanie...",
            score:"CaÅ‚kowity Wynik",
            military:"GeneraÅ‚owie",
            gold:"Zapas ZÅ‚ota" };
            break;
        case "ikariam":
            if (subDomain == "fi") {
                language = { inline:"Inline Score",
                fetch:"haetaan...",
                score:"Kokonaispisteet",
                military:"Sotilaspisteet",
                gold:"Kulta" };
            }
            break;
        default:
            language = { inline:"Inline Score",
            fetch:"fetching...",
            score:"Total Score",
            military:"Military Score",
            gold:"Gold Score" };
            break;
    }
    return language;
}



function init() {
    lang = defineLanguage(domain);
    
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1) {
            linkElements[i].addEventListener('click', function() { window.setTimeout(cityInformation, 1); }, false);
        }
    }
        
    var informationDiv = document.getElementById('information');
    if (informationDiv) {
        var listElements = informationDiv.getElementsByTagName('li');
        if (listElements.length > 0) {
            cityInformation();
        }
    }
}

init();