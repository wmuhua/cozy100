$(function(){
	var pages = document.getElementById('pages'),
		showList = document.getElementById('show_list'),
		index = 0;
	function loadPage(pno=0){
		var kw = location.search.split('=')[1];
		kw = decodeURI(kw);
		$.ajax({
			type:'get',
			url:'data/products/getProductBykw.php',
			data:{kw:kw,pno:pno},
			dataType:'json',
			success:function(data){
				if(data.products.length !== 0){
					$('#without').hide();
					var {products,pageCount} = data;
					index = pageCount;
					$('.wh_search_path>.category').html(products[0].category);
					$('.wh_search_path>.lname').html(products[0].lname);
					var html = '';
					for(var p  of products){
						var {lid,md,price,title,subtitle,comment_count} = p;
						html+=`<li>
							<div class="wh_prd_image">
								<img src="${md}" alt="">
							</div>
							<div class="wh_prd_base">
								<p class="plist_price">￥${parseFloat(price).toFixed(2)}</p>
								<p class="plist_name">${title}</p>
								<p class="wh_ggyu">${subtitle}</p>
								<p class="plist_comment">
									<span class="pro_coupon">包邮</span>
									<span class="comment_count fr"><i></i><span>${comment_count}</span></span>
								</p>
							</div>						
							<a href="product_detail.html?lid=${lid}"></a>
						</li>`;
					}
					showList.innerHTML = html;
					var html = `<a href='javascript:;' class="first">首页</a>
							<a href='javascript:;' class="prev">上一页</a>`;
					for(var i=0;i<pageCount;i++){
						if(i===pno){
							html+=`<a href='javascript:;' class="active">${i+1}</a>`;
						}else{
							html+=`<a href='javascript:;'>${i+1}</a>`;
						}
					};
					html+=`<a href='javascript:;' class="next">下一页</a>
							<a href='javascript:;' class="last">末页</a>`;
					pages.innerHTML = html;
					var first=$('#pages>a.first'),
						prev=$('#pages>a.prev'),
						next=$('#pages>a.next'),
						last=$('#pages>a.last');
					if(pno === 0){
						first.addClass('disabled');
						prev.addClass('disabled');
					}
					if(pno === pageCount-1){
						next.addClass('disabled');
						last.addClass('disabled');
					}
				}else{
					$('#without').show();
				}
			}
		});
	};
	loadPage();
	$('.wh_srh_select').on('click','a',function(e){
      var e = window.event || e;
      e.preventDefault();
      if($(this).parent().hasClass('title')){
      	return 
      }else if($(this).parent().hasClass('pingpai_maxh')){
      	var inner = $(this).attr('title');
      }else{
      	var inner = $(this).html();      	
      }
      location.href = 'products.html?kw='+inner;
      return false;
    })
	//上一页下一页数字分页
	pages.onclick = function(e){
		var tar = e.target;
		if(tar.nodeName === 'A' && tar.className.indexOf('disabled')!== -1){
			return ;
		}else if(tar.nodeName === 'A' && tar.className.indexOf('disabled')== -1 && tar.className !== 'active'){
			if(tar.className.indexOf('prev')!= -1){
				var curra = document.querySelector('#pages>a.active');
				var pno = curra.innerHTML-2;
			}else if(tar.className.indexOf('next')!= -1){
				var curra = document.querySelector('#pages>a.active');
				var pno = parseInt(curra.innerHTML);
			}else if(tar.className.indexOf('first')!= -1){
				var pno = 0;
			}else if(tar.className.indexOf('last')!= -1){
				var pno = index-1;
			}else{
				var pno = tar.innerHTML-1;
			}
			loadPage(pno);
		}
	}
})