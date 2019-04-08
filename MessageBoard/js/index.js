var gototop = document.getElementById('gototop');
var timer;
var tf=true;
gototop.onclick=function(){
    timer=setInterval(function(){
        var ostop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var speed=Math.ceil(ostop/7);
        document.documentElement.scrollTop=document.body.scrollTop=ostop-speed;
        if(ostop===0){
            clearInterval(timer);
        }
        tf=true;
    },30);
}
function index(){
    var ostop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var ch=document.documentElement.clientHeight;

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
window.addEventListener('scroll',index);
var element = '';
function ajaxFun(method, url, data, callback, flag) {
    var xhr = null,
        method = method.toUpperCase();
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    if (method == "GET") {
        xhr.open(method, url + '?' + data, flag);
        xhr.send();
    } else if (method == "POST") {
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // console.log(JSON.parse(xhr.responseText))
                callback(JSON.parse(xhr.responseText));
            }

        }
    }
}
ajaxFun("get", "https://comment.pixivic.com/pull", "", toTree, true);
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    console.log(decodeURIComponent(r[2]))
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}
function reply(button) {
    document.querySelector(".mask").style.display = "block";
    document.getElementById('form-container').style.display="block";
    document.getElementById('form-container').className="animated fadeInUp";
    pid=button.parentElement.parentElement.parentElement.id;
    getUserAndEmail();
}
document.onclick = function (e) {
    var id = e.srcElement.id;
    var Class=e.srcElement.className;
    if (id != "mask"&&Class!="reply"&&id!="name-input"&&id!="email-input"&&id!="content-input"&&id!="submit-form"&&id!="check"&&id!="robotcheck"&&id!="robotcheckbutton"&&id!="plane") {
        document.getElementById('form-container').style.display="none";
        document.querySelector(".mask").style.display = "none";
        document.getElementById('content-input').value="";
    }
};
function  replytoAdmin(){
    document.querySelector(".mask").style.display = "block";
    document.getElementById('form-container').style.display="block";
    document.getElementById('form-container').className="animated fadeInUp";
    pid=0;
    getUserAndEmail();
}
function getUserAndEmail() {
    if(getCookie('user')&&getCookie('email')){
        document.getElementById('name-input').value=getCookie('user');
        document.getElementById('email-input').value=getCookie('email');
    }

}
function setUserAndEmail() {
    setCookie('user',document.getElementById('name-input').value);
    setCookie('email',document.getElementById('email-input').value);
}
function getInfoByURL(){
    if(GetQueryString('user')&&GetQueryString('email')){
        document.getElementById('name-input').value=GetQueryString('user');
        document.getElementById('email-input').value=GetQueryString('email');
    }
}