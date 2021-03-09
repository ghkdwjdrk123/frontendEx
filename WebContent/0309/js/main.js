$(document).ready(function() {
	$('#signup').click(function() {
		makeMember();
	});
	
	$('#modal_login').click(function() {
		doLogin();
	});
	
});

function makeMember() {
	var id = $("#id").val();
	if (!id) {
		alert("아이디 입력!!!");
		return;
	}
	
	var password = $('#password').val();
	if (!password) {
		alert("비밀번호 입력!!!");
		return;
	}
	
	var name = $('#name').val();
	if (!name) {
		alert("이름 입력!!!");
		return;
	}
	
	var tel = $('#tel').val();
	if (!tel) {
		alert("전화번호 입력!!!");
		return;
	}
	
	var email = $('#email').val();
	if (!email) {
		alert("이메일 입력!!!");
		return;
	}
	
	var address = $('#address').val();
	if (!address) {
		alert("주소 입력!!!");
		return;
	}
	
	var var_return = true;
	
	$.ajax({
		type: 'GET',
		url: 'userlist.xml',
		dataType: 'xml',
		async: false,
		success: function(doc){
			$(doc).find('id').each(function(index, item){
				if(id === $(this).text()){
					alert("이미 사용 중인 아이디입니다.");
					var_return = false;
				}
			});
		},
	});
	
	if(!var_return){
		return;
	}
	
	alert("회원가입이 완료되었습니다.");
	location.replace('main.html');
}

function doLogin() {
	var id = $("#modal_id").val();
	if (!id) {
		alert("아이디 입력!!!");
		return;
	}
	
	var password = $('#modal_password').val();
	if (!password) {
		alert("비밀번호 입력!!!");
		return;
	}
	
	var var_return = false;
	
	$.ajax({
		type: 'GET',
		url: 'userlist.xml',
		dataType: 'xml',
		async: false,
		success: function(doc){
			$(doc).find('member').each(function(index, item){
				if(id === $(this).find('id').text() && password === $(this).find('password').text()){
					$('#inform').css("display", "none");
					var name = $(this).find('name').text();
					var result = `<div style="float: right;">${id} ${name}</div>`;
					$('#login_inform').html(result);
					
					var_return = true;
				}
			});
		},
	});
	
	if(!var_return){
		alert("아이디 혹은 비밀번호가 잘못되었습니다.");
	}

}