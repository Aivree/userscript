// ==UserScript==
// @name        Youtube Color Changer
// @namespace   youtube
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @include     https://plus.googleapis.com/*
// @version     1.0
// @grant    GM_getValue
// @grant    GM_setValue
// ==/UserScript==

var mainCss = '\
    html body, #guide-container{\
        background-color: rgb(18,18,18)!important;\
        background-image: url(http://rmdu45.net84.net/images/font.png)!important;\
        color: #aaa!important;}\
    #content { background: none !important;}\
    #yt-masthead #logo {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -131px -219px !important;}\
    #masthead-appbar-container, #yt-masthead-container {\
        background: #1b1b1b !important;\
        border-bottom: 1px solid #292929 !important;}\
    #masthead-search-terms {\
        background-color: #333 !important;\
        color:#aaa !important;}\
    .masthead-search-terms-border {\
        border: 1px solid #303030 !important;\
        -moz-box-shadow: inset 0 0px 0px #eee !important;\
        -ms-box-shadow: inset 0 0px 0px #eee !important;\
        -webkit-box-shadow: inset 0 0px 0px #000 !important;\
        box-shadow: inset 0 0px 0px #000 !important;}\
    #yt-masthead-user {\
        cursor: pointer !important;}\
    #upload-btn, #appbar-guide-button {\
        background: #1b1b1b !important;}\
    #upload-btn:hover, #appbar-guide-button:hover,\
    .show-guide #appbar-guide-button {\
        border-color: #292929 !important;}\
    body #masthead-expanded-container {\
        background: #222 !important;\
        border-bottom-color: #303030 !important;}\
    #channel-search .show-search img, #channel-search .yt-uix-button-icon-search {\
        background: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;}\
    .hitchhiker-enabled #masthead-search .search-btn-component .yt-uix-button-content {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -173px -62px !important;}\
    .hitchhiker-enabled .feed-author-bubble {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -149px -357px !important;}\
    .hitchhiker-enabled .feed-author-bubble.rec {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -34px -62px !important;}\
    .feed-header {\
        border-bottom-color: #303030 !important;}\
    .feed-item-container .feed-item-main {\
        border-bottom-color: #303030 !important;}\
    .feed-item-container .feed-item-main, .yt-lockup, .yt-lockup-title {\
        color: #aaa !important;}\
    .yt-lockup-title:hover {\
        color: rgb(39, 147, 230) !important;}\
    .feed-item-channel-rec-text a {\
        color: #bbb !important;}\
    .feed-item-content-wrapper.playlist-promo, .feed-item-content-wrapper.channel-lockup {\
        border-color: #303030 !important;\
        -moz-box-shadow: 0 0px 0px #ddd !important;\
        -ms-box-shadow: 0 0px 0px #ddd !important;\
        -webkit-box-shadow: 0 0px 0px #ddd !important;\
        box-shadow: 0 0px 0px #ddd !important;}\
    .feed-item-grouplet-muted .channels-content-item .content-item-detail a.content-item-title, .feed-item-grouplet-muted .channels-content-item .content-item-detail a.content-item-title:visited, .feed-item-grouplet-muted .channels-content-item .content-item-detail a.content-item-title:hover {\
        color: #2793e6 !important;}\
    .yt-lockup-playlist-item {\
        border-bottom-color: #303030 !important;}\
    .yt-uix-button-default, .yt-uix-button-default[disabled], .yt-uix-button-default[disabled]:hover, .yt-uix-button-default[disabled]:active, .yt-uix-button-default[disabled]:focus {\
        border-color: #303030!important;\
        background: #242323!important;\
        color: #aaa!important;}\
    .qualified-channel-title.ellipsized .qualified-channel-title-text {\
        color: #aaa !important;}\
    .branded-page-related-channels, .branded-page-related-channels h2, .branded-page-related-channels h2 a {\
        color: #777 !important;}\
    .branded-page-v2-primary-col {\
        border-right-color: #303030 !important;\
        border-bottom-color: #303030 !important;\
        border-left-color: #303030 !important;\
        background-color: #1b1b1b !important;}\
    .branded-page-v2-primary-col .branded-page-box {\
        border-bottom-color: #303030 !important;}\
    .branded-page-v2-has-solid-bg .branded-page-v2-col-container {\
        border-right-color: #303030 !important;\
        border-bottom-color: #303030 !important;\
        border-left-color: #303030 !important;\
        background-color: #1b1b1b !important;}\
    .branded-page-v2-secondary-col .branded-page-related-channels-see-more a {\
        color: #777 !important;}\
    .branded-page-v2-secondary-col .branded-page-related-channels-see-more a:hover {\
        color: #2793e6 !important;}\
    .branded-page-v2-has-solid-bg .branded-page-v2-secondary-col {\
        border-left-color: #303030 !important;}\
    .branded-page-v2-masthead-ad-header.masthead-ad-expanded .branded-page-v2-primary-col {\
        border-top-width: 0px !important;}\
    .branded-page-v2-subnav-container {\
        border-bottom-color: #303030 !important;}\
    #c4-header-bg-container {\
        border-bottom-color: #303030 !important;}\
    #channel-subheader {\
        border-bottom-color: #303030 !important;}\
    .welcome.c4-spotlight-module-component {\
        border-bottom-color: #303030 !important;}\
    .c4-welcome-primary-col {\
        border-right-color: #303030 !important;}\
    .c4-welcome-secondary-col {\
        border-left-color: #303030 !important;}\
    .c4-box {\
        border-bottom-color: #303030 !important;}\
    #c4-shelves-container {\
        background-color: transparent !important;}\
    #c4-about-tab, #c4-about-tab .about-stats .about-stat {\
        color: #aaa !important;}\
    .about-network-stat, .about-subscriptions, .other-channels-module, .package-module {\
        border-top-color: #303030 !important;}\
    .yt-uix-button-icon-report-user {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -81px -62px !important;}\
    .compact-shelf .yt-uix-button-shelf-slider-pager {\
        background: #1b1b1b !important;}\
    .compact-shelf-view-all-card {\
        border-color: #303030 !important;}\
    .branded-page-module-title, .branded-page-module-title a:visited, .branded-page-module-title a {\
        color: #aaa !important;}\
    .yt-lockup .yt-lockup-meta a, .yt-lockup .yt-lockup-description a {\
        color: #999 !important;}\
    #channel-search .show-search img, #channel-search .yt-uix-button-icon-search {\
        background: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;}\
    #player {\
        background: transparent !important;}\
    .player-unavailable {\
        float: inherit !important;}\
    #watch7-main-container {\
        padding-top: 5px !important;}\
    .watch-branded-banner .player-branded-banner {\
        height: 0px !important;}\
    #watch7-content {\
        background: #1b1b1b !important;}\
    #watch7-headline, #watch7-notification-area, #watch7-user-header {\
        border-width: 0px !important;\
        background: transparent !important;}\
    #watch7-headline h1 a {\
        color: #aaa !important;}\
    #watch7-action-buttons {\
        border-left-width: 0px !important;\
        border-right-width: 0px !important;\
        border-bottom: 1px solid #292929 !important;}\
    #watch7-secondary-actions .yt-uix-button {\
        color: #aaa !important;}\
    #watch7-action-panels {\
        border-left-width: 0px !important;\
        border-right-width: 0px !important;}\
    #watch-description-toggle .yt-uix-button-text {\
        margin-top: 7px !important;\
        margin-bottom: 10px !important;\
        color: #aaa !important;\
        background: #2b2b2b !important;}\
    .yt-uix-button {\
        -moz-border-radius: 2px !important;\
        -webkit-border-radius: 2px !important;\
        border-radius: 2px !important;\
        -moz-box-shadow: 0 0px 0 rgba(0,0,0,0.05) !important;\
        -ms-box-shadow: 0 0px 0 rgba(0,0,0,0.05) !important;\
        -webkit-box-shadow: 0 0px 0 rgba(0,0,0,0.05) !important;\
        box-shadow: 0 0px 0 rgba(0,0,0,0.05) !important;}\
    .yt-uix-button-default:hover, .yt-uix-button-text:hover {\
        border-color: #444343 !important;\
        background: #222 !important;}\
    #watch7-secondary-actions .yt-uix-button:hover, #watch7-secondary-actions .yt-uix-button:active, #watch7-secondary-actions .yt-uix-button.yt-uix-button-active, #watch7-secondary-actions .yt-uix-button.yt-uix-button-toggled {\
        border-bottom-color: #930 !important;\
        background: transparent !important;\
        border-top-color: transparent !important;}\
    .yt-uix-button-default:active, .yt-uix-button-default.yt-uix-button-toggled, .yt-uix-button-default.yt-uix-button-active, .yt-uix-button-default.yt-uix-button-active:focus, .yt-uix-button-text:active {\
        -moz-box-shadow: inset 0 0px 0 #ddd !important;\
        -ms-box-shadow: inset 0 0px 0 #ddd !important;\
        -webkit-box-shadow: inset 0 0px 0 #ddd !important;\
        box-shadow: inset 0 0px 0 #ddd !important;}\
    #watch7-action-panels #watch7-action-panel-footer {\
        background: #151515!important;}\
    #watch7-action-panel-footer .yt-horizontal-rule {\
        height: 3px !important;\
        border-top-width: 0px !important;}\
    .watch-playlists-drawer ul {\
        border-color: #303030 !important;\
        background: #222222 !important;\
        -moz-box-shadow: 0 0px 0 !important;\
        -ms-box-shadow: 0 0px 0 !important;\
        -webkit-box-shadow: 0 0px 0 !important;\
        box-shadow: 0 0px 0 !important;}\
    #action-panel-addto .playlist-item.selected a, #action-panel-addto a {\
        color: #aaa !important;}\
    .metadata-inline {\
        background: #313131 !important;}\
    .branded-page-v2-body #channel-feed-post-form {\
        border-bottom-color: #303030 !important;}\
    #watch-discussion {\
        padding: 10px 14px !important;\
        border-width: 0px !important;}\
    #watch-description.yt-uix-expander-collapsed #watch-description-content, #watch-description-clip {\
        color: #aaa !important;}\
    #watch-response {\
        background: #1b1b1b !important;}\
    #watch-response-content {\
        border-top-color: #303030 !important;}\
    #watch-response-content-sort {\
        border-bottom-color: #303030;}\
    #watch-response-header-content p a, .watch-response-item-content p a {\
        color: inherit !important;}\
    #watch-discussion {\
        color: #777 !important; }\
    .context clearfix em {\
        color: #830 !important;}\
    li.comment.removed .content.clearfix, li.comment.flagged .content.clearfix {\
        margin-left: 0px !important;}\
    #watch-description-extras .title {\
        color: #555 !important;}\
    .live-comments-setting {\
        border-color: #303030 !important;}\
    .subscribe-label {\
        color: #fff !important;}\
    .yt-subscription-button-subscriber-count-branded-horizontal, .yt-subscription-button-subscriber-count-branded-vertical, .yt-subscription-button-subscriber-count-unbranded-horizontal, .yt-subscription-button-subscriber-count-unbranded-vertical {\
        color: #aaa !important;\
        border-color: #303030 !important;}\
    .yt-subscription-button-subscriber-count-branded-horizontal, .yt-subscription-button-subscriber-count-unbranded-horizontal {\
        background-color: #2b2b2b !important;}\
    .yt-subscription-button-subscriber-count-unbranded-vertical.yt-uix-tooltip, .yt-subscription-button-subscriber-count-branded-vertical, .yt-subscription-button-subscriber-count-unbranded-vertical {\
        background: #1b1b1b !important;\
        border-color: #303030 !important;}\
    .yt-uix-button-subscribed-branded, .yt-uix-button-subscribed-branded[disabled], .yt-uix-button-subscribed-branded[disabled]:hover, .yt-uix-button-subscribed-branded[disabled]:active, .yt-uix-button-subscribed-branded[disabled]:focus, .yt-uix-button-subscribed-unbranded, .yt-uix-button-subscribed-unbranded[disabled], .yt-uix-button-subscribed-unbranded[disabled]:hover, .yt-uix-button-subscribed-unbranded[disabled]:active, .yt-uix-button-subscribed-unbranded[disabled]:focus {\
        background: transparent !important;\
        border-width: 0px !important;}\
    .yt-uix-button-subscribe-unbranded, .yt-uix-button-subscribe-unbranded[disabled], .yt-uix-button-subscribe-unbranded[disabled]:hover, .yt-uix-button-subscribe-unbranded[disabled]:active, .yt-uix-button-subscribe-unbranded[disabled]:focus {\
        border-color: #303030 !important;\
        background: #222 !important;}\
    .yt-uix-form-input-textarea.comments-textarea.link-gplus-lightbox {\
        background: #2b2b2b !important;\
        border-width: 0px !important;\
        color: #aaa !important;}\
    .caption-line {\
        border-color: #303030 !important;\
        -moz-border-radius: 0px !important;\
        -webkit-border-radius: 0px !important;\
        border-radius: 0px !important;}\
    #watch-transcript-track-selector {\
        background: #1b1b1b !important;\
        color: #aaa !important;}\
    #watch7-action-panels #watch7-action-panel-footer {\
        height: 5px!important;}\
    #comments-view hr {\
        border-top: 5px solid #151515 !important;\
        margin: 0 -14px !important;}\
    /*Guide*/\
    .guide-section-separator {\
        border-bottom-color: #555 !important;}\
    .guide-context-item a:hover, .guide-context-item.context-playing a {\
        background-color: #333 !important;}\
    #guide-container .guide-item.guide-item-selected {\
        color: #fff !important;}\
    .guide-context-item .title {\
        color: #999 !important;}\
    .guide-item {\
        color: #bbb !important;}\
    	/* Main Guide */\
    	/* Watch Page */\
    .site-left-aligned #page.watch #guide-container {\
        padding: 5px 0 5px 5px !important;}\
    .guide-module {\
        margin-bottom: 0px !important;}\
    #watch-context-container {\
        margin-top: 8px !important;}\
    #guide-main .guide-module-toggle-label h3 {\
        line-height: 28px !important;}\
    #guide-main .guide-module-toggle-icon {\
        margin-top: 0px !important;}\
    		/* Context Dropdown */\
    .yt-scrollbar ::-webkit-scrollbar-thumb {\
        border-left-width: 0px !important;\
        background: #ccc !important;\
        -webkit-box-shadow: inset 0 0 0px transparent ;}\
    .yt-scrollbar ::-webkit-scrollbar-track {\
        border-left-width: 0px !important;\
        -webkit-box-shadow: inset 0 0 0px transparent;}\
    .guide-module-content.yt-scrollbar {\
        height: auto !important;}\
    #watch-context-container ul {\
        max-height: 506px !important;}\
    /* Newspaper Shelf */\
    .lohp-large-shelf-container {\
        border-right-color: #303030 !important;}\
    .lohp-large-shelf-container .lohp-blog-headline {\
        border-top-color: #777 !important;}\
    .lohp-newspaper-shelf {\
        border-bottom-color: #303030 !important;}\
    .lohp-shelf-cell-container:hover {\
        background-color: #222 !important;}\
    .lohp-shelf-cell-container {\
        border-color: #303030 !important;}\
    .lohp-blog-headline {\
        color: #777 !important;}\
    /* Browse Channels */\
    .guide-builder-page-header {\
        border-bottom-color: #303030 !important;}\
    .channels-search .search-button .yt-uix-button-content {\
        background: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;}\
    .category-header .category-title {\
        color: #999 !important;}\
    .yt-gb-shelf-hero-content .title {\
        color: #777 !important;}\
    .yt-gb-shelf-main-content {\
        border-color: #303030 !important;\
        -moz-box-shadow: 0 1px 2px #303030 !important;\
        -ms-box-shadow: 0 1px 2px #303030 !important;\
        -webkit-box-shadow: 0 1px 2px #303030 !important;\
        box-shadow: 0 1px 2px #303030 !important;}\
    .yt-gb-shelf-paddle {\
        background-color: #222 !important;\
        border-color: #303030 !important;}\
    .yt-gb-shelf .yt-gb-shelf-paddle:hover {\
        -moz-box-shadow: 0 0 10px 1px rgba(50,50,50,.7) !important;\
        -ms-box-shadow: 0 0 10px 1px rgba(50,50,50,.7) !important;\
        -webkit-box-shadow: 0 0 10px 1px rgba(50,50,50,.7) !important;\
        box-shadow: 0 0 10px 1px rgba(50,50,50,.7) !important;}\
    /* Subscription Manager */\
    .collection-promo .yt {\
        color: #aaa !important;}\
    .collection-promo {\
        border-bottom-color: #303030 !important;}\
    .create-collection-button.yt-uix-button.yt-uix-button-primary.yt-uix-button-size-default .yt-uix-button-content {\
        color: #fff !important;}\
    .subscriptions-filter .filter-button .yt-uix-button-content {\
        background: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;}\
    .subscriptions-filter .filter-button {\
        -moz-border-radius-topleft: 0 !important;\
        -webkit-border-top-left-radius: 0 !important;\
        border-top-left-radius: 0 !important;\
        -moz-border-radius-bottomleft: 0 !important;\
        -webkit-border-bottom-left-radius: 0 !important;\
        border-bottom-left-radius: 0 !important;}\
    #subscription-manager-container .subscription-manager-header {\
        border-bottom-color: #303030 !important;}\
    .subscriptions-filter .filter-field-container {\
        border-color: #303030 !important;\
        background: #000 !important;}\
    #subscription-manager-container .even td {\
        background: #222 !important;\
        border-color: #303030 !important;}\
    #subscription-manager-container .subscription-title, #subscription-manager-container .collection-title {\
        color: #aaa !important;}\
    .subscription-item:first-child {\
        border-top: 1px solid #303030 !important;}\
    .subscription-picker-header {\
        border-bottom-color: #303030 !important;}\
    /* Channel Editing */\
    .channel-header .secondary-header-contents {\
        background-color: #333 !important;\
        border-bottom-color: #303030 !important;}\
    .secondary-header-contents .nav-text {\
        color: #fff !important;}\
    #channel-header-view-as-link img {\
        background: no-repeat url(http://i.imgur.com/TLZeIKB.png) 0 -93px !important;}\
    #channel-header-vm-link img {\
        background: no-repeat url(http://i.imgur.com/v8MBqQk.png) -64px -23px !important;}\
    #channel-header-analytics-link img {\
        background: no-repeat url(http://i.imgur.com/v8MBqQk.png) 0 -339px !important;}\
    .c4-module-is-editable .c4-module-editor-actions {\
        background-color: #222 !important;}\
    .yt-uix-button-c4-view-action {\
        border-bottom-color: #303030 !important;\
        border-left-color: #303030 !important;\
        background-color: #222 !important;\
        -moz-border-radius: 0 !important;\
        -webkit-border-radius: 0 !important;\
        border-radius: 0 !important;\
        color: #aaa !important;}\
    .yt-uix-button-icon-c4-editor-move-up {\
        background: no-repeat url(http://i.imgur.com/TLZeIKB.png) -6px -160px !important;}\
    .yt-uix-button-icon-c4-editor-move-down {\
        background: no-repeat url(http://i.imgur.com/TLZeIKB.pngp) -6px -149px !important;}\
    .c4-module-editor-form {\
        background-color: #222 !important;}\
    .c4-shelf-preview {\
        border-color: #303030 !important;\
        background: #222 !important;}\
    .c4-shelf-preview-container-content {\
        padding-left: 11px !important;\
        padding-right: 11px !important;}\
    .c4-shelf-preview+.preview-click-guard {\
        background: #000 !important;}\
    #c4-about-tab .c4-module-is-editable:hover {\
        background-color: #222 !important;}\
    #c4-about-tab .about-metadata .yt-uix-button-c4-view-action {\
        border-top-color: #303030 !important;}\
    .yt-uix-form-legend, .yt-uix-form-label {\
        color: #999 !important;}\
    .watch-pencil-icon .yt-uix-button-icon-pencil {\
        background: no-repeat url(http://i.imgur.com/P8b3ZSs.png) 0 -140px !important;}\
        /* Trailer Popup */\
    .yt-dialog-fg-content, .yt-uix-overlay-fg-content {\
        color: #aaa !important;}\
    .yt-video-picker-scroll-container {\
        border-color: #303030 !important;}\
    .yt-video-picker-grid .video-picker-item:hover {\
        background-color: #222 !important;}\
    .yt-uix-overlay-actions {\
        border-top-color: #303030 !important;\
        background: transparent !important;}\
    .watch-editable:hover {\
        background-color: #222 !important;}\
    /* Creator Sidebar */\
    #creator-sidebar .creator-sidebar-channel-link {\
        margin-left: 4px !important;}\
    #creator-sidebar .creator-sidebar-channel-link a, #creator-sidebar .creator-sidebar-channel-link a:hover {\
        color: #aaa !important;\
        font-size: 12px !important;}\
    #creator-sidebar .creator-sidebar-section a {\
        color: #aaa !important;}\
    #creator-sidebar .creator-sidebar-section.selected>a.selected, #creator-sidebar .creator-sidebar-item.selected>a {\
        color: #fff !important;}\
    #creator-sidebar .creator-sidebar-section.selected {\
        border-top-color: #303030 !important;\
        border-bottom-color: #303030 !important;}\
    /* Inbox */\
    #folder_title {\
        background: #1b1b1b !important;\
        border-bottom-color: #303030 !important;\
        color: #ddd !important;}\
    #masthead-subnav.yt-nav.yt-nav-dark.legacy-masthead {\
        width: 958px !important;\
        background: #242424 !important;\
        border-bottom: 1px solid #303030 !important;\
        border-left: 1px solid #303030 !important;\
        border-right: 1px solid #303030 !important;\
        left: -5px !important;}\
    .hh #yt-admin-content {\
        background: #1b1b1b !important;\
        border-right-color: #303030 !important;\
        border-left-color: #303030 !important;\
        border-bottom: 1px solid #303030 !important;}\
    .buttonbar {\
        color: #aaa !important;\
        border-top-color: #303030 !important;\
        background: #1b1b1b !important;}\
    .sorterbar th {\
        border-bottom-color: #303030 !important;\
        border-top-color: #303030 !important;\
        color: #bbb !important;\
        background: #1b1b1b !important;}\
    .m_nohighlight {\
        background-color: #1b1b1b !important;}\
    .m_highlight {\
        background-color: #1f1f1f !important;}\
    .message.closed td {\
        vertical-align: middle !important;}\
    .message-display a {\
        color: #aaa !important;}\
    .msg-date.pointer, .message h3, .message .yt-admin-h3 {\
        color: #aaa !important;}\
    .message.open td {\
        color: #aaa !important;\
        background-color: #2a2a2a !important;\
        border: 1px solid #303030 !important;\
        border-left: none !important;\
        border-right: none !important;}\
    /* Dashboard */\
    .hh #dashboard-header {\
        background-color: #1b1b1b !important;\
        border-bottom-color: #303030 !important;}\
    .hh #dashboard-header h1 {\
        color: #aaa !important;}\
    #dashboard-header h1 {\
        text-shadow: 0 0px 0 #000 !important;\
        font-size:24px !important;}\
    .hh #dashboard-header .dashboard-stat-value {\
        color: #aaa !important;}\
    #dashboard-header h2 {\
        text-shadow: 0 0px 0 #000 !important;}\
    #dashboard-header .dashboard-stat-value, #dashboard-header .dashboard-stat-name {\
        text-shadow: 0 0px 0 #000 !important;}\
    .hh #dashboard-header-stats li {\
        border-left-color: #303030 !important;}\
    .dashboard-widget.notification, .dashboard-widget .dashboard-widget-content, .dashboard-widget .dashboard-widget-config {\
        background-color: #1b1b1b !important;\
        color: #aaa !important;\
        border-color: #303030 !important;}\
    .dashboard-widget-header:hover, .dashboard-widget .dashboard-widget-config .dashboard-widget-header, .dashboard-widget.yt-uix-dragdrop-dragged-item .dashboard-widget-header, .dashboard-widget.yt-uix-dragdrop-cursor-follower .dashboard-widget-header {\
        background-color: #1b1b1b !important;\
        border-bottom-color: #303030 !important;}\
    .dashboard-widget:hover .dashboard-widget-display-title, .dashboard-widget.yt-uix-dragdrop-dragged-item .dashboard-widget-display-title, .dashboard-widget.yt-uix-dragdrop-cursor-follower .dashboard-widget-display-title {\
        border-right-width: 0px !important;}\
    .dashboard-widget-header:hover .dashboard-widget-header-controls, .dashboard-widget.yt-uix-dragdrop-dragged-item .dashboard-widget-header .dashboard-widget-header-controls, .dashboard-widget.yt-uix-dragdrop-cursor-follower .dashboard-widget-header .dashboard-widget-header-controls {\
        border-color: #303030 !important;}\
    	/* Notifications */\
    .yt-creator-notifications .yt-creator-tip-list .inactive {\
        background: #1b1b1b !important;\
        color: #aaa !important;}\
    .yt-creator-notifications .yt-creator-tip-list tr {\
        color: #aaa !important;}\
    .creator-confirmation-overlay .creator-confirmation-overlay-header {\
        border-bottom-color: #303030 !important;\
        background: #222 !important;}\
    .creator-confirmation-overlay .creator-confirmation-overlay-body {\
        color: #bbb !important;}\
    	/* Widgets */\
    .dashboard-widget-todos .todo-item {\
        border-color: #303030 !important;}\
    .dashboard-widget-todos .todo-item:hover {\
        background-color: #222 !important;}\
    .dashboard-widget-todos .todo-description {\
        border-bottom-width: 0px !important;}\
    .dashboard-widget-todos .todo-item:first-child {\
        border-bottom-width: 0px !important;}\
    .dashboard-widget-todos .todo-item:last-child {\
        border-bottom: 1px solid #303030 !important;}\
    .dashboard-widget-analytics .section+.section {\
        border-top-color: #303030 !important;}\
    .dashboard-widget-analytics .section-sparkline {\
        background: #fff !important;\
        padding-top: 3px !important;\
        padding-bottom: 3px !important;\
        border: 2px solid #666 !important;}\
    .dashboard-widget-videos .video-list-item .video-title a {\
        color: #2793e6 !important;}\
    /* Video Manager */\
    #vm-page-subheader h3 {\
        color: #aaa !important;}\
    #vm-video-actions-bar, #vm-video-actions-inner {\
        background: #1b1b1b !important;}\
    #vm-video-actions-inner {\
        border-bottom-color: #303030 !important;}\
    .vm-search-btn .yt-uix-button-content {\
        background: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;}\
    .yt-uix-button-icon-vm-beauty-view {\
        background: no-repeat url(http://i.imgur.com/zBZBCS5.png) -315px -197px !important;}\
    .yt-uix-button-icon-vm-list-view {\
        background: no-repeat url(http://i.imgur.com/zBZBCS5.png) -16px -244px !important;}\
    #vm-view-btn {\
        color: #aaa !important;}\
    .vm-confirmation-overlay .vm-confirmation-overlay-header {\
        border-bottom-color: #303030 !important;\
        background-image: -moz-linear-gradient(top,#333 0,#222 100%) !important;\
        background-image: -ms-linear-gradient(top,#333 0,#222 100%) !important;\
        background-image: -o-linear-gradient(top,#333 0,#222 100%) !important;\
        background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#222)) !important;\
        background-image: -webkit-linear-gradient(top,#333 0,#222 100%) !important;\
        background-image: linear-gradient(to bottom,#333 0,#222 100%) !important;}\
    .vm-confirmation-overlay .vm-confirmation-overlay-main-area {\
        color: #aaa !important;}\
    .vm-confirmation-overlay .vm-video-actions-delete-warning strong {\
        color: #C33 !important;}\
    #vm-bulk-actions-editing-header {\
        background-color: #1b1b1b !important;\
        border-top-color: #303030 !important;\
        color: #888 !important;}\
    #vm-bulk-actions-editing-header, #vm-bulk-actions-editing-buttons {\
        border-bottom-color: #303030 !important;}\
    #vm-bulk-actions-selection-link {\
        color: #ccc !important;}\
    .ad-options-overlay-form .ad-formats-heading {\
        color: #aaa !important;}\
    .ad-formats-overlay .form-area, .preview-area .ad-format-preview {\
        color: #888 !important;}\
    	/* List View */\
    .vm-list-view .vm-video-list li {\
        background: #1b1b1b !important;}\
    .vm-list-view .vm-video-item-content {\
        border-bottom-color: #303030 !important;}\
    .vm-list-view .vm-video-metrics {\
        background: #1b1b1b !important;\
        border-left-color: #303030 !important;}\
    .vm-list-view .vm-video-title .vm-video-title-content {\
        color: #aaa !important;}\
    .vm-list-view .vm-video-metrics a:hover {\
        background: #222 !important;}\
    #vm-bulk-actions-selection {\
        background-color: #222 !important;}\
    #vm-bulk-actions-progress-bar, #vm-bulk-actions-selection {\
        border-bottom-color: #303030 !important;}\
    	/* Beauty View */\
    .vm-beauty-view .vm-video-item-content {\
        background: #2b2b2b !important;\
        -moz-box-shadow: 0 0px 0px #e0e0e0 !important;\
        -ms-box-shadow: 0 0px 0px #e0e0e0 !important;\
        -webkit-box-shadow: 0 0px 0px #e0e0e0 !important;\
        box-shadow: 0 0px 0px #e0e0e0 !important;}\
    .vm-beauty-view .vm-video-item:hover .vm-video-item-content {\
        -moz-box-shadow: 0 0px 0px #aaa !important;\
        -ms-box-shadow: 0 0px 0px #aaa !important;\
        -webkit-box-shadow: 0 0px 0px #aaa !important;\
        box-shadow: 0 0px 0px #aaa !important;\
        border-bottom: 3px solid #cc181e !important;}\
    .vm-beauty-view .vm-video-title-content {\
        color: #aaa !important;}\
    .yt-thumb {\
        background: transparent !important;}\
    #vm-pagination {\
        background: #1b1b1b !important;}\
    /* Video Editor */\
    #creator-editor-container, .hh.editor-content {\
        background: #1b1b1b !important;\
        border-color: #303030 !important;}\
    .metadata-editor-container .video-settings-form {\
        background: #1b1b1b !important;}\
    .creator-editor-nav {\
        border-bottom-color: #303030 !important;}\
    .creator-editor-header, .creator-editor-content #inline-editor-header {\
        border-bottom-color: #303030 !important;}\
    .metadata-editor-container .subnav {\
        border-bottom-color: #303030 !important;}\
    .creator-editor-nav-tabs li span, .creator-editor-nav-tabs li a {\
        color: #aaa !important;}\
    .creator-editor-icon-edit {\
        background: no-repeat url(http://i.imgur.com/TugICAm.png) 0 -110px !important;}\
    .creator-editor-icon-enhance {\
        background: no-repeat url(http://i.imgur.com/TugICAm.png) 0 -22px !important;}\
    .creator-editor-icon-audio {\
        background: no-repeat url(http://i.imgur.com/TugICAm.png) 0 -44px !important;}\
    .creator-editor-icon-annotate {\
        background: no-repeat url(http://i.imgur.com/TugICAm.png) 0 -66px !important;}\
    .creator-editor-icon-captions {\
        background: no-repeat url(http://i.imgur.com/TugICAm.png) 0 0 !important;}\
    .creator-editor-title a {\
        color: #bbb !important;}\
    #player-and-info-pane #video-info dt {\
        color: #aaa !important;}\
    #player-and-info-pane #video-info dd {\
        color: #999 !important;}\
    .tabs .tab-header.selected a, .tabs .tab-header a:hover, .tabs .tab-header a:focus {\
        color: #bbb !important;}\
    .video-likes-count img {\
        background: no-repeat url(http://i.imgur.com/zBZBCS5.png) -381px -256px !important;}\
    .video-dislikes-count img {\
        background: no-repeat url(http://i.imgur.com/zBZBCS5.png) -315px -221px !important;}\
    .video-settings-add-tag {\
        background: #222 !important;\
        color: #aaa !important;\
        border: 1px solid #303030 !important;\
        display: block !important;\
        width: 528px !important;}\
    .video-settings-add-tag:focus {\
        border: 1px solid #404040 !important;}\
    .yt-chip, .tag {\
        background: #111 !important;\
        color: #777 !important;\
        border-color: #303030 !important;\
        -moz-box-shadow: 0 0px 0 white !important;\
        -ms-box-shadow: 0 0px 0 white !important;\
        -webkit-box-shadow: 0 0px 0 white !important;\
        box-shadow: 0 0px 0 white !important;}\
    .yt-uix-form-input-select {\
        text-shadow: 0 1px 0 rgba(100,100,100,.5) !important;\
        background-color: #2b2b2b !important;\
        background-image: -moz-linear-gradient(top,#222 0,#2c2c2c 100%) !important;\
        background-image: -ms-linear-gradient(top,#222 0,#2c2c2c 100%) !important;\
        background-image: -o-linear-gradient(top,#222 0,#2c2c2c 100%) !important;\
        background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#222),color-stop(100%,#2c2c2c)) !important;\
        background-image: -webkit-linear-gradient(top,#222 0,#2c2c2c 100%) !important;\
        background-image: linear-gradient(to bottom,#222 0,#2c2c2c 100%) !important;}\
    .yt-uix-form-input-select {\
        border: 1px solid #444 !important;\
        color: #bbb !important;}\
    .enable-monetization-field {\
        color: #aaa !important;}\
    .monetization-disclaimer {\
        border-color: #303030 !important;\
        background: #222 !important;}\
    .vm-video-not-monetized img {\
        background: no-repeat url(http://i.imgur.com/mTg8eeL.png) -336px -197px !important;}\
    	/* Tabs */\
    #inline-editor-main {\
        background-color: #1b1b1b !important;}\
    		/* Audio Tab */\
    #audio-ui-pagefold {\
        display: none !important;}\
    .audio-ui-featured-table-header {\
        color: #bbb !important;}\
    #audio-ui-featured-table-container thead td {\
        background-image: -moz-linear-gradient(top,#333 0,#2c2c2c 100%) !important;\
        background-image: -ms-linear-gradient(top,#333 0,#2c2c2c 100%) !important;\
        background-image: -o-linear-gradient(top,#333 0,#2c2c2c 100%) !important;\
        background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#333),color-stop(100%,#2c2c2c)) !important;\
        background-image: -webkit-linear-gradient(top,#333 0,#2c2c2c 100%) !important;\
        background-image: linear-gradient(to bottom,#333 0,#2c2c2c 100%) !important;}\
    #audio-ui-featured-table {\
        border-color: #303030 !important;}\
    .audio-ui-featured-row {\
        border-color: #303030 !important;\
        color: #aaa !important;}\
    .audio-ui-featured-row:hover {\
        background-color: #222 !important;}\
    .yt-search-field .yt-uix-form-input-fluid {\
        padding-right: 48px !important;}\
    .yt-search-field {\
        border-color: #303030 !important;\
        height: 33px !important;\
        margin: 0 !important;\
        background-color: #222 !important;\
        -moz-box-shadow: inset 0 0px 0px #eee !important;\
        -ms-box-shadow: inset 0 0px 0px #eee !important;\
        -webkit-box-shadow: inset 0 0px 0px #eee !important;\
        box-shadow: inset 0 0px 0px #eee !important;}\
    .yt-search-field-search-button .yt-uix-button-content {\
        background: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;}\
    		/* Annotations Tab */\
    #annotator-add-div {\
        border-bottom-color: #303030 !important;}\
    #annotator-div {\
        background: #1b1b1b !important;\
        border-width: 0px !important;}\
    #annotator-select-div {\
        border-bottom-color: #303030 !important;}\
    		/* Captions Tab */\
    .timedtext-content {\
        background-color: transparent !important;}\
    #bottom-notes-section {\
        border-top-color: #303030;\
        background-color: transparent !important;}\
    	/* Tags */\
    .vm-label-item, .vm-member-item {\
        border-bottom-color: #303030 !important;\
        background: #1b1b1b !important;}\
    .yt-alert-naked .yt-alert-content {\
        color: #ccc;}\
    /* Playlist View */\
    .playlist-video-item {\
        border-top-color: #303030 !important;\
        background-color: transparent !important;\
        color: #aaa !important;}\
    .yt-uix-button-icon-c4-editor-edit {\
        background: no-repeat url(http://i.imgur.com/FwVdCu1.png) 0 -58px !important;}\
    .yt-uix-button-icon-play-all {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -29px -181px !important;}\
    .yt-uix-button-icon-playlist-like {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -168px -253px !important;}\
    .yt-uix-button:hover .yt-uix-button-icon-playlist-like {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) 0 0 !important;}\
    .yt-uix-button-icon-playlist-dislike {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -15px -339px !important;}\
    .yt-uix-button:hover .yt-uix-button-icon-playlist-dislike {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -209px -399px !important;}\
    .playlist-share.yt-uix-button-playlist-action.yt-uix-button.yt-uix-button-text.yt-uix-button-size-default.yt-uix-tooltip {\
        color: #aaa !important;}\
    .header-stats {\
        color: #aaa !important;}\
    .playlist-pager, .playlist-video-item {\
        border-top-color: #303030 !important;}\
    /* Playlist Editor */\
    #playlist-editor-title {\
        color: #aaa !important;}\
    .yt-uix-button-icon-c4-editor-trash {\
        background: no-repeat url(http://i.imgur.com/FwVdCu1.png) 0 -111px !important;}\
    #playlist-editor-navigation-menu {\
        border-bottom-color: #303030 !important;}\
    #playlist-info, #playlist-info .yt-uix-form-legend {\
        color: #999 !important;}\
    .playlist-video-item .playlist-video-item-handle {\
        border-left-color: #303030 !important;\
        border-right-color: #303030 !important;\
        background: #222 !important;}\
    .playlist-video-item .yt-user-name {\
        color: #888 !important;}\
    .playlist-video-items {\
        border-bottom-color: #303030 !important;}\
          /* Intro Popup */\
    .yt-dialog-fg-content, .yt-uix-overlay-fg-content {\
        border-color: #444 !important;}\
    .yt-dialog-bg, .yt-uix-overlay-bg {\
        background-color: #111 !important;}\
    .yt-dialog-fg, .yt-uix-overlay-fg {\
        background: #1b1b1b !important;\
        border-color: #303030 !important;}\
    .yt-dialog-base .yt-dialog-header h2, .yt-uix-overlay-base .yt-uix-overlay-header h2 {\
        color: #aaa !important;}\
    .yt-dialog-base .yt-dialog-header, .yt-uix-overlay-base .yt-uix-overlay-header {\
        border-bottom-color: #303030 !important;}\
    #interstitial-editor h3 {\
        color: #aaa !important;}\
    /* Watch Sidebar */\
    #watch7-sidebar {\
        background: transparent !important;\
        padding-left: 5px !important;}\
    #watch7-sidebar-contents {\
        margin-top: 0px !important;}\
    #watch7-sidebar .watch-sidebar-section {\
        background: #1b1b1b !important;\
        border-top: 10px solid #1b1b1b !important;\
        border-left: 5px solid #1b1b1b !important;\
        border-right-width: 0px !important;\
        border-bottom: 10px solid #1b1b1b !important;\
        width: 350px !important;\
        margin: 0 !important;}\
    .watch-branded #watch7-sidebar {\
        background: transparent !important;}\
    .watch-branded-banner #watch7-sidebar {\
        margin-top: -400px !important;}\
    .watch-wide #watch7-sidebar {\
        margin-top: 0 !important;}\
    .watch-wide #watch7-sidebar, .watch-playlist #watch7-sidebar, .watch-branded #watch7-sidebar {\
        padding-top: 0px !important;}\
    #watch7-sidebar .watch-sidebar-head, #watch7-sidebar .watch-sidebar-foot {\
        color: #999 !important;}\
    .yt-sidebar-title, .yt-sidebar-title a {\
        color: #aaa !important;}\
    .yt-sidebar-link {\
        color: #999 !important;}\
    .yt-sidebar-title.yt-sidebar-selected a, .yt-sidebar-link.yt-sidebar-selected {\
        color: #fff !important;}\
    .gssb_m {\
        color: #aaa !important;\
        background: #181818 !important;}\
    .gssb_e {\
        border: 1px solid #303030 !important;}\
    .gssb_i td {\
        background: #222 !important;}\
    .yt-uix-button-icon-addto {\
        background: no-repeat url(http://i.imgur.com/VirN1wE.pngp) -172px -221px !important;}\
    #watch7-sidebar .video-list .video-list-item .title {\
        color: #999 !important;}\
    #watch7-sidebar .video-list .video-list-item .title:hover {\
        color: #2793e6 !important;}\
    #watch7-sidebar .video-list .video-list-item .title {\
        text-overflow: ellipsis !important;}\
    #watch7-sidebar .video-list-item a:visited .title {\
        color: #555 !important;}\
    #watch7-sidebar .video-list-item a:hover:visited .title {\
        color: #0059B3 !important;}\
    /* Watch Later page */\
    #watch-later-promo {\
        background: #1b1b1b !important;}\
    .feed-promo {\
        border-bottom-color: #303030 !important;}\
    #watch-later-promo .watch-later-tv, #watch-later-promo .watch-later-nyan {\
        display: none !important;}\
    #watch-later-promo p {\
        color: #999 !important;}\
    /* Social Page */\
    #social-promo {\
        background-color: #1b1b1b !important;}\
    #social-promo h4, #social-promo .google-upgrade-promo {\
        color: #777 !important;}\
    /* In-feed promo */\
    #channel-subscription-promo-in-feed {\
        background: #222 !important;}\
    #channel-subscription-promo-in-feed .message .channel-content h4 a {\
        color: #ccc !important;}\
    /* Upload Page */\
    #main-content .starting-box {\
        border-color: #303030 !important;\
        background: #1b1b1b !important;}\
    #upload-prompt-box {\
        border-width: 0px !important;}\
    #upload-button-text,\
    #upload-other-options-list .upload-option-text,\
    #upload-sidebar .upload-sidebar-header, #upload-help-links-non-hh strong {\
        color: #aaa !important;}\
    .upload-help-link-list .help-item {\
        color: #999 !important;}\
    .yt-uix-button-icon-upload-add {\
        background: transparent url(http://i.imgur.com/4zVtksY.png) no-repeat !important;}\
    .yt-uix-button-icon-upload-cancel {\
        background: transparent url(http://i.imgur.com/bk23XgU.png) no-repeat !important;}\
    .upload-header {\
        background: #1b1b1b !important;\
        border-color: #303030 !important;\
        border-top-width: 0px !important;}\
    .upload-item {\
        border-color: #303030 !important;\
        border-top-width: 0px !important;\
        background-color: #1b1b1b !important;}\
    .item-title {\
        color: #bbb !important;}\
    .sharing-networks-label {\
        color: #777 !important;}\
    .monetize-options-box {\
        border-color: #303030 !important;\
        border-radius: 0px !important;\
        -moz-box-shadow: 0 0px 0px #000 !important;\
        -ms-box-shadow: 0 0px 0px #000 !important;\
        -webkit-box-shadow: 0 0px 0px #000 !important;\
        box-shadow: 0 0px 0px #000 !important;}\
    hr.metadata-separator-line {\
        background: #303030 !important;\
        border-bottom-color: #303030 !important;}\
    .metadata-status-video-not-monetized img {\
        background: no-repeat url(http://i.imgur.com/mTg8eeL.png) -336px -197px !important;}\
    /* Footer */\
    body #footer-container {\
        background-color: #1b1b1b !important;\
        border-top: 1px solid #292929 !important;}\
    #footer-main {\
        border-bottom-width: 0px !important;}\
    #footer-main > div {\
        background: none !important;}\
    #footer-logo img {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -131px -219px !important;}\
    #footer-links-primary a {\
        color: #999 !important;}\
    .yt-uix-button-default:active, .yt-uix-button-default.yt-uix-button-toggled, .yt-uix-button-default.yt-uix-button-active, .yt-uix-button-default.yt-uix-button-active:focus, .yt-uix-button-text:active {\
        background: #222 !important;}\
    .yt-uix-button-panel:hover #watch-like-dislike-buttons .yt-uix-button-text.yt-uix-button-toggled {\
        border-color: #303030 !important;\
        background-color: #222 !important;\
        background-image: -moz-linear-gradient(top,#222 0,#2e2e2e 100%) !important;\
        background-image: -ms-linear-gradient(top,#222 0,#2e2e2e 100%) !important;\
        background-image: -o-linear-gradient(top,#222 0,#2e2e2e 100%) !important;\
        background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#222),color-stop(100%,#2e2e2e)) !important;\
        background-image: -webkit-linear-gradient(top,#222 0,#2e2e2e 100%) !important;\
        background-image: linear-gradient(to bottom,#222 0,#2e2e2e 100%) !important;}\
    .video-extras-sparkbar-dislikes {\
        background: #F00 !important;}\
    #share-panel-buttons .yt-uix-button:hover, #share-panel-buttons .yt-uix-button:active, #share-panel-buttons .yt-uix-button.yt-uix-button-active, #share-panel-buttons .yt-uix-button.yt-uix-button-toggled {\
        border-bottom-color: #ccc !important;}\
    .search-header .num-results, .search-header .num-results strong, .search-header .yt-uix-button-content, .filter-col-title, .filter,\
    .epic-nav-dropdown-group:hover, body a.yt-uix-button-epic-nav-item:hover, body a.yt-uix-button-epic-nav-item.selected, body a.yt-uix-button-epic-nav-item.yt-uix-button-toggled, button.yt-uix-button-epic-nav-item:hover, button.yt-uix-button-epic-nav-item.selected, button.yt-uix-button-epic-nav-item.yt-uix-button-toggled, .epic-nav-item:hover, .epic-nav-item.selected, .epic-nav-item.yt-uix-button-toggled, .epic-nav-item-heading,\
    .comment-text, .comment .author,\
    .yt-uix-button-subscribed-branded .yt-uix-button-content span, .yt-uix-button-subscribe-branded .yt-uix-button-content, .share-email label, #comments-view h4, #comments-view h4 a, #watch7-views-info,\
    #yt-masthead-user-displayname, #masthead-search-term,\
    #share-panel-buttons .yt-uix-button {\
        color: #aaa !important;}\
    .action-panel-content .report-video-title {\
        border-color:#ccc !important;}\
    .yt-uix-form-input-text, .yt-uix-form-input-textarea {\
        background: #111 !important;\
        border-color: #2b2b2b !important;\
        color: #aaa !important;}\
    .yt-uix-button .yt-uix-button-icon-action-panel-transcript {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -172px -159px !important;}\
    .yt-uix-button-icon-action-panel-report {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -81px -62px !important;}\
    .yt-uix-button-icon-action-panel-stats {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -61px -225px !important;}\
    .yt-uix-button-icon-watch-like {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -168px -253px !important;}\
    .yt-uix-button:hover .yt-uix-button-icon-watch-like {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) 0 0 !important;}\
    .actionable .yt-uix-button:active .yt-uix-button-icon-watch-like, .actionable .yt-uix-button.yt-uix-button-toggled .yt-uix-button-icon-watch-like {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -195px -253px !important;}\
    .yt-uix-button-icon-watch-dislike {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -15px -339px !important;}\
    .yt-uix-button:hover .yt-uix-button-icon-watch-dislike {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -209px -399px !important;}\
    .yt-uix-button:active .yt-uix-button-icon-watch-dislike, .yt-uix-button.yt-uix-button-toggled .yt-uix-button-icon-watch-dislike {\
        background: no-repeat url(http://i.imgur.com/DDNZc3U.png) -15px -316px !important;}\
    .search-header {\
        border-bottom-color: #303030 !important;}\
    #watch7-user-header .yt-user-name {\
        color: #2793e6 !important;}\
    #eow-title,\
    .yt-uix-button img, .yt-uix-button-icon-wrapper+.yt-uix-button-content,\
    .yt-default h1, .yt-default h2, .yt-default h3, .yt-default h4, .yt-default h5, .yt-default h6, h1.yt, h2.yt, h3.yt, h4.yt, h5.yt, h6.yt {\
        color: #888 !important;}\
    #comments-view .comment-text a {\
        color: #2793e6 !important;}\
    .g-hovercard.yt-uix-sessionlink.yt-user-name {\
        word-wrap: break-word;}\
    #watch7-headline h1 .long-title {\
        color: #999 !important;}\
    .yt-uix-button-subscribed-branded:hover .yt-uix-button-content span, .yt-uix-button-subscribe-branded:hover .yt-uix-button-content, .yt-uix-expander-head {\
        color: #ccc !important;}\
    .watch-view-count {\
        color: #ddd !important;}\
    .account-section-setting,h3.account-section-header,\
    #watch7-user-header .yt-user-videos, #watch-description-extra-info .metadata-info-title, #action-panel-addto .watch-playlists-drawer h3, .watch-playlists-drawer .playlist-addto-title-options label {\
        color: #999 !important;\
    }\
    .comments-section-description {\
        color: #777 !important;}\
    .account-container {\
        background: #1b1b1b !important;\
        border-color: #303030 !important;}\
    .account-header h2 {\
        color: #bbb !important;}\
    .account-content {\
        color: #888 !important;}\
    .account-features-list tr {\
        border-bottom-color: #303030 !important;}\
    .social-connector {\
        border-color: #303030 !important;\
        background: #2b2b2b !important;\
        color: #ccc !important;}\
    .yt-horizontal-rule {\
        border-top-color: #303030 !important;}\
    .yt-uix-form-input-checkbox, .yt-uix-form-input-checkbox-element {\
        background: #2a2a2a !important;\
        border-color: #555 !important;}\
    .yt-uix-form-input-checkbox-container input:checked+.yt-uix-form-input-checkbox-element {\
        background: no-repeat #2a2a2a url(http://i.imgur.com/DDNZc3U.png) -155px -62px !important;\
        border: 1px solid #36649c !important;}\
    .yt-badge {\
        border-color: #303030 !important;\
        color: #aaa !important;}\
    .no-adsense-text .yt-uix-button {\
        color: #fff !important;}\
    #google-cookie-alert {\
        border-top-color: #303030 !important;}\
    .search-header {\
        border-bottom-color: #303030 !important;}\
    #filter-dropdown {\
        background-color: #222 !important;}\
    /* Button Menu (dropdown) */\
    .yt-uix-button-menu {\
        border-color: #444 !important;\
        background: #222 !important;}\
    .yt-uix-button-menu .yt-uix-button-menu-item {\
        color: #ccc !important;}\
    .menu-item-top-divider {\
        border-top-color: #444 !important;}\
    .vm-action-menu-content .yt-uix-button-menu-item.menu-subheading {\
        background: #292929 !important;}\
    .yt-uix-button-menu .yt-uix-button-menu-item.menu-subheading {\
        border-top-color: #444 !important;\
        color: #ccc !important;}\
    /* Youtube Broken Page */\
    #error-page-content p {\
        color: #aaa !important;\
        text-shadow: 0px 0 0 #000 !important;}\
    #masthead-search .search-btn-component .yt-uix-button-content {\
        background: no-repeat url(http://i.imgur.com/VirN1wE.png) -170px -201px !important;}\
    /* Youtube Stop Download Script */\
    #stop-download {\
        margin-left: 5px !important;}\
    #stpdownload {\
        color: #fff !important;}';
    
