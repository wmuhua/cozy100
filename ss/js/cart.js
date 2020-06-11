$(function(){

  function loadPage(){
    $.ajax({
      type:'get',
      url:'data/users/islogin.php',
      dataType:'json',
      success:function(data){
        if(data.ok === 0){
          $('#showdiv').show();
          $('#alertMsg_info').html('<b>您尚未登录！</b>');
          $('#alertMsg_btn1').click(function () {
            location.href = 'login.html?back='+location.href;
          });
        }else{
          $.ajax({
            type:'get',
            url:'data/cart/getCart.php',
            dataType:'json',
            success:function(items){
              var html = '',totalprice = 0,sum = 0;
              for( var item of items){
                var {subtitle,is_checked,lid,title,spec,price,count,sm,iid} = item;
                if(is_checked == 1){
                  totalprice+=price*count;
                  sum++;
                }
                html+=`<div class="cart-item" data-iid='${iid}'>
                        <div class="ci-thead">
                          <img class='ci-select' src="images/product_${is_checked==0?'normal':'true'}.png" alt="">
                          <span>${title}</span>
                        </div>
                        <div class="ci-tbody">
                          <div class="cart-row clearfix">
                            <a target='_blank' href="product_detail.html?lid=${lid}" class="cell cell-img"><img src="${sm}" alt="${title}"></a>
                            <a target='_blank' href="product_detail.html?lid=${lid}"><span class="cell cell-name">${subtitle}</span></a>
                            <div class="cell cell-price">
                              <span>￥${parseFloat(price).toFixed(2)}元</span>
                            </div>
                            <div class="cell cell-num">
                              <a href="javascript:;" class="c-rdecrease disabled-btn">-</a>
                              <input type="text" value='${count}'>
                              <a href="javascript:;" class="c-add">+</a>
                            </div>
                            <span class="cell cell-total">￥${(price*count).toFixed(2)}元</span>
                            <span class="cell cell-tool"><a href="#">删除</a></span>
                          </div>
                        </div>
                        <div class="ci-tfoot">
                          <a href="#"><i></i>工程安装服务协议</a>
                          <a href="#"><i></i>套餐物料明细表</a>
                        </div>
                      </div>`;
              } 
              $('.cart-list').html(html);
              $('.total b').html(sum); 
              $('.totalcount b').html(items.length); 
              $('.totalPrices b').html(totalprice.toFixed(2)+'元');
              //购物车全选             src有没有以normal.png结尾的
              $('.checkall').attr('src','images/product_'+($('.cart-list').is(':has([src$=normal.png])')?'normal':'true')+'.png')
            }
          })
        }
      }
    });
  }

  loadPage();

// setInterval(function(){
  // console.log($('#scrolldiv').offset().top);//父级top
  // console.log($(window).height());//可视区域高度
  // console.log($('.cart-options-bar').height());//固定定位元素高度
// },100)

$(window).scroll(function(){
  var cartHeight = $('.cart-options-bar').height();
  var height = $(window).height()-cartHeight;
  var top = $('#scrolldiv').offset().top;
  var hhh = top-height;
  var scrollTop = $(window).scrollTop();
  if(scrollTop>=hhh){
    $('.cart-options-bar').css('position','static');
  }else{
    $('.cart-options-bar').css({position:'fixed',bottom:0});
  }
})

$('.cart-list').on('click','.c-add,.c-rdecrease',function(){
    var $a = $(this);
    var iid = $a.parent().parent().parent().parent().data('iid'),
      count = parseInt($a.siblings(':text').val());
    if($a.html() == '+'){
      count++;
    }else{
      count--;
    }
    $.ajax({
      type:'get',
      url:'data/cart/updateCart.php',
      data:{iid,count},
      success:function(){
        loadPage();
      }
    })
  }).on('click','.cell-tool>a',function(e){
      e.preventDefault();
      var title = $(this).parent().parent().parent().siblings('.ci-thead').find('span').html();
      if(confirm('是否删除 '+title)){
        var iid = $(this).parent().parent().parent().parent().data('iid');
        $.ajax({
          type:'get',
          url:'data/cart/deleteCart.php',
          data:{iid},
          success:function(){
            loadPage();
            $.ajax({
              type:'get',
              url:'data/cart/getCart.php',
              dataType:'json',
              success:function(data){
                $('.carcount').html(data.length);
              }
            })
          }
        })
      }
  }).on('click','.ci-thead>img',function(){
    var iid = $(this).parent().parent().data('iid'),
      is_checked = $(this).attr('src').endsWith('true.png')?0:1;//endsWith 以...结束    这是以normal结束 :以true结束
    $.ajax({
      type:'get',
      url:'data/cart/checkOne.php',
      data:{iid,is_checked},
      success:function(){ 
        loadPage();
      }
    })
  });

  $('.checkall').click(function(){
    var is_checked = $(this).attr('src').endsWith('true.png')?0:1;//反着的
    $.ajax({
      type:'get',
      url:'data/cart/checkAll.php',
      data:{is_checked},
      success:function(){
        loadPage();
      }
    })
  })
  $('#delall').click(function(){
      var str=[];
      $(".cart-item").each(function() {
          var img = $(this).find('.ci-select').attr('src').endsWith('true.png');
          console.log(img);
          if(img){
              var iid=$(this).data('iid');
              str.push(iid);
          }
      });
      if(str.length>0){
          $('.modal').show();
          $('.yes').click(function(){
            str.forEach(function(id){
              $.ajax({
                type:'get',
                url:'data/cart/deleteCart.php',
                data:{iid:id},
                success:function(){
                  loadPage();
                  $('.modal').hide();
                  $.ajax({
                    type:'get',
                    url:'data/cart/getCart.php',
                    dataType:'json',
                    success:function(data){
                      $('.carcount').html(data.length);
                    }
                  })
                }
              })
            })
          })
          $('.no').click(function(){
              $('.modal').hide();
          })
      }else{
          $('.modalNo').fadeIn();
          $('.close').click(function(){
              $('.modalNo').fadeOut();
          })
      }
  })
  $('#goorder').click(function(e){
    e.preventDefault();
    var imgs = $('.ci-thead>img').length;
    var bool = false;
    for(var i = 0;i<imgs;i++){
      var srcs = $('.ci-thead>img').eq(i).attr('src').endsWith('true.png');
      if(srcs){
        bool = true;
      }
    }
    if(bool){
      location.href = 'order_confirm.html';
    }else{
      $('#showdiv').show();
      $('#alertMsg_info').html('<b>未勾选任何商品</b>');
      $('#alertMsg_btn1').click(function(){
        $(this).parent().parent().hide();
      });      
    }
  })
  $('#footers').load('footer/footer3.html',function(){
      var link=$('<link rel="stylesheet" href="footer/css/footer3.css">')
      $('head').append(link);
  });
})