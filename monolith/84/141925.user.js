// ==UserScript==
// @name           Master of Unicorn Fix & Doodle Rank change
// @namespace      The Little Moa
// @description    Change snickerdoodle rank on the forums from Monitor to The Doodle and changes Master of Unicorns to N/A.
// @include        https://forums.halo.xbox.com/*
// @version        1.0
// ==/UserScript==

unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
   function() {
      var T = unsafeWindow.$(this);
      var kill = "Master of Unicorns";
      var fire = "N/A";
      if (T.text().indexOf(kill) >= 0) {
         for(var i=0;i<this.childNodes.length;i++) {
            var CN = this.childNodes[i];
            if (CN.nodeName == "#text" && CN.nodeValue.indexOf(kill) > 0) {
               CN.nodeValue = CN.nodeValue.replace(kill, fire);
               break
            }
         }
      }
   }
);
unsafeWindow.$("#yafpage_posts div.yafUserBox>div.section").each(
       function() {
          var T = unsafeWindow.$(this);
     
          var usernames = // keep lowercase
             {
                "snickerdoodle": 0
             };
     
          var newrank = "The Doodle";
     
          var U = unsafeWindow.$(this).closest("table.content").find("a.UserPopMenuLink");
     
          if (U.text().toLowerCase() in usernames) {
             for(var i=0;i<this.childNodes.length;i++) {
                var CN = this.childNodes[i];
                if (CN.nodeName == "#text" && CN.nodeValue.indexOf("Rank: ") >= 0) {
                   CN.nodeValue = "Rank: " + newrank;
                   break
                }
             }
          }
       }
    );