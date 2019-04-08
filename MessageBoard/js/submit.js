var time;
var pid=0;
var form=document.getElementById("myform");
form.onsubmit = function(e) {
    document.getElementById('form-container').style.display="none";
    document.querySelector(".mask").style.display = "none";
    let submit=document.getElementById("submit-form")
    submit.disabled=true;
    e.preventDefault();
    var f = e.target,
        formData = '',
        xhr = new XMLHttpRequest();
    for (var i = 0, d, v; i < f.elements.length; i++) {
        d = f.elements[i];
        if (d.name && d.value) {
                if(d.name==='isRobot')
                {formData += d.name + "="+!d.checked+"&";
                    continue
                }
            formData += d.name + "=" + d.value +  "&";
        }
    }
    time=getNowFormatDate();
    formData+='time='+time+'&pid='+pid+'&';
    xhr.open('POST', 'https://comment.pixivic.com/submit');
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(formData);
    document.getElementById('content-input').value="";
    xhr.onreadystatechange = function () {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState === 4 ) {
            if(xhr.status === 200){
                setUserAndEmail();
                ajaxFun("get", "https://comment.pixivic.com/pull", "", toTree, true);
            }
            else alert('因为一些奇怪的原因，回复失败了呢')

        }
        submit.disabled=false;
    }
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
