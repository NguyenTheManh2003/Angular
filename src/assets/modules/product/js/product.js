$(document).ready(function(){
    $("#focusNav").slick({
    	slidesToShow : 4,
        arrows:false,
        asNavFor:'#focusFor',
        vertical :true,
        autoplay:true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    vertical :false,
                }
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 3,
                    vertical :false,
                }
            }
        ]
    });
    $("#focusFor").slick({
        fade:true,
        autoplay:true,
        asNavFor:'#focusNav',
        arrows:false,
    });
    // POPUP SUPPORT
    $(".iframeBox a").fancybox({
        type:'iframe',
        baseClass : 'designPopup',
        toolbar  : false,
        smallBtn : true,
    });
    // THUMBNAIL
    $("#vnt-thumbnail").slick({
        arrows:false,
        dots:true,
        autoplay:true,
    });
    // MY SELECT
    $(".mySelect").click(function(){
        $(this).parents(".col-xs-12").siblings(".col-xs-12").find(".autumn").find(".mySelect").removeClass("active");
        if(!$(this).hasClass("active")){
            $(this).addClass("active");
        }
        else{
            $(this).removeClass("active");
        }
    });
    $(window).on("click",function(e){
        var target=e.target;
        if(!$(target).hasClass("active")){
            $(".mySelect").removeClass("active");
        }
    });
    $("html").on("click",".mySelect .listNum ul li",function(){
        num = $(this).text();
        $(this).parents(".mySelect").find(".icon").text(num);
        $(this).parents(".mySelect").find("input").val(num);
        if( $(this).parents(".mySelect").find("input").val()!="0" ){
            $(this).parents(".mySelect").addClass("xanh");
        }
        else{
            $(this).parents(".mySelect").removeClass("xanh");
        }
        totalOder();
    });
    
    maxOrder = $("#maxOrder").val();
    function totalOder(){
        total = 0;
        $(".autumn").each(function(){
            if($(this).find(".mySelect").hasClass("xanh")){
                total += parseInt($(this).find(".mySelect").find(".icon").text());
            }
        });
        minus = maxOrder - total;
        // ===========EMPTY==============
        $(".autumn .mySelect ul").empty();
        // ===========CALC===============
        var __totalPrice = 0;
        $(".autumn").each(function(){
            choseOrder = parseInt($(this).find(".mySelect").find('.icon').text());
            price = $(this).attr('data-price');
            pID = $(this).attr('data-id');
            __totalPrice += (choseOrder*price);
            if($(this).find(".mySelect").hasClass('xanh') ){
                cur = maxOrder - total + choseOrder;
                for (var i = 0; i <= cur; i++) {
                    $(this).find(".mySelect ul").append("<li>"+i+"</li>");
                }
            }
            else{
                for (var i = 0; i <= minus; i++) {
                    $(this).find(".mySelect ul").append("<li>"+i+"</li>");
                }
            }
            $('#choseOrder_'+pID).val(choseOrder);
        });
        // ===========RETURN=============
        $('#moonPrice').val(__totalPrice);
        $(".cartInTop .price #total_price").text(formatNumber(__totalPrice)+' vnđ');
        $(".cartInTop .txtSl span").text(total);
    }
    // BUTTON QUANTITY
    $(".cartInTop .quantity .down").click(function() {
        var $value = parseInt($(this).parents(".quantity").find("input").val());
        if (parseInt($value) > 1) {
            $value = parseInt($value) - 1;
            $(this).parents(".quantity").find("input").val($value);
        }
    });
    $(".cartInTop .quantity .up").click(function() {
        var $value = parseInt($(this).parents(".quantity").find("input").val());
        $value = parseInt($value) + 1;
        $(this).parents(".quantity").find("input").val($value);
    });
    $(".cartInTop").mnfixed({
        limit : '#flagEnd',
        break:768,
        top:110,
    });
});
function choseNumOrder(pID,num){
    var maxOrder = $('#maxOrder').val();
    var numChose = $('#numChose').val();
    var newNum = num + numChose;
    $('#numSelected').html(newNum);
    $('#numChose').val(newNum);
}
function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}