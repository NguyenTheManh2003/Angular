$(document).ready(function(jQuery){
    // THUMBNAIL
    jQuery("#vnt-thumbnail").slick({
        arrows:false,
        dots:true,
        fade:true,
    });
    jQuery("#vnt-thumbnail .slick-slide.slick-current .img img").elevateZoom({
        zoomType  : "lens",
        lensShape : "round",
        lensSize    : 130
    });
    // COUNTDOWN
    var timec;
    jQuery(".productDeal").each(function(){
        var timec = jQuery(this).attr("date-time");
        jQuery(this).countdown(timec, function(event) {
            jQuery(this).find(".day").find(".ti").text(event.strftime('%D'));
            jQuery(this).find(".hour").find(".ti").text(event.strftime('%H'));
            jQuery(this).find(".minute").find(".ti").text(event.strftime('%M'));
            jQuery(this).find(".second").find(".ti").text(event.strftime('%S'));
        });
    });
    // BUTTON QUANTITY
    jQuery(".myForm .quantity .down").click(function() {
        var $value = parseInt(jQuery(this).parents(".quantity").find("input").val());
        if (parseInt($value) > 1) {
            $value = parseInt($value) - 1;
            jQuery(this).parents(".quantity").find("input").val($value);
        }
    });
    jQuery(".myForm .quantity .up").click(function() {
        var $value = parseInt(jQuery(this).parents(".quantity").find("input").val());
        $value = parseInt($value) + 1;
        jQuery(this).parents(".quantity").find("input").val($value);
    });
});
function attrPrice(pID,catID){
    var __shape = $('.productInfo #shape').val();
    var __diameter = $('.productInfo #diameter').val();
    var __height = $('.productInfo #height').val();
    var mydata = 'pID='+pID+'&catID='+catID+'&shape='+__shape+'&diameter='+__diameter+'&height='+__height;
    $.ajax({
        url: ROOT_MOD+'/ajax/attrPrice.html',
        type:'POST',
        dataType: 'json',
        data:mydata,
        async:true,
        success:function(data){
            if(data.hasPrice == 1){
                $('#vnt-product-detail .productPrice').html(data.html);
            }
        }
    });
}