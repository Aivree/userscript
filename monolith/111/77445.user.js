// ==UserScript==
// @name          The West BBcode Ro - by mateusz9070
// @namespace     YaD
// @description   Best bb codes for the forum.
// @include       http://*.the-west.*/*
// @include       http://zz1w1.tw.innogames.net/game.php*
// @include       http://*.tw.ignames.net/game.php*
// ==/UserScript==
      
      // ======== Variables globales del juego ========
      
      // http://s03.radikal.ru/i176/0909/6a/4138ab37110a.png - fort
      // http://i064.radikal.ru/0909/ce/7988d649bac4.png  -del
      
      var TW_Use_Cache  = true;
      var TW_Image_Base = "/graphic/";
      var TW_World      = null;
      var TWT_World     = null;
      var TW_Domain     = null;
      var TW_DotWhat    = null;
      var TW_Hash       = null;
      var TW_Screen     = null;
      var TW_Mode       = null;
      var TW_Is_Premium = false;
      var TW_Quickbar   = null;
      var TW_Village_Id = null;
      var TW_Player_Id  = null;
      var TW_Villages   = null;
      var TW_Lang       = null;
      var TW_Mpt        = null;
      var TW_Is_Opera   = window.opera ? true : false;
      
      
      // ======== Hagamos los cambios ========
      
      (function(){

      	if (location.href.match( /forum\.php/ )) {
      		CambiaForo();
      		return;
      	}

      	if (location.href.match( /messages/ )) {
      		CambiaCuadroTexto();
      		//return;
      	}

      })();

      function CambiaForo() {
      	
      	var adframes = $$("iframe");
      	for (i = 0; i < adframes.length; i++) {
      		adframes[i].src = 'about:blank';
      	}
      	var posts = $$("div");
      	for (i = 0; i < posts.length; i++) {
      		if (posts[i].innerHTML.match(/<iframe/,"gi") != null) {
      			posts[i].style.display = "none";
      		}
      	}
      	
      	CambiaCuadroTexto();
      }
      
      function CambiaCuadroTexto() {
      
      	var body = $$("body");
      
      	var random = new Date;
      	random = random.getTime();
      
      	var xhtml = "<table class='bbcodearea'> " +
      		    "<tr>    " +
		    '	<td>|</td>' + 
      		    '	<td><a tabindex="10" href="javascript:insertBB(\'player\','+random+');"><img src="http://yad.wz.cz/ext/t-w/player.png" alt="Player" /></a></td>' +
      		    '	<td><a tabindex="11" href="javascript:insertBB(\'town\','+random+');"><img src="http://yad.wz.cz/ext/t-w/city.png" alt="Town" /></a></td>' +
      		      '	<td><a tabindex="12" href="javascript:insertBB(\'fort\','+random+');"><img src="http://s03.radikal.ru/i176/0909/6a/4138ab37110a.png" alt="Fort" /></a></td>' +
		    '   <td>|</td>'+
      		    '	<td><a tabindex="13" href="javascript:insertBB(\'b\','+random+');"><img src="http://yad.wz.cz/ext/t-w/b.png" alt="Bold" /></a></td>' +
      		    '	<td><a tabindex="14" href="javascript:insertBB(\'i\','+random+');"><img src="http://yad.wz.cz/ext/t-w/i.png" alt="Cursive" /></a></td>' +
      		    '	<td><a tabindex="15" href="javascript:insertBB(\'u\','+random+');"><img src="http://yad.wz.cz/ext/t-w/u.png" alt="Podciarknute" /></a></td>' +
      		     '	<td><a tabindex="16" href="javascript:insertBB(\'del\','+random+');"><img src="http://i064.radikal.ru/0909/ce/7988d649bac4.png" alt="Del" /></a></td>' +
      		    '	<td>|</td>' +
      		    '	<td><a tabindex="17" href="javascript:insertBB(\'quote\','+random+');"><img src="http://www.offthemap.com/images/site/blockquote.jpg" alt="Cita" /></a></td>' +
      		    '	<td><a tabindex="18" href="javascript:insertBB(\'url\','+random+');"><img src="http://yad.wz.cz/ext/t-w/url.png" alt="URL" /></a></td>' +
      		    '	<td><a tabindex="19" href="javascript:insertBB(\'img\','+random+');"><img src="http://yad.wz.cz/ext/t-w/img.png" alt="Imagen" /></a></td>' +
		    '	<td>|</td>' +
		    '	<td><a tabindex="20" href="javascript:insertBB(\'large text\','+random+');"><img src="http://forum.tribalwars.net/images/icons/icon14.gif" /></a></td>' +
		    '	<td><a tabindex="21" href="javascript:insertBB(\'small_text\','+random+');"><img src="http://forum.tribalwars.net/images/icons/icon13.gif" /></a></td>' +


'	<td><a tabindex="25" href="javascript:insertBB(\'code\','+random+');"><img src="http://s02.radikal.ru/i175/0909/bb/d4cca2872746.jpg" /></a></td>' +
		    
		    
		    
		    
		    '	<td>|</td>' +
		    '	<td><a tabindex="26" href="javascript:insertBB(\'white text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/white.png" /></a></td>' +
		    '	<td><a tabindex="27" href="javascript:insertBB(\'black text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/black.png" /></a></td>' +	
		    '	<td><a tabindex="28" href="javascript:insertBB(\'red text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/red.png" /></a></td>' +	
		    '	<td><a tabindex="29" href="javascript:insertBB(\'yellow text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/yellow.png" /></a></td>' +
		    '	<td><a tabindex="30" href="javascript:insertBB(\'green text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/green.png" /></a></td>' +
		    '	<td><a tabindex="31" href="javascript:insertBB(\'cyan text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/cyan.png" /></a></td>' +
		    '	<td><a tabindex="32" href="javascript:insertBB(\'blue text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/blue.png" /></a></td>' +
		    '	<td><a tabindex="33" href="javascript:insertBB(\'violet text\','+random+');"><img src="http://yad.wz.cz/ext/t-w/violet.png" /></a></td>' +
		    '	<td>|</td>' +
      		    "</tr>   " +
		    '	<td>|</td>' +
                    '	<td><a tabindex="34" href="javascript:insertBB(\'smily lol\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif" /></a></td>' +
                    '	<td><a tabindex="35" href="javascript:insertBB(\'smily smile\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif" /></a></td>' +
                    '	<td><a tabindex="36" href="javascript:insertBB(\'smily idea\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif" /></a></td>' +
                    '	<td><a tabindex="37" href="javascript:insertBB(\'smily wink\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif" /></a></td>' +
                    '	<td><a tabindex="38" href="javascript:insertBB(\'smily evil\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif" /></a></td>' +
		    '	<td><a tabindex="39" href="javascript:insertBB(\'smily twisted\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif" /></a></td>' +
                    '	<td><a tabindex="40" href="javascript:insertBB(\'smily eek\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif" /></a></td>' +
                    '	<td><a tabindex="41" href="javascript:insertBB(\'smily surprised\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif" /></a></td>' +
                    '	<td><a tabindex="42" href="javascript:insertBB(\'smily cry\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif" /></a></td>' +
                    '	<td><a tabindex="43" href="javascript:insertBB(\'smily smile2\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif" /></a></td>' +
		    '	<td><a tabindex="44" href="javascript:insertBB(\'smily cool\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif" /></a></td>' +
		    '	<td><a tabindex="45" href="javascript:insertBB(\'smily sad\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif" /></a></td>' +
                    '	<td><a tabindex="46" href="javascript:insertBB(\'smily confused\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif" /></a></td>' +
		    '	<td><a tabindex="47" href="javascript:insertBB(\'smily rolleyes\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif" /></a></td>' +
		    '	<td><a tabindex="48" href="javascript:insertBB(\'smily briggin\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif" /></a></td>' +
		    '	<td><a tabindex="49" href="javascript:insertBB(\'smily redface\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif" /></a></td>' +
		    '	<td><a tabindex="50" href="javascript:insertBB(\'smily razz\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif" /></a></td>' +
		    '	<td><a tabindex="51" href="javascript:insertBB(\'smily neutral\','+random+');"><img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif" /></a></td>' +
		    '	<td><a tabindex="52" href="javascript:insertBB(\'smily usmiech\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/usmiech.gif" /></a></td>' +
			'	<td><a tabindex="53" href="javascript:insertBB(\'smily smutny\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/smutny.gif" /></a></td>' +
            '	<td>|</td>' +
			"</tr>   " +
			'	<td>|</td>' +
			'	<td><a tabindex="54" href="javascript:insertBB(\'smily usmiech5\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/usmiech5.gif" /></a></td>' +
			'	<td><a tabindex="55" href="javascript:insertBB(\'smily jezykk\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/jezykk.gif" /></a></td>' +
			'	<td><a tabindex="56" href="javascript:insertBB(\'smily zly\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/zly.gif" /></a></td>' +
			'	<td><a tabindex="57" href="javascript:insertBB(\'smily wnik\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/wnik.gif" /></a></td>' +
			'	<td><a tabindex="58" href="javascript:insertBB(\'smily kwasny2\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/kwasny2.gif" /></a></td>' +
			'	<td><a tabindex="59" href="javascript:insertBB(\'smily zonk2\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/zonk2.gif" /></a></td>' +
			'	<td><a tabindex="60" href="javascript:insertBB(\'smily o\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/o.gif" /></a></td>' +
			'	<td><a tabindex="61" href="javascript:insertBB(\'smily niekumaty\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/niekumaty.gif" /></a></td>' +
			'	<td><a tabindex="62" href="javascript:insertBB(\'smily twarz\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/twarz.gif" /></a></td>' +
			'	<td><a tabindex="63" href="javascript:insertBB(\'smily cool2\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/cool.gif" /></a></td>' +
			'	<td><a tabindex="64" href="javascript:insertBB(\'smily cmok\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/cmok.gif" /></a></td>' +
			'	<td><a tabindex="65" href="javascript:insertBB(\'smily usmiech4\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/usmiech4.gif" /></a></td>' +
			'	<td><a tabindex="66" href="javascript:insertBB(\'smily twarz2\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/twarz2.gif" /></a></td>' +
			'	<td><a tabindex="67" href="javascript:insertBB(\'smily krzywy\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/krzywy.gif" /></a></td>' +
			'	<td><a tabindex="68" href="javascript:insertBB(\'smily spi\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/spi.gif" /></a></td>' +
			'	<td><a tabindex="69" href="javascript:insertBB(\'smily zonk\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/zonk.gif" /></a></td>' +
			'	<td><a tabindex="70" href="javascript:insertBB(\'smily niepewny\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/niepewny.gif" /></a></td>' +
			'	<td><a tabindex="71" href="javascript:insertBB(\'smily foch\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/foch.gif" /></a></td>' +
			'	<td><a tabindex="72" href="javascript:insertBB(\'smily woot\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/woot.gif" /></a></td>' +
			'	<td><a tabindex="73" href="javascript:insertBB(\'smily lol2\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/lol2.gif" /></a></td>' +
			'	<td><a tabindex="74" href="javascript:insertBB(\'smily devil\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/devil.gif" /></a></td>' +
			'	<td><a tabindex="75" href="javascript:insertBB(\'smily pirat\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/pirat.gif" /></a></td>' +
			'	<td><a tabindex="76" href="javascript:insertBB(\'smily serduszka\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/serduszka.gif" /></a></td>' +
			'	<td><a tabindex="77" href="javascript:insertBB(\'smily ziewa\','+random+');"><img src="http://www.spaceadventure.pl/images/talker2/ziewa.gif" /></a></td>' +
			'	<td>|</td>' +
			"</tr>   " +
      		    "</table>";
      
      	document.body.innerHTML = document.body.innerHTML.replace( /<textarea\s/gi, xhtml+"<textarea id=\"txt_"+random+"\" ");
      	
      	NuevaFuncionTW("insertBB", function(insertType, ident){
      
      			txt = document.getElementById("txt_"+ident);
      
      			var start = txt.selectionStart;
      			var end   = txt.selectionEnd;
      			var txtlength = 0;
      			var insertButton = '';
      			var txtinsertBefore = '';
      			var txtinsertAfter = '';
      			var selection = '';
      			var selectionBefore = '';
      			var selectionAfter = '';
      
      			switch (insertType) {
      				case 'player':
      					txtinsertBefore = "[player]";
      					txtinsertAfter = "[/player]";
      					insertButton = 'P';
      					break;
      					
      					
      					
      				case 'town':
      					txtinsertBefore = "[town]";
      					txtinsertAfter = "[/town]";
      					insertButton = 'A';
      					break;
 				case 'fort':
      					txtinsertBefore = "[fort]";
      					txtinsertAfter = "[/fort]";
      					insertButton = 'F';
      					break;
      				case 'b':
      					txtinsertBefore = "[b]";
      					txtinsertAfter = "[/b]";
      					insertButton = 'B';
      					break;
      				case 'i':
      					txtinsertBefore = "[i]";
      					txtinsertAfter = "[/i]";
      					insertButton = 'I';
      					break;
      				case 'u':
      					txtinsertBefore = "[u]";
      					txtinsertAfter = "[/u]";
      					insertButton = 'U';
      					break;
      				case 'del':
      					txtinsertBefore = "[del]";
      					txtinsertAfter = "[/del]";
      					insertButton = 'del';
      					break;
      				case 'quote':
      					txtinsertBefore = "[quote]";
      					txtinsertAfter = "[/quote]";
      					insertButton = 'Q';
      					break;
      				case 'url':
      					txtinsertBefore = "[url]";
      					txtinsertAfter = "[/url]";
      					insertButton = 'L';
      					break;
      				case 'img':
      					txtinsertBefore = "[img]";
      					txtinsertAfter = "[/img]";
      					insertButton = 'M';
      					break;
				case 'large text':
      					txtinsertBefore = "[size=20]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'R';
      					break;
				case 'small_text':
      					txtinsertBefore = "[size=8]";
      					txtinsertAfter = "[/size]";
      					insertButton = 'Small';
      					break;
      				
      					case 'code':
      					txtinsertBefore = " [b][CODE][/b] [code]";
      					txtinsertAfter = "[/code]";
      					insertButton = 'code';
      					break;
      					
      					
      					
				case 'smily lol':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '1';
      					break;
				case 'smily smile':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '2';
      					break;
				case 'smily idea':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '3';
      					break;
                                case 'smily wink':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '4';
      					break;
				case 'smily evil':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '5';
      					break;
				case 'smily twisted':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '6';
      					break;
                                case 'smily eek':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '7';
      					break;
				case 'smily surprised':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '8';
      					break;
				case 'smily cry':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '9';
      					break;
				case 'smily smile2':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '10';
      					break;
				case 'smily cool':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '11';
      					break;
				case 'smily sad':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '12';
      					break;
				case 'smily confused':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '13';
      					break;
				case 'smily rolleyes':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '14';
      					break;
				case 'smily briggin':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '15';
      					break;
				case 'smily redface':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '16';
      					break;
				case 'smily razz':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '17';
      					break;
				case 'smily neutral':
      					txtinsertBefore = "[img]http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '18';
      					break;
						case 'smily usmiech':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/usmiech.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '19';
      					break;
						case 'smily smutny':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/smutny.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '20';
      					break;
						case 'smily usmiech5':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/usmiech5.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '21';
      					break;
						case 'smily jezykk':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/jezykk.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '22';
      					break;
						case 'smily zly':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/zly.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '23';
      					break;
						case 'smily wnik':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/wnik.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '24';
      					break;
						case 'smily kwasny2':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/kwasny2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '25';
      					break;
						case 'smily zonk2':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/zonk2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '26';
      					break;
						case 'smily o':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/o.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '27';
      					break;
						case 'smily niekumaty':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/niekumaty.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '28';
      					break;
						case 'smily twarz':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/twarz.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '29';
      					break;
						case 'smily cool2':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/cool.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '30';
      					break;
						case 'smily cmok':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/cmok.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '31';
      					break;
						case 'smily usmiech4':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/usmiech4.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '32';
      					break;
						case 'smily twarz2':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/twarz2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '33';
      					break;
						case 'smily krzywy':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/krzywy.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '34';
      					break;
						case 'smily spi':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/spi.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '35';
      					break;
						case 'smily zonk':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/zonk.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '36';
      					break;
						case 'smily niepewny':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/niepewny.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '37';
      					break;
						case 'smily foch':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/foch.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '38';
      					break;
						case 'smily woot':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/woot.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '39';
      					break;
						case 'smily lol2':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/lol2.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '40';
      					break;
						case 'smily devil':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/devil.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '41';
      					break;
						case 'smily pirat':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/pirat.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '42';
      					break;
						case 'smily serduszka':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/serduszka.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '43';
      					break;
						case 'smily ziewa':
      					txtinsertBefore = "[img]http://www.spaceadventure.pl/images/talker2/ziewa.gif";
      					txtinsertAfter = "[/img]";
      					insertButton = '44';
      					break;
				case 'black text':
      					txtinsertBefore = "[color=black]";
      					txtinsertAfter = "[/color]";
      					insertButton = '31';
      					break;
				case 'white text':
      					txtinsertBefore = "[color=white]";
      					txtinsertAfter = "[/color]";
      					insertButton = '32';
      					break;
				case 'red text':
      					txtinsertBefore = "[color=red]";
      					txtinsertAfter = "[/color]";
      					insertButton = '33';
      					break;
				case 'yellow text':
      					txtinsertBefore = "[color=yellow]";
      					txtinsertAfter = "[/color]";
      					insertButton = '34';
      					break;
				case 'green text':
      					txtinsertBefore = "[color=green]";
      					txtinsertAfter = "[/color]";
      					insertButton = '35';
      					break;
				case 'cyan text':
      					txtinsertBefore = "[color=cyan]";
      					txtinsertAfter = "[/color]";
      					insertButton = '36';
      					break;
				case 'blue text':
      					txtinsertBefore = "[color=blue]";
      					txtinsertAfter = "[/color]";
      					insertButton = '37';
      					break;
				case 'violet text':
      					txtinsertBefore = "[color=violet]";
      					txtinsertAfter = "[/color]";
      					insertButton = '38';
      					break;
      			}
      
      			if (start == end) {
      					txt.value = txt.value.substr(0, start) + txtinsertBefore + txtinsertAfter + txt.value.substr(end, txt.value.length);
      				} else {
      					txtlength = txt.value.length;
      					selection = txt.value.substr(start, (end - start));
      					selectionBefore = txt.value.substr(0, start);
      					selectionAfter = txt.value.substr(end, txtlength);
      
      					if (insertButton == 'V' && selection.match(/(\d+){3}([\/|]+){1}(\d+){3}/gi)) {
      						selection = selection.replace(/(.*)(\d+)(\d+)(\d+)([\/|]+){1}(\d+)(\d+)(\d+)(.*)/gi, "$2$3$4|$6$7$8");
      					}
      
      					txt.value = selectionBefore + txtinsertBefore + selection + txtinsertAfter + selectionAfter;
      					
      				}
      		});
      
      	
      }  
      
      
      // ======== Funciones necesarias ========
      
      // Atajos DOM
      function $(elm_id){
      	return document.getElementById(elm_id);
      }
      
      function $$(tag_name){
      	return document.getElementsByTagName(tag_name);
      }  
      
      function NuevaFuncionTW(func, new_func){
      
    	if(typeof unsafeWindow == "object"){
      		unsafeWindow[func] = new_func;
      	}else if(TW_Is_Opera){
      		window[func] = new_func;
      		/*
      		window.opera.defineMagicFunction(
      			func,
      			function(oRealFunc, oThis, oParam1, oParam2){
      				return oParam1.getElementById('oParam2').style;
      			}
      		);
      		*/
      	}
      }