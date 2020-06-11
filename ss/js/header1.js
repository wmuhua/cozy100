

	$('#headers1').load('header1.html',function(){
		$.ajax({
			type:'get',
			url:'data/users/islogin.php',
			dataType:'json',
			success:function(data){
				if(data.ok == 1){
					$.ajax({
						type:'get',
						url:'data/cart/getCart.php',
						dataType:'json',
						success:function(data){
							$('.carcount').html(data.length);
						}
					})
					var {uname} = data;
					$('.sprline').hide().next().show().find('#uname').html(uname);
					$("#gouser").click(function(e){
						e.preventDefault();
			        location.href = 'user.html';
					});
					$("#gomycart").click(function(e){
						e.preventDefault();
			        location.href = 'cart.html';
					});

				}else{
					$('.sprline').show().next().hide();
					$("#gouser,#gomycart,.collect_li").click(function(e){
						e.preventDefault();
			        $('#showdiv').show();
			        $('#alertMsg_info').html('<b>您尚未登录，请登录！</b>');
			        $('#alertMsg_btn1').click(function () {
			        	$(this).parent().parent().hide();
			          location.href = 'login.html?back='+location.href;
			        });
					});
				}
			}
		});

		$('#btnLogin').click(function(e){//登录
			e.preventDefault();
			location.href = 'login.html?back='+location.href;
		});

		$('#btnSignout').click(function(e){//注销
			e.preventDefault();
			$.ajax({
				type:'get',
				url:'data/users/signout.php',
				success:function(){
					location.reload(true);
					location.href = 'index.html';
				}
			});
		});



	});
