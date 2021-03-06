// Amazon Denver 1.2.8
// Sean LeBlanc
// Modified Josh Staiger's (excellent) code
// to adapt to Denver-Prospector search.

// Currently, this script will search for the book in the Denver library.
// If not found there, it will search on Prospector. If not found THERE,
// it will search WorldCat.

// Now, also checks for CDs and DVDs, and if it determines that the current page
// is a DVD or CD, it will add a link to a search in Denver Library based on
// the title text.

// 1.0.1 - Changed around to look for CD or DVD first, then a book. It seems
// some DVDs have numbers that look similar to ISBN. Also, some title spans
// were not being found before, and the searches were for blank text on some
// DVDs.

// 1.0.2 - Added VHS search. Commented out some GM_log()s. Also updated message
// about GM version to be for Denver (not Wake) script.

// 1.2   - Aligned with other versions of the script (JeffCo, Douglas)

// 1.2.1 - Skipped
// 1.2.2 - Changed regex to deal with ISBN at end of URL w/o trailing slash.

// 1.2.3 - Changed for new domain name (denver.lib.co.us -> denverlibrary.org).

// 1.2.4 - Had to update due to changes in Amazon.

// 1.2.5 - Altered DVD/VHS detection.

// 1.2.6 - Altered for Amazon changes.

// 1.2.7 - Altered again for Amazon changes.

// 1.2.8 - Changed test for DVD.

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Amazon - Denver Lookup 1.2.8", and click Uninstall.
// It also tries to detect when looking at a CD or DVD, and inserts a search link into Denver library for the title text.
//
// * Instruction text lifted from Mark Pilgrim's Butler
// * http://diveintomark.org/projects/butler/
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Alerts you if any editions of the current book you are browsing
// on Amazon.com are available at the Wake County Public Libary.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Amazon - Denver Lookup 1.2.8
// @namespace     http://sean-leblanc.blogspot.com
// @description	  While viewing a book on Amazon, this script will search Denver Public library. If not found there, it will search Prospector. If not found THERE, it will search WorldCat. Based on Josh Staiger's Wake County Library Lookup. It also tries to detect when looking at a CD, DVD or VHS, and inserts a search link into Denver library for the title text.

// @include       http://*.amazon.*
// @include       http://amazon.*
// ==/UserScript==

// @Version       1.2.8
// @Firefox       1.5+
// @GmVersion     0.6.4
// @Author        Sean LeBlanc
// @Email         comcast.net | sean leblanc



var dbg = false;
var denverLibraryName = 'Denver Public Library';
var shortLibName = "Denver";
var prospectorLibraryName = 'Prospector';
var worldcatLibraryName = 'WorldCat';

var titleXPath1 = "//div[@class='buying']/b[@class='sans']";
var titleXPath2 = "//div[@class='content']//b[@class='sans']";

function slog(logthis) {
	if (dbg) GM_log(logthis);
}

// Common functions:
function parseTitle(title) {
	var firstParens = title.indexOf("(");
	var firstBracket = title.indexOf("[");

	if (firstParens>0 || firstBracket>0) {
		var cutOff = 0;
		if (firstParens>0 && firstBracket>0) {
			cutOff = firstParens;
			if (firstBracket<firstParens) {
				cutOff = firstBracket;
			}
		}
		else if (firstParens>0) {
			cutOff = firstParens;
		}
		else if (firstBracket>0) {
			cutOff = firstBracket;
		}
		title = title.substring(0, cutOff);
	}

	var wordArray = title.split(' ');
	var newTitle = "";
	for (i=0;i<wordArray.length;i++) {
		//slog("i= " + i + ", val: '" + wordArray[i] + "'");
		var match = wordArray[i].match(/([a-zA-Z0-9]+)/);
		if (match) {
			if (newTitle.length>0) {
				newTitle += " ";
			}
			newTitle += wordArray[i];
		}
	}
	return newTitle;
}

function isCD() {
	var liarray = document.getElementsByTagName('b');
	if (liarray.length) {
		//slog("bold found - " + liarray.length);
		for (i=0;i<liarray.length;i++) {
			if (liarray[i].textContent=="Audio CD") {
				slog("Bold found. [" + i + "] Text: '" + liarray[i].textContent + "'");
				return true;
			}
		}
	}
	return;
}

