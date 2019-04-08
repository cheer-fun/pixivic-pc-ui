function toTree(data) {
    data.forEach(function (item) {
        delete item.children;
    });
    var map = {};
    data.forEach(function (item) {
        map[item.id] = item;
    });
    var val = [];
    data.forEach(function (item) {
        var parent = map[item.pid];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            val.push(item);
        }
    });
    show(val);
    document.getElementsByClassName("comments")[0].innerHTML = element;
    element = '';
    if( GetQueryString("id")!=null)
    window.location.hash = GetQueryString("id");
    document.getElementById('name-input').value = decode(GetQueryString('user'));
    document.getElementById('email-input').value = decode(GetQueryString('email'));
}

function show(data) {
    if (data.length > 0) {
        data.forEach(function (item, index) {
            element += ('<li id="' + encode(item.id) + '">' +
                '<div class="comment" data-id="' + encode(item.id) + '">' +
                '<div class="comment-head">' + '#' + (data.length - index) + ' ' + encode(item.user) + '</div>' +
                '<div class="comment-content">' + encode(item.content) + '</div>' +
                '<div class="comment-time">' + encode(item.time) + '<div class="reply" onclick="reply(this)">回应</div></div>' +
                '</div></li>');
            if (item.children && item.children.length > 0) {
                element += '<ul class="comment-child">';
                show(item.children);
                element += '</ul>';
            }
        });
    }
}

function encode(str) {
    var s = "";
    if (str&&str.length === 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    return s;
}

function decode(str) {
    var s = "";
    if (str==null) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    return s;
}