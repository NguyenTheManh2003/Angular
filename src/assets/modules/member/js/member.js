vnTMember = {
	
	loginPopup:function () {
		var ref = $("#ref").val();
		var user = $("#login_user").val();
		var pass = $("#login_pass").val();
		if($('#ch_remember').attr('checked')) {
			var save = 1
		} else {
			var save = 0;
		}
		
		var ok_login = 1 ;
		if(user=="") {
			jAlert(js_lang['err_username_empty'],js_lang['error'], function(){$("#login_user").focus() });
			ok_login = 0;
			return false ;
		}

		if(pass=="") {
			ok_login = 0;
			jAlert(js_lang['err_password_empty'],js_lang['error'], function(){$("#login_pass").focus() });	
			return false ;	
		}
		
		if(ok_login){
			var mydata =  "user="+user+'&pass='+pass+'&save='+save ;
			$.ajax({
				async: true,
				dataType: 'json',
				url: url_ajax+"/popup_login.html",
				type: 'POST',
				data: mydata ,
				success: function (data) {
					if(data.ok) {
						if(ref){ 
							top.location = ROOT+ref;
						}else{
							top.location.reload();		
						}
					}else{
						jAlert(data.mess,js_lang['error']);		
					} 
				}
			})	
		}
		
		return false ;
	} ,
	
	loginDealer:function () {
		var ref = $("#ref").val();
 		var email = $("#login_email").val();
		var pass = $("#login_pass").val();
		if($('#ch_remember').attr('checked')) {
			var save = 1
		} else {
			var save = 0;
		}
		
		var ok_login = 1 ;
		if(email=="") {
			jAlert(js_lang['err_email_empty'],js_lang['error'], function(){$("#login_email").focus() });	
			ok_login = 0;
			return false ;			
		}
		if(!vnTRUST.is_email(email)){
			jAlert(js_lang['err_email_invalid'],js_lang['error'], function(){$("#login_email").focus() });	
			ok_login = 0;
			return false ;				
		}
		if(pass=="") {
			ok_login = 0;
			jAlert(js_lang['err_password_empty'],js_lang['error'], function(){$("#login_pass").focus() });	
			return false ;	
		}
		
		if(ok_login){
			var mydata =  "email="+email+'&pass='+pass+'&save='+save ; 
			$.ajax({
				async: true,
				dataType: 'json',
				url: url_ajax+"/login_dealer.html",
				type: 'POST',
				data: mydata ,
				success: function (data) {
					if(data.ok) {
						if(ref){ 
							top.location = ROOT+ref;
						}else{
							top.location.reload();		
						}
					}else{
						jAlert(data.mess,js_lang['error']);		
					} 
				}
			})	
		}
		
		return false ;
	} ,	
	
	oAuthConnect:function (provider,info) {

		var ok_load = 1 ;

		if(ok_load){
			var mydata =  "provider="+provider+'&identifier='+info.id+'&email='+info.email+'&name='+info.name+'&gender='+info.gender+'&birthday='+info.birthday+'&avatar='+info.avatar  ;
			$.ajax({
				async: true,
				dataType: 'json',
				url: ROOT+"member/ajax/oAuthConnect.html",
				type: 'POST',
				data: mydata ,
				success: function (data) {
					if(data.ok) {
						if(data.link_ref){
							top.location = data.link_ref;
						}else{
							top.location.reload();
						}
					}else{
						jAlert(data.mess,js_lang['error']);
					}
				}
			})
		}

		return false ;
	},

	doRegsiter:function () {
 		var full_name = $("#rFullName").val();
		var email = $("#rEmail").val(); 
		var pass = $("#rPassWord").val();
		var re_pass = $("#rConfirm_PassWord").val();
		var phone = $("#rPhone").val();
		var sec_code	=	$("#security_code").val(); 
		var r_agree	=	$('#r_agree').prop( "checked" ); 
		
		
		var ok_reg = 1 ;
		if(email=="") {
			jAlert(js_lang['err_email_empty'],js_lang['error'], function(){$("#rEmail").focus() });	
			ok_reg = 0;
			return false ;			
		} 
		
		if(!vnTRUST.is_email(email)){
			jAlert(js_lang['err_email_invalid'],js_lang['error'], function(){$("#rEmail").focus() });	
			ok_reg = 0;
			return false ;				
		}
		if(pass=="") {
			ok_reg = 0;
			jAlert(js_lang['err_password_empty'],js_lang['error'], function(){$("#rPassWord").focus() });	
			return false ;	
		}		
		if(pass!=re_pass) {
			ok_reg = 0;
			jAlert(js_lang['err_re_password_incorrect'],js_lang['error'], function(){$("#rConfirm_PassWord").focus() });	
			return false ;	
		}	
		if(full_name == "")	{
			jAlert(js_lang['err_full_name_empty'],js_lang['error'], function(){$("#rFullName").focus() });	
			ok_reg = 0;	return false ;	
		}
		if(phone == "")	{
			jAlert(js_lang['err_phone_empty'],js_lang['error'], function(){$("#rPhone").focus() });	
			ok_reg = 0;	return false ;	
		} 
		
		if(sec_code == "")	{
			jAlert(js_lang['err_security_code_empty'],js_lang['error'], function(){$("#rVerifyCode").focus() });	
			ok_reg = 0;	return false ;	
		}
		 
		if(!r_agree){
			jAlert(js_lang['err_argee_empty'],js_lang['error'], function(){$("#r_agree").focus() });	
			ok_reg = 0;
			return false ;		
		} 
		
		if(ok_reg){
			var mydata =  "email="+email+'&pass='+pass+'&full_name='+encodeURIComponent(full_name)+'&phone='+phone+'&sec_code='+sec_code; 
			$.ajax({
				async: true,
				dataType: 'json',
				url: url_ajax+"/ajax_register.html",  
				type: 'POST',
				data: mydata ,
				success: function (data) {
					if(data.ok) {
						if(data.link_ref) {
							location.href=data.link_ref;	
						}else{
							top.location.reload();	
						}						
					}else{
						jAlert(data.mess,js_lang['error']);		
					} 
				}
			})	
		}
		
		return false ;
	} ,

	do_EditAvatar:function(act){
		if(act=="save"){
			var picture = $("#picture").val();
			var w = parseInt($("#w").val());
			var h = parseInt($("#h").val());
			var x = parseInt($("#x").val());
			var y = parseInt($("#y").val());
			if(!w){	w=180;	h=180;	x=0;	y=0;	}
			if(picture==''){
				jAlert('Vui lòng Upload hình đại diện' ,js_lang['error']);
			}else{

				var mydata =  "picture="+picture+"&w="+w+"&h="+h+"&x="+x+"&y="+y;
				$.ajax({
					async: true,
					dataType: 'json',
					url:  ROOT_MOD+"/ajax/edit_avatar.html" ,
					type: 'POST',
					data: mydata ,
					success: function (data) {
						if(data.ok){
							$("#id-avatar img").attr({ src: data.html	}) ;
							$.fancybox.close();
						}else{
							jAlert(data.mess,js_lang['error']);
						}
					}
				});
			}

			return false ;
		}else{
			$.fancybox({
				'padding'		: 0,
				'autoSize': false,
				'href'			:  ROOT_MOD+'/popup/avatar.html/?no_iframe=1',
				'transitionIn'	: 'elastic',
				'transitionOut'	: 'elastic',
				'overlayShow'    :    false,
				'type': 'ajax'
			});

		}
	},
	do_EditCover:function(act){
		if(act=="save"){
			var picture = $("#picture").val();
			var w = parseInt($("#w").val());
			var h = parseInt($("#h").val());
			var x = parseInt($("#x").val());
			var y = parseInt($("#y").val());
			if(!w){	w=1170;	h=270;	x=0;	y=0;	}

			if(picture==''){
				jAlert('Vui lòng Upload hình Cover ','Báo lỗi');
			}else{

				var mydata =  "picture="+picture+"&w="+w+"&h="+h+"&x="+x+"&y="+y;
				$.ajax({
					async: true,
					dataType: 'json',
					url:  ROOT+"member/ajax/edit_cover.html" ,
					type: 'POST',
					data: mydata ,
					success: function (data) {
						if(data.ok){
							$("#idphotocover").attr({ src: data.html	}) ;
							$.fancybox.close();
						}else{
							jAlert(data.mess,'Báo lỗi');
						}
					}
				});
			}

			return false ;
		}else{
			$.fancybox({
				'padding'		: 0,
				'autoSize': false,
				'href'			:  ROOT_MOD+'/popup/cover.html/?no_iframe=1',
				'width'  : 1210,           // set the width
				'height' : 600,
				'transitionIn'	: 'elastic',
				'transitionOut'	: 'elastic',
				'overlayShow'    :    false,
				'type': 'ajax'
			});

		}
	},
	changeCity:function(city){
		var mydata = "do=optionState&city="+ city; 
		$.ajax({
		 	type: "GET",
		 	url: ROOT+'load_ajax.php',
		 	data: mydata,
		 	success: function(html){
				$("#state").html(html);
				$('#ward').html('');
				vnTMember.changeState(0);
		 	}
	 	});
		return false;
	},
	changeState:function(state){
		var mydata = "do=optionWard&state="+ state; 
		$.ajax({
		 	type: "GET",
		 	url: ROOT+'load_ajax.php',
		 	data: mydata,
		 	success: function(html){
				$('#ward').html(html);
		 	}
	 	});
		return false;
	},
};





