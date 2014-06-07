// ==UserScript==
// @name           4chan Banner Replacer Mk. III
// @version        3.4
// @include        *//boards.4chan.org/*
// @run-at         document-start
// ==/UserScript==

// Generated by CoffeeScript 1.6.2
(function() {
  var d, images, main, retries, wait;

  if (/presto/i.test(navigator.userAgent)) {
    return;
  }

  images = {
    png: {
      3:   'EPPsg6o.gif',
      4:   'HsYaWck.png',
      6:   '46SPEie.gif',
      7:   'c19nFEI.gif',
      8:   'p4XavPt.png',
      10:  'CSOgXmL.gif',
      12:  'LWayvmh.png',
      14:  'g3QGOpv.gif',
      15:  'z19z6Hl.png',
      16:  'ZXUY84p.jpg',
      17:  'PliFtpg.gif',
      21:  'R2ACIfY.gif',
      22:  'XYRz23f.gif',
      23:  'gXa4gCW.jpg',
      24:  'eAl3rG2.png',
      25:  'EoXdXGG.png',
      27:  'FRRT511.png',
      28:  '4xtohQH.jpg',
      29:  'tl6Pqut.png',
      30:  'XgCv5PE.png',
      31:  'DWK73KZ.png',
      35:  'VCwrJL2.gif',
      37:  'Im1UxCa.gif',
      39:  'uFYAKXG.gif',
      40:  'OyfEagD.png',
      42:  '9kSpMwg.png',
      44:  'gRlG6w7.png',
      45:  'iSspgfy.png',
      47:  'noo6V5t.png',
      48:  'TnsnCi5.png',
      49:  'CNvHgbr.gif',
      50:  'zM8Xqyc.png',
      52:  'Ps5DYWa.jpg',
      53:  'uzVS7Qw.gif',
      54:  'Y4zyjzi.gif',
      55:  'RFCkWt0.gif',
      56:  '4CynUOg.gif',
      58:  'sC6hSO4.gif',
      59:  'SlYW4cr.gif',
      60:  'AG7GgjC.jpg',
      64:  'N5C6ptQ.gif',
      69:  'e3PiAHq.png',
      70:  'lFt2pJH.gif',
      71:  'swl72F2.png',
      73:  'wiu1Snw.gif',
      75:  '9dhdftN.png',
      76:  'qaFsWff.png',
      78:  'D4h95Fx.png',
      79:  'rjJo58O.gif',
      82:  '3Sweg3b.png',
      83:  'P1PzPO4.gif',
      84:  'fmUeKgL.gif',
      85:  'N1yqGjV.gif'
    },
    jpg: {
      15:  'TgJ8n.gif',
      17:  'C6Ige.gif',
      18:  '13hES.png',
      19:  'RUMJm.jpg',
      20:  '7HCSk.jpg',
      21:  'k91qb.jpg',
      22:  'SCcHR.png',
      23:  'JiJML.png',
      24:  'toklC.png',
      26:  'Agxqf.jpg',
      28:  '0CsW3.png',
      30:  'WyKXB.png',
      31:  '4ez5p.png',
      33:  'IFJgm.gif',
      34:  'jpbMy.png',
      35:  'YCmPU.png',
      36:  'dgh43.png',
      37:  'RrVky.png',
      38:  '4IorN.png',
      39:  '5vrV6.png',
      40:  'esd1C.png',
      41:  'yUtGY.png',
      44:  'ujHMm.png',
      47:  'zLjbe.png',
      48:  'ytWUk.png',
      49:  'sbhV1.png',
      50:  'cOTmn.png',
      51:  '6f56x.png',
      53:  'G9K5r.png',
      54:  'C9Nhi.gif',
      55:  '8MnB1.jpg',
      56:  'ouLfm.jpg',
      57:  'wAsk2.png',
      58:  '7HGtn.png',
      60:  'PiQno.gif',
      61:  'eS1oA.png',
      62:  'raday.gif',
      63:  'Ichxu.gif',
      64:  'urNol.png',
      65:  '5xtVD.png',
      66:  'fq35i.png',
      67:  'P7Gmh.png',
      70:  'Nfc7c.png',
      71:  'KWDHN.png',
      72:  'xs5i4.png',
      74:  '6d6zi.png',
      75:  'ajWv9.png',
      76:  'jrmlC.png',
      77:  'mhQjG.png',
      78:  'yo6Bj.png',
      79:  '1brhq.gif',
      81:  'Uro7f.jpg',
      82:  '3Jpjx.jpg',
      84:  'DXy5x.jpg',
      85:  '9hQ0n.png',
      86:  'kZYDt.png',
      87:  'jEyGh.jpg',
      88:  'jEyGh.jpg',
      89:  'Skn511h.jpg',
      90:  'qdiuqp3.gif',
      92:  'G01UsLJ.png',
      94:  'PliFtpg.gif',
      95:  'WuCnJEl.gif',
      96:  'N1pmdhO.png',
      97:  'v1kgs8Y.png',
      99:  'BU0ME3s.png',
      100: 'ty389PJ.jpg',
      101: 'tbbLJrh.gif',
      102: 'i2sHiOc.png',
      103: 'aXrmFcl.jpg',
      105: 'vNtvbT4.png',
      107: 'CF6ubnW.png',
      108: 'UHbGgGb.png',
      109: 'LblEmYp.gif',
      110: 'K3GwOnP.jpg',
      112: 'Me7cAaw.jpg',
      116: 'Mm7pnQZ.png',
      118: 'S0ObFp9.png',
      121: 'fRsb7yg.png',
      122: 'iGzDUzX.png',
      126: 'zW4xl7l.png',
      127: 'M9Iy81E.gif',
      128: 'J13v4eC.png',
      129: 'wSswMVB.png',
      130: '6ds0IgZ.jpg',
      131: 'sE2v522.png',
      132: 'PIc5aLF.jpg',
      135: 'PliFtpg.gif',
      136: 'TIAFGFf.gif',
      139: 'nzClj9K.gif',
      141: 'RaLZS0J.gif'
    },
    gif: {
      14:  'jy3nc.png',
      16:  'L8Dk6.jpg',
      17:  'JqOa1.gif',
      18:  'KYyZz.png',
      19:  '0ZI5g.gif',
      21:  'rIcgh.jpg',
      22:  'T7eaS.png',
      23:  'k3iOU.png',
      24:  '7Kmy5.gif',
      25:  '4YRet.png',
      26:  'U9qzW.gif',
      27:  'xM3Tm.png',
      30:  '3QXnZ.jpg',
      31:  'cPtqD.gif',
      32:  '9XaJB.png',
      33:  'U6eMf.png',
      35:  'wq0RA.png',
      36:  'i18qg.png',
      38:  'ihOnC.png',
      39:  'v8qgC.jpg',
      41:  'qVnOR.png',
      43:  'yPJcD.png',
      44:  'Bctuv.jpg',
      47:  '0Yh5F.jpg',
      48:  'FWfyV.jpg',
      49:  'Co93H.png',
      50:  'giSAQ.gif',
      51:  'DuIud.gif',
      53:  'p6pqF.gif',
      55:  'crHEP.gif',
      59:  'RFf6j.png',
      60:  '60mlK.png',
      61:  'VI0jT.gif'
    }
  };

  d = document;

  main = function(image) {
    var file, number, src, style, type, url, xhr, _, _ref, _ref1;

    style = image.style, src = image.src;
    style.visibility = 'hidden';
    _ref = src.match(/\/(\d+)\.(jpg|png|gif)$/), _ = _ref[0], number = _ref[1], type = _ref[2];
    if (!(file = (_ref1 = images[type]) != null ? _ref1[number] : void 0)) {
      return style.visibility = 'visible';
    }
    url = "//i.imgur.com/" + file;
    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function() {
      var URL, _ref2;

      if ((_ref2 = this.status) === 200 || _ref2 === 304) {
        URL = window.URL || window.webkitURL;
        URL.revokeObjectURL(image.src);
        image.src = URL.createObjectURL(this.response);
      }
      return style.visibility = 'visible';
    };
    xhr.onerror = function() {
      return style.visibility = 'visible';
    };
    return xhr.send();
  };

  retries = 0;

  (wait = function() {
    var image;

    if (image = d.querySelector("img[alt='4chan']")) {
      return main(image);
    } else if (retries++ < 200) {
      return setTimeout(wait, 15);
    }
  })();

}).call(this);