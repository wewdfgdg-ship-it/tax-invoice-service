/*================================================================================
   ZABANG.CO.KR - COMPLETE JAVASCRIPT EXTRACTION
   Extracted on: 2025-01-09
   Total Scripts Found: 31 (15 external, 16 internal)
================================================================================*/

/*================================================================================
   GLOBAL VARIABLES AND CONFIGURATION
================================================================================*/

// From: internal script (index 0)
// 자바스크립트에서 사용하는 전역변수 선언
var g5_url       = "https://zabang.co.kr";
var g5_bbs_url   = "https://zabang.co.kr/bbs";
var g5_is_member = "";
var g5_is_admin  = "";
var g5_is_mobile = "";
var g5_bo_table  = "";
var g5_sca       = "";
var g5_editor    = "";
var g5_cookie_domain = "";
var g5_theme_shop_url = "https://zabang.co.kr/theme/zabang/shop";
var g5_shop_url = "https://zabang.co.kr/shop";

/*================================================================================
   EXTERNAL JAVASCRIPT FILES
================================================================================*/

/*
   External JavaScript Libraries and Dependencies:
   
   1. jQuery 1.12.4 - From: https://zabang.co.kr/js/jquery-1.12.4.min.js?ver=2304171
   2. jQuery Migrate 1.4.1 - From: https://zabang.co.kr/js/jquery-migrate-1.4.1.min.js?ver=2304171
   3. jQuery Shop Menu - From: https://zabang.co.kr/js/jquery.shop.menu.js?ver=2304171
   4. Common JS - From: https://zabang.co.kr/js/common.js?ver=2304171
   5. Wrest JS - From: https://zabang.co.kr/js/wrest.js?ver=2304171
   6. Placeholders Min - From: https://zabang.co.kr/js/placeholders.min.js?ver=2304171
   7. Owl Carousel 2.3.4 - From: https://zabang.co.kr/js/owlcarousel/owl.carousel.min.js?ver=2304171
   8. BX Slider - From: https://zabang.co.kr/js/jquery.bxslider.js?ver=2304171
   9. Swiper 5.2.1 - From: https://zabang.co.kr/theme/zabang/shop/html/css_js/swiper.js
   10. Swiper Animation - From: https://zabang.co.kr/theme/zabang/shop/html/css_js/swiper-animation.js
   11. jQuery MB YT Player - From: https://zabang.co.kr/theme/zabang/shop/html/css_js/jquery.mb.YTPlayer.js
   12. Magnific Popup - From: https://zabang.co.kr/theme/zabang/shop/html/css_js/jquery.magnific-popup.js
   13. Test Script - From: https://zabang.co.kr/theme/zabang/test/script.js
   14. Scroll Oldie - From: https://zabang.co.kr/js/scroll_oldie.js (loaded twice)
   15. Theme Common - From: https://zabang.co.kr/theme/zabang/shop/html/css_js/common.js
   16. SNS JS - From: https://zabang.co.kr/js/sns.js
   
   Note: All external JavaScript files have been downloaded to the backup directory
*/

/*================================================================================
   INTERNAL SCRIPTS (from <script> tags)
================================================================================*/

/* ===== SEARCH FORM VALIDATION ===== */
// From: internal script (index 13)
function search_submit(f) {
    if (f.q.value.length < 2) {
        alert("검색어는 두글자 이상 입력하십시오.");
        f.q.select();
        f.q.focus();
        return false;
    }
    return true;
}

/* ===== CATEGORY MENU TOGGLE FUNCTIONALITY ===== */
// From: internal script (index 16)
jQuery(function ($){

    $("button.sub_ct_toggle_1st").on("click", function() {
        var $this = $(this);
        $sub_ul = $(this).closest("li").children("ul.sub_cate");
		$sub_ul.removeClass("sub_cate_mm");
		
		$('.sub_cate_mm').slideUp();

        if($sub_ul.size() > 0) {
            var txt = $this.text();

            if($sub_ul.is(":visible")) {
                txt = txt.replace(/닫기$/, "열기");
                $this
                    .removeClass("ct_cl")
                    .text(txt);
            } else {
                txt = txt.replace(/열기$/, "닫기");
                $this
                    .addClass("ct_cl")
                    .text(txt);
            }

            $sub_ul.slideToggle();
			$('.sub_cate_bb').addClass("sub_cate_mm");
        }
    });

	 $("button.sub_ct_toggle_bt").on("click", function() {
        var $this = $(this);
        $sub_ul = $(this).closest("li").children("ul.sub_cate");		

        if($sub_ul.size() > 0) {
            var txt = $this.text();

            if($sub_ul.is(":visible")) {
                txt = txt.replace(/닫기$/, "열기");
                $this
                    .removeClass("ct_cl")
                    .text(txt);
            } else {
                txt = txt.replace(/열기$/, "닫기");
                $this
                    .addClass("ct_cl")
                    .text(txt);
            }

            $sub_ul.slideToggle();
        }
    });

});

