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
    img = this.setupImage(e.currentTarget.href,e.currentTarget.rel);
    img.classList.add('lightbox-current');
    this.container.appendChild(img);
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
