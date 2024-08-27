var anal_product = anal_product || [];
function anal_addToCart(id,variante,qta){
	var product = anal_product[id];
	if (variante.length > 0)
		if (typeof product.varianti[variante] != 'undefined')
			product = product.varianti[variante];
	
	ga('ec:addProduct', {
	  'id': product.id,
	  'name': product.name,
	  'category': product.category,
	  'brand': product.brand,
	  'variant': variante,
	  'price': product.price,
	  'quantity': qta
	});
	ga('ec:setAction', 'add');
	ga('send', 'event', 'UX', 'click', 'add to cart');
}

function anal_removeToCart(id,variante,qta){
	var product = anal_product[id];
	if (variante.length > 0)
		if (typeof product.varianti[variante] != 'undefined')
			product = product.varianti[variante];
	
	ga('ec:addProduct', {
	  'id': product.id,
	  'name': product.name,
	  'category': product.category,
	  'brand': product.brand,
	  'variant': variante,
	  'price': product.price,
	  'quantity': qta
	});
	ga('ec:setAction', 'remove');
	ga('send', 'event', 'UX', 'click', 'add to cart');
}

function anal_clickProduct(id,variante,lista){
	var product = anal_product[id];
	if (variante.length > 0)
		if (typeof product.varianti[variante] != 'undefined')
			product = product.varianti[variante];
			
	ga('ec:addProduct', {
	  'id': product.id,
	  'name': product.name,
	  'category': product.category,
	  'brand': product.brand,
	  'variant': variante
	});
	ga('ec:setAction', 'click', {list: lista});
	ga('send', 'event', 'UX', 'click', 'results');
}

$('.productLinkAnal').click(function(){
	id = $(this).attr('product_id') || '';
	variante = $(this).attr('product_variant') || '';
	lista = $(this).attr('product_list') || '';
	if (id.length > 0)
		anal_clickProduct(id,variante,lista);
});

$("a[href^='tel:']").click(function(){
	ga('send','event','Phone','click',$(this).attr('href'));
});

$("a[href^='mailto:']").click(function(){
	ga('send','event','Email','click',$(this).attr('href'));
});

$(".trackClickMail").click(function(){
	ga('send','event','Email','click',$(this).attr('href'));
});

simpleClickGA($("a.trackctaDownloadPDF"), 'CTA - PDF', 'download');
simpleClickGA($("a.trackctaPrint"), 'CTA - Print', 'click', window.location.href);

/** n=> oggetto javascript, e=> categoria (default:link), t => azione (default:click), i => label (default:url del link) **/
function simpleClickGA(n,e,t,i){$(n).click(function(){try{var n=$(this).attr("href");void 0===i&&(i=n),void 0===t&&(t="click"),void 0===e&&(e="link");var a=function(){window.location=n};return"_blank"==$(this).attr("target")&&(a=function(){name=window.open(n,"_blank"),0!=name.length&&"undefined"!=typeof name&&"undefined"!=name&&null!=name&&"null"!=name||(window.location=n)}),ga("send","event",{eventCategory:e,eventAction:t,eventLabel:i,hitCallback:a}),!1}catch(n){return!0}})}


// Youtube tracking
    var players = {};
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onYouTubeIframeAPIReady(e){
        $('iframe.youtubeplayer').each(function(i){
            var youtubeiframeClass = $(this).attr('id');
            players[youtubeiframeClass] = new YT.Player(youtubeiframeClass, {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    }

    function onPlayerReady(e){
       //Player ready functions would go here
    }
    function onPlayerStateChange(e){
		console.log(e);
        var videoTitle = e['target']['playerInfo']['videoData']['title'];
        if ( e.data == YT.PlayerState.PLAYING ){
			ga('send','event','Video','Play',videoTitle);
			dataLayer.push({'event':'videoPlay'});
        }
        if ( e.data == YT.PlayerState.ENDED ){
			ga('send','event','Video','Finished',videoTitle);
			dataLayer.push({'event':'videoFinished'});
        }
    }
