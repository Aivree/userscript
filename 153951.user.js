// ==UserScript== 
// @name           clipr-fetise
// @namespace      fetise@clipr
// @description    Clipr Button on Fetise
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        *fetise.com*
// ==/UserScript==

$(document).ready(function() {

$('head').prepend('<style type="text/css">	.clip-button {		background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #00406e), color-stop(1, #002640) );		background:-moz-linear-gradient( center top, #00406e 5%, #002640 100% );		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#00406e", endColorstr="#002640");		background-color:#00406e;		-moz-border-radius:6px;		-webkit-border-radius:6px;		border-radius:6px;		border:1px solid #000000;		display:inline-block;		color:#ffffff;		font-family:"Times New Roman",Georgia,Serif;		font-size:15px;		font-weight:normal;		padding:2px 11px;		text-decoration:none;	}.clip-button:hover {		background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #002640), color-stop(1, #00406e) );		background:-moz-linear-gradient( center top, #002640 5%, #00406e 100% );		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#002640", endColorstr="#00406e");		background-color:#002640;	}.clip-button:active {		position:relative;		top:1px;	}	/* This imageless css button was generated by CSSButtonGenerator.com */	</style>');
$('.FetiseTopShare tr').append('<td align="left" class="FetiseTopClip">                                 <a href="#" class="clip-button" style="color:#ffffff; float:left; width:40px;text-align:center;line-height:15px;margin-left:10px ">Clip it</a>                       </td>') ;
});