/* ===== MOBILE HEADER SCROLL & CATEGORY MENU ===== */
// From: internal script (index 17)
$( document ).ready( function() {
    var jbOffset = $( '#mobile_hd_wr' ).offset();
    $( window ).scroll( function() {
        if ( $( document ).scrollTop() > jbOffset.top ) {
            $( '#mobile_hd_wr' ).addClass( 'fixed' );
        }
        else {
            $( '#mobile_hd_wr' ).removeClass( 'fixed' );
        }
    });
});

function catetory_menu_fn( is_open ){
	var $cagegory = $("#mobile_category");

	if( is_open ){
		$cagegory.fadeIn();
		$("body").addClass("is_hidden");
	} else {
		$cagegory.fadeOut();
		$("body").removeClass("is_hidden");
	}
}

$(document).on("click", "#mobile_btn_hdcate", function(e) {
	// 오픈
	catetory_menu_fn(1);
}).on("click", ".menu_close", function(e) {
	// 숨김
	catetory_menu_fn(0);
}).on("click", ".cate_bg", function(e) {
	// 숨김
	catetory_menu_fn(0);
});

/* ===== LOGIN FORM FUNCTIONALITY ===== */
// From: internal script (index 18)
$omi = $('#ol_id');
$omp = $('#ol_pw');
$omi_label = $('#ol_idlabel');
$omi_label.addClass('ol_idlabel');
$omp_label = $('#ol_pwlabel');
$omp_label.addClass('ol_pwlabel');

$(function() {
    $("#auto_login").click(function(){
        if ($(this).is(":checked")) {
            if(!confirm("자동로그인을 사용하시면 다음부터 회원아이디와 비밀번호를 입력하실 필요가 없습니다.\\n\\n공공장소에서는 개인정보가 유출될 수 있으니 사용을 자제하여 주십시오.\\n\\n자동로그인을 사용하시겠습니까?"))
                return false;
        }
    });
});

function fhead_submit(f) {
    return true;
}

/* ===== CART DELETE AJAX FUNCTIONALITY ===== */
// From: internal script (index 20)
jQuery(function ($) {
    $("#sbsk").on("click", ".cart_del", function(e) {
        e.preventDefault();

        var it_id = $(this).data("it_id");
        var $wrap = $(this).closest("li");

        $.ajax({
            url: g5_theme_shop_url+"/ajax.action.php",
            type: "POST",
            data: {
                "it_id" : it_id,
                "action" : "cart_delete"
            },
            dataType: "json",
            async: true,
            cache: false,
            success: function(data, textStatus) {
                if(data.error != "") {
                    alert(data.error);
                    return false;
                }

                $wrap.remove();
            }
        });
    });
});

