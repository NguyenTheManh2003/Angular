﻿function oAuthConnect (provider,info) {
	var ok_load = 1;
	link_ref = ( $("#login_ref").length ) ? $("#login_ref").val() : '';
	if( ok_load ){
		var mydata = "provider="+provider+'&identifier='+info.id+'&email='+info.email+'&name='+info.name+'&gender='+info.gender+'&birthday='+info.birthday+'&avatar='+info.avatar+'&ref='+link_ref;
		$.ajax({
			async    : true,
			dataType : 'json',
			url      : ROOT+"member/ajax/oAuthConnect.html",
			type     : 'POST',
			data     : mydata ,
			success: function (data) {
				if(data.ok) {
					if(data.link_ref){
						top.location = data.link_ref;
					}else{
						top.location.reload(true);
					}
				}else{
					jAlert(data.mess,js_lang['error']);
				}
			}
		})
	}
	return false;
}
$(document).ready(function (e) {
	$(document).on('click', '.facebookLogin', function(){
		FB.login(
			function (response) {
				if (response.authResponse) {
					//console.log('Welcome!  Fetching your information.... ');
					//console.log(response); // dump complete info
					access_token = response.authResponse.accessToken; //get access token
					user_id = response.authResponse.userID; //get FB UID
					FB.api('/me?fields=id,email,name,gender,birthday', function(response) {
						user_email = response.email; //get user email
						// alert(user_email);
						if(vnTRUST.is_email(user_email)){
							oAuthConnect('facebook',response);
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
				scope: 'email, user_birthday, public_profile'
			}
		);
	});
	$(document).on('click', '.googleLogin', function() {
		GoogleAuth = gapi.auth2.getAuthInstance();
		GoogleAuth.signIn().then(function (){
			var profile = GoogleAuth.currentUser.get().getBasicProfile();
			var user_email = profile.getEmail(); //get user email
			var info =	{"id": profile.getId() ,"email":  profile.getEmail() ,"name": profile.getName(),"gender": "","birthday":"","avatar": profile.getImageUrl()};
			if(vnTRUST.is_email(user_email)){
				oAuthConnect('google',info);
			}else{
				alert("Quá trình kết nối Google không lấy được thông tin Email của bạn. Vui lòng thử lại","Báo lỗi");
				return false ;
			}
		});
	});
});
window.fbAsyncInit = function () {
	FB.init({
		appId: facebook_appId,
		status: true,
		xfbml: true,
		version: 'v2.1'
	});
	FB.Event.subscribe('edge.create', function (response)
	{
		/* SET LIKE PLUS */
	});
	FB.Event.subscribe('edge.remove', function (response) {
		/* SET DISLIKE PLUS */
	});
	FB.Event.subscribe('comment.create', function (response) {
		/* SET COMMENT PLUS */
	});
	FB.Event.subscribe('comment.remove', function (response) {});
};
gapi.load('auth2', function(){
	// Retrieve the singleton for the GoogleAuth library and set up the client.
	auth2 = gapi.auth2.init({
		client_id: google_appId,
		cookiepolicy: 'single_host_origin',
		// Request scopes in addition to 'profile' and 'email'
		scope: 'profile email'
	});
});