$(function(){
	votes();
});
function votes() {
	$(".img-star li .fa").click(function(){
		var vote = $(this).attr("id").substr(5);
		var p_id = $("#pID").val();
		$.ajax({
			async: true,
			dataType: 'json',
			url: ROOT+'load_ajax.php?do=setVote',
			type: 'POST',
			data: "p_id="+p_id+"&vote="+vote,
			success: function (data) {
				if(data.ok==1) {
						jAlert("Đánh giá sản phẩm thành công.","Thông báo", function(){
							location.reload();
						});
					} else {
						jAlert("Bạn đã đánh giá cho sản phẩm này.","Thông báo");
					return false;
				}
			}
		});
	});
}
var vnTcomment = {   
	/*  show_comment */
	show_comment:function(id,lang,p) {	
		$.ajax({
			 type:"POST",
			 url: ROOT+'modules/news/ajax/comment.php?do=list',
			 data: "id="+id+'&lang='+lang+'&p='+p,
			 success: function(html){
					$("#ext_comment").html(html);
			 }
		 });
	},
	select_vote:function(num) {
		var uservote=num;
		for (i=1;i<=5;i++) {
			objname='vote_'+i;
			var imgshow=(i<=num) ? 'fa fa-star':'fa fa-star-o';
			$("#"+objname).attr("class", imgshow);
		}
		$('#hvote').val(num);
	},
	/*  post_comment */
	post_comment:function (id,lang)
	{
		var ok_post = true ;
		var mess_err='';
		var content= $("#com_content").val();		 
		if ( content.length <10) {
			jAlert(js_lang['err_conntent_minchar'],js_lang['error'], function() {	 $("#com_content").focus(); 	});   
			ok_post = false ;
			return false;
		}
		var re =/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5})$/gi;
		email = $("#com_email").val();
		if (email == '') {
			jAlert(js_lang['err_email_empty'],js_lang['error'], function() {	$("#com_email").focus(); 	});   
			ok_post = false ;
			return false;
		}
		if (email != '' && email.match(re)==null) {
			jAlert(js_lang['err_email_invalid'],js_lang['error'], function() {	$("#com_email").focus(); 	});  
			ok_post = false ;
			return false;
		}
		var name = $("#com_name").val();
		if (name == '') {			 
			jAlert(js_lang['err_name_empty'],js_lang['error'], function() {	$("#com_name").focus(); 	}); 			
			ok_post = false ;
			return false;
		}
		var security_code = $("#security_code").val();
		if (security_code == '') {
			jAlert(js_lang['err_security_code_empty'],js_lang['error'], function(){ 
				$("#security_code").focus(); 
			});
			ok_post = false ;
			return false;
		} 
		//alert(security_code);
		if(ok_post){
			name = encodeURIComponent(name);
			email = encodeURIComponent(email);
			content = encodeURIComponent(content);
			var mydata =  "id="+id+"&name="+name+"&email="+email+"&content="+content+"&lang="+lang+"&security_code="+security_code; 
			$.ajax({
				async: true, 
				dataType: 'json',
				url:  ROOT+"modules/news/ajax/comment.php?do=post" ,
				type: 'POST',
				data: mydata ,
				success: function (data) {
					if(data.ok == 1){
						if(data.display==1){
							vnTcomment.show_comment (id,lang,0); 		
						}else{
							jAlert(js_lang['send_comment_success'],js_lang['announce']);	
						}
						$("#security_code").val('');
						$("#com_content").val('');
						$(".content-info").stop().slideUp(700);
					}else {
						jAlert(data.mess,js_lang['error']);
					}	   
				}
			}) 		
		} 
		return false;
	},
	/*  post_subcomment */
	post_votes:function (id){
		var rating = $("input[name='rating']:checked").val();
		var mydata =  "id="+id+ "&rating=" + rating  ;
		$.ajax({
			async: true,
			dataType: 'json',
			url:  ROOT+"modules/news/ajax/comment.php?do=votes" ,
			type: 'POST',
			data: mydata ,
			success: function (data) {
				if(data.ok == 1)	{
					$("#ext_votes").html('<div class="ajax_mess">Cảm ơn bạn đã gửi đánh giá</div>');					 
				}	else {
					jAlert('Có lỗi xảy ra.','Báo lỗi');
				}	   
			}
		})
		return false;
	},
	show_post_reply	:function (cid,lang){
		$(".form_reply").remove();		  		
		var mydata =  "cid="+cid+ "&lang=" + lang  ;
		$.ajax({
			async: true,
			dataType: 'json',
			url:  ROOT+"modules/news/ajax/comment.php?do=show_post_reply" ,
			type: 'POST', 
			data: mydata ,
			success: function (data) {				
				 $("#com_reply"+cid).html(data.html);
			}
		})
		return false;
	},
	post_reply	:function (cid,lang,id){
		var ok_post = 1;
		var content= $("#reply_content"+cid).val();		 
		if ( content.length <10) {
			jAlert(js_lang['err_conntent_minchar'],js_lang['error'], function() {
				$("#reply_content"+cid).focus();
			});   
			ok_post = 0;
			return false;
		}  
		var name = $("#reply_name"+cid).val();
		var id = $('#sID').val();
		if (name == '') {
			jAlert(js_lang['err_name_empty'],js_lang['error'], function() {	$("#reply_name"+cid).focus(); 	}); 			
			ok_post = 0 ;
			return false;
		}
		var email = $("#reply_email"+cid).val();
		if (email == '') {
			jAlert(js_lang['err_email_empty'],js_lang['error'], function() {
				$("#reply_email"+cid).focus(); 	
			}); 			
			ok_post = 0 ;
			return false;
		}
		var reply_code = $("#reply_code").val();
		if (reply_code == '') {
			jAlert(js_lang['err_security_code_empty'],js_lang['error'], function() {
				$("#reply_code").focus(); 	
			}); 			
			ok_post = 0 ;
			return false;
		}
		if(ok_post){			
			name = encodeURIComponent(name); 
			content = encodeURIComponent(content);
			var mydata =  "id="+id+"&cid="+cid+"&name="+name+"&code="+reply_code+"&email="+email+"&content=" + content+"&lang="+lang ; 
			$.ajax({
				async: true,
				dataType: 'json',
				url:  ROOT+"modules/news/ajax/comment.php?do=post_reply" ,
				type: 'POST',
				data: mydata ,
				success: function (data) {
					if(data.ok == 1)	{
						 $("#form_reply_"+cid).remove();	
						 if(data.display==1){						 	 
						 	 $("#com_reply"+cid).prepend(data.html);
						 }else{
						 	jAlert(js_lang['send_reply_success'],js_lang['announce']);	 
						 }
					}	else {
						jAlert(data.mess,js_lang['error']);
					}	   
				}
			}) 		
		}
		return false;
	},
};
$(document).ready(function(){
	$(".choose-evaluate ul li").hover(function(){
		$(".choose-evaluate ul li").removeClass("star-red");
		$(this).addClass("star-red");
		$(this).prevAll().addClass("star-red");
		var $text = $(this).attr("title");
		$(this).parents(".choose-evaluate").find(".show-title").text($text);
		$(this).parents(".choose-evaluate").find(".show-title").addClass("show-active");
	},function(){
		$(".choose-evaluate ul li").removeClass("star-red");
		$(this).parent().find("li.active").addClass("star-red");
		$(this).parent().find("li.active").prevAll().addClass("star-red");
		var $text = $(this).parent().find("li.active").attr("title");
		$(this).parents(".choose-evaluate").find(".show-title").text($text);
		$(this).parents(".choose-evaluate").find(".show-title").removeClass("show-active");
	});
	$(".choose-evaluate ul li").click(function(){
		$(".choose-evaluate ul li").removeClass("active");
		$(".choose-evaluate ul li").removeClass("star-red");
		$(this).addClass("active star-red");
		$(this).parent().find("li.active").prevAll().addClass("star-red");
		$(this).find("input:radio").prop('checked', true);
		var $text = $(this).attr("title");
		$(this).parents(".choose-evaluate").find(".show-title").text($text);
		$(this).parents(".choose-evaluate").find(".show-title").css({opacity:1});
	});

	$("#com_content").focus(function(){
		$(this).css({height:"115px"});
		$(this).parents(".w_content").find(".content-info").stop().slideDown(700);
	});
	$("#reply_content").focus(function(){
		//$(this).css({height:"115px"});
		$("#reply_info").css('display','block');
	}); 
});