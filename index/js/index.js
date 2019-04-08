console.log(device.type)
if(device.type=='mobile'){
window.location ='https://m.pixivic.com';  //可以换成http地址
}
window.onresize = function () {
    var box = document.getElementById("title");
    box.style["z-index"] = 1;
};

function popSearch() {
    window.open('https://pixivic.com/popSearch');
}

function dailyRank() {
    window.open('https://pixivic.com/dailyRank');
}
function search() {
var event = window.event || arguments.callee.caller.arguments[0];
        if (event.keyCode == 13) {
          document.getElementById('search-btn').click();
        }
 }