$(function(){
/**加载已勾选的购物车条目**/
  $.ajax({
    url: 'data/cart/list_checked.php',
    success: function(result){
      if(result.code===200){
        var totalPrice = 0;
        var html = '';
        $.each(result.data, function(i, l){
          totalPrice += l.price*l.count;
          html += `<ul class="item_detail">
                        <li class="p_info">
                            <a target='_blank' class="pimg" href='product_detail.html?lid=${l.lid}'>
                              <img src="${l.pic}"/>
                            </a>
                            <div class="product_name lf">
                                <p><a target='_blank' href="product_detail.html?lid=${l.lid}">${l.title}</a></p>
                            <p class="product_color ">${l.subtitle}</p>
                            </div>
                        </li>
                        <li class="p_price">
                            <p class="pro_price"><b>优惠价</b>
                            ￥<span class="ppp_price">${l.price}</span></p>
                        </li>
                        <li class="p_count">x<span>${l.count}</span></li>
                        <li class="p_tPrice">￥<span>${parseInt(l.count*l.price).toFixed(2)}</span></li>
                    </ul>`;
        })
        $('#product_list').html(html);
        $('#count').html(result.data.length);
        $('.zj').html(parseInt(totalPrice).toFixed(2));
        }
      }
  })

  $.ajax({
    url:'data/users/get_basic.php',
    success:function(data){
      $('.address_name>span').html(data.uname);
    }
  })
  $('#footers').load('footer/footer3.html',function(){
      var link=$('<link rel="stylesheet" href="footer/css/footer3.css">')
      $('head').append(link);
  });

})