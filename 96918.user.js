// ==UserScript==
// @name           Fok! Secret Story livestream by GekkeGast
// @namespace      Fok! Secret Story livestream by GekkeGast
// @description    Fok! Secret Story livestream by GekkeGast
// @include       http://forum.fok.nl/topic/*
// ==/UserScript==

var stream = document.createElement("div");
stream.innerHTML = '<div class="fieldholder roundall" style="position: fixed; z-index: 1001; left: 50%; top: 25px; margin-left: -415px; text-align: center; height: 116px;"><iframe width="207" height="116" frameborder="0" src="http://admin.brightcove.com/viewer/us1.25.00.02.2011-02-11100301/BrightcoveBootloader.swf?playerID=786805309001&amp;playerKey=AQ~~%2CAAAAiDenBUk~%2CYtnxvBxGO03apcPF77gEmiYkKIAqAVQw&amp;purl=http%3A%2F%2Fsecretstory.nl%2Fkijk-live%2F1%2FCamera%25201&amp;%40videoPlayer=787961833001&amp;autoStart=&amp;bgcolor=%23FFFFFF&amp;debuggerID=&amp;dynamicStreaming=true&amp;flashID=myExperience787961833001&amp;height=345&amp;isUI=true&amp;isVid=true&amp;width=615&amp;wmode=transparant"></iframe><iframe width="207" height="116" frameborder="0" src="http://admin.brightcove.com/viewer/us1.25.00.02.2011-02-11100301/BrightcoveBootloader.swf?playerID=786805309001&amp;playerKey=AQ~~%2CAAAAiDenBUk~%2CYtnxvBxGO03apcPF77gEmiYkKIAqAVQw&amp;purl=http%3A%2F%2Fwww.secretstory.nl%2Fkijk-live%2F2%2FCamera%25202&amp;%40videoPlayer=787961835001&amp;autoStart=&amp;bgcolor=%23FFFFFF&amp;debuggerID=&amp;dynamicStreaming=true&amp;flashID=myExperience787961835001&amp;height=345&amp;isUI=true&amp;isVid=true&amp;width=615&amp;wmode=transparant"></iframe><iframe width="207" height="116" frameborder="0" src="http://admin.brightcove.com/viewer/us1.25.00.02.2011-02-11100301/BrightcoveBootloader.swf?playerID=786805309001&amp;playerKey=AQ~~%2CAAAAiDenBUk~%2CYtnxvBxGO03apcPF77gEmiYkKIAqAVQw&amp;%40videoPlayer=787961836001&amp;autoStart=&amp;bgcolor=%23FFFFFF&amp;debuggerID=&amp;dynamicStreaming=true&amp;flashID=myExperience787961836001&amp;height=345&amp;isUI=true&amp;isVid=true&amp;width=615&amp;wmode=transparant"></iframe><iframe width="207" height="116" frameborder="0" src="http://admin.brightcove.com/viewer/us1.25.00.02.2011-02-11100301/BrightcoveBootloader.swf?playerID=786805309001&amp;playerKey=AQ~~%2CAAAAiDenBUk~%2CYtnxvBxGO03apcPF77gEmiYkKIAqAVQw&amp;%40videoPlayer=787961839001&amp;autoStart=&amp;bgcolor=%23FFFFFF&amp;debuggerID=&amp;dynamicStreaming=true&amp;flashID=myExperience787961839001&amp;height=345&amp;isUI=true&amp;isVid=true&amp;width=615&amp;wmode=transparant"></iframe></div><style>.forumheader{margin-top: 119px;}</style>';
document.body.insertBefore(stream, document.body.firstChild);