var largePlayerCss = '\
    .watch-medium #player-api  {\
        width: 1000px!important;\
        height: 593px!important;}\
    .watch-medium .watch7-playlist-bar {\
        width: 1000px!important;}\
    .watch-medium .watch7-playlist-bar-left {\
        width: 700px !important;}\
    .watch-medium #watch7-playlist-tray-container {\
        left: 700px !important;}\
    .watch-medium #watch7-creator-bar {\
        width: 960px !important;}';

var commentsCss = '\
    #widget_bounds > div,\
    #widget_bounds > div > div > div,\
    #widget_bounds > div > div[jsaction] > div > div {\
        background: none !important;}\
    .Ct {\
        color: #aaa !important;}\
    .Ct > a {\
        color: #bbb !important;}\
    *[role="button"], div[class="tvb yDa"] {\
        border-color: #303030!important;\
        background: #242323!important;}\
    *[role="button"], *[role="button"] > * {\
        color: #aaa!important;}';


var theme = GM_getValue("theme", "Switch");
var head = document.getElementsByTagName("head")[0];
var body = document.getElementsByTagName("body")[0];

if (window.top == window) {
    var ls = document.createElement("style");
    ls.setAttribute("type", "text/css");
    ls.innerHTML = largePlayerCss;
    
    head.appendChild(ls);
    
    var but = createButton()
    but.setAttribute("style", "position:fixed;bottom:11px;right:11px;width:59px;z-index:999999999;");
    but.name = "themeButton";
    but.innerHTML = "<span class='yt-uix-button-content' >" + theme + "</span>";
    
    but.onclick = function() {
        switchToDark();
    }
    
    body.appendChild(but);
    
    if (theme == "Dark") {
        switchToDark();
    } else if (theme == "Light") {
        switchToLight();
    }
} else {
    if (theme == "Dark") {
        switchCommentsToDark();
    } else if (theme == "Light") {
        switchCommentsToLight();
    }
}

