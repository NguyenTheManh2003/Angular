$(document).ready(function(){
    $(".slideNews").slick({
    	arrows:false,
    	dots:true,
    	autoplay: true,
    	fade:true,
    });
    $(".box_news_sidebar").mnfixed({
        limit:'#flagEnd',
        top:110,
    });
});