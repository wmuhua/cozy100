$(function(){
  var uname=$('#uname');
  var upwd=$('#upwd');
  var upwdconfirm=$('#upwdconfirm');
  var phone=$('#phone');

var reguname = /^[a-zA-Z0-9\u4e00-\u9fa5]{6,12}$/;
/*对用户名进行验证*/
uname.blur(function () {
  var next = $(this).next();
  var val =$.trim(this.value);
  if ( val==''|| val==null) {
    next.attr('class','hidden');
  } else if (reguname.test(val)) {
    $.ajax({
      url: 'data/users/check_uname.php',
      data: {uname: val},
      success: function (result) {
        if (result.code === 201) {
          next.html('用户名已被占用');
          next.attr('class','msg-error');
        } else if (result.code === 200) {
          next.html('用户名可以使用');
          next.attr('class','msg-success');
          upwd.focus();
        } else {
          $('#showdiv').show();
          $('#alertMsg_info').html('<b>验证用户名出错！请稍后重试。</b>');
          $('#alertMsg_btn1').click(function () {
            $(this).parent().parent().hide();
          });
        }
      }
    })
  }else{
    next.html('格式有误,请重新输入');
    next.attr('class','msg-error');
  }
})
uname.focus(function () {
  var next = $(this).next();
  var val =$.trim(this.value);
  if ( val==''|| val==null) {
    next.html('请输入6-12位的中文、英文、数字任意组合');
    next.attr('class','msg-default');
  }
})
/*对密码进行验证*/
var regupwd = /^[\u4E00-\u9FA5A-Za-z0-9_]{6,16}$/;
upwd.focus(function () {
  var next = $(this).next();
  var val =$.trim(this.value);
  if ( val==''|| val==null) {
    next.html('请输入6-16位的中文、英文、数字或下划线的组合');
    next.attr('class','msg-default');
  }
})
upwd.blur(function () {
  var next = $(this).next();
  var val =$.trim(this.value);
  if ( val==''|| val==null) {
    next.attr('class','hidden');
  } else if (regupwd.test(val)) {
    next.html('输入正确');
    next.attr('class','msg-success');
  } else{
    next.html('输入有误,请重新输入');
    next.attr('class','msg-error');
  }
})
/*对确认密码进行验证*/
upwdconfirm.focus(function () {
  var next = $(this).next();
  var val =$.trim(this.value);
  if ( val==''|| val==null) {
    next.html('请再次输入密码');
    next.attr('class','msg-default');
  }
});
upwdconfirm.blur(function () {
  var next = $(this).next();
  var val =$.trim(this.value);
  if ( val==''|| val==null) {
    next.attr('class','hidden');
  } else if (val === $.trim(upwd.val())) {
    next.html('输入正确');
    next.attr('class','msg-success');
  } else {
    next.html('两次输入的密码不一致');
    next.attr('class','msg-error');
  }
});
/*对手机号进行验证*/
var regphone=/^(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|2|3|5|6|7|8]|19[1|2|5|8|9])\d{8}$/;
phone.blur(function () {
  var next = $(this).next();
  var val =$.trim(this.value);
  if ( val==''|| val==null) {
    next.attr('class','hidden');
  } else if (regphone.test(val)) {
    $.ajax({
      url: 'data/users/check_phone.php',
      data: {phone: val},
      success: function (result) {
        if (result.code === 201) {
          next.html('该电话已经注册过');
          next.attr('class','msg-error');
        } else if (result.code === 200) {
          next.html('输入正确');
          next.attr('class','msg-success');
        } else {
          $('#showdiv').show();
          $('#alertMsg_info').html('<b>验证手机出错！请稍后重试。<b>');
          $('#alertMsg_btn1').click(function () {
            $(this).parent().parent().hide();
          });
        }
      }
    })
  }else{
    next.html('手机号格式不正确');
    next.attr('class','msg-error');
  }
});
phone.focus(function () {  
  var next = $(this).next();
  var val =$.trim(this.value);
  if ( val==''|| val==null) {
    next.html('请输入11位数字手机号码');
    next.attr('class','msg-default');
  }
});

/**注册按钮监听函数**/
$('.btn-register').click(function () {
  var count = 0;
  if($('#read').is(':checked')){
    $('.item>.fl').each(function () {
      if ($(this).find('span').hasClass('msg-success')) {
        count++;
      }
    });
    if (count == 4) {
      $.ajax({
          type: 'POST',
          url: 'data/users/register.php',
          data: $('#form-register').serialize(),
          success: function(result){
            if(result.code===200){
              $('#showdiv').show();
              $('#alertMsg_info').html('<b>注册成功！</b><b>点击“确定”后将跳转到登录页</b>');
              $('#alertMsg_btn1').click(function (e) {
                e.preventDefault();
                $('#showdiv').hide();
                location.href = 'login.html';
              })
            }else {
              $('#showdiv').show();
              $('#alertMsg_info').html('<b>注册失败！</b><b>错误消息：'+result.msg+'</b>');
            }
          }
        }
      )
    }else{
      $('#showdiv').show();
      $('#alertMsg_info').html('<b>信息填写有误,请重新输入</b>');
    }
  }else{
    $('#showdiv').show();
    $('#alertMsg_info').html('<b>请阅读服务条款</b>');
  }
  $('#alertMsg_btn1').click(function () {
    $(this).parent().parent().hide();
  });
})
var timecount = 10;
$('#smssend').click(function(){
  setTime($(this))
})
function setTime(val) { 
  if (timecount == 0) {
    val.attr("disabled", false);
    val.css('background-color','#f50');
    val.val("发送验证码"); 
    timecount = 10;
    return;
  } else { 
    val.attr("disabled", true);
    val.css('background-color','#aaa');
    val.val(timecount + "秒后重新发送"); 
    timecount--; 
  } 
  setTimeout(function() { 
    setTime(val) 
  },1000) 
} 

$('#footers').load('footer/footer1.html',function(){
  var link=$('<link rel="stylesheet" href="footer/css/footer1.css">')
  $('head').append(link);
});

})