function changeName(but) {
    var theme = GM_getValue("theme", "switch");
    but.innerHTML = "<span class='yt-uix-button-content' >" + theme + "</span>";
}

function switchToDark() {
    var ss = createTyleTag();
    ss.innerHTML = mainCss;
    head.appendChild(ss);

    var but = document.getElementsByName("themeButton")[0];
    but.onclick = function() {
        switchToLight();
    }
    
    GM_setValue("theme", "Dark");
    changeName(but);
    
    reloadComments();
}

function switchCommentsToDark() {
    var cs = createTyleTag();
    cs.innerHTML = commentsCss;
    head.appendChild(cs);
}

function switchToLight() {
    var ss = document.getElementsByName("darkYouTubeTheme")[0];
    
    if (ss != null) {
        ss.parentNode.removeChild(ss);
    }
    
    var but = document.getElementsByName("themeButton")[0];
    but.onclick = function() {
        switchToDark();
    }
    
    GM_setValue("theme", "Light");
    changeName(but);
    
    reloadComments();
}

function reloadComments() {
    var c = document.getElementById("comments-test-iframe");
    var comments = c.getElementsByTagName("iframe")[0];
    
    var split = comments.src.split("?");
    
    var oldsrc = split[0] + "?r=2&" + split[1];
    
    comments.src = oldsrc;
}

function switchCommentsToLight() {
    var cs = head.getElementsByName("darkYouTubeTheme")[0];
    
    if (cs != null) {
        cs.parentNode.removeChild(cs);
    }
}

function createButton() {
    var result = document.createElement("button");
    result.setAttribute("role","button");
    result.setAttribute("type","button");
    result.setAttribute("class"," yt-uix-button yt-uix-button-primary yt-uix-button-size-default");
    return result;
}

function createTyleTag() {
    var result = document.createElement("style");
    result.setAttribute("type", "text/css");
    result.setAttribute("name", "darkYouTubeTheme");
    return result;
}