function initGoogle () {
	gapi.load('auth2', function(){
		// Retrieve the singleton for the GoogleAuth library and set up the client.
		auth2 = gapi.auth2.init({
			client_id: google_appId,
			cookiepolicy: 'single_host_origin',
			// Request scopes in addition to 'profile' and 'email'
			scope: 'profile email'
		});
		googleSignin(document.getElementById('gpLogin'));
	});
}

function googleSignin(element) {
	var googleUser = {};
	console.log(element.id);
	auth2.attachClickHandler(element, {},
		function(googleUser) {
			var profile = googleUser.getBasicProfile();
			var user_email = profile.getEmail(); //get user email
			var info =	{"id": profile.getId() ,"email":  profile.getEmail() ,"name": profile.getName(),"gender": "","birthday":"","avatar": profile.getImageUrl()};

			if(vnTRUST.is_email(user_email)){
				vnTMember.oAuthConnect('google',info);
			}else{
				alert("Quá trình kết nối Google không lấy được thông tin Email của bạn. Vui lòng thử lại","Báo lỗi");
				return false ;
			}

		}, function(error) {
			alert(JSON.stringify(error, undefined, 2));
		});
}

function initFacebook(a) {

	window.fbAsyncInit = function () {
		FB.init({
			appId: facebook_appId,
			status: false,
			cookie: true,
			xfbml: true
		});
		if ($.isFunction(a)) {
			a()
		}
		FB.Event.subscribe('auth.login', function(response) {
			window.location.reload();
		});
		function b() {

			FB.login(function(response) {

				if (response.authResponse) {
					//console.log('Welcome!  Fetching your information.... ');
					//console.log(response); // dump complete info
					access_token = response.authResponse.accessToken; //get access token
					user_id = response.authResponse.userID; //get FB UID

					FB.api('/me?fields=id,email,name,gender,birthday', function(response) {
						user_email = response.email; //get user email

						if(vnTRUST.is_email(user_email)){
							vnTMember.oAuthConnect('facebook',response);
						}else{
							alert("Quá trình kết nối Facebook không lấy được thông tin Email của bạn. Vui lòng thử lại","Báo lỗi");
							return false ;
						}

					});

				} else {
					//user hit cancel button
					alert("User cancelled login or did not fully authorize.","Báo lỗi");
					console.log('User cancelled login or did not fully authorize.');
				}
			}, {
				scope: 'email, user_birthday, user_about_me, public_profile'
			});

		}

		$("#fbLogin").click(function () {
			b();
			$("#loading").show()
		})
	};
	(function () {
		var b = document.createElement("script");
		b.src = document.location.protocol + "//connect.facebook.net/vi_VN/all.js";
		b.async = true;
		document.getElementById("fb-root").appendChild(b)
	} ())
}