function isDVD() {
	//var match = "amazon.com/images/G/01/detail/dvd-gray-medium.gif";
	//var match = "amazon.com/images/G/01/detail/dvd-gray-medium.";
	//var query = "//img[contains(@src, '" + match + "')]";
	var query = "//span[@class='medSprite s_medDVD']";
	slog("DVD query = '" + query + "'");
	var dvdImg = xpathFirst(query);
	if (dvdImg) {
		slog("Is DVD.");
		return true;
	}
	else {
		slog("Is NOT DVD.");
		return;
	}
}

function isVHS() {
	//var match = "amazon.com/images/G/01/x-locale/common/icons/vhs-medium.gif";
	var match = "amazon.com/images/G/01/x-locale/common/icons/vhs-medium.";
	var query = "//img[contains(@src, '" + match + "')]";
	slog("query = '" + query + "'");
	var vhsImg = xpathFirst(query);
	if (vhsImg) {
		slog("is vhs.");
		return true;
	}
	else {
		slog("is not vhs.");
		return;
	}
}

function insertItemSearchText(stubDiv, libName, libUrl, itemType) {
	clearText(stubDiv);
	insertText(stubDiv,
		   '<a href="' + libUrl + '" title="'+libName+' information for this item">Search for this ' + itemType + ' in ' + libName + ' </a>',
		   'libraryAvailable');
}




function worldcatSearch(isbn, newDiv) {

    // Add another div at this point:
	var secondDiv = document.createElement('div');
	secondDiv.setAttribute('class', 'stub');
	newDiv.parentNode.insertBefore(secondDiv, newDiv.nextSibling);
       //GM_log(xmlUrl);
    insertText(secondDiv, '<img src="' + getSpinnerSrc() + '" alt="Spinner" /> Searching for this edition at ' + worldcatLibraryName + '.');


	var xmlUrl = "http://worldcatlibraries.org/wcpa/isbn/" + isbn;
	GM_xmlhttpRequest({
      headers: [{'User-Agent': 'worldcatgreasemonkey'}],
	  method:"GET",
	  url:xmlUrl,
	  onload:function(res3) {
	    var test = res3.responseText.indexOf("We're Sorry");
          //GM_log(test);

          if (test <= 0) {
          	getDisplayItemInfoFunction(secondDiv, worldcatLibraryName, xmlUrl);
          }
          else {
          	getDisplayItemInfoFunction(secondDiv, worldcatLibraryName, null);
          }
	  }
	});
};

function prospectorSearch(isbn, newDiv) {
	var xmlUrlProspector = "http://prospector.coalliance.org/search/i" + isbn + "&searchtype=i";
	// Add another div at this point:
	var secondDiv = document.createElement('div');
	secondDiv.setAttribute('class', 'stub');
	newDiv.parentNode.insertBefore(secondDiv, newDiv.nextSibling);

	// Notify that we are searching, then start search:
    insertText(secondDiv, '<img src="' + getSpinnerSrc() + '" alt="Spinner" /> Searching for this edition at ' + prospectorLibraryName + '.');
	GM_xmlhttpRequest({
      headers: [{'User-Agent': 'dpgm'}],
	  method:"GET",
	  url:xmlUrlProspector,
	  onload:function(res) {
		var test = res.responseText.indexOf('Request');

	  	if (test > 0){
        	getDisplayItemInfoFunction(secondDiv, prospectorLibraryName, xmlUrlProspector);
        }
        else {
        	//getDisplayItemInfoFunction(secondDiv, prospectorLibraryName, null);
        	getDisplayItemInfoFunction(secondDiv, prospectorLibraryName, null);
        	worldcatSearch(isbn, secondDiv);
        }
	  }
	});
}

//
// Search the library for the specified isbn
// if we find it, call fn with the resulting library url
// otherwise call fn with null

