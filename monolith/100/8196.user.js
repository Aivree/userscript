// ==UserScript==
// @name             Sweet Homepage
// @namespace    myspace.com
// @description     Customizes your MySpace HomePage
// @include           http://*myspace.com/*=user
// @include           http://*myspace.com/*=user&*
// ==/UserScript==

if(location.href.match(/collect.*=user.*[^(commentForm)]*/)) location.href = 'http://myspace.com/index.cfm?fuseaction=user';

s  = "body{background:url(http://img116.imageshack.us/img116/2759/mylineeh3.png) center repeat-y #FFF!important;}\n";
s+= "#header,#home_additionalLinks,#home_userURLInfo,#home_setHomePage,#home_schools,#home_searchAddressBook,#splash_coolNewPeople,#splash_profile,th,#footer{display:none;}\n";
s+= "div, table, tr, td, .heading{color:#00FF00!important; background-color:transparent!important;border:0px!important;}\n";
s+= "#home_image a, #topnav a{font-size:9px!important;}\n";
s+= "*{font-family:Courier New, Courier, mono!important;font-size:11px!important; font-weight:normal!important;}\n";
s+= "#topnav{background:#444!important;padding-top:55px!important;}\n";
s+= "a{color:#FFFFFF!important;text-decoration:none!important;}\n";
s+= "a:hover{color:#FFFFFF!important;}\n";
s+= "#topnav a{color:#FFFFFF!important;}\n";
s+= "#topnav a:hover{color:silver!important;}\n";
s+= ".heading{border-bottom: 1px solid #444444!important; height:20!important; padding-bottom:0px!important; padding-top:0px!important;}\n";
s+= "#home_infoBar span{color:#FFF;}\n";
s+= "#home_infoBar{position:relative;left:6px;}\n";
s+= "#main{min-height:0!important;height:0px!important}\n";
s+= ".indicator span {color:inherit!important;}\n";
s+= "#ctl00_Main_ctl00_Bulletins1_HyperLink2{position:relative; top:10px;}\n";
s+= "*::-moz-selection{background:#00FF00;color:#000;}\n";

document.getElementById('squareAd').innerHTML = '<img src="http://a183.ac-images.myspacecdn.com/images01/13/l_e0ba389eb4a55573d4fb7b22dace48ae.jpg" width="300" height="250"/>';
html = document.body.innerHTML.replace(/Hello,/, "Wuddup,"); 
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/classifieds.myspace.*Classifieds/, 'viewmorepics.myspace.com/index.cfm?fuseaction=signout">PeaceOut');
document.body.innerHTML = html;

GM_addStyle(s);