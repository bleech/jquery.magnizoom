/*! jQuery Magnizoom - v0.1.0 - 2012-06-17
* https://github.com/bleech/jquery.magnizoom
* Copyright (c) 2012 bleech; Licensed MIT, GPL */

;(function ( $, window, document, undefined ) {

  // the jquery exposed method
  $.fn.magnizoom = function ( options ) {

    options = $.extend( {}, $.fn.magnizoom.options, options );

    // create a new fadeshow for each element
    return this.each(function () {
      var elem = $(this);
      elem.data('magnizoom', new Magnizoom(elem, options));
    });

  };

  // global default options
  $.fn.magnizoom.options = {
    diameter: 150
  };

  // plugin constructor
  var Magnizoom = function (elem, options) {

    this.elem    = elem;
    this.options = options;
    this.radius  = this.options.diameter / 2;

    // insert the container into the page or grab the existing one
    this.container = $('.magnizoom').length > 0 ? $('.magnizoom') : $('<div class="magnizoom" />').appendTo('body').hide();

    // setup magnifier
    this.elem.on('load', $.proxy(this.setup, this));
    $(window).on('resize', $.proxy(this.setup, this));

    // check if the image is already loaded (i.e. cached)
    if ( this.elem.get(0).complete || this.elem.get(0).readyState === 4 ) {
      this.setup.apply(this);
    }

    // show / hide magnifier
    this.elem.on('mouseenter touchstart', $.proxy(this.load, this));

  };

  // setup images (get image dimensions and offset position)
  Magnizoom.prototype.setup = function () {

    var that = this;

    // remember src image dimensions & position
    this.src = {
      height: this.elem.height(),
      width: this.elem.width(),
      left: that.elem.offset().left,
      top: that.elem.offset().top
    };

    // preload & get dimensions of the bigger magnification image
    $('<img />').attr('src', this.elem.attr('rel')).on('load', function () {

      // remember we're ready now
      that.is_ready = true;

      that.rel = {
        height: this.height,
        width: this.width
      };

    });

  };

  // show magnifier
  Magnizoom.prototype.load = function () {

    if (this.is_ready !== true) {
      return;
    }

    var that = this;

    // do a reset
    this.unload();

    // set magnifier styles
    this.container.css({
      background: 'url(' + this.elem.attr('rel') + ') 0 0 no-repeat',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      borderRadius: this.radius,
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
      cursor: 'url(data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw%3D%3D), default', // empty transparent gif
      display: 'block',
      height:  this.options.diameter,
      left: -99999,
      position: 'fixed',
      top: -99999,
      width:  this.options.diameter
    });

    // watch for any mouse movement in the document
    $('body').on('mousemove touchmove', function (e) {

      that.is_mobile = e.originalEvent.targetTouches ? true : false;

      // stop if we got two fingers on the screen
      if (that.is_mobile && e.originalEvent.targetTouches[1]) {
        return;
      }

      // set event origin to finger or mouse
      e = that.is_mobile ? e.originalEvent.targetTouches[0] : e;

      // refresh magnifier position
      that.refreshPosition.apply(that, [e]);

      // unload magnifier if our current mouse position isn't within the src image
      if (e.pageX >= that.src.left + that.src.width ||
          e.pageY >= that.src.top + that.src.height ||
          e.pageX <= that.src.left ||
          e.pageY <= that.src.top) {
        that.unload.apply(that);
      }

      // prevent scrolling on mobile
      return false;

    }).on('touchend', $.proxy(that.unload, that)); // remove magnifier on touchend

  };

  // hides the magnifier and unbinds global events
  Magnizoom.prototype.unload = function () {
    this.container.hide();
    $('body').off('mousemove touchmove');
  };

  // update the magnifier position & magnifier bg position
  Magnizoom.prototype.refreshPosition = function (e) {

    var offset = this.is_mobile ? this.options.diameter : this.radius;
    var bg_x   = (e.pageX - this.src.left) / this.src.width * this.rel.width * -1 + offset + (this.is_mobile ? 30 : 0);
    var bg_y   = (e.pageY - this.src.top) / this.src.height * this.rel.height * -1 + offset + (this.is_mobile ? 30 : 0);

    this.container.css({
      left: e.clientX - offset,
      top: e.clientY - offset,
      backgroundPosition: bg_x + 'px ' + bg_y + 'px'
    });

  };

}( jQuery, window, document ));