function libSearch(isbn, newDiv) {
	//var xmlUrlDenver = "http://catalog.denver.lib.co.us/cgi-bin/cw_cgi?5100+REDIRX+useDatabase_10_w_//i" + isbn;
	var xmlUrlDenver = "http://catalog.denverlibrary.org/cgi-bin/cw_cgi?5100+REDIRX+useDatabase_10_w_//i" + isbn;
	var found = false;

	// Search Denver, get redirect info:
	GM_xmlhttpRequest({
     headers: [{'User-Agent': 'dpgm'}],
     method:"GET",
     url:xmlUrlDenver,
     onload:function(res) {


	  	var httpStart = res.responseText.indexOf("http:");
	  	if (httpStart >= 0) {
	  		var httpStr = res.responseText.substring(httpStart);
	  	   	var httpEnd = httpStr.indexOf('"');
	  	   	if (httpEnd >= 0) {
	  	    	httpStr = httpStr.substring(0, httpEnd);
	  	   	}

	  	   	// Now that we have redirect url from Denver Lib, GET that:
	  	   	GM_xmlhttpRequest({
	      	 headers: [{'User-Agent': 'dpgm'}],
		  	 method:"GET",
		  	 url:httpStr,
		  	 onload:function(res2) {

	  	        // Match on MARC record (should indicate a "hit"):
	  	   		var test = res2.responseText.indexOf('MARC');
		  		if (test > 0){
	        		found = true;
	        		getDisplayItemInfoFunction(newDiv, denverLibraryName, xmlUrlDenver);
	        	}
	        	else {
	        		getDisplayItemInfoFunction(newDiv, denverLibraryName, null);
	        		found = false;
	        	}


				// Not found in Denver, search Prospector:
	        	if (!found) {
	        		prospectorSearch(isbn, newDiv);
				 }
	  	   	}
			});
		}
		// End of if.

	}
	});

}



// Simplify making a FIRST_ORDERED_NODE_TYPE XPath call

