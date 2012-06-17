/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#magnizoom', {
    setup: function() {
      // setup dom element accessors
      this.elems = $('#qunit-fixture').find('img');
      // init plugin
      this.elems.magnizoom();
    }
  });

  test('initialization on images', 1, function () {
    var instance = this.elems.first();
    ok(instance, 'loads onto element');
  });

  test('magnizoom container', 2, function () {
    var container = $('.magnizoom');

    equal(container.length, 1, 'creates not more than one global magnizoom container for all images');
    ok(container.is(':hidden'), 'hides container by default');
  });

  asyncTest('show/hide magnifier', 2, function () {
    var that = this;
    setTimeout(function () {

      var container = $('.magnizoom');

      that.elems.first().trigger('mouseenter');
      notEqual(container.css('backgroundImage'), 'none', 'loads rel linked image');
      ok(container.is(':visible'), 'shows container on mouseenter');

      start();

    }, 100);
  });

}(jQuery));
