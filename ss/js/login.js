
$(function(){
	$('#footers').load('footer/footer1.html',function(){
		var link=$('<link rel="stylesheet" href="footer/css/footer1.css">')
		$('head').append(link);
	});
	
// var btn = document.getElementById('button');
	$('#login #button').click(function(){
		var $btn = $(this);
		$.ajax({
			type:'post',
			url:'data/users/signin.php',
			data:$btn.parent().parent().serialize(),
			success:function(msg){
				alert(msg);
				if(msg === '登录成功'){
					// location.href = location.search.split('=')[1];//back=
					// return false;
					var i = location.search.indexOf('=');//如果有参数过来就不止一个等号 比如添加购物车 登录 回跳的时候
					location.href = location.search.slice(i+1);//加1是跳过等号
				}
			}
		})
	})


})