function doFacebookLogin()
{
	FB.login(function(response) {

		if (response.authResponse) {
			//console.log('Welcome!  Fetching your information.... ');
			//console.log(response); // dump complete info
			access_token = response.authResponse.accessToken; //get access token
			user_id = response.authResponse.userID; //get FB UID

			FB.api('/me?fields=id,email,name,gender,birthday', function(response) {
				user_email = response.email; //get user email

				if(vnTRUST.is_email(user_email)){
					vnTMember.oAuthConnect('facebook',response);
				}else{
					jAlert("Quá trình kết nối Facebook không lấy được thông tin Email của bạn. Vui lòng thử lại","Báo lỗi");
					return false ;
				}

			});

		} else {
			//user hit cancel button
			jAlert("User cancelled login or did not fully authorize.","Báo lỗi");
			console.log('User cancelled login or did not fully authorize.');
		}
	}, {
		scope: 'email, user_birthday, user_about_me, public_profile'
	});
}



function initLogin() {
	initFacebook();
	initGoogle();
}
 


vnTpost = {  
		
	/*  post_comment */
	checkform :function(f)
	{		 
		return true;
	},
	
	
	/*  check_all */
	check_all:function ()	
	{
		var c = $("#ch_all").prop('checked'); 
		$('#manage :checkbox' ).attr( 'checked', function() {
			var row_id = 'row_'+$(this).val();			
			if (c){
				$('#'+row_id).addClass('row_select')	;
				return true;
			}else{
				$('#'+row_id).removeClass('row_select')	;	
				return false;	
			}
		});
		 
	},
	
	/*  select_row  */
	select_row:function(row_id)	
	{
		var c = $("#"+row_id+" :checkbox").attr('checked'); 
		if (c){
			$('#'+row_id).addClass('row_select')	;
		}else{
			$('#'+row_id).removeClass('row_select')	;	
		}
		
	},
	
	// del_item
	del_item:function(theURL) {
			
		jConfirm(js_lang['are_you_sure_del'], js_lang['announce'] , function(r) {
				if(r) {	window.location.href=theURL;		}
		}); 
			
		return false;		  
			 
	},
	
	// do_check
	do_check:function (id){
		
		$("#manage :input:checkbox").each( function() {
			var row_id = 'row_'+$(this).val();
			if (id == $(this).val() ){
				$('#'+row_id).addClass('row_select')	;
				$(this).attr('checked','checked');
			}																																	 
		} );
	},

	// selected_item
	selected_item:function(){
		var ok = 0 ;
		$("#manage :input:checkbox").each( function() {
			var c = $(this).attr('checked');
			if (c){
				ok = 1;
			}																																	 
		} );
		if(ok) {
			return true;	
		}else{			
			jAlert(js_lang['please_chose_item'], js_lang['error']);  
			return false ;
		}
	},
		
	// del_selected	
	del_selected:function(action) {
			if (vnTpost.selected_item()){
				jConfirm(js_lang['are_you_sure_del'], js_lang['announce'] , function(r) {
						if(r) {
							$("#manage").attr("action", action);
							$("#manage").submit();
						}
				});
				 
				return false;		  
			}		 
	},
	// do_submit	
	do_submit:function (action) {
		$("#do_action").val(action); 
		if (vnTpost.selected_item()){
			$("#manage").submit();
		}	
	},

	// action_item
	action_item:function(theURL, mess, title) {
		jConfirm(mess, title , function(r) {
				if(r == true) {	window.location.href=theURL;		}
				return false;		   
		}); 
		return false;	
	},
	
	// action_item
	stop_active_item:function(table, status, id) {
		jConfirm('Bạn có chắc chưa ? ', 'Thông báo' , function(r) {
				if(r == true) {	
					var mydata =  "table="+table+'&status='+status+'&id='+id; 
					$.ajax({
						async: true,
						dataType: 'json',
						url: ROOT+"modules/member/ajax/ajax.php?do=stop_active",
						type: 'POST',
						data: mydata ,
						success: function (data) {
							if(data.ok) {
								jAlert(data.mess,'Thông báo', function(){location.reload(); });	
							}else{
								jAlert(data.mess,'Báo lỗi');		
							} 
						}
					})	
				}
				return false;		   
		}); 
		return false;	
	},
	
	

	
	tinyMCEImage: function()
	{
		$.fancybox({ 
			'padding'		: 0,
			'autoSize': false,
			'href'			: ROOT+"modules/member/popup/upload_pic.php", 
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'overlayShow'    :    false,
			'type'				: 'iframe',
			'width' : 450,
			'height' : 250 
		});  
		
		//tb_show('Upload image',ROOT+'modules/member/popup/upload_pic.php?TB_iframe=true&width=450&height=210');
	},
	 
 	
	tinyMCEInsertImage : function(file, alt, align)
	{ 
 		//Thêm attribute alt và align
		var img_attribute = "";
		if (alt != "") img_attribute += 'alt="' + alt + '"';
		if (align != "") img_attribute += 'align="' + align + '"';
		if (file != "" && file != "http://"){
			tinyMCE.execCommand('mceInsertContent', false,'<img src="' + file + '" border="0" ' + img_attribute + '/>'); 
		}
		
	},
	
	tinyMCEFile: function()
	{
		$.fancybox({ 
			'padding'		: 0,
			'autoSize': false,
			'href'			: ROOT+"modules/member/popup/upload_file_wyswyg.php", 
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'overlayShow'    :    false,
			'type'				: 'iframe',
			'width' : 450,
			'height' : 250 
		});  
		
		//tb_show('Upload file',ROOT+'modules/member/popup/upload_file_wyswyg.php?TB_iframe=true&width=450&height=210');
	},
	
	tinyMCEInsertFile : function(href,title_link, ext)
	{ 
 		//Thêm attribute href và ext
		var file_attribute = "";
		file_attribute += 'target="_blank"';
		if (ext != "") file_attribute += ext;
		if (href != "" && href != "http://"){
			tinyMCE.execCommand('mceInsertContent', false,'<a href="' + href + '"' + file_attribute + '>'+title_link+'</a>'); 
		}
		
	},
	
	uploadFile: function(id_out)
	{
		$.fancybox({ 
			'padding'		: 0,
			'autoSize': false,
			'href'			: ROOT+"modules/member/popup/upload_file_wyswyg.php?out="+id_out, 
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'overlayShow'    :    false,
			'type'				: 'iframe',
			'width' : 450,
			'height' : 250 
		});
		//tb_show('Upload file',ROOT+'modules/member/popup/upload_file.php?out='+id_out+'&TB_iframe=true&width=450&height=210');
	},
	
	insertFile : function(url, id_out)
	{ 
		$("#"+id_out).val(url);
	},
	
	load_tinyMCE : function(element, required, conf_h)
	{
		conf_h = (conf_h > 50) ? conf_h : 250;
		tinyMCE.init({ 
			mode : "exact",
			elements : element,
			width : "100%",
			height : conf_h,
			theme : "advanced", 
			plugins 	: "emotions,youtubeIframe,paste,tabfocus",
			remove_script_host : false,
			convert_urls : true, 
			relative_urls : false,
			verify_html : true,
			cleanup : true,  
	valid_elements : "a,b,blockquote,br,center,del,div,em,font,h2,h3,h4,i,img,ins,li,hr,ol,p,pre,s,span,strong,strike,sub,sup,table,tbody,td,th,tr,u,ul,iframe,object,param,embed",
extended_valid_elements : "a[href|name|rel|style|target|title],b[style],blockquote[style|title],br[clear|title],center[],del[style|title],div[align|style|title|class],em[style|title],font[color|face|size|style|title],h2[],h3[],h4[],i[style|title],img[align|alt|border|height|hspace|idata|src|style|title|vspace|width],ins[style|title],li[style|title|type],hr[align|noshade|size|style|title],ol[style|title|type],p[align|style|title],pre[style|title],s[style|title],span[style|title|class],strong[style],strike[style|title],sub[style|title],sup[style|title],table[align|bgcolor|border|bordercolor|cellpadding|cellspacing|height|style|title|width],tbody[],td[align|bgcolor|colspan|height|nowrap|rowspan|style|title|valign|width],th[align|bgcolor|colspan|height|nowrap|rowspan|style|title|valign|width],tr[align|bgcolor|height|nowrap|style|title|valign],u[style|title],ul[style|title|type],iframe[src|title|width|height|allowfullscreen|frameborder|class|id],object[classid|width|height|codebase|*],param[name|value|_value|*],embed[type|width|height|src|*]",
invalid_styles : "behavior,background-image,background,list-style-image,expression,/*,*/", 
					/* Theme options */
					theme_advanced_buttons1 : "bold,italic,underline,|,justifyleft,justifycenter,justifyright,justifyfull,|,fontselect,fontsizeselect,bullist,forecolor,backcolor,outdent,indent,link,unlink,|,emotions,images,youtubeIframe,code",
			theme_advanced_buttons3 : "",
			theme_advanced_buttons4 : "",
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_statusbar_location : "bottom",
			theme_advanced_resizing : true,
			theme_advanced_resizing_use_cookie : false,
			theme_advanced_path : false,  
			theme_advanced_resize_horizontal : false,
			theme_advanced_resizing_max_width : 710,
			theme_advanced_resizing_min_width : 710,
			theme_advanced_resizing_min_height : conf_h,
			debug : false,				
			setup : function(ed) {
					// Add a custom button						
					ed.addButton('images', {
							title : 'Chèn ảnh',
							'class' : 'mce_image',
							onclick : vnTpost.tinyMCEImage 
					}); 
			},
			onchange_callback: function(editor) {
				if(required == true)
				{
					tinyMCE.triggerSave();
					$("#" + editor.id).valid();
				}
			}
			
		});
	}
}; 