/* ===== QUICK MENU & SIDE PANEL FUNCTIONALITY ===== */
// From: internal script (index 21)
jQuery(function ($){
	
	var active_class = "btn_sm_on",
	side_btn_el = "#quick .btn_sm",
	quick_container = ".qk_con";


	$(".btn_member_mn").on("click", function() {
        $(".member_mn").toggle();
        $(".btn_member_mn").toggleClass("btn_member_mn_on");
    });
    
	 $(document).on("click", ".sop_bt", function(e){
		 $(".side_mn_wr1").show();
		 $("#side_menu").stop().animate({'right':'0px'},500);	
		 $(this).removeClass('sop_bt');		 
		 $(this).addClass('scl_bt');		 	 
		 $(this).find('i').removeClass('fa-chevron-left'); 	 
		 $(this).find('i').addClass('fa-chevron-right');			
	 });
	
	 $(document).on("click", ".scl_bt", function(e){
		 $(".side_mn_wr1").show();
		 $("#side_menu").stop().animate({'right':'-281px'},500);	
		 $(this).removeClass('scl_bt');		 
		 $(this).addClass('sop_bt');		 	 
		 $(this).find('i').removeClass('fa-chevron-right'); 	 
		 $(this).find('i').addClass('fa-chevron-left');	
		 $(side_btn_el).removeClass(active_class);
	 });


    $(document).on("click", side_btn_el, function(e){
        e.preventDefault();	
        var $this = $(this);
        
        if (!$this.hasClass(active_class)) {
            $(side_btn_el).removeClass(active_class);
            $this.addClass(active_class);
        }
		$(quick_container).hide();		

        if( $this.hasClass("btn_sm_cl1") ){
            $(".side_mn_wr1").fadeIn();
        } else if( $this.hasClass("btn_sm_cl2") ){
            $(".side_mn_wr2").fadeIn();
        } else if( $this.hasClass("btn_sm_cl3") ){
            $(".side_mn_wr3").fadeIn();
        } else if( $this.hasClass("btn_sm_cl4") ){
            $(".side_mn_wr4").fadeIn();
        }
    }).on("click", ".con_close", function(e){
        $(quick_container).fadeOut();
        $(side_btn_el).removeClass(active_class);
    });

	$(window).scroll(function(){
		$(".scl_bt").trigger("click");
	});
	

    $("#top_btn").on("click", function() {
        $("html, body").animate({scrollTop:0}, '500');
        return false;
    });
});

/* ===== POPUP CLOSE FUNCTIONALITY ===== */
// From: internal script (index 22)
$(function() {
    $(".hd_pops_reject").click(function() {
        var id = $(this).attr('class').split(' ');
        var ck_name = id[1];
        var exp_time = parseInt(id[2]);
        $("#"+id[1]).css("display", "none");
        set_cookie(ck_name, 1, exp_time, g5_cookie_domain);
    });
    $('.hd_pops_close').click(function() {
        var idb = $(this).attr('class').split(' ');
        $('#'+idb[1]).css('display','none');
    });
    $("#hd").css("z-index", 1000);
});

/* ===== SWIPER SLIDER CONFIGURATION (PC VERSION) ===== */
// From: internal script (index 23)
/**
 * Swiper 4.0.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2017 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: November 28, 2017
 */
//var swiperAnimation = new SwiperAnimation();

var galleryThumbs = new Swiper('.gallery-thumbs-pc', {
  spaceBetween: 0,
  slidesPerView: 4,
  loop: false,
  autoHeight: false,
  calculateHeight:false,
  freeMode: true,
  loopedSlides: 4, //looped slides should be the same			 
});

var swiper = new Swiper('.swiper-container-pc', {
	slidesPerView: 1,
	spaceBetween: 0,
	effect:"slide",
	autoHeight: false,
	loop: true, 	
	pagination: {
		el: '.swiper-pagination-pc',
		clickable: true,
	},		
	preloadImages: false,   
	lazy: true,
	lazy: {
		loadPrevNext: true,
	},
	navigation: {
		nextEl: '.swiper-button-next-pc',
		prevEl: '.swiper-button-prev-pc',
	},
	paginationClickable: true,
	speed: 1000,			
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},
	/*
	on: {
	  init: function () {
		swiperAnimation.init(this).animate();
	  },
	  slideChange: function () {
		swiperAnimation.init(this).animate();
	  }
	},
	*/
	thumbs: {
		swiper: galleryThumbs
	},
});

$( ".swiper-container-pc" ).mouseover(function(){
	$(".swiper-button-next-pc").show();
	$(".swiper-button-prev-pc").show();
});
$( ".swiper-container-pc" ).mouseleave(function(){
	$(".swiper-button-next-pc").hide();
	$(".swiper-button-prev-pc").hide();
});

/* ===== SWIPER SLIDER CONFIGURATION (MOBILE VERSION) ===== */
// From: internal script (index 24)
/**
 * Swiper 4.0.7
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2017 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: November 28, 2017
 */
