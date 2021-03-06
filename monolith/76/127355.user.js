// ==UserScript==
// @name           kaskusBetaFixSakitMata
// @namespace      adamantoise
// @version 	   1.2.1
// @description    fix kaskus beta color which causes sakit mata
// @include        http://livebeta.kaskus.us/*
// What it does: 
//  -Change post text color from grey to black
//  -Change post background color from white to vbulletin's blue
//  -Change post header background to dark blue
//
// Changelog:
// V 1.2.1
// text selection color fix
//
// v 1.2
// only post text using verdana
// visited link color removed
// 
// v 1.1.2
// minor adjustments
//
// v 1.1.1
// Forum padding right decreased
// Font size for post link, meta and stat decreased
//
// v 1.1
// Font type: verdana, dkk
// Font size: 10pt
// Forum thread link color: black
// Forum thread link visited color: grey
// Rate info: black, no shadow
//
// v 1.0.1
//  -Change background color darker(same as old kaskus)
// ==/UserScript==
GM_addStyle("body { color: black; background-color:#EAE5CE; }  a:visited {color:none !important} #breadcrumb-wrap{color:black;} #breadcrumb-wrap a:visited{color:rgb(33, 100, 183);} .post-entry{background-color: #F5F5FF;} .post-header{background-color:#457BB7 !important; background-image:none !important;} .link_thread_title {color:black !important; } .rate span {color:black !important; text-shadow:none !important;}  .entry-content{font-family:verdana,geneva,lucida,arial,helvetica,sans-serif !important; font-size:100% !important;}  .post-title a, .post-content a{color:black !important} .reputation-table a:visited{color:rgb(33, 100, 183) !important;} ::selection{background:#3396fe; color:white}::-moz-selection{background:#3396fe; color:white}");