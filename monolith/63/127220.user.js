﻿// ==UserScript==
// @name            HF Post Helper- Sports
// @namespace       sports/posthelperbysports
// @description     Adds additional phrases that can be used in posts as a symbol for something else.
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
		//Start making regexes and formatting them....
		//##Template:
		// elmTextarea.value = elmTextarea.value.replace(regex,replace);
		
		//Mentors

		elmTextarea.value = elmTextarea.value.replace("&#9829;","&#9829;");
		
		var re = /\[xerotic\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=175033][color=#AAAAFF][b]xerotic[/b][/color][/url]");
		
		re = /\[AsSaSs@iN\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=70909][color=#AAAAFF][b]AsSaSs@iN[/b][/color][/url]");
		
		re = /\[cobija\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=100071][color=#AAAAFF][b]cobija[/b][/color][/url]");

		re = /\[iNviZ\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=619030][color=#AAAAFF][b]iNviZ[/b][/color][/url]");
		
		re = /\[Joey Tribbiani\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=545127][color=#AAAAFF][b]Joey Tribbiani[/b][/color][/url]");
		
		re = /\[Kn1ght\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=11960][color=#AAAAFF][b]Kn1ght[/b][/color][/url]");
		
		re = /\[Kr4z1\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=143654][color=#AAAAFF][b]Kr4z1[/b][/color][/url]");
		
		re = /\[kutmustakurt\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=43626][color=#AAAAFF][b]kutmustakurt[/b][/color][/url]");
		
		re = /\[N3w_2_H@Ck1n\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=49806][color=#AAAAFF][b]N3w_2_H@Ck1n&#153;[/b][/color][/url]");
		
		re = /\[n2h\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=49806][color=#AAAAFF][b]N3w_2_H@Ck1n&#153;[/b][/color][/url]");
		
		re = /\[Richie\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=79121][color=#AAAAFF][b]Richie[/b][/color][/url]");
		
		re = /\[Robbieava\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=81075][color=#AAAAFF][b]Robbieava[/b][/color][/url]");
		
		re = /\[Rusty_v\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=47970][color=#AAAAFF][b]Rusty_v[/b][/color][/url]");

                re = /\[Skill\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65581][color=#AAAAFF][b]Skill[/b][/color][/url]");
		
		re = /\[Soldier of Fortune\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=8480][color=#AAAAFF][b]Soldier of Fortune[/b][/color][/url]");
		
		re = /\[Tsgh Mike\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=81119][color=#AAAAFF][b]Tsgh Mike[/b][/color][/url]");
		
		re = /\[Crow\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=2103][color=#AAAAFF][b]Crow[/b][/color][/url]");
		
		re = /\[The Rated R Superstar\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=30595][color=#AAAAFF][b]The Rated R Superstar[/b][/color][/url]");
		
		re = /\[mentors\]/gi;
		
		var mentors = '[list]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=70909][color=#AAAAFF][b]AsSaSs@iN[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=100071][color=#AAAAFF][b]cobija[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=619030][color=#AAAAFF][b]iNviZ[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=545127][color=#AAAAFF][b]Joey Tribbiani[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=11960][color=#AAAAFF][b]Kn1ght[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=143654][color=#AAAAFF][b]Kr4z1[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=43626][color=#AAAAFF][b]kutmustakurt[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=49806][color=#AAAAFF][b]N3w_2_H@Ck1n&#153;[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=79121][color=#AAAAFF][b]Richie[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=81075][color=#AAAAFF][b]Robbieava[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=47970][color=#AAAAFF][b]Rusty_v[/b][/color][/url]\n';
                mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=65581][color=#AAAAFF][b]Skill[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=8480][color=#AAAAFF][b]Soldier of Fortune[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=81119][color=#AAAAFF][b]Tsgh Mike[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=175033][color=#AAAAFF][b]xerotic[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=2103][color=#AAAAFF][b]Crow[/b][/color][/url]\n';
		mentors = mentors + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=30595][color=#AAAAFF][b]The Rated R Superstar[/b][/color][/url]\n';
		mentors = mentors + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,mentors);
		
		re = /\[mentor\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,mentors);
		
		
		//Admins
		
		
		
		re = /\[Judge Dredd\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]");
		
		re = /\[JD\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]");
		
		re = /\[Omniscient\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[Omni\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[Factor8\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=#4DD0FC][b]Factor8&#153;[/b][/color][/url]");
		
		re = /\[admins\]/gi;
		
		var admins = '[list]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=4066][color=#4DD0FC][b]Judge Dredd[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=1][color=#4DD0FC][b]Omniscient[/b][/color][/url]\n';
		admins = admins + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=103669][color=#4DD0FC][b]Factor8&#153;[/b][/color][/url]\n';
		admins = admins + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		re = /\[admin\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,admins);
		
		
		//Staff
		
		
		re = /\[Peter Chao\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=129812][color=lime][b]Peter Chao[/b][/color][/url]");
		
		re = /\[T3h Hack3r\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=128873][color=lime][b]T3h Hack3r[/b][/color][/url]");
		
		re = /\[th\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=128873][color=lime][b]T3h Hack3r[/b][/color][/url]");

		
		re = /\[Xch4ng3\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]");
		
		re = /\[X4\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]");
		
		re = /\[Reactionz\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=656453][color=lime][b]ReactioNz[/b][/color][/url]");
		
		re = /\[staff\]/gi;
		
		var staff = '[list]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=129812][color=lime][b]Peter Chao[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=128873][color=lime][b]T3h Hack3r[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=65784][color=lime][b]Xch4ng3[/b][/color][/url]\n';
		staff = staff + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=656453][color=lime][b]ReactioNz[/b][/color][/url]\n';
		staff = staff + '[/list]'; 
		
		elmTextarea.value = elmTextarea.value.replace(re,staff);
		
		// Moderators
		
		
		re = /\[Valiant\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=45246][b][color=#FF4500]Valiant[/color][/b][/url] | [b]Forums:[/b] HJT Team ?White Hat Help ?HijackThis Log Analyzer and Tutorials ");
		
		re = /\[Paradoxum\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=70881][b][color=#FF4500]Paradoxum[/color][/b][/url] [b]Forums:[/b] The Alliance");
		
		re = /\[-BoodyE-\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=115612][b][color=#FF4500]-BloodyE-[/color][/b][/url] [b]Forums:[/b] Premium Ebook Bazaar & Reviewers");
		
		re = /\[Codevade\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=209490][b][color=#FF4500]Codevade[/color][/b][/url]| [b]Forums:[/b] Marketers");
		
		re = /\[Dylan\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=559352][b][color=#FF4500]Dyl??an[/color][/b][/url] | [b]Forums:[/b] Minecrafters");
		
		re = /\[iNviZ\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=619030][color=#FF4500][b]iNviZ[/b][/color][/url]| [b]Forums:[/b] Propitious");
		
		re = /\[Astonish is NJ\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=657392][b][color=#FF4500]Astonish is NJ[/color][/b][/url]| [b]Forums:[/b] Respawn & Visual Basic and .NET Framework");
		
		re = /\[Skill\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=65581][b][color=#FF4500]Skill[/color][/b][/url]| [b]Forums:[/b] Premium Ebook Bazaar & Reviewers");
		
		re = /\[nokia2mon2\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=80618][b][color=#FF4500]nokia2mon2[/color][/b][/url] | [b]Forums:[/b] Red Lions");
		
		re = /\[Cam G\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=188472][color=#FF4500][b]Cam G[/b][/color][/url] | [b]Forums:[/b] Premium Ebook Bazaar & Reviewers");
		
		re = /\[Wifi.\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=406243][b][color=#FF4500]WiFi.[/color][/b][/url] | [b]Forums:[/b] Eminence");
		
		re = /\[Hysteria X™\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=588781][color=#FF4500][b]Hysteria X™[/b][/color][/url] | [b]Forums:[/b] Melody, Harmony, Rhythm and MP3");
		
		re = /\[Wolves\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=651051][b][color=#FF4500]Wolves[/color][/b][/url] |[b]Forums:[/b] Member Auctions");
		
		re = /\[Glassy\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/member.php?action=profile&uid=734805][color=#FF4500][b]Glassy[/b][/color][/url] | [b]Forums:[/b] Red Lions");
		
		re = /\[mods\]/gi;
		
		var mods = '[list]\n';
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=45246][b][color=#FF4500]Valiant[/color][/b][/url] | [b]Forums:[/b] HJT Team & White Hat Help & HijackThis Log Analyzer and Tutorials \n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=70881][b][color=#FF4500]Paradoxum[/color][/b][/url]|[b]Forums:[/b] The Alliance\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=115612][b][color=#FF4500]-BloodyE-[/color][/b][/url]| [b]Forums:[/b] Premium Ebook Bazaar & Reviewers\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=209490][b][color=#FF4500]Codevade[/color][/b][/url]| [b]Forums:[/b] Marketers\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=559352][b][color=#FF4500]Dylan[/color][/b][/url]| [b]Forums:[/b] Minecrafters\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=619030][color=#FF4500][b]iNviZ[/b][/color][/url]| [b]Forums:[/b] Propitious\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=657392][b][color=#FF4500]Astonish is NJ[/color][/b][/url]| [b]Forums:[/b] Respawn & Visual Basic and .NET Framework\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=65581][b][color=#FF4500]Skill[/color][/b][/url]| [b]Forums:[/b] Premium Ebook Bazaar & Reviewers\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=80618][b][color=#FF4500]nokia2mon2[/color][/b][/url] | [b]Forums:[/b] Red Lions\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=188472][color=#FF4500][b]Cam G[/b][/color][/url] | [b]Forums:[/b] Premium Ebook Bazaar & Reviewers\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=406243][b][color=#FF4500]WiFi.[/color][/b][/url] | [b]Forums:[/b] Eminence\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=588781][color=#FF4500][b]Hysteria X™[/b][/color][/url] | [b]Forums:[/b] Melody, Harmony, Rhythm and MP3\n'
		mods = mods + '[*][url=http://www.hackforums.net/member.php?action=profile&uid=651051][b][color=#FF4500]Wolves[/color][/b][/url] |[b]Forums:[/b] Member Auctions\n'
		mods = mods + '[/list]';
		
		elmTextarea.value = elmTextarea.value.replace(re,mods);
		
		//Now some random stuff....
		
		re = /\[stafflist\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"Click on the following link to see a full list of Admins and Staff:\nhttp://www.hackforums.net/stafflist.php");
		
		re = /\[pmomni\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/private.php?action=send&uid=1]PM [color=#4DD0FC][b]Omniscient[/b][/color][/url]");
		
		re = /\[helpdocs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help]Help Documents[/url]");

                re = /\[Help Docs\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[url=http://www.hackforums.net/misc.php?action=help]Help Documents[/url]");
		
		
		
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;