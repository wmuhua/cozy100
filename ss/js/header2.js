

  $('#headers2').load('header2.html',function(){
    var btnSearch = document.getElementById('triggerSearch');
    var txtSearch = document.getElementById('txtSearch');
    btnSearch.onclick = function(){
      if(txtSearch.value.trim()!==''){
        location.href = 'products.html?kw='+txtSearch.value.trim();
        return false;
      }
    };
    txtSearch.onkeyup = function(e){
      if(e.keyCode === 13){
        btnSearch.onclick();
      }
    };
    if(location.search.indexOf('kw=')!=-1){
      txtSearch.value = decodeURI(location.search.split('=')[1]);
    }

    // 搜索提示
    var $txtSearch = $('#txtSearch'),$shelper = $('#shelper');
    $txtSearch.keyup(function(e){
      if(e.keyCode!=13){
        if(e.keyCode == 40){
          if(!$shelper.is(':has(.focus)')){
            $shelper.children(':first').addClass('focus');
          }else{
            //$shelper.children('.focus').removeClass('focus').next().addClass('focus');
            //或者
            var $next = $shelper.children('.focus').removeClass('focus').next();
            if($next.length>0){
              $next.addClass('focus');
            }else{
              $shelper.children(':first').addClass('focus');//回到顶部
            }
          }
        }else if(e.keyCode == 38){
          if(!$shelper.is(':has(.focus)')){
            $shelper.children(':first').addClass('focus');
          }else{
            //$shelper.children('.focus').removeClass('focus').next().addClass('focus');
            //或者
            var $prev = $shelper.children('.focus').removeClass('focus').prev();
            if($prev.length>0){
              $prev.addClass('focus');
            }else{
              $shelper.children(':last').addClass('focus');//回到底部
            }
          }
        }else{
          if($txtSearch.val().trim()!== ''){
            $shelper.show();
            $.ajax({
              type:'get',
              url:'data/products/shelper.php',
              data:{kw:$txtSearch.val()},
              dataType:'json',
              success:function(data){
                if(data.length>0){
                  var html = '';
                  for(var item of data){
                    var {title,sold_count} = item;
                    html+=`<li title="${title}"><a href='javascript:;' class='assign-key'>
                        <div class="search-item" title="${title}">${title}</div>
                      <i>销量:${sold_count}</i>
                      </a></li>`;
                  }
                  $shelper.html(html);
                }else{//如果为空
                  $shelper.html(`<li title="未找到">
                        <div class="search-item" title="未找到">未找到</div>
                      </li>`);
                }
              }
            })
          }else{
            $shelper.hide();
          }
        }
      }
    }).blur(function(){
      $shelper.hide();
    }).focus(function(){
      $txtSearch.keyup();
    })

    $('.menu').on('click','a',function(e){
      var e = window.event || e;
      e.preventDefault();
      var inner = $(this).html();
      location.href = 'products.html?kw='+inner;
      return false;
    })
    
  })




