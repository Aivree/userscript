// ==UserScript==
// @author         mungushume  
// @version        1.0.0
// @name           Discogs popular torrent search
// @namespace      http://www.monkeyr.com
// @description    Adds artist and title search links to the most popular torrent sites.
// @include        http://www.discogs.com/release/*
// @include        http:/discogs.com/release/*
// @scriptsource   http://userscripts.org/scripts/show/11703
// ==/UserScript==
/**/

var title = document.evaluate ("//h1[@class='releaseTitle']", document, null,
									XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if(title)
{
	var txt = title.textContent;
	txt = txt.replace(/^\s+|\s+$/g, ''); //trim the title
	txt = txt.replace(/[\s-]+/g, "+"); //replace spaces with +
	txt = txt.replace(/[\?#,]/g, ""); //remove bad chars

	var tr = title.parentNode.parentNode;
	tr = tr.parentNode.insertBefore(document.createElement("tr"), tr);

	var img = "data:application/octet-stream;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FPz8vb297Ozs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4uLiSUlJ3d3d%2F%2F%2F%2F%2F%2F%2F%2F8%2FPzEhIScnJy8fHx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8fHxwsLCWFhYAAAAyMjI%2F%2F%2F%2F%2F%2F%2F%2F5%2BfnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8%2FYGBgjo6O0dHR%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F7%2B%2FvxcXFnZ2dg4ODExMTQEBAv7%2B%2FAAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6%2BvsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB%2Fv7%2B%2FPz8%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Frq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fq6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAAA%3D";
	buildCell(tr, "The Pirate Bay","http://thepiratebay.org/search/"+txt+"/0/7/100", img)

	var img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr3Q5Xq90Oe%2BvdDnor3Q5YwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACa90Od2vdDn%2Fr3Q5%2F690OeEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDl%2Fr3Q5%2Bq90OfSvdDmaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFr3Q5pq90OUOvdDkMAAAABAAAAAAAAAAAAAAAAAAAAACvdDk1r3Q5cq90OSgAAAAAAAAAAK90ORqvdDlSr3Q5qa90OZcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr3Q5yq90Of%2BvdDmnAAAAAK90OYavdDn0r3Q5%2F690Of%2BvdDnOr3Q5GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK90ObGvdDn%2Fr3Q5uq90Oa6vdDn%2Fr3Q59K90OeyvdDn%2Fr3Q5%2F690OacAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAivdDkhr3Q5Rq90OaKvdDn%2Fr3Q55K90OSOvdDkRr3Q53K90Of%2BvdDnyr3Q5HwAAAAAAAAAAAAAAAAAAAACvdDngr3Q5rK90OTSvdDnfr3Q5%2F690OasAAAAAr3Q5I690Oe2vdDn%2Fr3Q5%2FK90OSwAAAAAAAAAAAAAAAAAAAAAr3Q5f690OXivdDmhr3Q5%2F690Of%2BvdDnqr3Q5s690OeavdDn%2Fr3Q5%2F690Od2vdDkMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr3Q5KK90OfWvdDn%2Fr3Q5%2F690Of%2BvdDn%2Fr3Q5%2F690Of%2BvdDllAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDlLr3Q54K90Of%2BvdDn%2Fr3Q5%2F690Oe6vdDnor3Q5QgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK90OQ%2BvdDlQr3Q5cK90OVyvdDkYr3Q5Ma90ObCvdDkur3Q5EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDm3r3Q5%2F690Oa8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDkar3Q59K90OfavdDm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAq90OZ6vdDnzr3Q5VwAAAAAAAAAA%2F8MAAP%2FDAAD%2FwwAA%2F8cAAMYfAADEDwAAwA8AAMAHAACBBwAAgAcAAOAPAADwDwAA%2BAMAAP%2FjAAD%2FwwAA%2F%2BMAAA%3D%3D";
	buildCell(tr, "torrentspy","http://www.torrentspy.com/search?query="+txt, img)

	var img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39vX28e%2F5%2BfUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkimdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N%2FMu6xmMwCgfl8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7%2BviadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYAAAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAAAADJvKtsPQujh2n7%2B%2FqUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj%2Fl2NMAAAAAAAAAAADk1c5wQBGNZ0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNpNwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMAAAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC%2FrZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx%2FwAA8f8AAPH%2FAACR%2FwAAAf8AAAHHAACAxwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA%2F%2FEAAP%2FwAAD%2F%2BQAA";
	buildCell(tr, "isohunt","http://isohunt.com/torrents/"+txt+"?ihs1=2&iho1=d&iht=2", img)

	var img = "data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2F%2F%2F%2FANx3RgDdEREA7rmeAOWXbgD44NcA8825AOuphAD68ekA34BQAOJ%2BRgDx0MEA%2FPLxAP%2F99wDmkmsAMzMzMzMzMzMxEREREREREzERERERERETMRERERERERMxonHCoRUkEzGiccKhFSQTMaJxwqEVJBMxonHCsRUkEzGiQXItHyQTMaK08iVCJxMxoosixSL%2BEzGZ7W0eZuETMRERERERERMxEREREREREzERERERERETMzMzMzMzMzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
	buildCell(tr, "mininova","http://www.mininova.org/search/"+txt+"/5/seeds", img)

}

function buildCell(container, text, href, image)
{
	var a = document.createElement("a");
	a.href = href; 
	a.setAttribute("target","_blank");
	a.style.textDecoration = "none";
	var img = document.createElement("img");
	img.src = image;
	with(img.style)
	{
		marginRight = "3px";
		border = "0";
	}
	a.appendChild(img);
	var txt = document.createTextNode(text);
	var b = document.createElement("b");
	b.appendChild(txt);
	b.style.textDecoration = "underline";
	a.appendChild(b);
	container.insertCell(0).appendChild(a);
}