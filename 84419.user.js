// ==UserScript==
// @name           utkonos kg price
// @namespace      ra
// @description    Цена в килограммах на сайте Утконоса
// @include        http://utkonos.ru/*
// @include        http://www.utkonos.ru/*
// @include        http://shop.utkonos.ru/*
// ==/UserScript==

//getElementsBySelector idea found at http://simonwillison.net/2003/Mar/25/getElementsBySelector/

/* document.getElementsBySelector(selector)
   - returns an array of element objects from the current document
     matching the CSS selector. Selectors can contain element names, 
     class names and ids and can be nested. For example:
     
       elements = document.getElementsBySelect('div#main p a.external')
     
     Will return an array of all 'a' elements with 'external' in their 
     class attribute that are contained inside 'p' elements that are 
     contained inside the 'div' element which has id="main"

   New in version 0.4: Support for CSS2 and CSS3 attribute selectors:
   See http://www.w3.org/TR/css3-selectors/#attribute-selectors

   Version 0.4 - Simon Willison, March 25th 2003
   -- Works in Phoenix 0.5, Mozilla 1.3, Opera 7, Internet Explorer 6, Internet Explorer 5 on Windows
   -- Opera 7 fails 
*/

function getAllChildren(e) {
  // Returns all children of element. Workaround required for IE5/Windows. Ugh.
  return e.all ? e.all : e.getElementsByTagName('*');
}

function getElementsBySelector (document,selector) {
  // Attempt to fail gracefully in lesser browsers
  if (!document.getElementsByTagName) {
  	//alert("!document.getElementsByTagName");
    return new Array();
  }
  // Split selector in to tokens
  var tokens = selector.split(' ');
  var currentContext = new Array(document);
  for (var i = 0; i < tokens.length; i++) {
    token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');;
    if (token.indexOf('#') > -1) {
      // Token is an ID selector
      var bits = token.split('#');
      var tagName = bits[0];
      var id = bits[1];
      var element = document.getElementById(id);
      if (tagName && element.nodeName.toLowerCase() != tagName) {
        // tag with that ID not found, return false
        return new Array();
      }
      // Set currentContext to contain just this element
      currentContext = new Array(element);
      continue; // Skip to next token
    }
    if (token.indexOf('.') > -1) {
      // Token contains a class selector
      var bits = token.split('.');
      var tagName = bits[0];
      var className = bits[1];
      if (!tagName) {
        tagName = '*';
      }
      // Get elements matching tag, filter them for class selector
      var found = new Array;
      var foundCount = 0;
      for (var h = 0; h < currentContext.length; h++) {
        var elements;
        if (tagName == '*') {
            elements = getAllChildren(currentContext[h]);
        } else {
            elements = currentContext[h].getElementsByTagName(tagName);
        }
        for (var j = 0; j < elements.length; j++) {
          found[foundCount++] = elements[j];
        }
      }
      currentContext = new Array;
      var currentContextIndex = 0;
      for (var k = 0; k < found.length; k++) {
        if (found[k].className && found[k].className.match(new RegExp('\\b'+className+'\\b'))) {
          currentContext[currentContextIndex++] = found[k];
        }
      }
      continue; // Skip to next token
    }
    // Code to deal with attribute selectors
    if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
      var tagName = RegExp.$1;
      var attrName = RegExp.$2;
      var attrOperator = RegExp.$3;
      var attrValue = RegExp.$4;
      if (!tagName) {
        tagName = '*';
      }
      // Grab all of the tagName elements within current context
      var found = new Array;
      var foundCount = 0;
      for (var h = 0; h < currentContext.length; h++) {
        var elements;
        if (tagName == '*') {
            elements = getAllChildren(currentContext[h]);
        } else {
            elements = currentContext[h].getElementsByTagName(tagName);
        }
        for (var j = 0; j < elements.length; j++) {
          found[foundCount++] = elements[j];
        }
      }
      currentContext = new Array;
      var currentContextIndex = 0;
      var checkFunction; // This function will be used to filter the elements
      switch (attrOperator) {
        case '=': // Equality
          checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue); };
          break;
        case '~': // Match one of space seperated words 
          checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('\\b'+attrValue+'\\b'))); };
          break;
        case '|': // Match start with value followed by optional hyphen
          checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))); };
          break;
        case '^': // Match starts with value
          checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0); };
          break;
        case '$': // Match ends with value - fails with "Warning" in Opera 7
          checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length); };
          break;
        case '*': // Match ends with value
          checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1); };
          break;
        default :
          // Just test for existence of attribute
          checkFunction = function(e) { return e.getAttribute(attrName); };
      }
      currentContext = new Array;
      var currentContextIndex = 0;
      for (var k = 0; k < found.length; k++) {
        if (checkFunction(found[k])) {
          currentContext[currentContextIndex++] = found[k];
        }
      }
      // alert('Attribute Selector: '+tagName+' '+attrName+' '+attrOperator+' '+attrValue);
      continue; // Skip to next token
    }
    // If we get here, token is JUST an element (not a class or ID selector)
    tagName = token;
    var found = new Array;
    var foundCount = 0;
    for (var h = 0; h < currentContext.length; h++) {
      var elements = currentContext[h].getElementsByTagName(tagName);
      for (var j = 0; j < elements.length; j++) {
        found[foundCount++] = elements[j];
      }
    }
    currentContext = found;
  }
  return currentContext;
}

