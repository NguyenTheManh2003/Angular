$(document).ready(function(){
    $(".map-contact .mc-tab").click(function(){
        if(!$(this).parents(".map-contact").hasClass("active")){
            $(this).parents(".map-contact").addClass("active");
        }
        else{
            $(this).parents(".map-contact").removeClass("active");
        }
    });
    $(".list-tab li a").click(function(){
        if($(window).innerWidth()<991){
            $(this).parents(".map-contact").removeClass("active");
            $(this).parents(".map-contact").find(".list-tab").stop().slideUp(500);
        }
    });
    $(".view-map-contact a").click(function(){
        $("html,body").animate({
            scrollTop: $("html,body").offset().top
        },1000);
        var target=$(this).attr("href");
        $(".map-contact .list-tab li").removeClass("active");
        $(".map-contact .list-tab li").each(function(){
            if($(this).find("a").attr("href")==target){
                $(this).addClass("active");
            }
        });
        return false;
    });
    $(".map-contact .list-tab li").click(function(){
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        get_hh();
    });
    function get_hh(){
        var t = $(".list-tab li.active a").text();
        $(".map-contact .mc-tab").text(t);
    }
    get_hh();
});