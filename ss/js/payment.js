$(function(){
  $('#footers').load('footer/footer3.html',function(){
      var link=$('<link rel="stylesheet" href="footer/css/footer3.css">')
      $('head').append(link);
  });  
})