function countryChange(country_value,lang)
{	

if ( country_value != "VN" )
	{
		newDivStr="<input type=text name='city' id='city' style='width:250px;' class='textfiled'>";
		getobj('ext_city').innerHTML=newDivStr;
	}
	else
	{
		var mydata =  "do=list_city&country="+country_value+'&lang='+lang;
		var url = ROOT + "modules/member/ajax/ajax_member.php" ;
		ajax = new sack( url );
		ajax.method = "GET" ;
		ajax.element = "ext_city";
		ajax.runAJAX(mydata);
	}
}


function del_item(theURL) {
   if (confirm(mess_error['are_you_sure_del'])) {
			window.location.href=theURL;
	 }
	 else {
			alert ('Phew~');
	 } 
}

function selected_item(){
		var name_count = document.manage.length;
		for (i=0;i<name_count;i++){
			if (document.manage.elements[i].checked){
				return true;
			}
		}
		alert(mess_error['please_chose_item']);
		return false;
	}
	
function del_selected(action) {
		if (selected_item()){
			question = confirm(mess_error['are_you_sure_cancel'])
			if (question != "0"){
				document.manage.action=action;
				document.manage.submit();
			}else{
			  alert ('Phew~');
		    }
		}
	
}


function do_submit(action) {
	document.manage.do_action.value=action;
	if (action=="del"){
		if (selected_item()){
			question = confirm(mess_error['are_you_sure_cancel'])
			if (question != "0"){
				document.manage.submit();
			}else{
			  alert ('Phew~');
		    }
		}
	}else{
		document.manage.submit();
	}
	
}
	
function checkall()	{
	for ( i=0;i < document.manage.elements.length ; i++ ){
		if (i>0 && document.manage.elements[i].type=="checkbox"){
			row_id = 'row_'+document.manage.elements[i].value;
		}else{
			row_id="";
		}
		
		if ( document.manage.all.checked==true ){
			document.manage.elements[i].checked = true;
			if (row_id!="" ){
				getobj(row_id).className = "row_select";
			}
		}
		else{
			document.manage.elements[i].checked  = false;
			if (row_id!="" ){
				if (i%2==0)
					getobj(row_id).className = "row1";
				else
					getobj(row_id).className = "row2";
			}
		}
		
	}
}

