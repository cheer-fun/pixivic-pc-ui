var columnH = [],
    page = 0,
    flag = false, date, url = 'https://api.pixivic.com/';

function getDay(page, str) {
    var today = new Date();
    var nowTime = today.getTime();
    var ms = 24 * 3600 * 1000 * page;
    today.setTime(parseInt(nowTime + ms));
    var oYear = today.getFullYear();
    var oMoth = (today.getMonth() + 1).toString();
    if (oMoth.length <= 1) oMoth = '0' + oMoth;
    var oDay = today.getDate().toString();
    if (oDay.length <= 1) oDay = '0' + oDay;
    return oYear + str + oMoth + str + oDay;
}

(function () {
    date = getDay(-3, '-');
    document.title="Pixiv "+date+" 日排行";
}());
init();

function init() {
    ajax("get", url + 'd', "page=0&date=" + date, showlist, true);
}

// function ajax(method, url, data, callback, flag) {
//     var xhr = null,
//         method = method.toUpperCase();
//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else {
//         xhr = new ActiveXObject('Microsoft.XMLHttp');
//     }
//     if (method == "GET") {
//         xhr.open(method, url + '?' + data, flag);
//         xhr.send();
//     } else if (method == "POST") {
//         xhr.open(method, url, true);
//         xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//         xhr.send(data);
//     }
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4) {
//             if (xhr.status == 200) {
//                 callback(xhr.responseText);
//             }
//         }
//     }
// }

// mock
function ajax(method, url, data, callback, flag) {
    callback(JSON.stringify(mock.data.illustrations))
}

function showlist(data) {
    var str = JSON.parse(data),
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
            var imgUrl = item.meta_single_page.original_image_url;
            if (item.meta_pages.length > 0) {
                imgUrl = item.meta_pages[0].image_urls.original;
            }
            elem = '<a href="' + item.url + '" alt ="' + item.title + '"  class="image" rel="https://www.pixiv.net/member_illust.php?mode=medium&illust_id='+item.id+'">\
				        <img src ="' + imgUrl + '" height ="' + imgH + '"  width="228" alt="' + item.title + '">\
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
            oDiv.children[0].meta_pages = item.meta_pages.map(e => e.image_urls.original);
        });
        let lightbox = new Lightbox('.image');
        flag = false;
    } else {
        var info = document.getElementById('info');
        info.innerHTML = '(￣ˇ￣)俺也是有底线的';
        info.style.top = (document.getElementById('loader').offsetTop - 250) + "px";
    }
}

function showdate() {
    var Mtop = getScroll();
    pageH = parseInt(columnH[minH(columnH)]),
        MaxH = document.documentElement.clientHeight || document.body.clientHeight;
    if (pageH <= MaxH + Mtop.y) {
        if (!flag) {
            flag = true;
            page++;
            // console.log(page);
            ajax("get", url + 'd', "date=" + date + "&page=" + page, showlist, true);
        }
    }
}

function restart() {
    document.getElementById("waterfall").innerHTML = '';
    document.getElementById('loader').style.top = "0px";
    Lightbox.prototype.index = 0;
    columnH = [],
        page = 0,
        flag = false;
    ajax("get", url + 'd', "date=" + date + "&page=" + page, showlist, true);
    var info = document.getElementById('info');
    info.innerHTML = '';
    document.title="Pixiv "+date+" 日排行";
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