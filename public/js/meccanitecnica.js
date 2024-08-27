function updateSize(){
    $('.owl-carousel-homeslider .owl-item').each(function () {
        if($(this).find('img').length) {
            currHeight = parseInt($(this).css('height'));
            $('.owl-carousel-homeslider .owl-item .item-video').css('height', currHeight + 'px');
            $('.owl-carousel-homeslider .owl-item .item-video').css('max-height', currHeight + 'px');
            console.log(currHeight);
            return;
        }
    });
}

$(document).ready(function() {
    function goToByScroll(achor){
        // Scroll
        $('html,body').animate({
            scrollTop: $("h3[name="+achor+"]").offset().top - 15
        }, 'slow');
    }
  
    $("a[href^=\"#\"]").click(function(e) { 
        // Prevent a page reload when a link is pressed
        e.preventDefault(); 
        // Call the scroll function
        goToByScroll($(this).attr("href").replace("#", ""));           
    });
    
    $('form[name=search_form] input[name=p]').devbridgeAutocomplete({
        serviceUrl: 'ajax_get_prodotti.php',
        maxHeight: 200,
        params: { 
            key: function () { 
                return $('form[name=search_form] input[name=p]').val(); 
            }
        }
    });
    
    $('form[name=search_form_mobile] input[name=p]').devbridgeAutocomplete({
        serviceUrl: 'ajax_get_prodotti.php',
        maxHeight: 200,
        params: { 
            key: function () { 
                return $('form[name=search_form_mobile] input[name=p]').val(); 
            }
        }
    });
    
    $('.menu > li').click(function(e){
        var width = $(this).width(), height = $(this).height(), posX = $(this).offset().left, posY = $(this).offset().top;
        if((e.pageX - posX) > ((width/100)*80)) {
            e.preventDefault();
        }
        
        $(this).find('ul').slideToggle('slow');
        $(this).find('a.sub').toggleClass('active');
    });
    
    $('li.sub').mouseleave(function() {
        if($(this).find('.menu ul[style*="block"]').length) {
            $(this).find('.menu > li > ul').slideToggle('slow');
            $(this).find('.menu > li > a.sub').toggleClass('active');
        }
    });
    
    $('.menuicon').click(function() {
        $('.menu-mobile .menu-responsive').slideToggle('slow');
        
        if($('.menu-mobile').find('.menu ul[style*="block"]').length) {
            $('.menu-mobile').find('.menu > li > ul').slideToggle('slow');
            $('.menu-mobile').find('.menu > li > a.sub').toggleClass('active');
        }
        
        if($(this).hasClass('active')) 
            $(this).removeClass('active');
        else
            $(this).addClass('active');
    });
    
    $('.owl-carousel-homeslider').owlCarousel({
        mouseDrag: false,
        touchDrag: true,
        items: 1,
        autoHeight: true,
        autoHeight: true,
        lazyLoad: true,
        loop: true,
        autoplay: $('.item-video').length?false:true,
        autoplayTimeout: $('.item-video').length?0:7000,
        nav: true,
        animateIn: (typeof animationEffect == "undefined") ? "" : animationEffect,
        navText: [
            '<div class="slide-prev"></div>',
            '<div class="slide-next"></div>'
        ],
        onChanged: function(event) {
            $(".owl-carousel-homeslider .owl-item").find("img").removeClass('zoomed');
            $(".owl-carousel-homeslider .owl-item").find(".txt").removeClass('zoomed');
            $(".owl-carousel-homeslider .owl-item").eq(event.item.index).find("img").addClass('zoomed');
            $(".owl-carousel-homeslider .owl-item").eq(event.item.index).find(".txt").addClass('zoomed');
            
            updateSize();
        },
        onRefreshed: function (event) {
            updateSize();
        },
        onInitialized: function(event) {
            if($(".owl-carousel-homeslider .owl-stage-outer").height() < 10) {
                $(".owl-carousel-homeslider .owl-stage-outer").css("height", "auto");
            }
            
            updateSize();
        },
        onResized: function(event) {
            updateSize();
        }
    });
    
    $('.owl-carousel-prodotti').owlCarousel({
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            768:{
                items:3
            },
            1204:{
                items:4
            }
        },
        autoHeight: true,
        lazyLoad: true,
        loop: true,
        nav: true,
        navText: [
            '<div class="slide-prev"></div>',
            '<div class="slide-next"></div>'
        ]
    });
    
    $('.owl-carousel-mercati').owlCarousel({
        responsive:{
            0:{
                items:1
            },
            480:{
                items:2
            },
            600:{
                items:3
            },
            900:{
                items:4
            },
            1204:{
                items:4
            }
        },
        autoHeight: true,
        lazyLoad: true,
        loop: true,
        nav: true,
        navText: [
            '<div class="slide-prev"></div>',
            '<div class="slide-next"></div>'
        ]
    });
    
    $('.owl-carousel-news').owlCarousel({
        responsive:{
            0:{
                items:1
            },
            480:{
                items:1
            },
            600:{
                items:2
            },
            900:{
                items:2
            },
            1204:{
                items:3
            }
        },
        autoHeight: true,
        lazyLoad: true,
        loop: false,
        nav: true,
        navText: [
            '<div class="slide-prev"></div>',
            '<div class="slide-next"></div>'
        ]
    });
    
    // slideshow
	$('.blk-slideshow ul').bxSlider({responsive:true,mode:'fade',pager:false});
    
    // usemap
    $("img[usemap]").rwdImageMaps();
    
    // fancybox
    $("a.zoom").fancybox({'transitionIn':'fade','transitionOut':'fade','titlePosition':'over','overlayColor':'#000','overlayOpacity':0.5,'padding':0});
    
    // custom input file
	$("input[type=file]").filestyle({image:"img/input-file-bg.png",imageheight:'36px',imagewidth:'48px',width:'calc(96% - 48px)'});
    
    // select box
	$(function(){$(".select-box").selectbox();});
    
    // scrollreveal
    //window.sr = ScrollReveal();
    //if($('.row').length) sr.reveal('.row', { delay : 200, duration: 500, distance: '50px', easing: 'ease', mobile: true, scale: 1 });
    //if($('.owl-carousel:not(.owl-carousel-homeslider)').length) sr.reveal('.owl-carousel:not(.owl-carousel-homeslider)', { delay : 200, duration: 500, distance: '50px', easing: 'ease', mobile: true, scale: 1 });

    // stabilimenti
    var stabilimentoEntered = false;
    if($('#stabilimenti-map').length) {
        $('#stabilimenti-map area').each(function() {
            var id = $(this).attr('stabilimento-id');
            $(this).mouseover(function() {
                if(!stabilimentoEntered) {
                    stabilimentoEntered = true;
                    $('#mappa-stabilimenti img').removeClass('zoomed');
                    switch(id) {
                        case 'stabilimento-1':
                            $(this).parent().parent().find('#img-' + id).addClass('zoomed').velocity({top: "9%", left: "-16%", scale: "2"},{queue: false, duration: 400},{easing: "ease"});
                            break;
                        case 'stabilimento-2':
                            $(this).parent().parent().find('#img-' + id).addClass('zoomed').velocity({top: "-8%", left: "-25%", scale: "2"},{queue: false, duration: 400},{easing: "ease"});
                            break;
                        case 'stabilimento-3':
                            $(this).parent().parent().find('#img-' + id).addClass('zoomed').velocity({top: "-26%", left: "-16%", scale: "2"},{queue: false, duration: 400},{easing: "ease"});
                            break;
                        case 'stabilimento-4':
                            $(this).parent().parent().find('#img-' + id).addClass('zoomed').velocity({top: "-8%", left: "-35%", scale: "2"},{queue: false, duration: 400},{easing: "ease"});
                            break;
                        case 'stabilimento-5':
                            $(this).parent().parent().find('#img-' + id).addClass('zoomed').velocity({top: "-26%", left: "-6%", scale: "2"},{queue: false, duration: 400},{easing: "ease"});
                            break;
                        case 'stabilimento-6':
                            $(this).parent().parent().find('#img-' + id).addClass('zoomed').velocity({top: "-26%", left: "8%", scale: "2"},{queue: false, duration: 400},{easing: "ease"});
                            break;
                        case 'stabilimento-7':
                            $(this).parent().parent().find('#img-' + id).addClass('zoomed').velocity({top: "-8%", left: "38%", scale: "2"},{queue: false, duration: 400},{easing: "ease"});
                            break;
                        case 'stabilimento-8':
                            $(this).parent().parent().find('#img-' + id).addClass('zoomed').velocity({top: "12%", left: "8%", scale: "2"},{queue: false, duration: 400},{easing: "ease"});
                            break;
                        case 'stabilimento-9':
                            $(this).parent().parent().find('#img-' + id).addClass('zoomed').velocity({top: "-8%", left: "18%", scale: "2"},{queue: false, duration: 400},{easing: "ease"});
                            break;
                    }
                }
            });
        });
        
        $('.stabilimento-map area').each(function() {
            var id = $(this).attr('stabilimento-id');
            $(this).mouseout(function() {
                if(stabilimentoEntered) {
                    stabilimentoEntered = false;
                    $(this).parent().parent().find('#img-' + id).removeClass('zoomed').velocity({top: "0%", left: "0%", scale: "1"},{duration: 1},{easing: "ease"});
                }
            });
        });
        
        $('.stabilimento-img').mouseout(function() {
            stabilimentoEntered = false;
            $('#mappa-stabilimenti img').removeClass('zoomed').velocity({top: "0%", left: "0%", scale: "1"},{duration: 1},{easing: "ease"});
        });
    }
});