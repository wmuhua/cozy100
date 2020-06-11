$(function(){
  
  $.ajax({
    url: 'data/users/get_basic.php',
    success: function (result) {
      if (result.code === 200) {
        $('#avatar').attr('src', result.avatar);
        $('[name="user_name"]').val(result.user_name);
        $('[name="phone"]').val(result.phone);
        $('[name="email"]').val(result.email);
        if (result.gender == 0) {
          $('[name="gender"]').val(result.gender);
          $(".women").addClass("selected");
          $(".women img").attr("src", "img/uc/select.png");
          $(".man").removeClass("selected");
          $(".man img").attr("src", "img/uc/un_select.png");
        }
      } else if (result.code === 401) {
        $('#showdiv').show();
        $('#alertMsg_info').html('<b>您尚未登录！</b>');
        $('#alertMsg_btn1').click(function () {
          location.href = 'login.html';
        });
      } else {
        $('#showdiv').show();
        $('#alertMsg_info').html('<b>错误！</b><b>原因：' + result.msg + '</b>');
      }
    }
  })

$('#form-uc-basic .save').click(function () {
  $.ajax({
    type: 'POST',
    url: 'data/users/update_basic.php',
    data: $('#form-uc-basic').serialize(),
    success: function (result) {
      if(result.code===200){
        $('#showdiv').show();
        $('#alertMsg_info').html('<b>用户信息更新成功！</b>');
        $('#alertMsg_btn1').click(function () {
          $('#showdiv').hide();
        });
      }else {
        $('#showdiv').show();
        $('#alertMsg_info').html('<b>错误！</b><b>原因：'+result.msg+'</b>');
      }
    }
  })
})
$('#footers').load('footer/footer3.html',function(){
  var link=$('<link rel="stylesheet" href="footer/css/footer3.css">')
  $('head').append(link);
});

/****************左边附加导航切换*****************/

  $("#leftsidebar_box .menu_img").attr('data-num',1);
  var data = new Date();
  $("#leftsidebar_box dt").click(function () {
    if(new Date() - data > 600){
      var menu_img = $(this).children('.menu_img');
      var num = menu_img.attr('data-num');
      if(num == 1){
        menu_img.attr("src", "img/myOrder/myOrder1.png");
        menu_img.css({'width':'12px','height':'12px'});
        menu_img.attr('data-num',0);
      }else{
        menu_img.attr("src", "img/myOrder/myOrder2.png");
        menu_img.css({'width':'18px','height':'18px'});
        menu_img.attr('data-num',1);({'width':'18px','height':'18px'});
      }
      $(this).parent().find('dd').slideToggle();
      data = new Date();
    }
  });



/*****************************************************个人信息管理页面js********************************************************/

/**
 * 这是个人信息页面js
 */
// 跳页面
function toPage(page) {
  window.location.href = page;
}


/**
 * 性别选择男
 */
$(".man").click(function () {
  if (!$(".man").hasClass("selected")) {
    $('[name="gender"]').val(1);
    $(".man").addClass("selected");
    $(".man img").attr("src", "img/uc/select.png");
    $(".women").removeClass("selected");
    $(".women img").attr("src", "img/uc/un_select.png");
  }
})

/**
 * 性别选择女
 */
$(".women").click(function () {
  if (!$(".women").hasClass("selected")) {
    $('[name="gender"]').val(0);
    $(".women").addClass("selected");
    $(".women img").attr("src", "img/uc/select.png");
    $(".man").removeClass("selected");
    $(".man img").attr("src", "img/uc/un_select.png");
  }
})

})