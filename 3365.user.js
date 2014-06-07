// ==UserScript==
// @name            Add Torrents To ABC
// @namespace       
// @description     Start a remote torrent download from a torrent link, using the phpABC web interface to ABC.
// @include         http://isohunt.com/btDetails.php?*
// @include         http://thepiratebay.org/details.php?*
// @include         http://torrentreactor.net/view.php?*
// @include         http://www.mininova.org/*
// @include         http://www.torrentspy.com/*
// @include         http://ts.searching.com/*
// @include         *
// ==/UserScript==

function injectMe(){
   var phpABCUrl = "http://base.monstuff.com/abc/add.php";
   // example: var phpABCUrl = "http://yourPhpAbcUrl/add.php";

   if (phpABCUrl == "") { alert('You need to configure the "Add Torrents To ABC" user script with your phpABC url before using it.'); }


   function scanLinks() {
      var links = getLinks();

      for (var i=0; i < links.length; i++){
          var link = links[i];
          if (match(link.href)) {
              var span = document.createElement('span');
              var code_str = " <a href=\"";
              code_str += makeHomeUrl(link.href);
              code_str += "\"><img src=\"" + image + "\" style='border: 0px' /></a>";
              span.innerHTML = code_str;
              link.parentNode.insertBefore(span, link.nextSibling);
          }
      }
   }

   function match(url) {
       // isohunt format
       if (url.match(/http:\/\/.*isohunt\.com\/download\.php\?mode=bt&/i)) {
           return true;
       }

       if (url.match(/\.torrent$/)) {
           return true;
       }

       // TorrentReactor
       if (url.match(/http:\/\/download\.torrentreactor\.net\/download.php\?/i)) {
           return true;
       }

       // Mininova
       if (url.match(/http:\/\/www\.mininova\.org\/get\//i)) {
           return true;
       }

       // Mininova
       if (url.match(/http:\/\/www\.mininova\.org\/get\//i)) {
           return true;
       }

       // TorrentSpy
       if (url.match(/http:\/\/ts\.searching\.com\/download\.asp\?/i)) {
           return true;
       }
       if (url.match(/http:\/\/www\.torrentspy\.com\/download.asp\?/i)) {
           return true;
       }

       return false;
   }

   function makeHomeUrl(url) {
       return phpABCUrl + "?url=" + escape(url);
   }

   function getLinks() {
       var doc_links = document.links;
       var links = new Array();
       for (var i=0; i < doc_links.length; i++){
           links.push(doc_links[i]);
       }
       return links;
   }

var image = "data:image/vnd.microsoft.icon;base64,AAABAAMAICAAAAEAIACoEAAANgAAABgYAAABACAAiAkAAN4QAAAQEAAAAQAgAGgEAABmGgAAKAAAACAAAABAAAAAAQAgAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAcAAAAYAAAAIgAAACcAAAApAAAAKAAAACQAAAAaAAAABgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAA4AAAAmAAAATxMrDrMYSADiGkwA9RxOAPgYTAD1G0gA4RQtD7EDAANNAAAAKQAAAA0AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAnDhcFeB4yEuoeWwD%2FL4YA%2FzaiAP9CvQD%2FRMMA%2F0O%2FAP85pwD%2FMY0A%2Fx5cAP8bTgDpEBgIdQAAACoAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAJAAAAPhkwDdIcWQD%2FOaUA%2F0rZAP9N4AD%2FSNMA%2FzmnAP8vjwD%2FK4IA%2Fy%2BGAP8xkAD%2FPKwA%2FzqnAP8gYQD%2FHjUO0QAAAD0AAAAIAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQABAFQbMg7wK34A%2F0rVAP9i%2Fwn%2FRMQA%2Fyl4AP8ZUQD%2FGkwA5BRAAMEUOQCqEzsAqRRCAMEaTADjG1UA%2FyyCAP8sgwD%2FHTsM8AIFAFMAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAA%2BHTEQ8DGSAP9H1AD%2Ff%2F80%2Fy6JAP8aTAD8GCMMqwAAAFgAAABJAAAAPgAAADAAAAAjAAAAHQAAACIAAAA2FikMnSRUAPwqegD%2FHj0M7wAAAD0AAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAKx4wDtYrfQD%2FS9QA%2F5v%2FXf8gYwD%2FF0AA4wAAALsAAADeAAAA%2BwAAAP8AAADmAAAAswAAAG4AAAAsAAAACwAAAAUAAAAVAAAAPhs3DNgmZwD%2FHjkM1AAAACYAAAABAAAAAAAAAAAAAAAAAAAABAAAACAAAAAfAAAACwAAAA8JFwV5IFYA%2F0rVAP%2BY%2F1v%2FRZoT%2FxEqAOsAAAD4AAAA8gYOAPU1Lgv%2BNzQK%2FwsbAPkAAADyAAAA%2BgAAANYAAAB4AAAAIQAAAAYAAAAFAAAAMhUxCbgkYAD%2FDyADdgAAAA4AAAAAAAAAAAAAAAAAAAAkG0AM2hg1DMoQFAdnAAAASxEiGus6ogD%2FmP9b%2Fy%2BDAP8UNQD9AAAA8jp6A%2FNNuADxl%2BMd9fytkf7%2FrpT%2F4bNl%2Bb54N%2FK1YDD5BQwA5wAAAPMAAAC%2BAAAAOwAAAAYAAAAEAAAANB4%2BCtYcQwrnAAAALAAAAAEAAAAAAAAAAAAAACwjVAD0LoEA%2FyBeAP8gRgD3OogA%2F0%2FPAP9H1AD%2FI2YA%2FwAAAOR08gb7ivcQ%2F5vmCv%2F%2Fdnr%2F%2F4mP%2F%2F6Zmf%2F%2Fv8T%2F%2F9XZ%2F%2F%2Fk4%2F%2F%2F1sb9NCYI4wAAAP8AAADPAAAAKAAAAAMAAAAFAAAAPx1ECPwUKwN8AAAADwAAAAAAAAAAAAAAKRxLAOo7owD%2FYP8H%2F2btH%2F9v%2Fx3%2Fof9o%2F1fIG%2F8hWgH8IVoB%2FCFaAfzIwiL%2F34dW%2F%2F%2BHkv%2F7fH3%2F%2Bnh3%2F%2FuJhP%2F6pKL%2F%2F8PG%2F%2F%2FZ2f%2Ff%2FXn%2BMkoA4AAAAPQAAACcAAAACwAAAAEAAAALCRcBXyBIC7kAAAAcAAAAAAAAAAAAAAAkGkQA1zWLAP9Y%2FwD%2FiP9K%2F4D%2FO%2F%2B8%2F5X%2Fnf9h%2F3PcPP9ZrjH%2FIVoB%2FCFaAfzlbXb%2F%2F5Wa%2F%2FyVkP%2F8h4j%2F%2FX2A%2F%2F2Ch%2F%2F%2FipX%2F5Nlx%2F6f8av%2Fc%2B07%2FKFsA8AAAAPMAAABXAAAAAwAAAAIAAAAYGz0IdwAAABIAAAAAAAAAAAAAAB4ZQgDDMIAA%2F1f6AP%2Bo%2Fnn%2Fnf9j%2F5n%2FYP%2Fj%2F9P%2FyP%2Bo%2F6P%2Fb%2F%2Bj83f%2FWrwu%2FyFaAfzokI3%2F%2FKur%2F%2Fytrf%2F9oKH%2F%2BH5y%2F9eaR%2F%2FYvjD%2Fxug0%2F675Zv9cxAbxAAAA8QAAAOQAAAANAAAAAgAAAAsdRgpLAAAACwAAAAAAAAAAAAAAGBYmCq0tdgD%2FUOkA%2F8n%2Fp%2F%2B2%2F4r%2Fzf%2Bz%2F%2Bb%2F0%2F%2FO%2F7L%2FtvSX%2FyFaAfwhWgH8332E%2F%2F6mpf%2F8p6f%2F%2B6mp%2F%2Feqof%2FgyGX%2F2s9C%2F9axQf%2FQ2hv%2FdOUL%2F4n5Hv8kOgHsAAAA%2FwAAAEwAAAACAAAAAgAAABUAAAAeAAAABAAAAAAAAAASFSAKjyZsAP9W0AD%2F5%2F%2Fa%2F%2BX%2F1%2F%2Fn%2F9f%2FqP1%2B%2FyFaAfwhWgH8y1lf%2F%2B%2BSkv%2F9rrL%2F%2FLGt%2F%2F2vrP%2F8q6f%2F%2B6af%2F%2BK8f%2F%2FexWH%2F18FE%2F9nULP%2BN2gj%2Fz%2Bs1%2F6k8L%2BIAAAD%2FAAAAiQAAAAkAAAAmDSAIcSFEDswAAAAiAAAAAAAAAAoKGAdqIGAA%2F2HMAP%2F%2F%2F%2F%2F%2F5%2F%2FV%2F0u1Fv8eQgD%2Fpjc%2B%2F%2BiDkv%2F8rrH%2F%2FsPF%2F%2F3Fw%2F%2F9v7%2F%2F%2FLy4%2F%2Fy4uP%2F%2FrLH%2F5LiF%2F%2BXTev%2FXxkD%2F18Yx%2F57WDf%2Fzgmn%2FqTwv4gAAAP8AAACvAAAATSBGANUjWQD%2FJFkA%2FwAAAC8AAAAAAAAAAQAAADccVQD%2FWNQA%2F5HoZP8gRgD%2FRV0C%2F75ZLP%2FXr2b%2F6MyP%2F%2F%2FHx%2F%2F9xsT%2F%2FcrH%2F%2F7Gxv%2F%2BxcT%2F%2FMLC%2F%2F66vv%2F4pZn%2F%2F6Cd%2F%2B%2BUev%2FWmUv%2FrdcN%2F5%2FfEf8hWgH8AAAA%2FwcSAOUiSwD%2Fkehk%2F1jUAP8cVQD%2FAAAANwAAAAEAAAAAAAAALyRZAP8jWQD%2FHkAA4wAAAP2avAj23dcg%2F%2BLXfP%2F3ybb%2F%2F8rN%2F%2F3T0P%2F83Nn%2F%2FdTU%2F%2F7NzP%2F8ycX%2F%2Fb%2B8%2F%2BbFhP%2FkwXz%2F%2B5KM%2F%2B58aP%2Bz1Q7%2FIVoB%2FCFaAfwhWgH8U7sY%2F%2Bj%2F2P%2F%2F%2F%2F%2F%2FYcwA%2FyBgAP8KGAdqAAAACgAAAAAAAAAiIUQOzA0gCHEAAABgAAAA8FNbANfb5R%2F%2F5taP%2F%2B7asf%2F8zsn%2F%2FuDd%2F%2F7c3P%2F83tz%2F%2FdbW%2F%2F7NzP%2F%2Fx8f%2F6MiX%2F%2BLXc%2F%2Fetlr%2Fxawu%2FyFaAfwhWgH8IVoB%2FKv%2Bgf%2Fn%2F9f%2F5f%2FX%2F%2Bf%2F2v9W0AD%2FJmwA%2FxUgCo8AAAASAAAAAAAAAAQAAAAeAAAAFQAAACwAAADVAAAA2tvoHP%2Fs36T%2F8dzB%2F%2Fboyv%2F359j%2F%2Fejo%2F%2F7m6f%2F939%2F%2F%2FdPQ%2F%2FzLxv%2F5uqr%2F%2F6Wl%2F72gN%2F8hWgH8IVoB%2FLr0nP%2FM%2F7L%2F5v%2FT%2F83%2Fs%2F%2B2%2F4r%2Fyf%2Bn%2F1DpAP8tdgD%2FFiYKrQAAABgAAAAAAAAAAAAAAAsdRgpLAAAAFAAAAKgAAAD6ipMJ6e%2Fll%2F%2F259X%2F%2Ffjr%2F%2F%2F08P%2F%2F7Ov%2F%2Fujn%2F%2F7n4%2F%2F909D%2F%2BsrH%2F%2Fm2qv%2FumqP%2FIVoB%2FCFaAfyj9Hf%2Fo%2F9v%2F8j%2FqP%2Fj%2F9P%2Fmf9g%2F53%2FY%2F%2Bo%2Fnn%2FV%2FoA%2FzCAAP8ZQgDDAAAAHgAAAAAAAAAAAAAAEhs9CHcAAAAZAAAAOwAAAP8iJgDy5%2BVS%2FfLgwf%2F47OD%2F%2F%2Fv6%2F%2F%2F7%2Bv%2F%2B9PH%2F%2FN7c%2F%2F7Myv%2F%2BztD%2F%2Fra2%2F%2FuhnP%2B%2BpTP%2FWncM%2FzyND%2F9gtDL%2Fdt8%2B%2F53%2FYf%2B8%2F5X%2FgP87%2F4j%2FSv9Y%2FwD%2FNYsA%2FxpEANcAAAAkAAAAAAAAAAAAAAAcIEgLuQkXAV8AAAANAAAAlgAAAPJjaQzt7dCD%2F%2FjUw%2F%2F%2F6Oj%2F%2F%2Frz%2F%2F%2Fw8P%2F%2B2tr%2F%2FdPP%2F%2Fy%2Bvv%2F8rKn%2F%2F6Gp%2F%2FOJdP%2B11xT%2FNHoA8wAAAPEiWAH0V8gb%2F6H%2FaP9v%2Fx3%2FZu0f%2F2D%2FB%2F87owD%2FHEsA6gAAACkAAAAAAAAAAAAAAA8UKwN8HUQI%2FAAAAD8AAAAPAAAAngAAAPU3Hgrk%2F5mI%2FP%2FExP%2F%2F29n%2F%2FuDh%2F%2F7a2v%2F90dH%2F%2Fr%2B9%2F%2FSkmP%2Fp61n%2F3usu%2FnJhFusAAADyAAAA3yhpAPxH1AD%2FT88A%2FzqIAP8gRgD3IVoB%2FC6BAP8jVAD0AAAALAAAAAAAAAAAAAAAAQAAACwcQwrnHj4K1gAAADQAAAAXAAAAtAAAAP8AAADnzGMo8f%2Bipf%2F%2FrKn%2F%2F8PD%2F%2F%2FByP%2F%2FvcP%2F75xj%2F%2FPqKv4RGgDcAAAA%2BwAAAO4aRADbL4MA%2F5j%2FW%2F86ogD%2FESYb6gAAAEsQFAdnIVoB%2FBtADNoAAAAkAAAAAAAAAAAAAAAAAAAADg8gA3YkYAD%2FFTEJuAAAADIAAAAVAAAAjAAAANcAAADzAAAA32EmDuqtQCH8tkgm%2F3FIFPAAAwDhAAAA8wAAAOgAAACyFjoAvEWaE%2F%2BW%2F1r%2FStUA%2FyBWAP8LFwV5AAAADwAAAAsAAAAfAAAAIAAAAAQAAAAAAAAAAAAAAAAAAAABAAAAJh45DNQmZwD%2FGzcM2AAAAD4AAAAVAAAAKQAAAGsAAACtAAAA3gAAAPoAAAD%2FAAAA5wAAALsAAACHAAAAaBlHANUgYwD%2Fm%2F9d%2F0vUAP8rfQD%2FHjAO1gAAACsAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAPR49DO8qegD%2FJFQA%2FBYpDJ0AAAA1AAAAIQAAABoAAAAWAAAAFgAAABoAAAAhAAAANRcpDp0aTQD7LokA%2F3%2F%2FNP9H1AD%2FMZIA%2Fx0xEPAAAAA%2BAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJAgUAUx07DPAsgwD%2FLIIA%2FxtVAP8aTADjFEIAwRM7AKkTOwCpFEIAwBpNAOMZUQD%2FKXgA%2F0TDAP9i%2Fwn%2FStUA%2Fyt%2BAP8bMg7wAAEAVAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAIAAAAPR41DtEgYQD%2FOqcA%2FzysAP8xkAD%2FL4YA%2FyuCAP8vjwD%2FOacA%2F0jTAP9N4AD%2FStkA%2FzmlAP8cWQD%2FGTAN0gAAAD4AAAAJAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAKhAYCHUbTgDpHlwA%2FzGNAP85pwD%2FQ78A%2F0TDAP9CvQD%2FNqIA%2Fy%2BGAP8eWwD%2FHjIS6g4XBXgAAAAnAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAADQAAACkCAANNFSsNsRlFAOEXRwD1GUgA%2BBlHAPUWRADiFCoMswAAAE8AAAAmAAAADgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD%2F4AP%2F%2F4AA%2F%2F8AAH%2F8AAAf%2FAAAH%2FgAAA%2FwAAAHAAAABwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAQAAAAEAAAABAAAAAIAAAACAAAAAgAAAAMAAAADAAAAAwAAAAMAAAADAAAAA4AAAAOAAAA%2FwAAAf%2BAAAP%2FgAAD%2F%2BAAD%2F%2FwAB%2FygAAAAYAAAAMAAAAAEAIAAAAAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAoAAAAdBAkDThAVDJMQFQyTEBUMkwUIA08AAAEcAAAACwAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAQABLhAVDJMZOArgEBUMky1%2FBOwtfwTsLX8E7BAVDJMVPAHIECYBkgEAAS8AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAA%2BGTgK4DGUAP9R7gD%2FUvIA%2F0PDAP9DwwD%2FQ8MA%2F0PDAP9DwQD%2FOKIA%2FyFFDN8AAAA9AAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQMDA2MhTQr1Q7sE%2F13xCf85pwD%2BHEwC3Q8vALsMJgCZDCMAgwwmAIoQMACoF0kByyx%2BAPUkVgn1BQsCYgAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABBAMDSR9MBOBEzQD%2Fd%2BU5%2FyZmBPIDCgDPAQACzQAAAMgAAACyAAAAewAAADYAAAASAAABIQgRAWcjUwnkI1QF4AUIA0YAAAABAAAAAAAAAAAAAAAEAAAAIAAAABEAAAAPDCICoj65AP%2Bu%2F23%2FM3QM%2BQAAAPQAAADyBgsA%2BC0sAf8AEQD5AAAA9AAAAOEAAAB4AAAAGQAAAAUAAAAyHUYHzhc5AqAAAAAOAAAAAAAAAAAAAAAmHCoS8BcxBqsCAwCAI1oL9XXtMf8jcQD%2FBxsA9UGLA%2FZi3AD128pZ%2Bv%2BzpP%2F8yYv74Jpq93ldSvIDAADuAAAAsgAAACsAAAAEBQoCTh1CCtgFCgFFAAAABAAAAAAAAAAqHCoS8ErMAP9RvxT9beoh%2F2TeIf8USwD9HVoA%2Fx1aAP%2FRpz3%2F%2F3yQ%2F%2F17gf%2F%2Bm5v%2F%2F8TI%2F%2F%2Fj7P%2B1ylr2DhcA6QAAAJsAAAAJAAAACgoaA2shSQumAAAAEAAAAAAAAAAkHCoS8EznAP%2BO%2F1D%2Fk%2F9X%2F6%2F%2Fd%2F9v4Df%2FSZ8l%2Fx1aAP8dWgD%2F%2F5ee%2F%2FyJiP%2F%2Bdnv%2F%2F3uL%2F%2FDBfv%2Bl%2F3H%2Ftts6%2BgQSAPIAAABXAAAAAwAAABEgSAl3AAAADAAAAAAAAAAcHCoS8EPYAP%2B8%2F5P%2Fov9r%2F93%2Fx%2F%2FY%2F7z%2Fo%2F54%2F1u3Lv8dWgD%2F9Z6e%2F%2Fyvr%2F%2F8pKb%2F6Jld%2F9eyMv%2FM6Cf%2Fjvo7%2FB9JAPEAAADsAAAAFwAAAAYXOAg6AAAADAAAAAAAAAAUHCoS8Dy7AP%2Fv%2F%2BH%2F4f%2FN%2F87%2Fs%2F9ryEX%2FXngm%2F7dvW%2F%2F8nqr%2F%2F66t%2F%2Fyrqf%2F8paL%2F3sZr%2F9e%2FSP%2Fb2CT%2Fj%2FAN%2F551J%2B0AAAD%2FAAAAVAAAABUIEwdVHCoS8AAAAAcAAAAKHCoS8EiyAP%2F%2F%2F%2F%2F%2FvfOj%2Fw9UAP%2BmHDb%2F%2BYyl%2F%2F%2FByP%2F%2Fycf%2F%2Fb%2B%2B%2F%2Fy6uf%2F%2FqbX%2F4sOB%2F9nPT%2F%2FayC7%2Ftr8n%2F%2F%2BJjPgAAAD%2FAAAAkREpAKshWwD%2FHCoS8AAAAA4AAAABHCoS8DqfAP90wUn2GTYA%2Fq58Ff7hw3D%2F9NCs%2F%2F%2FKyv%2F90c3%2F%2FsrJ%2F%2F3GxP%2F%2Fu8H%2F9aqU%2F%2FmTjv%2Fjh1n%2FoOID%2Fx1aAP8AAAD%2FKFEO86jdjP9e5gD%2FHCoS8AAAARkAAAAAHCoS8Bg7B7ADCgCIFBcA7sTRDfbp3I%2F%2F9dG9%2F%2F7X2P%2F93dz%2F%2FNrZ%2F%2F7Ozf%2F%2Fxcf%2F48%2BF%2F%2Bm8bv%2FcnUD%2FHVoA%2Fx1aAP98x1b%2F0%2F26%2F%2F%2F%2F%2F%2F9V1wD%2FHCoS8AMDAzMAAAAAHCoS8AAAABgAAAAsAAAA15%2BqCvT05rD%2F8%2BDG%2F%2Fbo0%2F%2F96er%2F%2FuXo%2F%2F3Y1f%2F9zMj%2F%2F7St%2F9aiV%2F86QwD%2FHVoA%2F9P%2Fvf%2F1%2F%2Bf%2FyP%2Bp%2F87%2Frf9J9AD%2FHCoS8AUFA0YAAAAAAAAABBg3CEEAAAAWAAAAqkVLAPD%2B9Yn%2B%2B%2B7i%2F%2F%2F49P%2F%2F8vL%2F%2Fuvp%2F%2F3X0%2F%2F7zcz%2F%2FK6u%2F5Z8Qv9SriH%2Fjedh%2F638gP%2FY%2F77%2FnP9j%2F6D%2Fa%2F9V%2FwD%2FHCoS8AUNAFQAAAAAAAAACBg3CHoFDgFJAAAASwAAAOCSmBny%2FuOv%2F%2F%2Fu6%2F%2F%2F%2F%2Fr%2F%2Fuzs%2F%2F3U0P%2F%2Bw8b%2F%2F6iy%2F%2FeSff8dWgD%2FJGEB9ihdCvds3i3%2Fov9l%2F3b%2FK%2F9k%2FwL%2FHCoS8AYOAGEAAAAAAAAABQ8fAlohTgn8AAAAMAAAAHIAAAD1czwq6%2F%2FBvv7%2F5eT%2F%2F%2BXn%2F%2F%2Fa2%2F%2F%2Fw8T%2F%2BcCJ%2F%2FL%2FOf53YRXrAAAA7BQ6APNF3wD%2FR7wA%2FyJNAPkdWgD%2FHCoS8AkVAGoAAAAAAAAAAAAAABkbPgnEGjwHuQABATIAAACDAAAA3mEqB%2B26cnb14o6E%2BviknP%2Fhopj6r4E1%2BDQ4A%2BgAAADlCR8A4UWVFveR%2F0z%2FJWcF7h1aAP8KBwZLHCoS8AULA0QAAAAAAAAAAAAAAAQDBgE%2FJFMH4xg4B7oAAAAxAAAARQAAAIQAAAC8GgUA6i4NAf0XDQDqAAAAvQAAAJcMKADKPoIY8Xb0Lv80nwD%2FFSQHsQAAABgAAAADAAAACgAAAAQAAAAAAAAAAAAAAAAAAAAECA8EdCp1BPooWwD8DhYKfQAAACcAAAAaAAAAFgAAABkAAAAhAwEFVRc8Bd4tigD%2Fe%2F8q%2FziwAP8cKhLwAAAALAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFw8aB5MsdwTxKoEA%2Fyd0APIeXQDUG1IAwxtXAM8lawDsLokA%2F0bKAP9d%2Bgb%2FNqAA%2BxcxCMsAAAA9AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAABAHCgRdGkMFuCl7APo2nAD%2FPrEA%2F0PDAP9FxwD%2FQLsA%2FzGSAP8nUw7wDBoDjAAAASwAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAFgAAAkITJA%2BxFT8A5xVAAPcWPwD1EjQE1AICBG4AAAAmAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD%2BAD8A%2FAAfAPgADwDwAAcA4AADAAAAAwAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAgAAAAIAAAACAAAAAgAAAAIAAAADAAAAAwAAAAOAABwDwAA8A8AAfAPwAfwAoAAAAEAAAACAAAAABACAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAEhIR8A4iAcAOIhHgDiIR4A4iIhAOIAAAEhAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUBAQJbIh8A4k7mAP5K3QD%2BOKsA9DWdAPA7sQD5JCUA4gYNA1oAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAIBAAJcIR8A4mz6H%2F4aUQDqAAAAmgAAAHMAAABLAAAARBc0B5YlKADiBg8DWwAAAAIAAAAAAAABFCUoAOIAAAErISAA4oH8Pv8IJADzGx0A4jwxFPwdIwD1BAAA2wAAAHoAAAAZBQwDUCYoAOIBAgEhAAAAAAMMAVUjIwDiHRoA4lfbCf4bFgDiHR0A4qhEMPr%2Fraf%2F%2F8rC%2Fv%2Fm5v1SSyvuAAAArAAAAA8IEQJeEy0EdwAAAAMBBABMHx4A4on%2FPP%2B2%2F4H%2Fet1J%2FxkaAOIWHgDi%2F5ah%2F%2F96hv%2F%2Fl5T%2F0%2F9v%2FjRkCPAAAABpAAAACRY3CFgAAAADAAACORsaAOLL%2F57%2F3%2F%2FH%2F8z%2Ft%2F9inC7%2FExoA4ggVAOL6rqH%2F18E%2B%2F8blFv%2BA7hT6AAAA2AAAABIkJgDiIyQA4gAAAh4dHgDi9v%2Fh%2F2OqOv8QEQDiDBEA4v%2FN1P%2F%2FwcH%2F%2F7C1%2F%2BvIev%2FYzSr%2F%2F71d%2FRUACu8eHgDiJmwA4SAgAOIAAAAKISQA4h0fAOIVFwDi%2F%2BZ9%2F%2F%2FT2P%2F%2F3tz%2F%2FdDP%2F%2F%2FEvv%2F7wov%2FEBUA4hQYAOIREwDi3vrQ%2FnnmJv8fHQDiAAAAAiUoAOIAAABOGBwA4v%2F8mv766dz%2F%2Feno%2F%2F3h4v%2F%2Fzsr%2FCxQA4hYaAOKh7IX%2F9P%2Fi%2F9j%2Fuv9f7RL%2FHhoA4gAAAAAFDwIiBAwCOgAAAM7T1FX5%2F%2F%2F3%2F%2F%2F%2F%2F%2F%2F95OD%2F%2F8vR%2F%2F%2Bmo%2F9toAz%2FFhMA4qv%2FdP%2BV%2F1H%2FYf8F%2FyAdAOIAAAAAAgUBHxk8CLAAAABHAAAA2tuHevf%2F7%2Bz%2B%2F%2B%2Fy%2F%2F%2Bknf%2F%2Fqqb%2FamQJ8wAAAOlR2gn%2BOIkC9h8bAOIhIgDiAAAAAAAAAAQQKgN%2BJSYA4gAAAEwAAAC3IAkH3qRBKfpvPSHwCgcA3gAAAMpRpiXzYOIZ%2FiEeAOIAAAIfIyYA4gAAAAAAAAAAAAAAFSQmAOImXwLSAQkAYgAAAFQAAABbAAAAaQcbBqo9pwf1X%2B0V%2FiAdAOIAAAAVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcJScA4iQkAOI4pgD0Mp4A8EDAAPpO6AD%2FQLgC%2BCEeAOIAAAAdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0ABAFRIiEA4iEeAOIhHQDiIB0A4iEgAOIAAAANAAAAAAAAAAAAAAAAAAAAAPAHAADgAwAAwAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAgAAAAIAAAADAAwAA4AcAAPAPAAA%3D";


    scanLinks();
}


if (unsafeWindow) {
  unsafeWindow.eval(injectMe.toString());
  unsafeWindow.eval("injectMe();");
} else {
  //injectMe();
}