/* That revolting regular expression explained 
/^(\w+)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/
  \---/  \---/\-------------/    \-------/
    |      |         |               |
    |      |         |           The value
    |      |    ~,|,^,$,* or =
    |   Attribute 
   Tag
*/

var productcells = getElementsBySelector(document,"td.description");
//alert(elems.length);
for(i=0;i<productcells.length;++i)
{
	var productcell = productcells[i];
	
	var titleas = getElementsBySelector(productcell,"div.title a");
	if( 0 == titleas.length ) continue;
	var titletext = titleas[0].innerHTML;
	var weightmatch = titletext.match(/((\d+[.,]?\d*)\s*(литр|лист|метр|л|г|мл|кг|шт|дес)|десяток)/i);
	var weightmeasure = '[Неизв. ЕИ]';
	var weight = 0;
	if( weightmatch )
	{
		if( 'десяток' == weightmatch[1].toLowerCase() )
		{
			weight = 1;
			weightmeasure = 'десяток';
		}
		else
		{
			weight = +(weightmatch[2].replace(',','.'));
			weightmeasure = weightmatch[3].toLowerCase();
			if( 'г' == weightmeasure )
			{
				weight /= 1000;
				weightmeasure = 'кг';
			}
			if( 'мл' == weightmeasure )
			{
				weight /= 1000;
				weightmeasure = 'литр';
			}
			if( titletext.match(/яйцо/i) && 'шт' == weightmeasure)
			{
				weight /= 10;
				weightmeasure = 'десяток';
			}
		}
	}
	
	var pricespans = getElementsBySelector(productcell,"div.price span.price_value");
	if( 0 == pricespans.length ) continue;
	var pricetext = pricespans[0].innerHTML;
	var pricematch = pricetext.match(/(\d+\.?\d*)|(\.\d+)/);
	var price=0;
	if( pricematch )
		price = +(pricematch[0].replace(',','.'));
		
	var pricemeasure = "[Неизв. ден. ед.]";
	var pricemeasurespans = getElementsBySelector(pricespans[0],"span.rub");
	if( pricemeasurespans.length > 0 )
	{
		pricemeasure = pricemeasurespans[0].innerHTML;
	}

	var newdiv = document.createElement('div');
	newdiv.setAttribute('class','article');
	if( !weightmatch )
		newdiv.innerHTML = 'Не удалось определить массу (объём) из названия.';
	else if( 0 == weight )
		newdiv.innerHTML = 'Нулевая масса (ошибка).';
	else if( !pricematch )
		newdiv.innerHTML = 'Не удалось определить цену.';
	else
	{
		if(pricetext.match(/за кг/))
			weight = 1000;
		realprice = price / weight + 1e-13;
		newdiv.setAttribute('title',realprice.toFixed(2));
		newdiv.innerHTML = '<b>'
			+ ((Math.round(realprice)<10)?realprice.toFixed(2):Math.round(realprice))
			+ '</b> '+pricemeasure+' за '+weightmeasure;
	}
	productcell.appendChild( newdiv );
	//break;
}
/**/