$(function(){
	
	if(location.search.indexOf('lid')!= -1){
		var lid = location.search.split('=')[1];
		$.ajax({
			type:'get',
			url:'data/products/getProductById.php',
			data:'lid='+lid,
			dataType:'json',
			success:function(data){
				var {product,pics,specs} = data;
				var {title,subtitle,price,original_price,sold_count,comment_count,inventory,details,category,lname}=product;
				$('#pro_nav .category').html(category);
				$('#pro_nav .lname').html(lname);
				$('.goods_info>h1').html(title);
				$('.goods_info>h3').html(subtitle);
				$('.goods_price>.p-price>b').html('￥'+parseFloat(price).toFixed(2));
				$('.goods_price>.p-price>del').html('￥'+parseFloat(original_price).toFixed(2));
				$('.sale_msg .sales>span').html(sold_count);
				$('.sale_msg .evaluate>span').html(comment_count);
				$('.evaluateCount>span').html(comment_count);
				$('.goods-num>b').html(inventory);
				$('.goods_detail_box').html(details);
				$('#show-list>.addcart').attr('data-lid',product.lid);
				$('#show-list>.addcollect').attr('data-lid',product.lid);
				inventorys = inventory;
				$.ajax({
				   type:'get',
				   url:'data/cart/getCollect.php',
				   data:{lid:product.lid},
				   dataType:'json',
				   success:function(items){
				   	if(items.code === 200){
				   		$('#show-list>.addcollect').find('img').attr('src','img/product/collect_add.png');
				   	}else if(items.code === 201){
				   		$('#show-list>.addcollect').find('img').attr('src','img/product/collect_default.png');
				   	}
				   }
				 })
				var html = '';
				var arr = [];
				specs.forEach(function(item,index){
					if(arr.length>=12){
						return ;
					}else	if($.inArray(item.area, arr) == -1){
						arr.push(item.area);
						html+=`<a href="product_detail.html?lid=${item.lid}" class=${item.lid===product.lid?"li_color":""}>适用面积${item.area}㎡</a>`;
					}
				})
				$('.goods_taocan_choice').html(html);
				// $('.goods_taocan_choice>ul>li').eq(0).addClass('li_color');
				var html = '';
				for(var {sm,md,lg} of pics){
					html+=`<li class="i1">
						<img src="${sm}" data-md='${md}' data-lg='${lg}' alt="">
						</li>`;
				}
				var ulpics = $('.small_pic_box>ul');
				ulpics.html(html);
				var liwidth = 64;
				ulpics.css('width',liwidth * pics.length + 'px');
				var mImg = $('.mImg'),
						lgDiv = $('.pic_fr');
				mImg.attr('src',pics[0].md);
				lgDiv.css('background','url('+pics[0].lg+')');

				var forward=$('.forward'),
						backward=$('.backward');
				if(pics.length <= 5) {
					forward.addClass('disabled');
				}
				var moved=0;
				forward.click(function(e){
					e.preventDefault();
					var that = $(this);
					if(!that.hasClass('disabled')){
						moved++;
						ulpics.css('left',-moved*liwidth+'px');
						backward.removeClass('disabled');
						if(pics.length-moved === 5){
							that.addClass('disabled');
						}
					}
				})
				backward.click(function(e){
					e.preventDefault();
					var that = $(this);
					if(!that.hasClass('disabled')){
						moved--;
						ulpics.css('left',-moved*liwidth+'px');
						forward.removeClass('disabled');
						if(moved === 0){
							that.addClass('disabled');
						}
					}
				})
				var timer = null;
				ulpics.on('mouseover','img',function(e){
						clearTimeout(timer);
						var e = window.event || e;
						var tar=e.target || e.srcElement;
						timer = setTimeout(function(){
					// if(tar.nodeName === 'IMG'){
							var {md,lg}=tar.dataset;
							mImg.attr('src',md);
							lgDiv.css('background-image','url('+lg+')');
						},300);
					// }
				}).on('mouseout','img',function(){
					clearTimeout(timer);
				})
				var mask = $('.small_box'),
						smask = $('.pic_fl');
				smask.mouseover(function(){
					mask.css('display','block');
					lgDiv.css('display','block');
				});
				smask.mouseout(function(){
					mask.css('display','none');
					lgDiv.css('display','none');
				});
				var pbox=$('.goods_pic_box');
				smask.mousemove(function(e){
					var dh = $(window).scrollTop();
					var x = e.clientX-pbox.offset().left;
					var y = e.clientY-pbox.offset().top;
					var w = mask.width()/2;
					var h = mask.height()/2;
					mask.css({left:x-w+'px',top:y-h+dh+'px'});
					var lw = mask.position().left;
					var lh = mask.position().top;
					var maxW=pbox.width()-mask.width();
					var maxH=pbox.height()-mask.height();
					if(lw<=0){mask.css('left','0px');}
					if(lw>=maxW){mask.css('left',maxW+'px');}
					if(lh<=0){mask.css('top','0px');}
					if(lh>=maxH){mask.css('top',maxH+'px');}
					var lw = mask.position().left;
					var lh = mask.position().top;
					lgDiv.css('background-position-x',-lw*1.2+'px');
					lgDiv.css('background-position-y',-lh*1.2+'px');
				});
			}		
		});
	}
  /**数量添加**/
  $(".numMinus").click(function () {
  	var n = $("#cartcount").val() * 1;
    if (n > 1) {
      $("#cartcount").val(n -= 1);
    }
  })
  $(".numAdd").click(function () {
  	var n = $("#cartcount").val() * 1;
  	var m = $('.goods-num>b').html()*1;
  	if(n < m){
    	$("#cartcount").val(n += 1);
  	}
  })

// 添加购物车  添加收藏
$('#show-list').on('click','.addcollect,.addcart',function(e){
	var e = window.event || e;
	e.preventDefault();
	e.stopPropagation();
	var $a = $(this);
		$.ajax({
			type:'get',
			url:'data/users/islogin.php',
			dataType:'json',
			success:function(data){
				if(data.ok == 1){//登录了 
					var lid = $a.data('lid');//attr('data-lid'),
					if($a.hasClass('addcart')){
						var count = $('#cartcount').val();
						$.ajax({
							type:'get',
							url:'data/cart/addCart.php',
							data:{lid,count},
							success:function(){
							 	$.ajax({
							 		type:'get',
							 		url:'data/cart/getCart.php',
							 		dataType:'json',
							 		success:function(data){
							 			var scrollTop = $(window).scrollTop();
							 			var offset=$('#headers1 .carcount').offset();
							 			$(window).resize(site);
							 			function site() {
							 			    offset=$('#headers1 .carcount').offset();
							 			}
						 			    var img=$('.small_pic_box>ul>li:first-child').find('img').attr('src');
						 			    var flyer=$('<img class="u-flyer" src="'+img+'">');
						 			    flyer.fly({
						 			        start:{
						 			            left:e.pageX,
						 			            top:e.pageY-scrollTop
						 			        },
						 			        end:{
						 			            left:offset.left,
						 			            top:offset.top,
						 			            width:0,
						 			            height:0
						 			        }
						 			    })
						 			    setTimeout(function(){
							 				$('#headers1 .carcount').html(data.length);
						 			    },800);
							 		}
							 	})
							}
						})
					}else if($a.hasClass('addcollect')){
						$.ajax({
						   type:'get',
						   url:'data/cart/addCollect.php',
						   data:{lid},
						   dataType:'json',
						   success:function(items){
						   	if(items.code === 200){
						   		var img1 = $("<img class='c_img' src='img/product/collect_add.png' />");
						   		var img2 = $("<img class='col_img' src='img/product/collect_add.png' />");
						   		$('.addcollect').append(img1);
						   		$('.collect_li').append(img2);
						   		$('.c_img').animate({
						   			width: '150px',
						   			height: '150px',
						   			top:'-56px',
						   			left:'-43px',
						   			opacity:0,
						   			transform:'translateZ(500px)'
						   		},800, function() {
						   			$a.find('.c_img').remove();
						   		});
						   		$('.col_img').animate({
						   			width: '150px',
						   			height: '150px',
						   			top:'-51px',
						   			left:'-75px',
						   			opacity:0,
						   			transform:'translateZ(500px)'
						   		},800, function() {
						   			$('.collect_li').find('.col_img').remove();
						   		});
						   		$a.find('.collect_img').attr('src','img/product/collect_add.png');
						   	}else if(items.code === 201){
						   		$a.find('.collect_img').attr('src','img/product/collect_default.png');
						   	}
						   }
						 });
					}
				}else{//否则跳到登录页  登录  再跳回来
					$('#showdiv').show();
	        $('#alertMsg_info').html('<b>您尚未登录，请登录！</b>');
	        $('#alertMsg_btn1').click(function () {
	        	$(this).parent().parent().hide();
	          location.href = 'login.html?back='+location.href;
	        });
				}
			}
		})
})




})