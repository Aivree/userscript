// Generated by CoffeeScript 1.7.1
// ==UserScript==
// @name          SPISOK-uzbl
// @namespace     http://userscripts.org/scripts/review/165890
// @description   SPISOK usability & beautifications; uses @require => requires proper userscript support for Opera & Chrome, see http://userscripts.org/scripts/show/165890
// @author        dluciv
// @license       WTFPLv2 (http://wtfpl.net/)
// @version       0.0.5.3
// @icon          http://spisok.math.spbu.ru/2013/images/logo.png
// @homepage      http://userscripts.org/scripts/show/165890
// @updateURL     http://userscripts.org/scripts/source/165890.meta.js
// @downloadURL   http://userscripts.org/scripts/source/165890.user.js
//
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_log
// @grant         GM_xmlhttpRequest
// @grant         GM_info
// @grant         GM_getMetadata
// @grant         GM_registerMenuCommand
// @grant         GM_unregisterMenuCommand
// @grant         GM_openInTab
//
// @require       http://code.jquery.com/jquery-2.1.0.min.js
// @require       http://raw.github.com/rochal/jQuery-slimScroll/master/jquery.slimscroll.min.js
// @require       http://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
//
// @include       http://spisok.math.spbu.ru/*
// ==/UserScript==
;
$(function() {

  /*
   * Configuration model
   */
  var addhmi, addmenuitem, ardiv, artop, cupdate, cver, cvercmd, divalar, dnloadUrl, e, emls, homepageUrl, indiv, left, logoimg, logoosrc, openintab, px, re200, removemenuitem, replacelogo, stdiv, upath, updateUrl, ww, year;
  GM_config.init({
    id: 'spisok_options',
    fields: {
      spisok_email: {
        label: 'Email',
        type: 'text',
        'default': 'billgates@microsoft.com'
      },
      spisok_chlogo: {
        label: 'Logo',
        type: 'select',
        'default': 'Native',
        options: ['Native', 'Chaos', 'Thumbs Down', 'SPISOK Kills']
      }
    }
  });

  /*
   * Try to detect version
   */
  cver = (function() {
    try {
      if (typeof GM_info !== "undefined" && GM_info !== null) {
        return GM_info.script.version;
      } else if (typeof GM_getMetadata !== "undefined" && GM_getMetadata !== null) {
        return GM_getMetadata('version', true);
      } else {

        /*
        No way.. =(
         */
        return void 0;
      }
    } catch (_error) {
      e = _error;
      GM_log('Any metadata absent...');
      GM_log(e);
      return void 0;
    }
  })();

  /*
   * All them could be got from GM_getMetadata, but only with Scriptish =(
   */
  updateUrl = 'http://userscripts.org/scripts/source/165890.meta.js';
  dnloadUrl = 'http://userscripts.org/scripts/source/165890.user.js';
  homepageUrl = 'http://userscripts.org/scripts/show/165890';

  /*
   * Get year for links
   */
  upath = window.location.pathname.split('/').slice(1);
  year = new Date().getFullYear().toString();
  if (upath.length > 0 && upath[0] !== '') {
    year = upath[0].toString();
  }

  /*
   * Logo replacement. Absolutely useless.
   */
  logoimg = $('img[src="images/log0.png"], img[src="images/logo.png"]');
  logoosrc = logoimg.attr('src');
  replacelogo = function() {
    var chlogo, iurl;
    chlogo = GM_config.get('spisok_chlogo');
    iurl = (function() {
      switch (chlogo) {
        case 'Chaos':
          return "http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Chaosphere.svg/600px-Chaosphere.svg.png";
        case 'Thumbs Down':
          return "https://dl.dropboxusercontent.com/u/2212237/SPISOK-2013/userscript/spisok-thumbsdown.png";
        case 'SPISOK Kills':
          return "https://dl.dropboxusercontent.com/u/2212237/SPISOK-2013/userscript/spisok-kills.png";
        default:
          return logoosrc;
      }
    })();
    return logoimg.attr({
      'src': iurl,
      'width': '150px',
      'height': '150px'
    });
  };
  replacelogo();
  GM_config.onSave = function() {
    replacelogo();
    return GM_config.close();
  };

  /*
   * Make side stripes scrollable. Just the thing all it is about =)
   */
  $('div#l, div#r').wrapInner('<div class="lrw"/>');
  re200 = function() {
    return $('div.lrw, div.slimScrollDiv').css({
      'height': window.innerHeight
    });
  };
  try {
    $('div.lrw').slimScroll({
      height: window.innerHeight,
      distance: '6px',
      railVisible: true,
      color: '#ffffff',
      railColor: '#ffffff'
    });
    re200();
    $('div.lrw').slimScroll({
      scrollTo: '0px'
    });
  } catch (_error) {
    e = _error;
    GM_log(e);
  }

  /*
   * Remember login email
   */
  if (/^http:\/\/spisok\.math\.spbu\.ru\/20\d\d\/o7\.asp/.test(document.location)) {
    emls = $('input[name="eml"]');
    emls.val(GM_config.get('spisok_email'));
    emls.on('change paste', function() {
      GM_config.set('spisok_email', emls.val());
      GM_config.save();
    });
    emls.attr('autocomplete', 'on');
  }

  /*
   * Fix width & height
   */
  ww = $(window).width();
  if (ww < 1280) {
    px = ww - 464;

    /* 200 * 2 (stripes) + 64 (border) */
    $('table#prg1, table#org1, table#day1, table#p, table#h, td#m center').css('width', '' + px + 'px');
  }
  $('div.lrw > div.mnu').append('<p>&nbsp;</p>');

  /*
   * Scrollable arrows
   */
  try {
    artop = void 0;
    stdiv = void 0;
    left = void 0;
    ardiv = void 0;
    divalar = $('div#al, div#ar');
    divalar.each(function(idx) {
      var arleft, newChksize, oldChkSize;
      try {
        artop = parseInt($(this).css('top').match(/(\d+)px/)[1]);
        ardiv = $(this);
        arleft = ardiv.css('left');
        oldChkSize = unsafeWindow.chkSize;
        newChksize = function() {
          var indiv, supto;
          oldChkSize();
          re200();
          ardiv.css({
            'display': 'block'
          });
          if (artop > window.innerHeight - 40) {
            supto = artop - window.innerHeight + 40;
            indiv = $('div.lrw', stdiv);
            return indiv.slimScroll({
              scrollTo: supto + 'px'
            });
          }
        };
        unsafeWindow.chkSize = newChksize;
        stdiv = $(idx === 0 ? (GM_log("Found -> arrow"), 'div#l') : (GM_log("Found <- arrow"), 'div#r'));
      } catch (_error) {
        e = _error;
      }
    });
    if (stdiv != null) {
      indiv = $('div.lrw', stdiv);
      indiv.scroll(function() {
        var ardivheight, ntop;
        ntop = artop - indiv.scrollTop();
        ardivheight = Math.min(31, Math.max(0, window.innerHeight - ntop));
        return ardiv.css({
          left: left,
          top: ntop + 'px',
          height: ardivheight,
          display: 'block'
        });
      });
    } else {
      GM_log("No arrows found...");
    }
  } catch (_error) {
    e = _error;
    GM_log("Error while working with arrows:");
    GM_log(e);
  }

  /*
   * Userscript Menu tools
   */
  addmenuitem = function(title, handler) {
    if (!handler) {
      handler = function() {};
    }
    try {
      return GM_registerMenuCommand("SPISOK-uzbl: " + title, handler);
    } catch (_error) {
      e = _error;
      return GM_log("No GM_registerMenuCommand...");
    }
  };
  removemenuitem = function(uuid) {
    try {
      return GM_unregisterMenuCommand(uuid);
    } catch (_error) {
      e = _error;
      return GM_log("No GM_unregisterMenuCommand...");
    }
  };
  openintab = function(u) {
    return setTimeout(function() {
      return GM_openInTab(u);
    }, 0);
  };
  addhmi = function(title, url) {
    return addmenuitem(title, url ? function() {
      return openintab(url);
    } : function() {});
  };

  /*
   * Check for updates
   */
  cupdate = function() {
    var cantgui;
    if (cver != null) {
      cantgui = "" + cver + " → ?";
      return GM_xmlhttpRequest({
        synchronous: false,
        method: 'GET',
        timeout: 15000,
        url: updateUrl,
        onload: function(rsp) {
          var aver, rt;
          if (rsp.status === 200) {
            rt = rsp.responseText;
            aver = rt.match(/@version\s+(.+)/)[1].toString();
            if (aver <= cver) {
              return addhmi("" + cver + ", новейший", null);
            } else {
              return addhmi("" + cver + " → " + aver, dnloadUrl);
            }
          } else {
            return addhmi(cantgui, null);
          }
        },
        ontimeout: function() {
          return addhmi(cantgui, null);
        }
      });
    } else {
      return addhmi("?, → " + aver, dnloadUrl);
    }
  };

  /*
   * Fill userscript menu
   */
  addhmi("Интерфейс программного комитета", "http://spisok.math.spbu.ru/" + year + "/dir/sec.asp?1");
  addhmi("Метапрограммные задачи", "http://spisok.math.spbu.ru/" + year + "/dir/adm.asp?1");
  addmenuitem("Настройки", function() {
    return GM_config.open();
  });
  cvercmd = addmenuitem("" + cver + ", проверить обновления", function() {
    removemenuitem(cvercmd);
    return cupdate();
  });
  unsafeWindow.chkSize();
});
