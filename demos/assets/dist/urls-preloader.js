"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory() : typeof define === 'function' && define.amd ? define('lazyloader', factory) : factory();
})(void 0, function () {
  'use strict';

  var roundDecimals = function roundDecimals(num) {
    var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
    return parseFloat(num.toFixed(decimals));
  };

  var isInArray = function isInArray(needle, heystack) {
    return heystack.indexOf(needle) > -1;
  };

  var getComputed = function getComputed(element, property) {
    return window.getComputedStyle(element).getPropertyValue(property);
  };

  var supportedExtensions = {
    image: ['jp[e]?g', 'jpe', 'jif', 'jfif', 'jfi', 'gif', 'png', 'tif[f]?', 'bmp', 'dib', 'webp', 'ico', 'cur', 'svg'],
    audio: ['mp3', 'ogg', 'oga', 'spx', 'ogg', 'wav'],
    video: ['mp4', 'ogg', 'ogv', 'webm']
  };
  var supportedTags = {
    image: ['img', 'picture'],
    audio: ['audio'],
    video: ['video'],
    other: ['iframe']
  };

  var allSupportedTags = _toConsumableArray(new Set(Object.values(supportedTags).reduce(function (a, b) {
    return a.concat(b);
  })));

  var Resource = function () {
    function Resource(item) {
      _classCallCheck(this, Resource);

      var isElement = item.element instanceof HTMLElement;
      this.url = item.url;
      this.consistent = isElement && isInArray(item.element.tagName.toLowerCase(), allSupportedTags);
      this.element = isElement ? item.element : null;
      this.tagName = this.consistent ? this.element.tagName.toLowerCase() : null;
      this.type = null;
      this.extension = null;

      if (!this.url) {
        return;
      }

      this.url = item.url;

      for (var format in supportedExtensions) {
        var extensions = supportedExtensions[format].join('|');

        if (new RegExp('(.(' + extensions + ')$)|data:' + format + '/(' + extensions + ');base64,').test(this.url)) {
          var matches = this.url.match(new RegExp('.(' + extensions + ')$', 'g')) || this.url.match(new RegExp('^data:' + format + '/(' + extensions + ')', 'g'));

          if (null !== matches) {
            this.type = format;
            this.extension = matches[0].replace('data:' + format + '/', '').replace('.', '');
            this.tagName = this.tagName ? this.tagName : supportedTags[format][0];
            break;
          }
        }
      }

      if (this.consistent && (this.tagName === 'audio' || this.tagName === 'video' || this.tagName === 'iframe')) {
        this.type = this.tagName;
      } else if (this.tagName) {
        for (var _format in supportedTags) {
          if (isInArray(this.tagName, supportedTags[_format])) {
            this.type = _format;
            break;
          }
        }
      }
    }

    _createClass(Resource, null, [{
      key: "isResource",
      value: function isResource(item) {
        return _typeof(item) === 'object' && 'tagName' in item && 'type' in item && 'url' in item && 'extension' in item && 'element' in item;
      }
    }]);

    return Resource;
  }();

  var LoaderPromise = function (_Promise) {
    _inherits(LoaderPromise, _Promise);

    function LoaderPromise(fn) {
      var _this;

      _classCallCheck(this, LoaderPromise);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(LoaderPromise).call(this, function (resolve, reject) {
        fn(resolve, reject, function (value) {
          try {
            return _this._progress.forEach(function (listener) {
              return listener(value);
            });
          } catch (error) {
            reject(error);
          }
        });
      }));
      _this._progress = [];
      return _this;
    }

    _createClass(LoaderPromise, [{
      key: "progress",
      value: function progress(handler) {
        if (typeof handler === 'function') {
          this._progress.push(handler);
        }

        return this;
      }
    }]);

    return LoaderPromise;
  }(_wrapNativeSuper(Promise));

  var find = function find() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var settings = _objectSpread({}, {
      srcAttributes: {
        src: !!!options.lazy ? 'src' : 'data-src',
        srcset: !!!options.lazy ? 'srcset' : 'data-srcset'
      },
      sizesAttributes: {
        sizes: !!!options.lazy ? 'sizes' : 'data-sizes',
        media: !!!options.lazy ? 'media' : 'data-media'
      },
      backgrounds: false
    }, options);

    var collection = [];
    var tagsSelector = allSupportedTags.join(',');
    var srcAttributesValues = Object.values(settings.srcAttributes);
    var srcAttributesSelector = srcAttributesValues.map(function (x) {
      return '[' + x + ']';
    }).join(',');

    var targets = _toConsumableArray(element.querySelectorAll(tagsSelector)).filter(function (el) {
      return !el.parentElement || el.parentElement.tagName.toLowerCase() !== 'picture';
    });

    if (element.matches(tagsSelector) && (!element.parentElement || element.parentElement.tagName.toLowerCase() !== 'picture')) {
      targets.push(element);
    }

    targets.forEach(function (target) {
      var source = target;

      if (target.querySelectorAll('source').length) {
        source = target.querySelectorAll('source');
        source = _toConsumableArray(source)[0];
      }

      if (source.matches(srcAttributesSelector)) {
        var attribute = '';

        for (var i = 0, j = srcAttributesValues.length; i < j; i++) {
          attribute = source.getAttribute(srcAttributesValues[i]);

          if (attribute) {
            break;
          }
        }

        collection.push(new Resource({
          element: target,
          url: attribute
        }));
      }
    });

    if (true === settings.backgrounds) {
      targets = _toConsumableArray(element.querySelectorAll('*'));
      targets.push(element);
      targets = targets.filter(function (target) {
        return !target.matches(tagsSelector);
      });
      targets = targets.filter(function (target) {
        return getComputed(target, 'background-image') !== 'none';
      });
      targets.forEach(function (target) {
        var url = getComputed(target, 'background-image').match(/\((.*?)\)/);

        if (null !== url && url.length >= 2) {
          collection.push(new Resource({
            element: target,
            url: url[1].replace(/('|")/g, '')
          }));
        }
      });
    }

    return collection;
  };

  var switchAttributes = function switchAttributes(el, attrs) {
    Object.keys(attrs).forEach(function (attr) {
      var dataAttr = attrs[attr];
      dataAttr = dataAttr === 'src' || dataAttr === 'srcset' ? 'data-' + dataAttr : dataAttr;
      var dataAttrVal = el.getAttribute(dataAttr);

      if (dataAttrVal) {
        el.setAttribute(attr, dataAttrVal);
        el.removeAttribute(dataAttr);
      }
    });
  };

  var copyAttributes = function copyAttributes(el, target, attributes) {
    return attributes.forEach(function (attr) {
      var attribute = target.getAttribute(attr);

      if (attribute) {
        el.setAttribute(attr === 'src' || attr === 'srcset' ? 'data-' + attr : attr, attribute);
      }
    });
  };

  var removeAttributes = function removeAttributes(el, attributes) {
    return attributes.forEach(function (attr) {
      return el.removeAttribute(attr);
    });
  };

  var roundPercentage = function roundPercentage(percentage) {
    if (percentage > 100) {
      percentage = 100;
    } else if (percentage < 0) {
      percentage = 0;
    } else {
      percentage = roundDecimals(percentage, 4);
    }

    return percentage;
  };

  var isIntersectionObserverSupported = 'IntersectionObserver' in window;

  var Viewport = function () {
    function Viewport() {
      _classCallCheck(this, Viewport);

      this._window = window;
      this._html = document.documentElement;
      this._body = document.body;
      this._frame1 = this._window;
      this._frame2 = this._html || this._body;
      this._prefix1 = 'inner';
      this._prefix2 = 'offset';

      if (!this._prefix1 + 'Width' in this._frame1) {
        this._prefix1 = 'client';
        this._frame1 = this._frame2;
      }

      this._offsetWidth = 0;
      this._offsetHeight = 0;
      this._width = 0;
      this._height = 0;
      this._scrollTop = 0;
      this._scrollLeft = 0;
      this._lock = false;
      this.calcAll();
    }

    _createClass(Viewport, [{
      key: "calcOffsetWidth",
      value: function calcOffsetWidth() {
        this._offsetWidth = this._body[this._prefix2 + 'Width'];
        return this.offsetWidth;
      }
    }, {
      key: "calcOffsetHeight",
      value: function calcOffsetHeight() {
        this._offsetHeight = this._body[this._prefix2 + 'Height'];
        return this.offsetHeight;
      }
    }, {
      key: "calcWidth",
      value: function calcWidth() {
        this._width = this._frame1[this._prefix1 + 'Width'];
        return this.width;
      }
    }, {
      key: "calcHeight",
      value: function calcHeight() {
        this._height = this._frame1[this._prefix1 + 'Height'];
        return this.height;
      }
    }, {
      key: "calcScrollTop",
      value: function calcScrollTop() {
        this._scrollTop = this._frame2.scrollTop || 0;
        return this.scrollTop;
      }
    }, {
      key: "calcScrollLeft",
      value: function calcScrollLeft() {
        this._scrollLeft = this._frame2.scrollLeft || 0;
        return this.scrollLeft;
      }
    }, {
      key: "calcAll",
      value: function calcAll() {
        this.calcOffsetWidth();
        this.calcOffsetHeight();
        this.calcWidth();
        this.calcHeight();
        this.calcScrollTop();
        this.calcScrollLeft();
        return this.all;
      }
    }, {
      key: "offsetWidth",
      get: function get() {
        return this._offsetWidth;
      }
    }, {
      key: "offsetHeight",
      get: function get() {
        return this._offsetHeight;
      }
    }, {
      key: "width",
      get: function get() {
        return this._width;
      }
    }, {
      key: "height",
      get: function get() {
        return this._height;
      }
    }, {
      key: "scrollTop",
      get: function get() {
        return this._scrollTop;
      }
    }, {
      key: "scrollLeft",
      get: function get() {
        return this._scrollLeft;
      }
    }, {
      key: "all",
      get: function get() {
        return {
          offsetWidth: this.offsetWidth,
          offsetHeight: this.offsetHeight,
          width: this.width,
          height: this.height,
          scrollTop: this.scrollTop,
          scrollLeft: this.scrollLeft
        };
      }
    }, {
      key: "lock",
      get: function get() {
        return this._lock;
      },
      set: function set(bool) {
        this._lock = bool;

        if (this._lock) {
          this._body.style.top = -this.calcScrollTop() + 'px';
          this._body.style.left = -this.calcScrollLeft() + 'px';
          var scrollBarWidth = this.calcOffsetWidth();
          var scrollBarHeight = this.calcOffsetHeight();
          this._html.style.top = '0px';
          this._html.style.left = '0px';
          this._html.style.position = 'fixed';
          this._body.style.position = 'fixed';
          this._html.style.width = '100%';
          this._body.style.width = '100%';
          var offsetWidth = this.calcOffsetWidth();
          var offsetHeight = this.calcOffsetHeight();
          scrollBarWidth = offsetWidth - scrollBarWidth;
          scrollBarHeight = offsetHeight - scrollBarHeight;
          this._body.style.width = offsetWidth - scrollBarWidth + 'px';
          this._body.style.height = offsetHeight - scrollBarHeight + 'px';
        } else {
          var scrollTop = Math.abs(parseFloat(this._body.style.top));
          var scrollLeft = Math.abs(parseFloat(this._body.style.left));
          this._html.style.position = '';
          this._html.style.top = '';
          this._html.style.left = '';
          this._html.style.width = '';
          this._body.style.position = '';
          this._body.style.top = '';
          this._body.style.left = '';
          this._body.style.width = '';

          this._window.scroll({
            top: scrollTop,
            left: scrollLeft,
            behavior: 'instant'
          });
        }
      }
    }]);

    return Viewport;
  }();

  var isElementInViewport = function isElementInViewport(element) {
    return !!getBoundsViewportIntersection(element.getBoundingClientRect()).ratio;
  };

  var getBoundsViewportIntersection = function getBoundsViewportIntersection(bounds) {
    var viewport = new Viewport();

    if (bounds.right < 0 || bounds.bottom < 0 || bounds.left > viewport.width || bounds.top > viewport.height) {
      return {
        x: 0,
        y: 0,
        ratio: 0
      };
    }

    var offTop = bounds.top < 0;
    var offBottom = bounds.top + bounds.height > viewport.height;
    var offLeft = bounds.left < 0;
    var offRight = bounds.left + bounds.width > viewport.width;

    if (!offTop && !offBottom && !offLeft && !offRight) {
      return {
        x: 100,
        y: 100,
        ratio: 100
      };
    }

    var offY = 0;
    var offX = 0;

    if (offTop) {
      offY = Math.abs(bounds.top);
    }

    if (offBottom) {
      offY = bounds.top + bounds.height - viewport.height;
    }

    if (offLeft) {
      offX = Math.abs(bounds.left);
    }

    if (offRight) {
      offX = bounds.left + bounds.width - viewport.width;
    }

    var percentageX = roundPercentage((bounds.width - offX) * 100 / (bounds.width || 1));
    var percentageY = roundPercentage((bounds.height - offY) * 100 / (bounds.height || 1));
    return {
      x: percentageX,
      y: percentageY,
      ratio: Math.min(percentageX, percentageY)
    };
  };

  var Loader = function () {
    function Loader() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Loader);

      this._options = _objectSpread({}, {
        srcAttributes: {
          src: !!!options.lazy ? 'src' : 'data-src',
          srcset: !!!options.lazy ? 'srcset' : 'data-srcset'
        },
        sizesAttributes: {
          sizes: !!!options.lazy ? 'sizes' : 'data-sizes',
          media: !!!options.lazy ? 'media' : 'data-media'
        },
        lazy: false,
        playthrough: false,
        backgrounds: true,
        sequential: false
      }, options);
      this._collection = [];
      this._queue = new Map();
      this._load = null;
      this._percentage = 0;
      this._state = 0;

      if (!isIntersectionObserverSupported) {
        this.manuallyObservedElements = [];

        var manuallyObserve = function manuallyObserve() {
          return _this2.manuallyObservedElements.filter(function (item) {
            return !item.intersected;
          }).forEach(function (item) {
            if (!item.intersected && isElementInViewport(item.element)) {
              item.intersected = true;
              item.element.dispatchEvent(new CustomEvent('intersected'));
            }
          });
        };

        window.addEventListener('scroll', manuallyObserve);
        window.addEventListener('resize', manuallyObserve);
        window.addEventListener('load', manuallyObserve);
      }
    }

    _createClass(Loader, [{
      key: "abort",
      value: function abort() {
        if (this._state === 0) {
          return;
        }

        this._state = 0;

        this._queue.forEach(function (data, element) {
          return element.dispatchEvent(new CustomEvent('Aborted'));
        });
      }
    }, {
      key: "load",
      value: function load() {
        var _this3 = this;

        this._load = new LoaderPromise(function (resolve, reject, progress) {
          if (_this3._state === 1) {
            reject('A Loader instance is already in progress.');
          }

          if (!_this3._collection.length) {
            reject('Collection is empty.');
          }

          _this3._state = 1;

          if (_this3._options.sequential) {
            var loaded = 0;

            var pipeline = function pipeline() {
              if (_this3._state === 0) {
                reject('Aborted');
                return;
              }

              var loadStep = function loadStep(resource, cb) {
                loaded++;
                _this3._percentage = loaded / _this3._collection.length * 100;
                progress(resource);

                if (loaded < _this3._collection.length) {
                  pipeline();
                  return;
                }

                _this3._state = 0;
                cb();
              };

              var load = _this3.fetch(_this3._collection[loaded]);

              load.then(function (e) {
                return loadStep(e, function () {
                  return resolve({});
                });
              });
              load.catch(function (e) {
                return loadStep(e, function () {
                  return reject('Error');
                });
              });
            };

            pipeline();
          } else {
            (function () {
              var loaded = 0;

              var loadStep = function loadStep(e, cb) {
                loaded++;
                _this3._percentage = loaded / _this3._collection.length * 100;
                progress(e);

                if (loaded >= _this3._collection.length) {
                  _this3._state = 0;
                  cb();
                }
              };

              for (var i = 0; i < _this3._collection.length; i++) {
                if (_this3._state === 0) {
                  reject('Aborted');
                  break;
                }

                var load = _this3.fetch(_this3._collection[i]);

                load.then(function (e) {
                  return loadStep(e, function () {
                    return resolve({});
                  });
                });
                load.catch(function (e) {
                  return loadStep(e, function () {
                    return reject(e);
                  });
                });
              }
            })();
          }
        });
        return this._load;
      }
    }, {
      key: "fetch",
      value: function fetch(resource) {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          var isConsistent = resource.consistent && document.body.contains(resource.element);
          var hasSources = isConsistent && resource.element.querySelectorAll('source').length;
          var createdElement = document.createElement(resource.tagName);
          var mainEventsTarget = createdElement;

          if (resource.type === 'iframe') {
            createdElement.style.visibility = 'hidden';
            createdElement.style.position = 'fixed';
            createdElement.style.top = '-999px';
            createdElement.style.left = '-999px';
            createdElement.style.width = '1px';
            createdElement.style.height = '1px';
            document.body.appendChild(createdElement);
          }

          if (isConsistent) {
            copyAttributes(createdElement, resource.element, Object.values(_this4._options.srcAttributes));
            copyAttributes(createdElement, resource.element, Object.values(_this4._options.sizesAttributes));

            if (hasSources) {
              _toConsumableArray(resource.element.querySelectorAll('source')).forEach(function (source) {
                var createdSource = document.createElement('source');
                copyAttributes(createdSource, source, Object.values(_this4._options.srcAttributes));
                copyAttributes(createdSource, source, Object.values(_this4._options.sizesAttributes));
                createdElement.append(createdSource);
              });
            }

            if (resource.tagName === 'picture') {
              mainEventsTarget = document.createElement('img');
              createdElement.append(mainEventsTarget);
            }
          }

          var finishPromise = function finishPromise(cb) {
            if (isConsistent) {
              switchAttributes(resource.element, _this4._options.srcAttributes);
              switchAttributes(resource.element, _this4._options.sizesAttributes);

              if (hasSources) {
                _toConsumableArray(resource.element.querySelectorAll('source')).forEach(function (source) {
                  switchAttributes(source, _this4._options.srcAttributes);
                  switchAttributes(source, _this4._options.sizesAttributes);
                });
              }

              if (resource.type === 'video' || resource.type === 'audio') {
                resource.element.load();
              }

              if (resource.type === 'iframe') {
                createdElement.parentElement.removeChild(createdElement);
              }
            }

            _this4._queue.delete(createdElement);

            cb(resource);
          };

          var prepareLoad = function prepareLoad() {
            if (isConsistent) {
              switchAttributes(createdElement, _this4._options.srcAttributes);
              switchAttributes(createdElement, _this4._options.sizesAttributes);

              if (hasSources) {
                _toConsumableArray(createdElement.querySelectorAll('source')).forEach(function (source) {
                  switchAttributes(source, _this4._options.srcAttributes);
                  switchAttributes(source, _this4._options.sizesAttributes);
                });
              }
            } else {
              createdElement.setAttribute('src', resource.url);
            }

            if (resource.type === 'video' || resource.type === 'audio') {
              createdElement.load();
            }
          };

          var dispatchEvent = function dispatchEvent(type) {
            var event = new CustomEvent(type, {
              detail: resource
            });

            if (resource.element) {
              resource.element.dispatchEvent(event);
            }

            document.dispatchEvent(event);
          };

          var queuer = {
            resource: resource,
            observer: null,
            element: createdElement
          };
          createdElement.addEventListener('abort', function () {
            removeAttributes(createdElement, Object.keys(_this4._options.srcAttributes));
            removeAttributes(createdElement, Object.values(_this4._options.srcAttributes));
            removeAttributes(createdElement, Object.keys(_this4._options.sizesAttributes));
            removeAttributes(createdElement, Object.values(_this4._options.sizesAttributes));

            if (hasSources) {
              _toConsumableArray(createdElement.querySelectorAll('source')).forEach(function (source) {
                removeAttributes(source, Object.keys(_this4._options.srcAttributes));
                removeAttributes(source, Object.values(_this4._options.srcAttributes));
                removeAttributes(source, Object.keys(_this4._options.sizesAttributes));
                removeAttributes(source, Object.values(_this4._options.sizesAttributes));
              });
            }

            finishPromise(reject);
          });
          mainEventsTarget.addEventListener('error', function () {
            finishPromise(reject);
            dispatchEvent('resourceError');
          });

          if (resource.type === 'image' || resource.type === 'iframe') {
            mainEventsTarget.addEventListener('load', function (e) {
              if (e.target.tagName.toLowerCase() === 'iframe' && !e.target.getAttribute('src')) {
                return;
              }

              finishPromise(resolve);
              dispatchEvent('resourceLoad');
            });
          }

          if (resource.type === 'audio' || resource.type === 'video') {
            mainEventsTarget.addEventListener(_this4._options.playthrough ? 'canplaythrough' : 'loadedmetadata', function () {
              finishPromise(resolve);
              dispatchEvent('resourceLoad');
            });
          }

          if (resource.element instanceof HTMLElement && _this4._options.lazy) {
            if (isIntersectionObserverSupported) {
              queuer.observer = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                  if (entry.intersectionRatio > 0) {
                    observer.unobserve(entry.target);
                    prepareLoad();
                  }
                });
              }, {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
              });
              queuer.observer.observe(resource.element);
            } else {
              if (isElementInViewport(resource.element)) {
                prepareLoad();
              } else {
                _this4.manuallyObservedElements.push({
                  element: resource.element,
                  intersected: false
                });

                resource.element.addEventListener('intersected', function () {
                  return prepareLoad();
                });
              }
            }

            _this4._queue.set(resource.element, queuer);
          } else {
            _this4._queue.set(createdElement, queuer);

            prepareLoad();
          }
        });
      }
    }, {
      key: "percentage",
      get: function get() {
        return this._percentage;
      }
    }, {
      key: "collection",
      set: function set(collection) {
        var _this5 = this;

        if (this._state === 0) {
          if (collection instanceof NodeList) {
            collection = _toConsumableArray(collection);
          }

          if (collection instanceof HTMLElement) {
            collection = find(collection, this._options);
          }

          if (typeof collection === 'string') {
            collection = [new Resource({
              url: collection
            })];
          }

          if (Resource.isResource(collection)) {
            collection = [collection];
          }

          if (Array.isArray(collection)) {
            collection.forEach(function (item) {
              var pushCheck = function pushCheck(resource) {
                if (resource.type === 'image' || resource.type === 'video' || resource.type === 'audio' || resource.type === 'iframe' && resource.consistent) {
                  _this5._collection.push(resource);

                  return;
                }

                console.warn("Couldn't add resource to collection", resource);
              };

              if (item instanceof HTMLElement) {
                find(item, _this5._options).forEach(function (resource) {
                  return pushCheck(new Resource(resource));
                });
              }

              if (typeof item === 'string') {
                pushCheck(new Resource({
                  url: item
                }));
              }

              if (Resource.isResource(item)) {
                pushCheck(item);
              }
            });
          }
        }
      },
      get: function get() {
        return this._collection;
      }
    }]);

    return Loader;
  }();

  var logEl = document.querySelector('#console');

  var log = function log(string) {
    if (!logEl.hasChildNodes()) {
      var ol = document.createElement('ol');
      logEl.append(ol);
    }

    var list = logEl.querySelector('ol');
    var li = document.createElement('li');
    li.innerHTML = string;
    list.append(li);
    logEl.scrollTop = list.offsetHeight;
  };

  var testLoader = new Loader({
    sequential: true
  });
  document.querySelector('button.load').addEventListener('click', function (e) {
    testLoader.collection = function () {
      var imgs = [];

      for (var i = 0; i < 10; i++) {
        var letters = '0123456789ABCDEF',
            colors = [];

        for (var ii = 0; ii < 2; ii++) {
          var color = '';

          for (var c = 0; c < 6; c++) {
            color += letters[Math.floor(Math.random() * 16)];
          }

          colors[ii] = color;
        }

        imgs.push('//placehold.it/720x720/' + colors[0] + '/' + colors[1] + '.jpg');
      }

      return imgs;
    }();

    var testLoad = testLoader.load();
    testLoad.then(function (e) {
      return log('All done, test array has completely loaded!', e);
    });
    testLoad.progress(function (e) {
      return log('Total programmatic load percentage: ' + testLoader.percentage + '% ' + e.url);
    });
    testLoad.catch(function (e) {
      return console.log('error', e);
    });
  });
  document.querySelector('button.abort').addEventListener('click', function (e) {
    return testLoader.abort();
  });
});
//# sourceMappingURL=urls-preloader.js.map