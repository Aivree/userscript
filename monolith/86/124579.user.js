// ==UserScript==
// @name         mb. MERGE HELPOR 2
// @version      2013.0917.1402
// @description  musicbrainz.org: Merge helper highlights last clicked, show info, retrieve oldest edit (in artist/release/release-group/work/recording merges)
// @namespace    https://userscripts.org/scripts/show/124579
// @author       Tristan DANIEL (PATATE12 aka. jesus2099/shamo)
// @licence      CC BY-NC-SA 3.0 FR (https://creativecommons.org/licenses/by-nc-sa/3.0/fr/)
// @grant        none
// @match        *://*.musicbrainz.org/*/merge*
// @run-at       document-end
// ==/UserScript==
if(self.location.pathname.match(/^\/[^/]+\/merge$/)){/*@matchopera*/(function(){
/* -------- CONFIG START ---- */
var showEntityInfo = true;
var lookForOldestEdit = true;
/* -------- CONFIG  END  ---- */
	var userjs = "j2userjs124579";
	var rembid = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i;
	if (etype = self.location.pathname.match(/\/(.+)\/merge/)) {
		etype = etype[1].replace(/_/, "-");
		var ents = [];
		var lastEnt = -1;
		var oldestEnt = -1;
		if (mergeForm = document.querySelector("div#content > form[action*='/merge']")) {
			var tbl = mergeForm.querySelector("table");
			var lis = mergeForm.getElementsByTagName("li");
			if (tbl) {
				lis = mergeForm.querySelectorAll("form > table > tbody > tr");
				if (showEntityInfo && etype.match(/(release|release-group)/)) {
					mergeForm.querySelector("thead tr").appendChild(document.createElement("th")).appendChild(document.createTextNode("Infos"));
				} else { showEntityInfo = false; }
				if (lookForOldestEdit) {
					mergeForm.querySelector("thead tr").appendChild(document.createElement("th")).appendChild(document.createTextNode("Oldest edit"));
				}
			}
			for (var il=0; il<lis.length; il++) {
				if (showEntityInfo) {
					addZone(lis[il], "entInfo"+il);
				}
				if (lookForOldestEdit) {
					addZone(lis[il], "oldestEdit"+il);
				}
				var a, rad;
				var as = lis[il].getElementsByTagName("a");
				if (as.length>0) { a = as[0]; }
				var rads = lis[il].getElementsByTagName("input");
				for (var ir=0; ir<rads.length; ir++) {
					if (rads[ir].getAttribute("type") == "radio") {
						rad = rads[ir];
						break;
					}
				}
				if (a && rad) {
					ents.push({"a":a,"rad":rad});
					if (document.referrer) {
						var lmbid = a.getAttribute("href").match(rembid);
						var rmbid = document.referrer.match(rembid);
						if (rmbid && lmbid+"" == rmbid+"") {
							lastEnt = ents.length - 1;
							if (tbl) {
								var tds = lis[il].querySelectorAll("td");
								for (var td=0; td<tds.length; td++) {
									tds[td].style.background = "#FF6";
								}
							}
							else {
								lis[il].style.background = "#FF6";
							}
							lis[il].style.border = "thin dashed black";
							lis[il].setAttribute("title", "LAST CLICK");
							rad.click();
						}
					}
				}
			}
			if (showEntityInfo) {
				entInfo();
			}
			if (lookForOldestEdit) {
				oldestEdit();
			}
		}
	}
	function entInfo(current) {
		var iei = current?current:0;
		var eiZone = document.getElementById(userjs+"entInfo"+iei);
		eiZone.appendChild(loadimg("info"));
		var url = "/ws/2/"+etype+"/"+ents[iei].a.getAttribute("href").match(rembid)+"?inc=";
		switch (etype) {
			case "artist":
				url += "release-groups+works+recordings";
				break;
			case "release":
				url += "release-groups";
				break;
			case "release-group":
				url += "releases";
				break;
		}
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4) {
				removeChildren(eiZone);
				if (this.status == 200) {
					var res = this.responseXML, tmp;
					switch (etype) {
						case "artist":
							var tmp = res.evaluate(".//mb:country/text()", res, nsr, XPathResult.ANY_TYPE, null);
							while (tmp2 = tmp.iterateNext()) {
								stackInfo(eiZone, tmp2.nodeValue);
							}
							var tmp = res.evaluate(".//mb:work-list", res, nsr, XPathResult.ANY_TYPE, null);
							while (tmp2 = tmp.iterateNext()) {
								stackInfo(eiZone, tmp2.getAttribute("count")+" works");
							}
							var tmp = res.evaluate(".//mb:release-group-list", res, nsr, XPathResult.ANY_TYPE, null);
							while (tmp2 = tmp.iterateNext()) {
								stackInfo(eiZone, tmp2.getAttribute("count")+" records");
							}
							var tmp = res.evaluate(".//mb:recording-list", res, nsr, XPathResult.ANY_TYPE, null);
							while (tmp2 = tmp.iterateNext()) {
								stackInfo(eiZone, tmp2.getAttribute("count")+" recs");
							}
							break;
						case "release":
							var tmp = res.evaluate(".//mb:status/text()", res, nsr, XPathResult.ANY_TYPE, null);
							while (tmp2 = tmp.iterateNext()) {
								stackInfo(eiZone, tmp2.nodeValue);
							}
							var tmp = res.evaluate(".//mb:language/text()", res, nsr, XPathResult.ANY_TYPE, null);
							while (tmp2 = tmp.iterateNext()) {
								stackInfo(eiZone, tmp2.nodeValue);
							}
							var tmp = res.evaluate(".//mb:script/text()", res, nsr, XPathResult.ANY_TYPE, null);
							while (tmp2 = tmp.iterateNext()) {
								stackInfo(eiZone, tmp2.nodeValue);
							}
							var tmp = res.evaluate(".//mb:release-group", res, nsr, XPathResult.ANY_TYPE, null);
							while (tmp2 = tmp.iterateNext()) {
								var span = document.createElement("span");
								fill(span, "in ", createA(tmp2.getElementsByTagName("title")[0].firstChild.nodeValue, "/release-group/"+tmp2.getAttribute("id")), "");
								var count = parseInt(tmp2.getAttribute("count"));
								stackInfo(eiZone, span);
							}
							break;
						case "release-group":
							var tmp = res.evaluate(".//mb:first-release-date/text()", res, nsr, XPathResult.ANY_TYPE, null);
							while (tmp2 = tmp.iterateNext()) {
								stackInfo(eiZone, tmp2.nodeValue);
							}
							break;
					}
					if (!eiZone.hasChildNodes()) {
						stackInfo(eiZone, "no info");
						eiZone.style.opacity = ".5";
					}
					if (++iei<ents.length) {
						entInfo(iei);
					}
				}
				else {
					stackInfo(eiZone, "Error "+this.status+" fetching "+etype+" #"+iei+" info");
				}
			}
		};
		xhr.open("GET", url, true);
		xhr.send(null);
	}
	function oldestEdit(current, oldest) {
		var ioe = current?current:0, io = current&&oldest?oldest:0;
		var oeZone = document.getElementById(userjs+"oldestEdit"+ioe);
		oeZone.appendChild(loadimg("edits"));
		var url = "/search/edits?order=asc&conditions.0.field="+etype.replace(/-/, "_")+"&conditions.0.operator=%3D&conditions.0.name=toto&conditions.0.args.0="+ents[ioe].rad.value;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState == 4) {
				removeChildren(oeZone);
				if (this.status == 200) {
					var res = document.createElement("html"); res.innerHTML = this.responseText;
					if ((edit = res.querySelector("div#content div.edit-list h2 a[href*='musicbrainz.org/edit/']")) && (editid = edit.getAttribute("href").match(/[0-9]+$/)) && (edittype = edit.textContent.match(/- (.+)$/)) && (edittype = edittype[1].toUpperCase())) {
						ents[ioe].edit = editid;
						if (typeof ents[io].edit=="undefined" || parseInt(ents[io].edit) > parseInt(ents[ioe].edit)) { io = ioe; }
						var span = document.createElement("span");
						span.appendChild(document.createTextNode("edit:"));
						span.appendChild(createA(editid, "/edit/"+editid)).setAttribute("id", userjs+"oldestEditA"+ioe);
						oeZone.setAttribute("title", edittype);
						if (editor = res.querySelector("div#content div.edit-list h2 + p.subheader > a[href*='musicbrainz.org/user/']")) {
							oeZone.setAttribute("title", edittype+" / "+editor.textContent);
						}
						stackInfo(oeZone, span);
					}
					else {
						stackInfo(oeZone, "no edits");
						oeZone.style.opacity = ".5";
					}
					if (++ioe<ents.length) {
						oldestEdit(ioe, io);
					}
					else {
						if (ents[io].edit) {
							oldestEnt = io;
							if (lastEnt < 0) { ents[io].rad.click(); }
							var ioeZone = document.getElementById(userjs+"oldestEdit"+io);
							ioeZone.appendChild(document.createTextNode(" (oldest)"));
							document.getElementById(userjs+"oldestEditA"+io).style.background = "#6F6";
						}
						top.status = "";
					}
				}
				else {
					stackInfo(oeZone, "Error "+this.status+" fetching oldest entity history #"+ioe);
				}
			}
		};
		xhr.open("GET", url, true);
		xhr.send(null);
	}
	function loadimg(txt) {
		var img = document.createElement("img");
		img.setAttribute("src", "/static/images/icons/loading.gif");
		if (txt) {
			var msg = "\u231B loading "+txt+"\u2026";
			img.setAttribute("alt", msg);
			img.setAttribute("title", msg);
			top.status = msg;
		}
		return img;
	}
	function addZone(par, id) {
		par.appendChild(document.createTextNode(" "));
		var zone = par.appendChild(document.createElement(tbl?"td":"span"));
		zone.setAttribute("id", userjs+id);
		par.appendChild(document.createTextNode(" "));
		return zone;
	}
	function stackInfo(zone, info) {
		fill(zone, tbl?"":" \u2014 ", info, ", ");
	}
	function fill(par, beg, stu, sep) {
		par.appendChild(document.createTextNode(par.hasChildNodes()?sep:beg));
		par.appendChild(typeof stu=="string"?document.createTextNode(stu):stu);
	}
	function createA(text, link, title) {
		var a = document.createElement("a");
		if (link) {
			a.setAttribute("href", link);
		}
		else {
			a.style.cursor = "pointer";
		}
		if (title){ a.setAttribute("title", title); }
		a.appendChild(document.createTextNode(text));
		return a;
	}
	function removeChildren(p) {
		while (p && p.hasChildNodes()) { p.removeChild(p.firstChild); }
	}
	function getParent(obj, tag) {
		var cur = obj;
		if (cur.parentNode) {
			cur = cur.parentNode;
			if (cur.tagName == tag.toUpperCase()) {
				return cur;
			} else {
				return getParent(cur, tag);
			}
		} else {
			return null;
		}
	}
	function nsr(prefix) {
		var ns = {
			"xhtml": "http://www.w3.org/1999/xhtml",
			"mb": "http://musicbrainz.org/ns/mmd-2.0#",
		};
		return ns[prefix] || null;
	}
})();}