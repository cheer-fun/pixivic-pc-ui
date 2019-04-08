'use strict';
var columnH = [],
    page = 0,
    flag = false,
    keyword = 'saber',
url='https://api.pixivic.com';
if (window.opener) {
    if (window.opener.document.getElementById("search-box").value) {
        keyword = window.opener.document.getElementById("search-box").value;
        document.getElementById("searchField").value = keyword;
    }
}
init();
getTags();
window.document.getElementById('searchField').onkeydown = function () {
    // noinspection JSAnnotator
    var event = window.event || arguments.callee.caller.arguments[0];
    if (event.keyCode == 13) {
        keyword = document.getElementById("searchField").value + '';
        restart();
    }

}

function init() {
    ajax("get", url+"/s", "page=0&keyword=" + keyword, showlist, true);
}

function showlist(data) {
    var str = JSON.parse(data).illusts,
        elem = '',
        imgH = 0,
        content = document.getElementById("waterfall"),
        minIndex;
    var url;
    if (str.length > 0) {
        str.forEach(function (item, index) {
            var oDiv = document.createElement("div");
            oDiv.className = "box";
            imgH = Math.ceil(228 * item.height / item.width);
            url = item.meta_single_page.original_image_url;
            if (url == undefined)
                url = item.meta_pages[0].image_urls.original;
            url = 'https://bigimg.pixivic.com/get/' + url;
            elem = '<a href="' + url + '" alt ="' + item.title + '"  class="image" rel="https://www.pixiv.net/member_illust.php?mode=medium&illust_id='+item.id+'">\
				        <img src ="https://img.pixivic.com/get/' + item.image_urls.large.replace('_webp', '') + '" height ="' + imgH + '"  width="228" alt="' + item.title + '">\
				        </a>';
            elem += item.title.length == 0 ? "" : '<p>' + item.title + '</p>';
            if (index < 4 && columnH.length != 4) {
                oDiv.style.left = 240 * index + "px";
                oDiv.style.top = "0px";
                oDiv.innerHTML = elem;
                content.appendChild(oDiv);
                columnH.push(oDiv.offsetHeight);
            } else {
                minIndex = minH(columnH);
                oDiv.style.left = 240 * minIndex + "px";
                oDiv.style.top = columnH[minIndex] + 20 + "px";
                oDiv.innerHTML = elem;
                content.appendChild(oDiv);
                columnH[minIndex] += oDiv.offsetHeight + 20;
                document.getElementById('loader').style.top = columnH[minIndex] + 60 + "px";
            }
        });
        let lightbox = new Lightbox('.image');
        flag = false;
    } else {
        var info = document.getElementById('info');
        info.innerHTML = '(￣ˇ￣)俺也是有底线的';
        info.style.top = (document.getElementById('loader').offsetTop - 300) + "px";
    }
}

function showdate() {
    var Mtop = getScroll();
    var pageH;
    var MaxH;
    pageH = parseInt(columnH[minH(columnH)]),
        MaxH = document.documentElement.clientHeight || document.body.clientHeight;
    if (pageH <= MaxH + Mtop.y) {
        if (!flag) {
            flag = true;
            page++;
            ajax("get", url+"/s", "keyword=" + keyword + "&page=" + page, showlist, true);
        }
    }
}

function getTags() {
    ajax("get",  url+"/t", "keyword=" + keyword, showtags, true);
}

function showtags(data) {
    var data = JSON.parse(data);
    var str = '';
    for (var i = 0, len = data.length; i < len; i++) {
        str += '<div class="tag"><div class="title" onclick="research(this)">' + data[i].tag + '</div><div class="des">' + data[i].tag_translation + '</div></div>';
    }
    document.getElementById('tags').innerHTML = str;
}

function research(tag) {
    keyword = tag.innerHTML;
    document.getElementById("searchField").value = keyword;
    restart();
}

function restart() {
    getTags();
    document.getElementById("waterfall").innerHTML = '';
    document.getElementById('loader').style.top = "0px";
    Lightbox.prototype.index = 0;
    columnH = [],
        page = 0,
        flag = false;
    ajax("get",  url+"/s", "keyword=" + keyword + "&page=" + page, showlist, true);
    var info = document.getElementById('info');
    info.innerHTML = '';
}

function minH(arr) {
    var minh = arr[0],
        i = 1,
        index = 0;
    for (; i < arr.length; i++) {
        if (minh > arr[i]) {
            minh = arr[i];
            index = i;
        }
    }
    return index;
}

function getScroll() {
    if (window.pageXoffset) {
        return {
            x: window.pageXoffset,
            y: window.pageYoffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

function choke(func, wait) {
    var lastTime = 0;
    return function () {
        var _self = this,
            _arg = arguments;
        var nowTime = Date.now();
        if (nowTime - lastTime > wait) {
            func.apply(_self, _arg);
            lastTime = nowTime;
        }
    }
}

function ajax(method, url, data, callback, flag) {
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
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            }
        }
    }
}