//var swiperAnimation_mobile = new SwiperAnimation();
var swiper_mobile = new Swiper('.swiper-container-mobile', {
	slidesPerView: 1,
	spaceBetween: 0,
	effect:"slide",
	autoHeight: false,
	loop: true, //유투브 영상을 첫번째 컷, 마지막 컷으로 사용하실 경우 false 로 지정하셔야 합니다. 유투브영상이 없거나 두번째이상 컷에 넣으신다면 true 로 바꾸셔도 됩니다.
	pagination: {
		el: '.swiper-pagination-mobile',
		clickable: true,
	},
	preloadImages: false,   
	lazy: true,
	lazy: {
		loadPrevNext: true,
	},
	navigation: {
		nextEl: '.swiper-button-next-mobile',
		prevEl: '.swiper-button-prev-mobile',
	},
	paginationClickable: true,
	speed: 1000,	
	autoplay: {
		delay: 5000,
		disableOnInteraction: false
	},	
	/*
	on: {
	  init: function () {
		swiperAnimation_mobile.init(this).animate();
	  },
	  slideChange: function () {
		swiperAnimation_mobile.init(this).animate();
	  }
	}
	*/
});

if($('#bgndVideo_mobile').length) {
	swiper_mobile.on('slideChange', function () {	
		var isVideoa_mobile = swiper_mobile.slides[swiper.activeIndex].querySelector('#bgndVideo1_mobile');
		if (isVideoa_mobile) {		
			$("#bgndVideo_mobile").YTPPlay();	
		}else{
			$("#bgndVideo_mobile").YTPPause();
		}
	});
}

$( ".swiper-container-mobile" ).mouseover(function(){
	$(".swiper-button-next-mobile").show();
	$(".swiper-button-prev").show();
});
$( ".swiper-container-mobile-mobile" ).mouseleave(function(){
	$(".swiper-button-next-mobile").hide();
	$(".swiper-button-prev-mobile").hide();
});

/* ===== MAGNIFIC POPUP CONFIGURATION ===== */
// From: internal script (index 25)
$(document).ready(function() {
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
});

/* ===== TOP BUTTON SCROLL TO TOP ===== */
// From: internal script (index 26)
$(function() {
	$("#top_btn").on("click", function() {
		$("html, body").animate({scrollTop:0}, '500');
		return false;
	});
});

/* ===== WISHLIST AND CART BUTTON STYLING ===== */
// From: internal script (index 28)
$('button.btn_wish').each(function (index, item) { 		
	var stringVal = "",
	substring = $(this).attr('data-it_id');
	if(stringVal.indexOf(substring) !== -1){
		$(this).find('i').css("color","#C53428");
	}		
});

$('button.btn_cart').each(function (index, item) { 		
	var stringVal = "",
	substring = $(this).attr('data-it_id');
	if(stringVal.indexOf(substring) !== -1){
		$(this).find('i').css("color","#C53428");
	}		
});

/* ===== ADMIN POPUP RELOAD FUNCTIONALITY ===== */
// From: internal script (index 30)
$(document).ready(function() {	
	$('.dt_iframe_link_bb').magnificPopup({			
		type: 'iframe',	
		mainClass: 'btn_top_admin_bt_mfp',
		callbacks: {			
			afterClose: function() {
			location.reload();
		  },
		 }
	});		
});

/*================================================================================
   INLINE EVENT HANDLERS
================================================================================*/

/* ===== FORM SUBMISSION HANDLERS ===== */
// Search form onsubmit handler
// Element: form
// Handler: return search_submit(this);

// Header form onsubmit handler  
// Element: form
// Handler: return fhead_submit(this);

/*================================================================================
   DYNAMIC FUNCTIONALITY ANALYSIS
================================================================================*/

