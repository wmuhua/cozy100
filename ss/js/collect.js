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
                url:'data/cart/getCollect.php',
                dataType:'json',
                success:function(items){
                  var html = '',totalprice = 0,sum = 0;
                  for( var item of items){
                    var {md,product_id,price,title,subtitle} = item;
                    html+=`<div class="d1 fl" data-ppid=${product_id}>
                        <div class="img">
                            <a href='product_detail.html?lid=${product_id}'>
                            <img src="${md}" alt=""/>
                          </a>
                        </div>
                        <div class="describe">
                          <p><a href='product_detail.html?lid=${product_id}'>${title}</a></p>
                          <span class="price"><b>￥</b><span class="priceContent">${parseInt(price).toFixed(2)}</span></span>
                          <span data-pid=${product_id} class="addCart">加入购物车</span>
                            <span class="succee" style="display:none">
                                 <img src="img/myCollect/product_true.png" alt=""/>
                                 <span>已移入购物车</span>
                            </span>
                        </div>
                        <div class="masks">
                          <div class="maskNormal">
                            <img src="img/myCollect/product_normal_big.png" alt=""/>
                          </div>
                        </div>
                      </div>`;
                  } 
                  $('#content_box').html(html);
                }
            })
          }
        }
    });
}

loadPage();

//管理收藏夹
$('.manage').click(function(e){
      var e = window.event || e;
      e.preventDefault();
      e.stopPropagation();
    if($('.manage span').hasClass('normal')){
        $('.manage span').removeClass('normal').addClass('show');
        $('.manage span').html('取消管理');
        $('.check_top').show();
        $('.masks').show();
    }else{
        $('.manage span').removeClass('show').addClass('normal');
        $('.manage span').html('管理收藏夹');
        $('.check_top').hide();
        $('.masks').hide();
    }
    //单选
    $('.masks').click(function(e){
      var e = window.event || e;
      e.preventDefault();
      e.stopPropagation();
      var src = $(this).find('img').attr('src').endsWith('true_big.png');
        if(src){
            $(this).children().addClass('maskNormal').removeClass('maskTrue');
            $(this).find('img').attr('src','img/myCollect/product_normal_big.png');
        }else{
            $(this).children().addClass('maskTrue').removeClass('maskNormal');
            $(this).find('img').attr('src','img/myCollect/product_true_big.png');
        }
    })

  // 全选
  $('.all').click(function(){
      if($('.all>span').hasClass('normal')){
          $('.all>span').addClass('true').removeClass('normal');
          $('.all>span>img').attr('src','img/myCollect/product_true.png');
          $(".masks>div").each(function() {
              $(this).addClass('maskTrue').removeClass('maskNormal');
              $(this).children('img').attr('src','img/myCollect/product_true_big.png');
          })
      }else{
          $('.all>span').addClass('normal').removeClass('true');
          $('.all>span>img').attr('src','img/myCollect/product_normal.png');
          $(".masks>div").each(function() {
              $(this).addClass('maskNormal').removeClass('maskTrue');
              $(this).children('img').attr('src', 'img/myCollect/product_normal_big.png');
          })
      }
  })

  $('.del').click(function(){
      var str=[];
      $(".masks>div").each(function() {
          if($(this).hasClass('maskTrue')){
              var id=$(this).parent().parent().data('ppid');
              str.push(id);
          }
      });
      if(str.length>0){
          $('.modal').show();
          $('.yes').click(function(){
            str.forEach(function(id){
               $.ajax({
                   type: "get",
                   url: "data/cart/deleteCollect.php",
                   data: {pid:id},
                   dataType:'json',
                   success: function(data){
                    if (data.code === 200) {
                      $('.manage span').removeClass('show').addClass('normal');
                      $('.manage span').html('管理收藏夹');
                      $('.check_top').hide();
                      $('.masks').hide();
                      loadPage();
                    }else if(data === 500){
                      alert("删除失败！");
                    }
                    $('.modal').hide();
                  }
              });
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
// $('.allAdd').click(function(){
//     var str=[];
//     $('.mask>div').each(function(){
//         if($(this).hasClass('maskTrue')){
//             var id=$(this).parent().parent().attr('id');
//             str.push(id);
//         }
//     });
//     console.log(str);
//     if(str.length>0){
//         $.ajax({
//           
//         }else if(data == '500'){
//           alert("加入 购物车失败！");
//         }else {
//           window.location.href = data;
//         }
//             }
//         });
//     }else{
//         $('.modalAdd').fadeIn();
//         $('.close').click(function(){
//             $('.modalAdd').fadeOut();
//         })
//     }
// })
})
  // //单独添加购物车
 $('#content_box').on('click','.addCart',function(e){
    var e = window.event || e;
    var cs = $(this).attr('class');
    var inner = $(this).html();
    if(cs === 'addCart' && inner != '添加成功'){
       var lid = $(this).data('pid');
       var count = 1;
       var that = $(this);
       $.ajax({
          type:'get',
          url:'data/cart/addCart.php',
          data:{lid,count},
          success:function(){
            that.css('background-color','#ccc');
            that.html('添加成功');
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
                  var img=that.parent().prev().find('img').attr('src');
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
      });
    }
})


  $('#footers').load('footer/footer3.html',function(){
      var link=$('<link rel="stylesheet" href="footer/css/footer3.css">')
      $('head').append(link);
  });



  
  
})