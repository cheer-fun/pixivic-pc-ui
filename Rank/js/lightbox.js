 'use strict';
var Lightbox = function Lightbox(elems) {
    this.elems = document.querySelectorAll(elems);
    this.current = -1;
    this.overlay;
    this.container;
    this.galId;
    this.clickHandler = this.clickHandler.bind(this);
    this.destroy = this.destroy.bind(this);

    for (var i = Lightbox.prototype.index * 30; i < this.elems.length; i++) {
        this.elems[i].addEventListener('click', this.clickHandler);
    }
    Lightbox.prototype.index++;
    // let's go!
    this.setupContentArea();
};
Lightbox.prototype.index = 0;
Lightbox.prototype.setupContentArea = function () {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('lightbox-overlay');

    this.container = document.createElement('div');
    this.container.classList.add('lightbox-container');

    this.overlay.innerHTML = '<span class="lightbox-close"></span>';

    this.overlay.addEventListener('click', this.destroy);
    this.overlay.querySelector('.lightbox-close').addEventListener('click', this.destroy);
};

Lightbox.prototype.clickHandler = function (e) {
    var _this = this;
    e.preventDefault();
    var img = void 0;
    this.galId = e.currentTarget.rel;
    this.current = 0;
    if (e.currentTarget.meta_pages && e.currentTarget.meta_pages.length > 0) {
        var imageflow = document.createElement('div');
        imageflow.classList.add('lightbox-imageflow');
        e.currentTarget.meta_pages.map(meta_page_item => {
            img = this.setupImage(meta_page_item, e.currentTarget.rel);
            img.classList.remove('lightbox-image');
            img.classList.add('lightbox-imageflow-image');
            imageflow.appendChild(img);
        })
        this.container.appendChild(imageflow);
    } else {
        img = this.setupImage(e.currentTarget.children[0].src, e.currentTarget.rel);
        img.classList.add('lightbox-current');
        this.container.appendChild(img);
    }
    var intro = document.createElement('div');
    intro.classList.add('lightbox-intro');
    var p = document.createElement('p');
    p.innerText = `Title: ${e.currentTarget.title}`;
    p.classList.add('title');
    intro.appendChild(p);
    var p = document.createElement('p');
    p.classList.add('intro');
    p.innerText = `Tags:`;
    e.currentTarget.tags.forEach(tag => {
        var span = document.createElement('span');
        span.classList.add('tag');
        span.innerText = tag.name;
        p.appendChild(span);
    })
    intro.appendChild(p);
    var p = document.createElement('p');
    p.classList.add('intro');
    p.innerText = `Intro: ${e.currentTarget.caption}`;
    intro.appendChild(p);
    if (e.currentTarget.author.profile_image_urls.medium) {
        var avator = document.createElement('img');
        avator.src = `https://bigimg.pixivic.com/get/${e.currentTarget.author.profile_image_urls.medium}`;
        intro.appendChild(avator)
    }
    var p = document.createElement('p');
    p.innerText = `${e.currentTarget.author.name}`
    intro.appendChild(p);
    this.container.appendChild(intro);
    document.body.appendChild(this.container);
    document.body.appendChild(this.overlay);
    setTimeout(function () {
        _this.container.classList.add('visible');
        _this.overlay.classList.add('visible');
    }, 50);

};

Lightbox.prototype.setupImage = function (imgSrc,link) {
    var img = new Image();
    img.src = imgSrc;
    img.classList.add('lightbox-image');
    img.onclick=function () {
        window.open(link);
    }
    return img;
};

Lightbox.prototype.destroy = function (e) {
    e.preventDefault();

    this.overlay.remove();
    this.container.remove();
    this.setupContentArea();
};


if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Lightbox;
} else {
    window.Lightbox = Lightbox;
}