/*
SLIDERS/CAROUSELS:
- Swiper.js 5.2.1: Main image/content slider with thumbnails support
  * PC version: .swiper-container-pc with thumbnail navigation (.gallery-thumbs-pc)
  * Mobile version: .swiper-container-mobile with responsive design
  * Features: Autoplay (5s delay), lazy loading, pagination, navigation arrows
  * YouTube video integration in mobile slider

- Owl Carousel 2.3.4: Additional carousel functionality
  * Used for general carousel/slider components
  * Touch/drag support for mobile devices

- BX Slider: Legacy slider support
  * Additional slider functionality for older browsers

MODAL/POPUP SYSTEMS:
- Magnific Popup: Handles various popup types
  * YouTube/Vimeo/Google Maps iframe popups
  * Admin interface popups with page reload after close
  * Fade animations and responsive design

- Custom mobile category menu popup
  * Fullscreen overlay menu for mobile navigation
  * Body scroll lock when open

FORM VALIDATION:
- Search form validation: Minimum 2 characters required
- Auto-login confirmation dialog with security warning
- Generic form submission handlers (fhead_submit)

ANIMATIONS:
- jQuery slideToggle() for category menu expansion/collapse
- CSS3 transitions for button states and hover effects
- Smooth scrolling to top functionality
- Mobile header scroll-based sticky positioning
- Side panel slide animations (281px width)

AJAX FUNCTIONALITY:
- Cart item deletion via AJAX
  * Endpoint: /theme/zabang/shop/ajax.action.php
  * JSON response handling with error alerts
  * DOM element removal on success

- Real-time cart and wishlist state management
  * Visual indicator updates (red color #C53428)
  * Data attribute-based item identification

USER INTERFACE INTERACTIONS:
- Quick menu system with multiple panels (4 sections)
- Member dropdown menu toggle
- Category menu hierarchical navigation
- Popup cookie-based dismissal system
- Mobile-responsive header with scroll behavior
- Touch-friendly mobile navigation

RESPONSIVE DESIGN:
- Separate PC and mobile Swiper configurations
- Mobile-first approach for touch interactions
- Responsive popup sizing (disableOn: 700px)
- Adaptive sidebar panel sizing

THIRD-PARTY INTEGRATIONS:
- YouTube video player integration (jquery.mb.YTPlayer)
- Social media sharing (sns.js)
- Placeholder text support for older browsers
- Legacy browser compatibility (scroll_oldie.js)
*/

/*================================================================================
   LIBRARY DEPENDENCIES
================================================================================*/

/*
CORE LIBRARIES:
- jQuery 1.12.4: Main JavaScript library
- jQuery Migrate 1.4.1: Backwards compatibility

SLIDER/CAROUSEL LIBRARIES:
- Swiper 5.2.1: Modern touch slider framework
- Owl Carousel 2.3.4: Responsive carousel plugin
- BX Slider: jQuery slider plugin

POPUP/MODAL LIBRARIES:
- Magnific Popup: Responsive popup/lightbox plugin
- jQuery MB YT Player: YouTube background video player

UI ENHANCEMENT LIBRARIES:
- Placeholders.min.js: Input placeholder polyfill for older browsers

CUSTOM MODULES:
- jquery.shop.menu.js: E-commerce menu functionality
- common.js: Site-wide common functions
- wrest.js: REST API utility functions
- scroll_oldie.js: Cross-browser scroll handling
- swiper-animation.js: Swiper animation extensions
- sns.js: Social media integration
- script.js: Theme-specific functionality

VERSION CACHE BUSTER: ver=2304171 (April 17, 2023)

PERFORMANCE CONSIDERATIONS:
- Lazy loading enabled for images in sliders
- Preload images disabled for better initial load time
- AJAX requests with cache control
- Minified versions of major libraries used
- CDN-like versioning for cache management

BROWSER COMPATIBILITY:
- IE9+ support through jQuery 1.12.4
- Mobile touch support through Swiper and touch events
- Fallback mechanisms for older browsers (placeholders, scroll)
- Cross-browser CSS3 animation support
*/

/*================================================================================
   GLOBAL FUNCTIONS AVAILABLE
================================================================================*/

/*
USER INTERACTION:
- search_submit(f): Search form validation
- fhead_submit(f): Generic form submission handler
- catetory_menu_fn(is_open): Mobile category menu control

UTILITY FUNCTIONS:
- set_cookie(): Cookie management (referenced but not defined in extracted scripts)
- Various jQuery event handlers and DOM manipulations

THIRD-PARTY API:
- Swiper API: slide control, autoplay, navigation
- Magnific Popup API: popup control and callbacks
- YouTube Player API: video playback control

ERROR HANDLING:
- AJAX error handling with user alerts
- Form validation with user feedback
- Graceful fallbacks for missing elements
*/

/* ===== END OF EXTRACTION ===== */