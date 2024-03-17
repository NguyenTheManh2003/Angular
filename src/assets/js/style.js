$(document).ready(function(){
    vnTRUST.goTopStart();
    // SELECT J
    $(".select-j .title").click(function(){
        if(!$(this).parents(".select-j").hasClass("active")){
            $(this).parents(".select-j").addClass("active");
            $(this).parents(".select-j").find(".content").stop().slideDown();
        }
        else{
            $(this).parents(".select-j").removeClass("active");
            $(this).parents(".select-j").find(".content").stop().slideUp();
        }
    });
    // SELECT P
    $(".div_auto_complete .chosen-value").focus(function (e) {
        $(this).parents(".div_auto_complete").addClass("active");
        $(this).parents(".div_auto_complete").find(".dropdown_select").scrollTop(0);
    });
    $(".div_auto_complete .chosen-value").keyup(function(e){
        checkval($(this));
    });
    $(".div_auto_complete .chosen-value").blur(function (e) {
        $(this).parents(".div_auto_complete").removeClass("active");
        $(this).parents(".div_auto_complete").find(".dropdown_select li").removeClass("closed");
    });
    $(".div_auto_complete .dropdown_select li").click(function(e){
        $(this).parents(".div_auto_complete").find(".chosen-value").val($(this).find("> .text").html());
    });
    function checkval(_this){
        var $text = _this.val();
        if ($text.length > 0) {
            _this.parents(".div_auto_complete").find(".dropdown_select li").each(function(e){
                var $choose_text = $(this).find("> .text").html();
                if (!($text.substring(0, $text.length).toLowerCase() === $choose_text.substring(0, $text.length).toLowerCase())) {
                    $(this).addClass("closed");
                } else {
                    $(this).removeClass("closed");
                }
            });
            _this.parents(".div_auto_complete").find(".dropdown_select li").each(function(e){
                if($(this).find("li").size() != $(this).find("li.closed").size()){

                    $(this).removeClass("closed");
                }
            });
        } else {
            _this.parents(".div_auto_complete").find(".dropdown_select li").removeClass("closed");
        }
    }
    // SEARCH TOP
    $(".searchTop .icon").click(function(){
        if(!$(this).parents(".searchTop").hasClass("active")){
            $(this).parents(".searchTop").addClass("active");
        }
        else{
            $(this).parents(".searchTop").removeClass("active");
        }
    });
    // MEMEBR TOP
    $(".memberTop .icon").click(function(){
        if(!$(this).parents(".memberTop").hasClass("active")){
            $(this).parents(".memberTop").addClass("active");
        }
        else{
            $(this).parents(".memberTop").removeClass("active");
        }
    });
    // ORDER TOP
    $(".orderTop .icon").click(function(){
        if(!$(this).parents(".orderTop").hasClass("active")){
            $(this).parents(".orderTop").addClass("active");
        }
        else{
            $(this).parents(".orderTop").removeClass("active");
        }
    });
    $(".orderTop .closez a").click(function(){
        $(this).parents(".orderTop").removeClass("active");
        return false;
    });
    // CART TOP
    $(".cartTop .icon").click(function(){
        if(!$(this).parents(".cartTop").hasClass("active")){
            $(this).parents(".cartTop").addClass("active");
        }
        else{
            $(this).parents(".cartTop").removeClass("active");
        }
    });
    // BIND
    $(window).bind("click",function(e){
        var target=e.target;
        if(!$(target).parents(".searchTop").hasClass("active")){
            $(".searchTop").removeClass("active");
        }
        if(!$(target).parents(".memberTop").hasClass("active")){
            $(".memberTop").removeClass("active");
        }
        if(!$(target).parents(".orderTop").hasClass("active")){
            $(".orderTop").removeClass("active");
        }
        if(!$(target).parents(".cartTop").hasClass("active")){
            $(".cartTop").removeClass("active");
        }
    });
    // FIXED HEADER
    $(window).on("scroll",function(){
        header_height = $("#vnt-header").offset().top;
        if($(window).scrollTop()>=header_height){
            $(".header").addClass("fixed");
        }
        else{
            $(".header").removeClass("fixed");
        }
    });
    // POPUP SUPPORT
    $(".vnt-support a").fancybox({
        type:'ajax',
        baseClass : 'designPopup',
    });
    // SLIDE
    $("#vnt-slide").slick({
        fade:true,
        arrows:false,
    });
    // MENU TAB
    $(".menuTab .mc-menu").click(function(){
        if(!$(this).parents(".menuTab").hasClass("active")){
            $(this).parents(".menuTab").addClass("active");
        }
        else{
            $(this).parents(".menuTab").removeClass("active");
        }
    });
    $("#btn-close").click(function(){
        $(this).parents(".w_content").find(".content-info").stop().slideUp(700);
    });
});
function registerMaillist (){
    var femail = $("#femail").val();
    var ok_send = 1;
    if(femail == '') {
        alert('Vui lòng nhập Email');
        ok_send = 0;
        $('#femail').focus();
        return false;
    }
    if(!vnTRUST.is_email(femail)) {
        alert('Email không đúng định dạng');
        ok_send = 0;
        $('#femail').focus();
        return false;
    }
    if (ok_send){
        var mydata = "email="+femail;
        $.ajax({
            async: true,
            dataType: 'json',
            url: ROOT+'load_ajax.php?do=regMaillist',
            type: 'POST',
            data: mydata ,
            success: function (data) {
                alert(data.mess);
                $('#femail').val('');
                $('#femail').focus();
            }
        }) ;
        return false; 
    } 
    return false;
}
function LoadAjax(doAct,mydata,ext_display) {
    $.ajax({
        async: true,
        url: ROOT+'load_ajax.php?do='+doAct,
        type: 'POST',
        data: mydata ,
        success: function (data) {
            $("#"+ext_display).html(data)
        }
    }) ;
}