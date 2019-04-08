'use strict';
var gototop = document.getElementById('gototop');
var timer;
var tf=true;
function showgototop(){
    var ostop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var ch=document.body.clientHeight||document.documentElement.clientHeight;
    if(ostop>=ch){
        gototop.style.display='inline';
        gototop.className='animated fadeInUp';
    }else{
        gototop.className='animated fadeOutDown';
    }
    if(!tf){
        clearInterval(timer);
    }
    tf=false;
}
gototop.onclick=function(){
    timer=setInterval(function(){
        var ostop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var speed=Math.ceil(ostop/7);
        document.documentElement.scrollTop=document.body.scrollTop=ostop-speed;
        if(ostop==0){
            clearInterval(timer);
        }
        tf=true;
    },30);
}
window.addEventListener('scroll',choke(showdate, 100));
window.addEventListener('scroll',showgototop);