function xpathFirst(query, node) {
    if (!node) {
	node = document;
    }

    var result = document.evaluate(query, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

    if (!result) {
	return;
    }

    return result.singleNodeValue;
}

// Simplify making an UNORDERED_NODE_SNAPSHOT_TYPE XPath call
// Return a snapshot list

function xpathAll(query, node) {
    if (!node) {
	node = document;
    }

    return document.evaluate(query, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Add global style to page

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];

    if (!head) {
	throw new Error('Could not get head element.');
    }

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// This tries a few different
// ways to get title location:
function getTitleLocation() {
    var paths = new Array();
	paths[0] = "//div[@class='buying']/b[@class='sans']";
	paths[1] = "//div[@class='content']//b[@class='sans']";
	paths[2] = "//div[@class='buying']/b[@class='asinTitle']";
	paths[3] = "//div[@class='content']/b[@class='asinTitle']";
	paths[4] = "//div[@class='buying']/h1[@class='parseasinTitle']/span[@id='btAsinTitle']";
	paths[5] = "//div[@class='content']/h1[@class='parseasinTitle']/span[@id='btAsinTitle']";

	var mainTitleSpan;
	for (i=0; i<paths.length; i++) {
		slog("Searching for main title span with: " + paths[i]);
		mainTitleSpan = xpathFirst(paths[i]);
		if (mainTitleSpan) {
			break;
		}
	}
	/*
	slog("Searching for main title span with: " + titleXPath1);
    var mainTitleSpan = xpathFirst(titleXPath1);
    if (!mainTitleSpan) {
		slog("First search for title failed.");
		slog("[2] Searching for main title span with: " + titleXPath2);
    	mainTitleSpan = xpathFirst(titleXPath2);

    	if (!mainTitleSpan) {
    		slog ("Second search for title failed.");
    		slog ("[3] Searching for main title span with: " + titleXPath3);
    		mainTitleSpan = xpathFirst(titleXPath3);
    		if (!mainTitleSpan) {
	    		slog ("3rd search for title failed.");
	    		slog ("[4] Searching for main title span with: " + titleXPath4);
	    		mainTitleSpan = xpathFirst(titleXPath4);
	    		if (!mainTitleSpan) {
		    		slog ("4th search for title failed.");
		    		slog ("[5] Searching for main title span with: " + titleXPath5);
		    		mainTitleSpan = xpathFirst(titleXPath5);
		    		if (!mainTitleSpan) {
						throw new Error('Could not get main title span.');
					}
				}
			}
		}
    }
    */
    return mainTitleSpan;
}


// Insert a div into the document that will be used for displaying item availability.
// Return this div.

function getItemAvailabilityDiv() {
	var	mainTitleSpan = getTitleLocation();


	slog("Getting parent node of main title span.");
    var parent = mainTitleSpan.parentNode;


    itemAvailabilityDiv = document.createElement('div');
	slog("ItemAvailabilityDiv=" + itemAvailabilityDiv);

    // Amazon uses two different layouts for displaying items.
    // Handle both.
	slog("Nodename: " + parent.nodeName.toUpperCase());

	if (parent.nodeName.toUpperCase()=="H1") {
		parent = parent.parentNode;
	}

    switch (parent.nodeName.toUpperCase()) {

    case "FORM":
		var authorSpan = xpathFirst('span[starts-with(string(normalize-space()), "by")]', parent);

		if( !authorSpan ) {
		    throw new Error('Could not get author span.');
		}

		var nextBr = xpathFirst('following-sibling::br', authorSpan);

		if( !nextBr) {
		    throw new Error('Could not get next br after author span.');
		}
		parent.removeChild(nextBr);
		parent.insertBefore(itemAvailabilityDiv, authorSpan.nextSibling);
		return itemAvailabilityDiv;

		break;

    case "DIV":
		if(parent.lastChild.tagName == 'br') {
			slog("Removing last child.");
	    	parent.removeChild(parent.lastChild);
		}

		parent.appendChild(itemAvailabilityDiv);
		return itemAvailabilityDiv;

		break;

    default:
		throw new Error('Did not recognize the main title span\'s parent\'s nodetype');
    }
}

// Insert a new paragraph containing the specified text into the specified div node.
// If present, we set the class attribitue of this div to classAttr.

function insertText(stubDiv, text, classAttr) {
    var p = document.createElement('p');

    if(classAttr) {
	p.setAttribute('class', classAttr);
    }

    p.innerHTML = text;

    stubDiv.appendChild(p);
}


// Clear contents of the specified div node

function clearText(stubDiv) {
    stubDiv.innerHTML = '';
}

// Get the isbn for the amazon item we are currently browsing.
// Return null if no isbn can be found.

function getIsbn() {
    //var match = window.location.href.match(/\/(\d{7,9}[\d|X])\//);
    slog("About to look for ISBN.");
    var match = window.location.href.match(/\/(\d{7,9}[\d|X])(\/|$)/);
    if (!match) {
    	slog("No ISBN match!");
    	return;
    }
    var isbn = match[1];
    slog("ISBN: " + isbn);
    return isbn;
}


// Return a function that displays a message within the specified div
// regarding availablility of the current book.
//
// The function returned expects a library url for this item and will
// display a message saying the item is available if passed such a url.
// It will display a message saying the item is unavailable if passed
// a null value.

function getDisplayItemInfoFunction(stubDiv, libName, libUrl) {
	clearText(stubDiv);

	if(!libUrl) {

	    insertText(stubDiv, 'Unavailable at ' + libName + '.', 'libraryUnavailable');
	    return;
	}

	insertText(stubDiv,
		   '<a href="' + libUrl + '" title="'+libName+' information for this item">Available at ' + libName + ' </a>',
		   'libraryAvailable');
}


// Return spinner image source

function getSpinnerSrc() {

    var spinnerImgSrc = "data:image/gif,GIF89a%10%00%10%00%E6%00%00%FF%FF%FF%FE%FE%FE%A3%A3%A3%FD%FD%FD%E9%E9%E9%B5%B5%B5%F9%F9%F9%FA%FA%FA%F5%F5%F5%FC%FC%FC%AB%AB%AB%ED%ED%ED%C0%C0%C0%B1%B1%B1%C7%C7%C7%E5%E5%E5%F4%F4%F4%B4%B4%B4%F7%F7%F7%C1%C1%C1%CF%CF%CF%E6%E6%E6%03%03%03%E4%E4%E4%DF%DF%DF%C4%C4%C4%EE%EE%EE%9A%9A%9A%C2%C2%C2%D4%D4%D4%E2%E2%E2%3C%3C%3C%A8%A8%A8%B0%B0%B0%F2%F2%F2%AD%AD%AD%B2%B2%B2%DB%DB%DB%AA%AA%AA%D9%D9%D9%D7%D7%D7%BB%BB%BB%26%26%26%CD%CD%CD%D8%D8%D8%B9%B9%B9%9E%9E%9E%CB%CB%CB%AE%AE%AE%FB%FB%FB%EC%EC%ECRRR%EA%EA%EA%85%85%85%F6%F6%F6JJJ%DC%DC%DC%0C%0C%0C%D1%D1%D1%A4%A4%A4)))%E7%E7%E7%5D%5D%5D%BD%BD%BD%A7%A7%A7%CC%CC%CC%B7%B7%B7%F1%F1%F1%D0%D0%D0YYYfff%CA%CA%CA%A6%A6%A6%F0%F0%F0%E0%E0%E0%B8%B8%B8%BF%BF%BF%E8%E8%E8%F3%F3%F3%C8%C8%C8zzz%A5%A5%A5%BE%BE%BENNN%C3%C3%C3%C6%C6%C6%C5%C5%C5%14%14%14jjj%DD%DD%DD%F8%F8%F8%D6%D6%D6%BA%BA%BA%BC%BC%BC%90%90%90nnn%1C%1C%1C%DE%DE%DE%96%96%96%82%82%82%8C%8C%8C%89%89%89aaatttTTT%87%87%87%93%93%93FFF%8E%8E%8EWWW%7F%7F%7F222www%DA%DA%DA%7C%7C%7C666qqqAAAlll%94%94%94xxx%A1%A1%A1%A2%A2%A2---%23%23%23%80%80%80%D2%D2%D2%AC%AC%AC!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%10%00%10%00%00%07%C8%80%00%82%00%03%82-h%09%83%8A%82%15_%1D%00%1BW%09%07-%25%8B%00Mo%3E%00j%60%00%14%02%3D%8A%15%04%00%11%3C%3Fe%7C%2B%3B%2F%00%07%04%01%03cE%3F%08%3E%5E%3A%05Q!6%15%11%20%12%00%1853p6Z%82%93O%02%05%17%8A%2FQ%85%8A%1D%2C%83)%3BQ%20%1E%97%10%0E%13%0CG%40l%5Eba%97%22-%24%0DR%83%17%3A%01%8B%18%CF%83%12%19%1B%7F1%8B%3F%02T%22%00%01%96%08%08%E2%AD%03%84!J%BA%20%60%01%C4%84%01%00%25*%00%20%20%E0%C4%8B%02%0F%04l%01%90%E4%C44%00%06HD%08%90a%04%00%2BQ4%5C%22%A0%E0%01%00%0E%0A%02%20%80%81%E2R%00a%00V%A4%88g%20%91%A0%40%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%0D%00%0B%00%00%07o%80%00%82%00%03%82%1Bt%85%83%82%17p8%00_s%03Z7L%832%3En%00g%1F%00w%16%0E%00%0F%1A%00%1Ch%1CP7'%16t%84bcA%12r.%3A%0C%20*2%15%00%15%02rb%12%07%82%07%22K%02%83%5B%5C%01%8A%00%1D%2CA%3FB%05%3D%CA%00%10%0E%13%0D%0D%05M%D3%22-%83%0Ba%C9%8A%18%17%00%06%14H!1%CA%3F%02%81%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%10%00%08%00%00%07d%80%00%82%00%03%82%0Ad%85%83%8A%00%3Db%0F%00ef%03N%3E%5D%8B%00Ic.%00lF%9C%3CT%8A%04N%00DP%1D%1BX(%3C5%00%06Y%01%03%11%20q%06%1B%5C%18A%0Dk2%1DE9%1A%00%1A%0C%02%11%061%82%09%10r%16o%05%01%83%17D%D0%8Aiw%83%2B%0C%13U%0B%97M%1BL%0CG%81%00!%F9%04%04%05%00%00%00%2C%03%00%00%00%0D%00%0A%00%00%07g%80%00%01%00%00R%40%03%84%89%002%05%04%00Hi%03%08cD%89%08%26%05%00%20e%00%02S%3A%8A%18z(%23d83.%00%10%18%018%07%5CT%17(Lv2VSu6%02B1%09%84%09%08n%3C3%3F%01%17D%83%8A%1B%40%89U%0B%8A%84%17idb0%05M%D0%008%1F%3C*S%0Ba%C9%89!%5D%89%81%00!%F9%04%04%05%00%00%00%2C%05%00%00%00%0B%00%0E%00%00%07y%80%00%00%3AL%01%82%87%00%0B%00%1C%26%01%12.%1D%87)%00%19%40%00-P8%87%02%1E%0Ey%17r%05%006%1E%01%5C%1428A%5EI%14_%3E61%09%82%03Zb3gA%01%86%88%23%A2%88%88Mc_Xd%C0%00%1EE7k_%BC%87%24%0E%871%88%017%7Cy%8A%0E%1D%10C%2CF%17wWmZ%02'%2F%05%0FzR%00%5B%1B%09%11%01%19%23%00VQ%8A%82%81%00!%F9%04%04%05%00%00%00%2C%08%00%01%00%08%00%0F%00%00%07b%80%0A%01%07-%25%00%87%23%00%14%02%15%87%00!2%3B%2F%00Z%17%01%0FY!Nqjc6%00%03%06%23Pb%2C%8E%00%1CO%A7%87%0B%1Be5.%8E%3DP_ve%8E%05V%AB%01f*gJ%00%17%26m%04%02oo6dK%16%05%00q%24%03%89%3E%7C%04%8E%82%17%60%CD%87)%01%00%22%09%8E%81%00!%F9%04%04%05%00%00%00%2C%06%00%02%00%0A%00%0E%00%00%07m%80%00%19%23%00%14%02%3D%00%89%1E%0E!2%3B%2F%00%07%04%01%142%0FY!6%15%11%20%12%09%89%03%07O%02!%18%89%A7%00G%90%A8%A7%1A%23H%3B%05%AC2%1B%5E%5EH%AC%1C%2B%AC%89%01c3d%0F%00%3BJqBf%04%05EfZ!_m%0E*.%00%1EG%03%03%3ES%00g%3C(%A8hS%01%15kR%A8Pp%03%00%9E%A7%81%00!%F9%04%04%05%00%00%00%2C%03%00%05%00%0D%00%0B%00%00%07r%80%02B1%09%00%00%03%07O%02%05%17%00%17D%01%86%92%1D%2C%92U%0B%92%92%10%0E%13%0CG%05M%99%86%1A%26%0A!R%0B%2C%91%99D(%92Hm%08%99%01zP%202%00-%1EFb%17%18%19n%1AG%7D5Z%00%13%60%11ch%2B3!%00%04D%03%1A%3Cp%03gu%00j3a%96%1F8%00_s%032FU%92%03%B2%00%5EX%85Z%85%86%81%00!%F9%04%04%05%00%00%00%2C%00%00%08%00%10%00%08%00%00%07e%80%13%0D%0D%40(%00%87%88%22-%24%0DR%88%14%02%03%88%87%18%17%93CP9%7B6%93%00)%02T%22%00%09%1F9%1B%04P%1B4%3D%1D%1B%22(%40%26%06%00KY%00G*%0A%1Bg'P%1C%00I'%92%87C7S%03%5Ef%00%23r%15%9D%00%1Ds%13%00d%3E%01Ie%2F%CF%01%10%87%3Bc%92Z%09%88%81%00!%F9%04%04%05%00%00%00%2C%00%00%06%00%0D%00%0A%00%00%07d%80%00%82V%1B%03%82%87%1D%2CP33fA%87%87%10%0E%7DEmE%19%90%82%22-%87%2C%24%86%90%18%17%00Cd%7Bu%12%99%3F%02%03F%7Ce%3Db%7F%0B2(%5D%08%2C%00G%98%1D3K!j%25y%5B%90%10_t%01%20e%00%3FQ%1A%87%17F%2B%00H5%01%220(%87%01%A9%00).%86%06%09%81%00!%F9%04%04%05%00%00%00%2C%00%00%03%00%0B%00%0D%00%00%07r%80%00O%18%00%3A%02%1E%0E!2%3B%03%3EW.%22X%192%0FY!%00Ml%7CsN1%00%00%03%07%9F%00%0Ed%03%A3%9F%5EX_p%1D%A8%9Fxk7hG%AF%A8%25%0C%A7%AF%10HmF%06%AF%03nS.%0B%0D%0CCCJ%5D%00%14%14%00%18P%0EL%05%0F%02%A36%5Ej%01%3F%23%00V%A3%0F5'%00%13%0A%01%08%A3%01%12%9F%2B)%01%00%81%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%08%00%0F%00%00%07a%80%00%82%00%09%82%3A%838o%87%1C%83C%7Cu%00%19%00(%1E%00U%16!%0D%033s%0A%08hP'%93X*h%08%07%83%00%1C%5E%03%82%3Bedj%25%83dXXg(%A9%82%17D%01%83%12)ne%A8%00%03%1BP%05I%19%1D%10%00~q%00%3D%02'%2F%83%06%24%11%01%92%82%04%0A%0F%AA%81%00%3B";

    return spinnerImgSrc;

}


if (!GM_xmlhttpRequest || !GM_log) {
    alert('The Denver County Public Library Lookup script requires Greasemonkey 0.5.3 or higher.  Please upgrade to the latest version of Greasemonkey.');
    return;
}

addGlobalStyle('.stub { height: 1em; margin: 1em; } .libraryAvailable { font-weight:bold; } .libraryUnavailable { color: rgb(153,0,0)} ');



// CD or DVD?
if (isDVD() || isCD() || isVHS()) {
	//GM_log("This page is probably a DVD or CD.");
	var itemAvailabilityDiv = getItemAvailabilityDiv();

	if (!itemAvailabilityDiv) {
		throw new Error('Could not get item availability stub');
	}

	itemAvailabilityDiv.setAttribute('class', 'stub');
	// Get title:
	//var title = document.evaluate('//div[@class="buying"]//b[@class="sans"]', document, null, XPathResult.STRING_TYPE, null).stringValue;
	//var titleLocation = document.evaluate("//div[@class='buying']/b[@class='sans']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	//var titleLocation = document.evaluate(titleXPath1, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	var titleLocation = getTitleLocation();

	if (titleLocation) {
		var title = titleLocation.textContent;
		slog("Title: '" + title + "'.");

    	// Remove junk from title as best we can:
    	title = parseTitle(title);
    	slog("Parsed title: '" + title + "'.");
    	var url = "http://catalog.denverlibrary.org/cgi-bin/cw_cgi?5100+REDIRX+useDatabase_10_w_//w";
		var itemType = "";

		// Check to see if it's a DVD or CD:
    	if (isDVD()) {
    		//GM_log("Is DVD!");
    		url += title + " qDVDs";
    		itemType = "DVD";
    	}
		else if (isCD()) {
			//GM_log("Is CD!");
			url += title + " qcds";
			itemType = "CD";
		}
		else if (isVHS()) {
			slog("Is VHS!");
			url += title + " qvideos";
			itemType = "VHS";
		}
		//GM_log("Inserting link...");
    	insertItemSearchText(itemAvailabilityDiv, "Denver Library", url, itemType);
    }
    else {
    	slog("Can't find title!");
    }

}
// Maybe it's a book?
else {
    var isbn = getIsbn();

	if(isbn) {
		slog("Could be a book. Likely ISBN: " + isbn);
	    var itemAvailabilityDiv = getItemAvailabilityDiv();

	    if (!itemAvailabilityDiv) {
			throw new Error('Could not get item availability stub');
	    }

	    itemAvailabilityDiv.setAttribute('class', 'stub');
   		slog("About to insert spinner...");
	    insertText(itemAvailabilityDiv, '<img src="' + getSpinnerSrc() + '" alt="Spinner" /> Searching for this edition at ' + denverLibraryName + '.');
	    libSearch(isbn, itemAvailabilityDiv);
	}
}



