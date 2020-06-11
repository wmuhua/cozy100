
function animate(dom,obj,fn){ 
  clearInterval(dom.times);
  dom.times = setInterval(function(){ 
      var bool = true;
    for(var k in obj){
      if(k == 'opacity'){
        var objAttr = parseFloat(getAttr(dom,k))*100;
      }else{
        var objAttr = parseInt(getAttr(dom,k));
      }     
      var speed = (obj[k]-objAttr)/10;
      speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
      if(objAttr != obj[k]){
        bool = false;
      }
      if(k == 'opacity'){
        dom.style.filter = 'alpha(opacity:'+objAttr + speed+')';
        dom.style[k] = (objAttr + speed)/100;   
      }else{
        dom.style[k] = objAttr + speed +'px'; 
        
      }
    }
    if(bool){
      clearInterval(dom.times);
      if(fn){
        fn.call(dom);
      }
    }
  },30);    
}
function getAttr(dom,attr){
  if(dom.currentStyle){
    return dom.currentStyle[attr];
  }else{
    return getComputedStyle(dom,null)[attr];
  }
}
function scroll(){
      //ie9+和其他浏览器
      //不能为空是因为如果不要这个判断 返回结果是0
  if(window.pageYoffset != null){
    return {
      left:window.pageXOffset,
      top:window.pageYOffset
    } //检测模式是不是等于正常模式(声明了doctype的)
      //CSS1Compat已经声明   BackCompat未声明  
  }else if(document.compatMode == 'CSS1Compat'){
    return {
      left:document.documentElement.scrollLeft,
      top:document.documentElement.scrollTop
    }
  }   //比如谷歌浏览器声明了也会当作没有声明
  return {//剩下的肯定是怪异模式的(没有doctype)
    left:document.body.scrollLeft,
    top:document.body.scrollTop
  }
}
function client(){
  if(window.clientWidth != null){
    return {
      width:window.clientWidth,
      height:window.clientHeight
    }
  }else if(document.compatMode == 'CSS1Compat'){
    return {
      width:document.documentElement.clientWidth,
      height:document.documentElement.clientHeight
    }
  }
  return {
    width:document.body.clientWidth,
    height:document.body.clientHeight
  }
}
var sta=document.querySelector('.stage'),
    pic = document.querySelector('.banner_pic'),
    pics = document.querySelectorAll('.banner_pic>a'),
    uls = document.querySelector('.circle');
var ww = 0;
~~function setSize(){
  window.onresize = arguments.callee;
  ww = client().width;
  sta.style.width = ww + 'px';
  pic.style.width = 2*ww +'px';
  for(var i = 0;i<pics.length;i++){
    pics[i].style.width = ww + 'px';
  }
}();
for(var i = 0;i<pics.length;i++){
  var li = document.createElement('li');
  li.innerHTML = i+1;
  uls.appendChild(li);
}
var lis = uls.children;
lis[0].className = 'current';
for(var i = 1;i<pics.length;i++){
  pics[i].style.left = ww + 'px';
}
var index = 0;
for(k in lis){
  lis[k].onmouseover = function(){
    var that = this.innerHTML-1;
    if(that > index){// 4  2 
      animate(pics[index],{left:-ww});
      pics[that].style.left = ww + 'px';
    }else if(that < index){
      animate(pics[index],{left:ww});
      pics[that].style.left = -ww + 'px';
    }
    animate(pics[that],{left:0});
    index = that;
    getSquare();
  }
}
var timer = null;
timer = setInterval(autoplay,2500);
function autoplay(){
  animate(pics[index],{left:-ww});
  index++;index%=pics.length;
  pics[index].style.left = ww + 'px';
  animate(pics[index],{left:0});
  getSquare();
}
function getSquare(){
  for(var i = 0;i<lis.length;i++){
    lis[i].className = '';
  }
  lis[index].className = 'current';
}
sta.onmouseover = function(){
  clearInterval(timer);
}
sta.onmouseout = function(){
  clearInterval(timer);
  timer = setInterval(autoplay,2500);
}
var lt = document.querySelector('.sale_list>.lt'),
    gt=document.querySelector('.sale_list>.gt'),
    ct = document.querySelector('.sale_list_ct'),
    flag = 0;
lt.onclick = function(){
  if(flag == 1){
    animate(ct,{left:0});
    flag = 0;
  }
}
gt.onclick = function(){
  if(flag == 0){
    animate(ct,{left:-754});
    flag = 1;
  }
}
var ul=document.querySelector('.pro_show>ul'),
    uli=ul.children,
    pic_img=document.querySelector('.pro_show>.pic');
for(var i = 0;i<uli.length;i++){
  uli[i].onmouseover = function(){
    for(var j =0;j<uli.length;j++){
      uli[j].className = '';
    }
    this.className = 'li_color';
    if(this.id == 'wuyu'){
      animate(pic_img,{left:-180});
    }else{
      animate(pic_img,{left:0});
    }
  }
}
function fns(obj){
  var target = document.getElementById(obj),
    lis = target.querySelectorAll('.bots>ul>li'),
    dvs = target.querySelectorAll('.bots>div>.tempwrap');
  for(var i=0;i<lis.length;i++){
    lis[i].index = i;
    lis[i].onmouseover = function(){
      for(var j=0;j<lis.length;j++){
        lis[j].className = '';
        dvs[j].style.opacity = '0';
      }
      this.className = 'li_color';
      dvs[this.index].style.opacity ='1';
    }
  }   
}
fns('brand_box');
fns('hot_box');


