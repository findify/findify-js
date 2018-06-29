/**
 * This is a common-js compiled version of react-spring
 * This is needed here because Object.assign(Function, Object) breaks IE11 and now it is not yet fixed in mainline react-spring,
 * but this is critical to our customers
 */

const assignToFn = function(target, source) {
  var to = Object(target);
  var keysArray = Object.keys(Object(source));
  for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
    var nextKey = keysArray[nextIndex];
    var desc = Object.getOwnPropertyDescriptor(source, nextKey);
    if (desc !== undefined && desc.enumerable) {
      to[nextKey] = source[nextKey];
    }
  }
  return to;
}


'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _extends = _interopDefault(require('@babel/runtime/helpers/builtin/extends'));
var _inheritsLoose = _interopDefault(require('@babel/runtime/helpers/builtin/inheritsLoose'));
var React = _interopDefault(require('react'));
var ReactDOM = _interopDefault(require('react-dom'));
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/builtin/objectWithoutProperties'));
var _assertThisInitialized = _interopDefault(require('@babel/runtime/helpers/builtin/assertThisInitialized'));

var bugfixes = undefined;
var applyAnimatedValues = undefined;
var colorNames = [];
var requestFrame = function requestFrame(cb) {
  return global.requestAnimationFrame(cb);
};
var cancelFrame = function cancelFrame(cb) {
  return global.cancelAnimationFrame(cb);
};
var interpolation = undefined;
var injectApplyAnimatedValues = function injectApplyAnimatedValues(fn, transform) {
  return applyAnimatedValues = {
    fn: fn,
    transform: transform
  };
};
var injectColorNames = function injectColorNames(names) {
  return colorNames = names;
};
var injectBugfixes = function injectBugfixes(fn) {
  return bugfixes = fn;
};
var injectInterpolation = function injectInterpolation(cls) {
  return interpolation = cls;
};
var injectFrame = function injectFrame(raf, caf) {
  var _ref;

  return _ref = [raf, caf], requestFrame = _ref[0], cancelFrame = _ref[1], _ref;
};

var Globals = /*#__PURE__*/Object.freeze({
  get bugfixes () { return bugfixes; },
  get applyAnimatedValues () { return applyAnimatedValues; },
  get colorNames () { return colorNames; },
  get requestFrame () { return requestFrame; },
  get cancelFrame () { return cancelFrame; },
  get interpolation () { return interpolation; },
  injectApplyAnimatedValues: injectApplyAnimatedValues,
  injectColorNames: injectColorNames,
  injectBugfixes: injectBugfixes,
  injectInterpolation: injectInterpolation,
  injectFrame: injectFrame
});

var colors = {
  transparent: 0x00000000,
  // http://www.w3.org/TR/css3-color/#svg-color
  aliceblue: 0xf0f8ffff,
  antiquewhite: 0xfaebd7ff,
  aqua: 0x00ffffff,
  aquamarine: 0x7fffd4ff,
  azure: 0xf0ffffff,
  beige: 0xf5f5dcff,
  bisque: 0xffe4c4ff,
  black: 0x000000ff,
  blanchedalmond: 0xffebcdff,
  blue: 0x0000ffff,
  blueviolet: 0x8a2be2ff,
  brown: 0xa52a2aff,
  burlywood: 0xdeb887ff,
  burntsienna: 0xea7e5dff,
  cadetblue: 0x5f9ea0ff,
  chartreuse: 0x7fff00ff,
  chocolate: 0xd2691eff,
  coral: 0xff7f50ff,
  cornflowerblue: 0x6495edff,
  cornsilk: 0xfff8dcff,
  crimson: 0xdc143cff,
  cyan: 0x00ffffff,
  darkblue: 0x00008bff,
  darkcyan: 0x008b8bff,
  darkgoldenrod: 0xb8860bff,
  darkgray: 0xa9a9a9ff,
  darkgreen: 0x006400ff,
  darkgrey: 0xa9a9a9ff,
  darkkhaki: 0xbdb76bff,
  darkmagenta: 0x8b008bff,
  darkolivegreen: 0x556b2fff,
  darkorange: 0xff8c00ff,
  darkorchid: 0x9932ccff,
  darkred: 0x8b0000ff,
  darksalmon: 0xe9967aff,
  darkseagreen: 0x8fbc8fff,
  darkslateblue: 0x483d8bff,
  darkslategray: 0x2f4f4fff,
  darkslategrey: 0x2f4f4fff,
  darkturquoise: 0x00ced1ff,
  darkviolet: 0x9400d3ff,
  deeppink: 0xff1493ff,
  deepskyblue: 0x00bfffff,
  dimgray: 0x696969ff,
  dimgrey: 0x696969ff,
  dodgerblue: 0x1e90ffff,
  firebrick: 0xb22222ff,
  floralwhite: 0xfffaf0ff,
  forestgreen: 0x228b22ff,
  fuchsia: 0xff00ffff,
  gainsboro: 0xdcdcdcff,
  ghostwhite: 0xf8f8ffff,
  gold: 0xffd700ff,
  goldenrod: 0xdaa520ff,
  gray: 0x808080ff,
  green: 0x008000ff,
  greenyellow: 0xadff2fff,
  grey: 0x808080ff,
  honeydew: 0xf0fff0ff,
  hotpink: 0xff69b4ff,
  indianred: 0xcd5c5cff,
  indigo: 0x4b0082ff,
  ivory: 0xfffff0ff,
  khaki: 0xf0e68cff,
  lavender: 0xe6e6faff,
  lavenderblush: 0xfff0f5ff,
  lawngreen: 0x7cfc00ff,
  lemonchiffon: 0xfffacdff,
  lightblue: 0xadd8e6ff,
  lightcoral: 0xf08080ff,
  lightcyan: 0xe0ffffff,
  lightgoldenrodyellow: 0xfafad2ff,
  lightgray: 0xd3d3d3ff,
  lightgreen: 0x90ee90ff,
  lightgrey: 0xd3d3d3ff,
  lightpink: 0xffb6c1ff,
  lightsalmon: 0xffa07aff,
  lightseagreen: 0x20b2aaff,
  lightskyblue: 0x87cefaff,
  lightslategray: 0x778899ff,
  lightslategrey: 0x778899ff,
  lightsteelblue: 0xb0c4deff,
  lightyellow: 0xffffe0ff,
  lime: 0x00ff00ff,
  limegreen: 0x32cd32ff,
  linen: 0xfaf0e6ff,
  magenta: 0xff00ffff,
  maroon: 0x800000ff,
  mediumaquamarine: 0x66cdaaff,
  mediumblue: 0x0000cdff,
  mediumorchid: 0xba55d3ff,
  mediumpurple: 0x9370dbff,
  mediumseagreen: 0x3cb371ff,
  mediumslateblue: 0x7b68eeff,
  mediumspringgreen: 0x00fa9aff,
  mediumturquoise: 0x48d1ccff,
  mediumvioletred: 0xc71585ff,
  midnightblue: 0x191970ff,
  mintcream: 0xf5fffaff,
  mistyrose: 0xffe4e1ff,
  moccasin: 0xffe4b5ff,
  navajowhite: 0xffdeadff,
  navy: 0x000080ff,
  oldlace: 0xfdf5e6ff,
  olive: 0x808000ff,
  olivedrab: 0x6b8e23ff,
  orange: 0xffa500ff,
  orangered: 0xff4500ff,
  orchid: 0xda70d6ff,
  palegoldenrod: 0xeee8aaff,
  palegreen: 0x98fb98ff,
  paleturquoise: 0xafeeeeff,
  palevioletred: 0xdb7093ff,
  papayawhip: 0xffefd5ff,
  peachpuff: 0xffdab9ff,
  peru: 0xcd853fff,
  pink: 0xffc0cbff,
  plum: 0xdda0ddff,
  powderblue: 0xb0e0e6ff,
  purple: 0x800080ff,
  rebeccapurple: 0x663399ff,
  red: 0xff0000ff,
  rosybrown: 0xbc8f8fff,
  royalblue: 0x4169e1ff,
  saddlebrown: 0x8b4513ff,
  salmon: 0xfa8072ff,
  sandybrown: 0xf4a460ff,
  seagreen: 0x2e8b57ff,
  seashell: 0xfff5eeff,
  sienna: 0xa0522dff,
  silver: 0xc0c0c0ff,
  skyblue: 0x87ceebff,
  slateblue: 0x6a5acdff,
  slategray: 0x708090ff,
  slategrey: 0x708090ff,
  snow: 0xfffafaff,
  springgreen: 0x00ff7fff,
  steelblue: 0x4682b4ff,
  tan: 0xd2b48cff,
  teal: 0x008080ff,
  thistle: 0xd8bfd8ff,
  tomato: 0xff6347ff,
  turquoise: 0x40e0d0ff,
  violet: 0xee82eeff,
  wheat: 0xf5deb3ff,
  white: 0xffffffff,
  whitesmoke: 0xf5f5f5ff,
  yellow: 0xffff00ff,
  yellowgreen: 0x9acd32ff
};

var linear = function linear(t) {
  return t;
};

var Interpolation =
/*#__PURE__*/
function () {
  function Interpolation() {}

  Interpolation.create = function create(config) {
    if (typeof config === 'function') return function () {
      return config.apply(void 0, arguments);
    };
    if (interpolation && config.output && typeof config.output[0] === 'string') return interpolation(config);
    var outputRange = config.output;
    var inputRange = config.range;
    var easing = config.easing || linear;
    var extrapolateLeft = 'extend';
    var map = config.map;

    if (config.extrapolateLeft !== undefined) {
      extrapolateLeft = config.extrapolateLeft;
    } else if (config.extrapolate !== undefined) {
      extrapolateLeft = config.extrapolate;
    }

    var extrapolateRight = 'extend';

    if (config.extrapolateRight !== undefined) {
      extrapolateRight = config.extrapolateRight;
    } else if (config.extrapolate !== undefined) {
      extrapolateRight = config.extrapolate;
    }

    return function (input) {
      var range = findRange(input, inputRange);
      return interpolate(input, inputRange[range], inputRange[range + 1], outputRange[range], outputRange[range + 1], easing, extrapolateLeft, extrapolateRight, map);
    };
  };

  return Interpolation;
}();

function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
  var result = map ? map(input) : input; // Extrapolate

  if (result < inputMin) {
    if (extrapolateLeft === 'identity') {
      return result;
    } else if (extrapolateLeft === 'clamp') {
      result = inputMin;
    }
  }

  if (result > inputMax) {
    if (extrapolateRight === 'identity') {
      return result;
    } else if (extrapolateRight === 'clamp') {
      result = inputMax;
    }
  }

  if (outputMin === outputMax) return outputMin;

  if (inputMin === inputMax) {
    if (input <= inputMin) return outputMin;
    return outputMax;
  } // Input Range


  if (inputMin === -Infinity) {
    result = -result;
  } else if (inputMax === Infinity) {
    result = result - inputMin;
  } else {
    result = (result - inputMin) / (inputMax - inputMin);
  } // Easing


  result = easing(result); // Output Range

  if (outputMin === -Infinity) {
    result = -result;
  } else if (outputMax === Infinity) {
    result = result + outputMin;
  } else {
    result = result * (outputMax - outputMin) + outputMin;
  }

  return result;
}

function findRange(input, inputRange) {
  for (var i = 1; i < inputRange.length - 1; ++i) {
    if (inputRange[i] >= input) break;
  }

  return i - 1;
}

/*
https://github.com/react-community/normalize-css-color

BSD 3-Clause License

Copyright (c) 2016, React Community
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function normalizeColor(color) {
  var match;

  if (typeof color === 'number') {
    return color >>> 0 === color && color >= 0 && color <= 0xffffffff ? color : null;
  } // Ordered based on occurrences on Facebook codebase


  if (match = matchers.hex6.exec(color)) return parseInt(match[1] + 'ff', 16) >>> 0;
  if (colors.hasOwnProperty(color)) return colors[color];

  if (match = matchers.rgb.exec(color)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    0x000000ff) >>> // a
    0;
  }

  if (match = matchers.rgba.exec(color)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    parse1(match[4])) >>> // a
    0;
  }

  if (match = matchers.hex3.exec(color)) {
    return parseInt(match[1] + match[1] + // r
    match[2] + match[2] + // g
    match[3] + match[3] + // b
    'ff', // a
    16) >>> 0;
  } // https://drafts.csswg.org/css-color-4/#hex-notation


  if (match = matchers.hex8.exec(color)) return parseInt(match[1], 16) >>> 0;

  if (match = matchers.hex4.exec(color)) {
    return parseInt(match[1] + match[1] + // r
    match[2] + match[2] + // g
    match[3] + match[3] + // b
    match[4] + match[4], // a
    16) >>> 0;
  }

  if (match = matchers.hsl.exec(color)) {
    return (hslToRgb(parse360(match[1]), // h
    parsePercentage(match[2]), // s
    parsePercentage(match[3]) // l
    ) | 0x000000ff) >>> // a
    0;
  }

  if (match = matchers.hsla.exec(color)) {
    return (hslToRgb(parse360(match[1]), // h
    parsePercentage(match[2]), // s
    parsePercentage(match[3]) // l
    ) | parse1(match[4])) >>> // a
    0;
  }

  return null;
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h, s, l) {
  var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  var p = 2 * l - q;
  var r = hue2rgb(p, q, h + 1 / 3);
  var g = hue2rgb(p, q, h);
  var b = hue2rgb(p, q, h - 1 / 3);
  return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
} // var INTEGER = '[-+]?\\d+';


var NUMBER = '[-+]?\\d*\\.?\\d+';
var PERCENTAGE = NUMBER + '%';

function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike, 0);
}

function call() {
  return '\\(\\s*(' + toArray(arguments).join(')\\s*,\\s*(') + ')\\s*\\)';
}

var matchers = {
  rgb: new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER)),
  rgba: new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER)),
  hsl: new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE)),
  hsla: new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER)),
  hex3: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex4: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#([0-9a-fA-F]{6})$/,
  hex8: /^#([0-9a-fA-F]{8})$/
};

function parse255(str) {
  var int = parseInt(str, 10);
  if (int < 0) return 0;
  if (int > 255) return 255;
  return int;
}

function parse360(str) {
  var int = parseFloat(str);
  return (int % 360 + 360) % 360 / 360;
}

function parse1(str) {
  var num = parseFloat(str);
  if (num < 0) return 0;
  if (num > 1) return 255;
  return Math.round(num * 255);
}

function parsePercentage(str) {
  // parseFloat conveniently ignores the final %
  var int = parseFloat(str, 10);
  if (int < 0) return 0;
  if (int > 100) return 1;
  return int / 100;
}

function colorToRgba(input) {
  var int32Color = normalizeColor(input);
  if (int32Color === null) return input;
  int32Color = int32Color || 0;
  var r = (int32Color & 0xff000000) >>> 24;
  var g = (int32Color & 0x00ff0000) >>> 16;
  var b = (int32Color & 0x0000ff00) >>> 8;
  var a = (int32Color & 0x000000ff) / 255;
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
} // Problem: https://github.com/animatedjs/animated/pull/102
// Solution: https://stackoverflow.com/questions/638565/parsing-scientific-notation-sensibly/658662


var stringShapeRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
/**
 * Supports string shapes by extracting numbers so new values can be computed,
 * and recombines those values into new strings of the same shape.  Supports
 * things like:
 *
 *   rgba(123, 42, 99, 0.36)           // colors
 *   -45deg                            // values with units
 */

function createInterpolation(config) {
  var outputRange = config.output.map(colorToRgba); // ->
  // [
  //   [0, 50],
  //   [100, 150],
  //   [200, 250],
  //   [0, 0.5],
  // ]

  var outputRanges = outputRange[0].match(stringShapeRegex).map(function () {
    return [];
  });
  outputRange.forEach(function (value) {
    value.match(stringShapeRegex).forEach(function (number, i) {
      return outputRanges[i].push(+number);
    });
  });
  var interpolations = outputRange[0].match(stringShapeRegex).map(function (value, i) {
    return Interpolation.create(_extends({}, config, {
      output: outputRanges[i]
    }));
  });
  var shouldRound = /^rgb/.test(outputRange[0]);
  return function (input) {
    var i = 0;
    return outputRange[0].replace(stringShapeRegex, function () {
      var val = interpolations[i++](input);
      return String(shouldRound && i < 4 ? Math.round(val) : val);
    });
  };
}

var Animated =
/*#__PURE__*/
function () {
  function Animated() {}

  var _proto = Animated.prototype;

  _proto.__attach = function __attach() {};

  _proto.__detach = function __detach() {};

  _proto.__getValue = function __getValue() {};

  _proto.__getAnimatedValue = function __getAnimatedValue() {
    return this.__getValue();
  };

  _proto.__addChild = function __addChild(child) {};

  _proto.__removeChild = function __removeChild(child) {};

  _proto.__getChildren = function __getChildren() {
    return [];
  };

  return Animated;
}();

var AnimatedTracking =
/*#__PURE__*/
function (_Animated) {
  _inheritsLoose(AnimatedTracking, _Animated);

  function AnimatedTracking(value, parent, animationClass, animationConfig, callback) {
    var _this;

    _this = _Animated.call(this) || this;
    _this.update = throttle(function () {
      _this._value.animate(new _this._animationClass(_extends({}, _this._animationConfig, {
        to: _this._animationConfig.to.__getValue()
      })), _this._callback);
    }, 1000 / 30);
    _this._value = value;
    _this._parent = parent;
    _this._animationClass = animationClass;
    _this._animationConfig = animationConfig;
    _this._callback = callback;

    _this.__attach();

    return _this;
  }

  var _proto = AnimatedTracking.prototype;

  _proto.__getValue = function __getValue() {
    return this._parent.__getValue();
  };

  _proto.__attach = function __attach() {
    this._parent.__addChild(this);
  };

  _proto.__detach = function __detach() {
    this._parent.__removeChild(this);
  };

  return AnimatedTracking;
}(Animated);

function throttle(callback, limit) {
  var wait = false;
  return function () {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(function () {
        return wait = false;
      }, limit);
    }
  };
}

var AnimatedWithChildren =
/*#__PURE__*/
function (_Animated) {
  _inheritsLoose(AnimatedWithChildren, _Animated);

  function AnimatedWithChildren() {
    var _this;

    _this = _Animated.call(this) || this;
    _this._children = [];
    return _this;
  }

  var _proto = AnimatedWithChildren.prototype;

  _proto.__addChild = function __addChild(child) {
    if (child instanceof AnimatedTracking) this._tracked = true;
    if (this._children.length === 0) this.__attach();

    this._children.push(child);
  };

  _proto.__removeChild = function __removeChild(child) {
    var index = this._children.indexOf(child);

    if (index === -1) {
      console.warn("Trying to remove a child that doesn't exist");
      return;
    }

    this._children.splice(index, 1);

    if (this._children.length === 0) this.__detach();
  };

  _proto.__getChildren = function __getChildren() {
    return this._children;
  };

  return AnimatedWithChildren;
}(Animated);

var AnimatedInterpolation =
/*#__PURE__*/
function (_AnimatedWithChildren) {
  _inheritsLoose(AnimatedInterpolation, _AnimatedWithChildren);

  function AnimatedInterpolation(parents, config) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    _this._parents = Array.isArray(parents) ? parents : [parents];
    _this._interpolation = Interpolation.create(config);
    return _this;
  }

  var _proto = AnimatedInterpolation.prototype;

  _proto.__getValue = function __getValue() {
    return this._interpolation.apply(this, this._parents.map(function (value) {
      return value.__getValue();
    }));
  };

  _proto.__attach = function __attach() {
    for (var i = 0; i < this._parents.length; ++i) {
      if (this._parents[i] instanceof Animated) this._parents[i].__addChild(this);
    }
  };

  _proto.__detach = function __detach() {
    for (var i = 0; i < this._parents.length; ++i) {
      if (this._parents[i] instanceof Animated) this._parents[i].__removeChild(this);
    }
  };

  _proto.interpolate = function interpolate(config) {
    return new AnimatedInterpolation(this, config);
  };

  return AnimatedInterpolation;
}(AnimatedWithChildren);
var interpolate$1 = function interpolate(parents, config) {
  return new AnimatedInterpolation(parents, config);
};

var _uniqueId = 0;
/**
 * Animated works by building a directed acyclic graph of dependencies
 * transparently when you render your Animated components.
 *
 *               new Animated.Value(0)
 *     .interpolate()        .interpolate()    new Animated.Value(1)
 *         opacity               translateY      scale
 *          style                         transform
 *         View#234                         style
 *                                         View#123
 *
 * A) Top Down phase
 * When an Animated.Value is updated, we recursively go down through this
 * graph in order to find leaf nodes: the views that we flag as needing
 * an update.
 *
 * B) Bottom Up phase
 * When a view is flagged as needing an update, we recursively go back up
 * in order to build the new value that it needs. The reason why we need
 * this two-phases process is to deal with composite props such as
 * transform which can receive values from multiple parents.
 */

function findAnimatedStyles(node, styles) {
  if (typeof node.update === 'function') styles.add(node);else node.__getChildren().forEach(function (child) {
    return findAnimatedStyles(child, styles);
  });
}
/**
 * Standard value for driving animations.  One `Animated.Value` can drive
 * multiple properties in a synchronized fashion, but can only be driven by one
 * mechanism at a time.  Using a new mechanism (e.g. starting a new animation,
 * or calling `setValue`) will stop any previous ones.
 */


var AnimatedValue =
/*#__PURE__*/
function (_AnimatedWithChildren) {
  _inheritsLoose(AnimatedValue, _AnimatedWithChildren);

  function AnimatedValue(value) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    _this._value = value;
    _this._animation = null;
    _this._animatedStyles = new Set();
    _this._listeners = {};
    return _this;
  }

  var _proto = AnimatedValue.prototype;

  _proto.__detach = function __detach() {
    this.stopAnimation();
  };

  _proto.__getValue = function __getValue() {
    return this._value;
  };

  _proto._update = function _update() {
    findAnimatedStyles(this, this._animatedStyles);
  };

  _proto._flush = function _flush() {
    if (this._animatedStyles.size === 0) this._update();

    this._animatedStyles.forEach(function (animatedStyle) {
      return animatedStyle.update();
    });
  };

  _proto._updateValue = function _updateValue(value) {
    this._value = value;

    this._flush();

    for (var key in this._listeners) {
      this._listeners[key]({
        value: this.__getValue()
      });
    }
  };
  /**
   * Directly set the value.  This will stop any animations running on the value
   * and update all the bound properties.
   */


  _proto.setValue = function setValue(value) {
    if (this._animation) {
      this._animation.stop();

      this._animation = null;
    }

    this._animatedStyles.clear();

    this._updateValue(value);
  };
  /**
   * Stops any running animation or tracking.  `callback` is invoked with the
   * final value after stopping the animation, which is useful for updating
   * state to match the animation position with layout.
   */


  _proto.stopAnimation = function stopAnimation(callback) {
    this.stopTracking();
    this._animation && this._animation.stop();
    this._animation = null;
    callback && callback(this.__getValue());
  };
  /**
   * Interpolates the value before updating the property, e.g. mapping 0-1 to
   * 0-10.
   */


  _proto.interpolate = function interpolate(config) {
    return new AnimatedInterpolation(this, config);
  };
  /**
   * Typically only used internally, but could be used by a custom Animation
   * class.
   */


  _proto.animate = function animate(animation, callback) {
    var _this2 = this;

    var previousAnimation = this._animation;
    this._animation && this._animation.stop();
    this._animation = animation;

    this._animatedStyles.clear();

    animation.start(this._value, function (value) {
      return _this2._updateValue(value);
    }, function (result) {
      _this2._animation = null;
      callback && callback(result);
    }, previousAnimation);
  };
  /**
   * Adds an asynchronous listener to the value so you can observe updates from
   * animations.  This is useful because there is no way to
   * synchronously read the value because it might be driven natively.
   */


  _proto.addListener = function addListener(callback) {
    var id = String(_uniqueId++);
    this._listeners[id] = callback;
    return id;
  };

  _proto.removeListener = function removeListener(id) {
    delete this._listeners[id];
  };

  _proto.removeAllListeners = function removeAllListeners() {
    this._listeners = {};
  };
  /**
   * Typically only used internally.
   */


  _proto.stopTracking = function stopTracking() {
    this._tracking && this._tracking.__detach();
    this._tracking = null;
  };
  /**
   * Typically only used internally.
   */


  _proto.track = function track(tracking) {
    this.stopTracking();
    this._tracking = tracking;
  };

  return AnimatedValue;
}(AnimatedWithChildren);

var getValues = function getValues(object) {
  return Object.keys(object).map(function (k) {
    return object[k];
  });
};

var check = function check(value) {
  return value === 'auto';
};

var overwrite = function overwrite(width, height) {
  return function (acc, _ref2) {
    var _extends3;

    var name = _ref2[0],
        value = _ref2[1];
    return _extends({}, acc, (_extends3 = {}, _extends3[name] = value === 'auto' ? ~name.indexOf('height') ? height : width : value, _extends3));
  };
};

function fixAuto(spring, props) {
  var native = props.native,
      children = props.children,
      render = props.render,
      from = props.from,
      to = props.to; // Dry-route props back if nothing's using 'auto' in there

  if (!getValues(from).concat(getValues(to)).some(check)) return; // Fetch render v-dom

  var element = spring.renderChildren(props, spring.convertValues(props));
  var elementStyles = element.props.style; // Return v.dom with injected ref

  return React.createElement(element.type, _extends({}, element.props, {
    style: _extends({}, elementStyles, {
      position: 'absolute',
      visibility: 'hidden'
    }),
    ref: function ref(_ref3) {
      if (_ref3) {
        // Once it's rendered out, fetch bounds (minus padding/margin/borders)
        var node = ReactDOM.findDOMNode(_ref3);
        var width, height;
        var cs = getComputedStyle(node);

        if (cs.boxSizing === 'border-box') {
          width = node.clientWidth;
          height = node.clientHeight;
        } else {
          var paddingX = parseFloat(cs.paddingLeft || 0) + parseFloat(cs.paddingRight || 0);
          var paddingY = parseFloat(cs.paddingTop || 0) + parseFloat(cs.paddingBottom || 0);
          var borderX = parseFloat(cs.borderLeftWidth || 0) + parseFloat(cs.borderRightWidth || 0);
          var borderY = parseFloat(cs.borderTopWidth || 0) + parseFloat(cs.borderBottomWidth || 0);
          width = node.offsetWidth - paddingX - borderX;
          height = node.offsetHeight - paddingY - borderY;
        } // Defer to next frame, or else the springs updateToken is canceled


        var _convert = overwrite(width, height);

        requestAnimationFrame(function () {
          return spring.updateProps(_extends({}, props, {
            from: Object.entries(from).reduce(_convert, from),
            to: Object.entries(to).reduce(_convert, to)
          }), true, true);
        });
      }
    }
  }));
}

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

var prefixKey = function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
};

var prefixes = ['Webkit', 'Ms', 'Moz', 'O'];
Object.keys(isUnitlessNumber).forEach(function (prop) {
  return prefixes.forEach(function (pre) {
    return isUnitlessNumber[prefixKey(pre, prop)] = isUnitlessNumber[prop];
  });
});

function dangerousStyleValue(name, value, isCustomProperty) {
  if (value == null || typeof value === 'boolean' || value === '') return '';
  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers

  return ('' + value).trim();
}

injectInterpolation(createInterpolation);
injectColorNames(colors);
injectBugfixes(fixAuto);
injectApplyAnimatedValues(function (instance, props) {
  if (instance.nodeType && instance.setAttribute !== undefined) {
    var style = props.style,
        attributes = _objectWithoutProperties(props, ["style"]); // Set styles ...


    for (var styleName in style) {
      if (!style.hasOwnProperty(styleName)) continue;
      var isCustomProperty = styleName.indexOf('--') === 0;
      var styleValue = dangerousStyleValue(styleName, style[styleName], isCustomProperty);
      if (styleName === 'float') styleName = 'cssFloat';
      if (isCustomProperty) instance.style.setProperty(styleName, styleValue);else instance.style[styleName] = styleValue;
    } // Set attributes ...


    for (var name in attributes) {
      if (instance.getAttribute(name)) instance.setAttribute(name, attributes[name]);
    }
  } else return false;
}, function (style) {
  return style;
});

// Important note: start() and stop() will only be called at most once.
// Once an animation has been stopped or finished its course, it will
// not be reused.
var Animation =
/*#__PURE__*/
function () {
  function Animation() {}

  var _proto = Animation.prototype;

  _proto.start = function start(fromValue, onUpdate, onEnd, previousAnimation) {};

  _proto.stop = function stop() {}; // Helper function for subclasses to make sure onEnd is only called once.


  _proto.__debouncedOnEnd = function __debouncedOnEnd(result) {
    var onEnd = this.__onEnd;
    this.__onEnd = null;
    onEnd && onEnd(result);
  };

  return Animation;
}();

var withDefault = function withDefault(value, defaultValue) {
  return value === undefined || value === null ? defaultValue : value;
};

var tensionFromOrigamiValue = function tensionFromOrigamiValue(oValue) {
  return (oValue - 30) * 3.62 + 194;
};

var frictionFromOrigamiValue = function frictionFromOrigamiValue(oValue) {
  return (oValue - 8) * 3 + 25;
};

var fromOrigamiTensionAndFriction = function fromOrigamiTensionAndFriction(tension, friction) {
  return {
    tension: tensionFromOrigamiValue(tension),
    friction: frictionFromOrigamiValue(friction)
  };
};

var SpringAnimation =
/*#__PURE__*/
function (_Animation) {
  _inheritsLoose(SpringAnimation, _Animation);

  function SpringAnimation(config) {
    var _this;

    _this = _Animation.call(this) || this;

    _this.onUpdate = function () {
      var position = _this._lastPosition;
      var velocity = _this._lastVelocity;
      var tempPosition = _this._lastPosition;
      var tempVelocity = _this._lastVelocity; // If for some reason we lost a lot of frames (e.g. process large payload or
      // stopped in the debugger), we only advance by 4 frames worth of
      // computation and will continue on the next frame. It's better to have it
      // running at faster speed than jumping to the end.

      var MAX_STEPS = 64;
      var now = Date.now();
      if (now > _this._lastTime + MAX_STEPS) now = _this._lastTime + MAX_STEPS; // We are using a fixed time step and a maximum number of iterations.
      // The following post provides a lot of thoughts into how to build this
      // loop: http://gafferongames.com/game-physics/fix-your-timestep/

      var TIMESTEP_MSEC = 1;
      var numSteps = Math.floor((now - _this._lastTime) / TIMESTEP_MSEC);

      for (var i = 0; i < numSteps; ++i) {
        // Velocity is based on seconds instead of milliseconds
        var step = TIMESTEP_MSEC / 1000; // This is using RK4. A good blog post to understand how it works:
        // http://gafferongames.com/game-physics/integration-basics/

        var aVelocity = velocity;
        var aAcceleration = _this._tension * (_this._to - tempPosition) - _this._friction * tempVelocity;
        var tempPosition = position + aVelocity * step / 2;
        var tempVelocity = velocity + aAcceleration * step / 2;
        var bVelocity = tempVelocity;
        var bAcceleration = _this._tension * (_this._to - tempPosition) - _this._friction * tempVelocity;
        tempPosition = position + bVelocity * step / 2;
        tempVelocity = velocity + bAcceleration * step / 2;
        var cVelocity = tempVelocity;
        var cAcceleration = _this._tension * (_this._to - tempPosition) - _this._friction * tempVelocity;
        tempPosition = position + cVelocity * step / 2;
        tempVelocity = velocity + cAcceleration * step / 2;
        var dVelocity = tempVelocity;
        var dAcceleration = _this._tension * (_this._to - tempPosition) - _this._friction * tempVelocity;
        tempPosition = position + cVelocity * step / 2;
        tempVelocity = velocity + cAcceleration * step / 2;
        var dxdt = (aVelocity + 2 * (bVelocity + cVelocity) + dVelocity) / 6;
        var dvdt = (aAcceleration + 2 * (bAcceleration + cAcceleration) + dAcceleration) / 6;
        position += dxdt * step;
        velocity += dvdt * step;
      }

      _this._lastTime = now;
      _this._lastPosition = position;
      _this._lastVelocity = velocity;

      _this._onUpdate(position); // a listener might have stopped us in _onUpdate


      if (!_this.__active) return; // Conditions for stopping the spring animation

      var isOvershooting = false;

      if (_this._overshootClamping && _this._tension !== 0) {
        if (_this._startPosition < _this._to) {
          isOvershooting = position > _this._to;
        } else {
          isOvershooting = position < _this._to;
        }
      }

      var isVelocity = Math.abs(velocity) <= _this._restSpeedThreshold;

      var isDisplacement = true;
      if (_this._tension !== 0) isDisplacement = Math.abs(_this._to - position) <= _this._restDisplacementThreshold;

      if (isOvershooting || isVelocity && isDisplacement) {
        // Ensure that we end up with a round value
        if (_this._tension !== 0) _this._onUpdate(_this._to);
        return _this.__debouncedOnEnd({
          finished: true
        });
      }

      _this._animationFrame = requestFrame(_this.onUpdate);
    };

    _this._overshootClamping = withDefault(config.overshootClamping, false);
    _this._restDisplacementThreshold = withDefault(config.restDisplacementThreshold, 0.0001);
    _this._restSpeedThreshold = withDefault(config.restSpeedThreshold, 0.0001);
    _this._initialVelocity = config.velocity;
    _this._lastVelocity = withDefault(config.velocity, 0);
    _this._to = config.to;
    var springConfig = fromOrigamiTensionAndFriction(withDefault(config.tension, 40), withDefault(config.friction, 7));
    _this._tension = springConfig.tension;
    _this._friction = springConfig.friction;
    return _this;
  }

  var _proto = SpringAnimation.prototype;

  _proto.start = function start(fromValue, onUpdate, onEnd, previousAnimation) {
    this.__active = true;
    this._startPosition = fromValue;
    this._lastPosition = this._startPosition;
    this._onUpdate = onUpdate;
    this.__onEnd = onEnd;
    this._lastTime = Date.now();

    if (previousAnimation instanceof SpringAnimation) {
      var internalState = previousAnimation.getInternalState();
      this._lastPosition = internalState.lastPosition;
      this._lastVelocity = internalState.lastVelocity;
      this._lastTime = internalState.lastTime;
    }

    if (typeof fromValue === 'string') {
      this._onUpdate(fromValue);

      return this.__debouncedOnEnd({
        finished: true
      });
    }

    if (this._initialVelocity !== undefined && this._initialVelocity !== null) this._lastVelocity = this._initialVelocity;
    this.onUpdate();
  };

  _proto.getInternalState = function getInternalState() {
    return {
      lastPosition: this._lastPosition,
      lastVelocity: this._lastVelocity,
      lastTime: this._lastTime
    };
  };

  _proto.stop = function stop() {
    this.__active = false;
    clearTimeout(this._timeout);
    cancelFrame(this._animationFrame);

    this.__debouncedOnEnd({
      finished: false
    });
  };

  return SpringAnimation;
}(Animation);

var AnimatedArray =
/*#__PURE__*/
function (_AnimatedWithChildren) {
  _inheritsLoose(AnimatedArray, _AnimatedWithChildren);

  function AnimatedArray(array) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    _this._values = array.map(function (n) {
      return new AnimatedValue(n);
    });
    return _this;
  }

  var _proto = AnimatedArray.prototype;

  _proto.setValue = function setValue(values) {
    var _this2 = this;

    values.forEach(function (n, i) {
      return _this2._values[i].setValue(n);
    });
  };

  _proto.__getValue = function __getValue() {
    return this._values.map(function (v) {
      return v.__getValue();
    });
  };

  _proto.stopAnimation = function stopAnimation(callback) {
    this._values.forEach(function (v) {
      return v.stopAnimation();
    });

    callback && callback(this.__getValue());
  };

  _proto.__attach = function __attach() {
    for (var i = 0; i < this._values.length; ++i) {
      if (this._values[i] instanceof Animated) this._values[i].__addChild(this);
    }
  };

  _proto.__detach = function __detach() {
    for (var i = 0; i < this._values.length; ++i) {
      if (this._values[i] instanceof Animated) this._values[i].__removeChild(this);
    }
  };

  return AnimatedArray;
}(AnimatedWithChildren);

function maybeVectorAnim(array, _ref, anim, impl) {
  var tension = _ref.tension,
      friction = _ref.friction,
      to = _ref.to;
  // { tension, friction, to: [...]}
  if (array instanceof AnimatedArray) return parallel(array._values.map(function (v, i) {
    return anim(v, {
      tension: tension,
      friction: friction,
      to: to[i]
    }, impl);
  }), {
    stopTogether: false
  });
  return null;
}

function parallel(animations, config) {
  var doneCount = 0;
  var hasEnded = {};
  var stopTogether = !(config && config.stopTogether === false);
  var result = {
    start: function start(callback) {
      if (doneCount === animations.length) return callback && callback({
        finished: true
      });
      animations.forEach(function (animation, idx) {
        var cb = function cb(endResult) {
          hasEnded[idx] = true;
          doneCount++;

          if (doneCount === animations.length) {
            doneCount = 0;
            return callback && callback(endResult);
          }

          if (!endResult.finished && stopTogether) result.stop();
        };

        if (!animation) cb({
          finished: true
        });else animation.start(cb);
      });
    },
    stop: function stop() {
      animations.forEach(function (animation, idx) {
        !hasEnded[idx] && animation.stop();
        hasEnded[idx] = true;
      });
    }
  };
  return result;
}

function controller(value, config, impl) {
  if (impl === void 0) {
    impl = SpringAnimation;
  }

  return maybeVectorAnim(value, config, controller, impl) || {
    start: function start(callback) {
      var singleValue = value;
      var singleConfig = config;
      singleValue.stopTracking();
      if (config.to instanceof Animated) singleValue.track(new AnimatedTracking(singleValue, config.to, impl, singleConfig, callback));else singleValue.animate(new impl(singleConfig), callback);
    },
    stop: function stop() {
      value.stopAnimation();
    }
  };
}

var AnimatedStyle =
/*#__PURE__*/
function (_AnimatedWithChildren) {
  _inheritsLoose(AnimatedStyle, _AnimatedWithChildren);

  function AnimatedStyle(style) {
    var _this;

    _this = _AnimatedWithChildren.call(this) || this;
    style = style || {};
    if (style.transform && !(style.transform instanceof Animated)) style = applyAnimatedValues.transform(style);
    _this._style = style;
    return _this;
  }

  var _proto = AnimatedStyle.prototype;

  _proto.__getValue = function __getValue() {
    var style = {};

    for (var key in this._style) {
      var value = this._style[key];
      style[key] = value instanceof Animated ? value.__getValue() : value;
    }

    return style;
  };

  _proto.__getAnimatedValue = function __getAnimatedValue() {
    var style = {};

    for (var key in this._style) {
      var value = this._style[key];
      if (value instanceof Animated) style[key] = value.__getAnimatedValue();
    }

    return style;
  };

  _proto.__attach = function __attach() {
    for (var key in this._style) {
      var value = this._style[key];
      if (value instanceof Animated) value.__addChild(this);
    }
  };

  _proto.__detach = function __detach() {
    for (var key in this._style) {
      var value = this._style[key];
      if (value instanceof Animated) value.__removeChild(this);
    }
  };

  return AnimatedStyle;
}(AnimatedWithChildren);

var AnimatedProps =
/*#__PURE__*/
function (_Animated) {
  _inheritsLoose(AnimatedProps, _Animated);

  function AnimatedProps(props, callback) {
    var _this;

    _this = _Animated.call(this) || this;

    if (props.style) {
      props = _extends({}, props, {
        style: new AnimatedStyle(props.style)
      });
    }

    _this._props = props;
    _this._callback = callback;

    _this.__attach();

    return _this;
  }

  var _proto = AnimatedProps.prototype;

  _proto.__getValue = function __getValue() {
    var props = {};

    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof Animated) props[key] = value.__getValue();else props[key] = value;
    }

    return props;
  };

  _proto.__getAnimatedValue = function __getAnimatedValue() {
    var props = {};

    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof Animated) props[key] = value.__getAnimatedValue();
    }

    return props;
  };

  _proto.__attach = function __attach() {
    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof Animated) value.__addChild(this);
    }
  };

  _proto.__detach = function __detach() {
    for (var key in this._props) {
      var value = this._props[key];
      if (value instanceof Animated) value.__removeChild(this);
    }
  };

  _proto.update = function update() {
    this._callback();
  };

  return AnimatedProps;
}(Animated);

function createAnimatedComponent(Component) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(AnimatedComponent, _React$Component);

      function AnimatedComponent() {
        return _React$Component.apply(this, arguments) || this;
      }

      var _proto = AnimatedComponent.prototype;

      _proto.componentWillUnmount = function componentWillUnmount() {
        this._propsAnimated && this._propsAnimated.__detach();
      };

      _proto.setNativeProps = function setNativeProps(props) {
        var didUpdate = applyAnimatedValues.fn(this.node, props, this);
        if (didUpdate === false) this.forceUpdate();
      };

      _proto.componentWillMount = function componentWillMount() {
        this.attachProps(this.props);
      };

      _proto.attachProps = function attachProps(nextProps) {
        var _this = this;

        var oldPropsAnimated = this._propsAnimated; // The system is best designed when setNativeProps is implemented. It is
        // able to avoid re-rendering and directly set the attributes that
        // changed. However, setNativeProps can only be implemented on leaf
        // native components. If you want to animate a composite component, you
        // need to re-render it. In this case, we have a fallback that uses
        // forceUpdate.

        var callback = function callback() {
          if (_this.node) {
            var didUpdate = applyAnimatedValues.fn(_this.node, _this._propsAnimated.__getAnimatedValue(), _this);
            if (didUpdate === false) _this.forceUpdate();
          }
        };

        this._propsAnimated = new AnimatedProps(nextProps, callback); // When you call detach, it removes the element from the parent list
        // of children. If it goes to 0, then the parent also detaches itself
        // and so on.
        // An optimization is to attach the new elements and THEN detach the old
        // ones instead of detaching and THEN attaching.
        // This way the intermediate state isn't to go to 0 and trigger
        // this expensive recursive detaching to then re-attach everything on
        // the very next operation.

        oldPropsAnimated && oldPropsAnimated.__detach();
      };

      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.attachProps(nextProps);
      };

      _proto.render = function render() {
        var _this2 = this;

        var props = this._propsAnimated.__getValue();

        return React.createElement(Component, _extends({}, props, {
          ref: function ref(node) {
            return _this2.node = node;
          }
        }));
      };

      return AnimatedComponent;
    }(React.Component)
  );
}

function shallowDiff(a, b) {
  for (var i in a) {
    if (!(i in b)) return true;
  }

  for (var _i in b) {
    if (a[_i] !== b[_i]) return true;
  }

  return false;
}

var config = {
  default: {
    tension: 170,
    friction: 26
  },
  gentle: {
    tension: 120,
    friction: 14
  },
  wobbly: {
    tension: 180,
    friction: 12
  },
  stiff: {
    tension: 210,
    friction: 20
  },
  slow: {
    tension: 280,
    friction: 60
  }
};

var callProp = function callProp(p, n) {
  return typeof p === 'function' ? p(n) : p;
};

var convert$1 = function convert(acc, _ref) {
  var _extends2;

  var name = _ref[0],
      value = _ref[1];
  return _extends({}, acc, (_extends2 = {}, _extends2[name] = new AnimatedValue(value), _extends2));
};

var Spring =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Spring, _React$Component);

  function Spring() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.state = {
      props: undefined
    }, _this.animations = {}, _this.callback = function () {
      if (_this.props.onFrame) _this.props.onFrame(_this.animatedProps.__getValue());
      !_this.props.native && _this.forceUpdate();
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Spring.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.stop();
  };

  _proto.componentWillMount = function componentWillMount() {
    this.updatePropsAsync(this.props);
  };

  _proto.componentWillUpdate = function componentWillUpdate(props) {
    if (props.reset || shallowDiff(props.to, this.props.to)) this.updatePropsAsync(props);
  };

  _proto.updatePropsAsync = function updatePropsAsync(props) {
    if (props.inject) {
      this.inject = props.inject(this, props);
      if (this.inject) return;
    }

    this.updateProps(props);
  };

  _proto.updateProps = function updateProps(props, force, didInject) {
    var _this2 = this;

    if (force === void 0) {
      force = false;
    }

    if (didInject === void 0) {
      didInject = false;
    }

    // Springs can be destroyed, the "destroyed" flag prevents them from ever
    // updating further, they'll just animate out and function no more ...
    if (this.destroyed && props.destroyed) return;
    this.destroyed = props.destroyed;
    var impl = props.impl,
        from = props.from,
        to = props.to,
        config = props.config,
        attach = props.attach,
        immediate = props.immediate,
        reset = props.reset,
        onFrame = props.onFrame,
        onRest = props.onRest,
        inject = props.inject,
        native = props.native;
    var allProps = Object.entries(_extends({}, from, to));
    this.interpolators = {};
    this.animations = allProps.reduce(function (acc, _ref2, i) {
      var _extends3;

      var name = _ref2[0],
          value = _ref2[1];
      var entry = reset === false && _this2.animations[name] || (_this2.animations[name] = {});
      var isNumber = typeof value === 'number';
      var isString = typeof value === 'string' && !value.startsWith('#') && !/\d/.test(value) && !colorNames[value];
      var isArray = !isNumber && !isString && Array.isArray(value);
      var fromValue = from[name] !== undefined ? from[name] : value;
      var fromAnimated = fromValue instanceof AnimatedValue;
      var toValue = isNumber || isArray ? value : 1;

      if (
      /*isNumber &&*/
      attach) {
        // Attach value to target animation
        var target = attach(_this2);
        var targetAnimation = target && target.animations[name];
        if (targetAnimation) toValue = targetAnimation.animation;
      }

      if (fromAnimated) {
        // Use provided animated value
        entry.animation = entry.interpolation = fromValue;
      } else if (isNumber || isString) {
        // Create animated value
        entry.animation = entry.interpolation = entry.animation || new AnimatedValue(fromValue);
      } else if (isArray) {
        // Create animated array
        entry.animation = entry.interpolation = entry.animation || new AnimatedArray(fromValue);
      } else {
        // Deal with interpolations
        var previous = entry.interpolation && entry.interpolation._interpolation(entry.animation._value);

        entry.animation = new AnimatedValue(0);
        entry.interpolation = entry.animation.interpolate({
          range: [0, 1],
          output: [previous !== undefined ? previous : fromValue, value]
        });
      }

      if (callProp(immediate, name)) entry.animation.setValue(toValue);
      entry.stopped = false;

      entry.onFinish = function (cb) {
        _this2.animations[name].stopped = true;

        if (_this2.getAnimations().every(function (a) {
          return a.stopped;
        })) {
          var current = _extends({}, _this2.props.from, _this2.props.to);

          if (onRest) onRest(current);
          cb && typeof cb === 'function' && cb(current);

          if (didInject) {
            // Restore the original values for injected props
            var componentProps = _this2.convertValues(_this2.props);

            _this2.inject = _this2.renderChildren(_this2.props, componentProps);

            _this2.forceUpdate();
          }
        }
      };

      entry.start = function (cb) {
        if (entry.animation.__getValue() === toValue) return entry.onFinish(cb);
        controller(entry.animation, _extends({
          to: toValue
        }, callProp(config, name)), impl).start(function (props) {
          return props.finished && entry.onFinish(cb);
        });
      };

      entry.stop = function () {
        entry.stopped = true;
        entry.animation.stopAnimation();
      };

      _this2.interpolators[name] = entry.interpolation;
      return _extends({}, acc, (_extends3 = {}, _extends3[name] = entry, _extends3));
    }, {});
    var oldAnimatedProps = this.animatedProps;
    this.animatedProps = new AnimatedProps(this.interpolators, this.callback);
    oldAnimatedProps && oldAnimatedProps.__detach();
    this.updateToken = true;
    if (force) this.forceUpdate();
  };

  _proto.start = function start() {
    var _this3 = this;

    var onStart = this.props.onStart;

    var fn = function fn() {
      return _this3.getAnimations().forEach(function (animation) {
        return animation.start(resolve);
      });
    };

    var resolve,
        promise = new Promise(function (r) {
      return resolve = r;
    });

    if (this.props.delay) {
      if (this.timeout) clearTimeout(this.timeout);
      return this.timeout = setTimeout(function () {
        return fn();
      }, this.props.delay);
    }

    if (onStart) onStart();
    fn();
    return promise;
  };

  _proto.stop = function stop() {
    this.getAnimations().forEach(function (animation) {
      return animation.stop();
    });
  };

  _proto.flush = function flush() {
    this.getAnimations().forEach(function (_ref3) {
      var interpolation$$1 = _ref3.interpolation;
      return interpolation$$1._update && interpolation$$1._update();
    });
  };

  _proto.getAnimations = function getAnimations() {
    var _this4 = this;

    return Object.keys(this.animations).map(function (key) {
      return _this4.animations[key];
    });
  };

  _proto.getValues = function getValues() {
    return this.animatedProps ? this.animatedProps.__getValue() : {};
  };

  _proto.getAnimatedValues = function getAnimatedValues() {
    return this.props.native ? this.interpolators : this.getValues();
  };

  _proto.convertValues = function convertValues(props) {
    var from = props.from,
        to = props.to,
        native = props.native,
        children = props.children,
        render = props.render;
    var forward = this.getForwardProps(props);
    var allProps = Object.entries(_extends({}, from, to));
    return native ? allProps.reduce(convert$1, forward) : _extends({}, from, to, forward);
  };

  _proto.getForwardProps = function getForwardProps(props) {
    if (props === void 0) {
      props = this.props;
    }

    var _props = props,
        to = _props.to,
        from = _props.from,
        config = _props.config,
        native = _props.native,
        onRest = _props.onRest,
        onFrame = _props.onFrame,
        children = _props.children,
        render = _props.render,
        reset = _props.reset,
        immediate = _props.immediate,
        impl = _props.impl,
        inject = _props.inject,
        forward = _objectWithoutProperties(_props, ["to", "from", "config", "native", "onRest", "onFrame", "children", "render", "reset", "immediate", "impl", "inject"]);

    return forward;
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    // Animation has to start *after* render, since at that point the scene
    // graph should be established, so we do it here. Unfortunatelly, non-native
    // animations call forceUpdate, so it's causing a loop. updateToken prevents
    // that as it gets set only on prop changes.
    if (this.updateToken) {
      this.updateToken = false;
      this.start();
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    this.updateToken = false;
    this.start();
  };

  _proto.renderChildren = function renderChildren(props, componentProps) {
    return props.render ? props.render(_extends({}, componentProps, {
      children: props.children
    })) : props.children(componentProps);
  };

  _proto.render = function render() {
    if (this.inject) {
      var content = this.inject;
      this.inject = undefined;
      return content;
    }

    var _this$props = this.props,
        children = _this$props.children,
        render = _this$props.render;
    var values = this.getAnimatedValues();
    return values && Object.keys(values).length ? this.renderChildren(this.props, _extends({}, values, this.getForwardProps())) : null;
  };

  return Spring;
}(React.Component);

Spring.defaultProps = {
  from: {},
  to: {},
  config: config.default,
  native: false,
  immediate: false,
  reset: false,
  impl: SpringAnimation,
  inject: bugfixes
};

var empty = function empty() {
  return null;
};

var ref = function ref(object, key) {
  if (object === void 0) {
    object = {};
  }

  return typeof object === 'function' ? object(key) : object;
};

var get = function get(props) {
  var keys = props.keys,
      children = props.children,
      render = props.render,
      items = props.items,
      rest = _objectWithoutProperties(props, ["keys", "children", "render", "items"]);

  children = render || children || empty;
  keys = typeof keys === 'function' ? items.map(keys) : keys;

  if (!Array.isArray(children)) {
    children = [children];
    keys = keys ? [keys] : children.map(function (c) {
      return c.toString();
    });
  }

  return _extends({
    keys: keys,
    children: children,
    items: items
  }, rest);
};

var Transition =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Transition, _React$PureComponent);

  function Transition(prevProps) {
    var _this;

    _this = _React$PureComponent.call(this) || this;
    _this.springs = [];
    _this.state = {
      transitions: [],
      prevProps: prevProps
    };
    return _this;
  }

  Transition.getDerivedStateFromProps = function getDerivedStateFromProps(props, _ref) {
    var transitions = _ref.transitions,
        prevProps = _ref.prevProps;

    var _get = get(props),
        keys = _get.keys,
        children = _get.children,
        items = _get.items,
        from = _get.from,
        enter = _get.enter,
        leave = _get.leave,
        update = _get.update;

    var _get2 = get(prevProps),
        _keys = _get2.keys,
        _children = _get2.children,
        _items = _get2.items; // Compare next keys with current keys


    var allKeys = transitions.map(function (t) {
      return t.key;
    });
    var nextSet = new Set(keys);
    var currentSet = new Set(allKeys);
    var added = keys.filter(function (item) {
      return !currentSet.has(item);
    });
    var deleted = allKeys.filter(function (item) {
      return !nextSet.has(item);
    });
    var rest = keys.filter(function (item) {
      return currentSet.has(item);
    }); // Insert new keys into the transition collection

    added.forEach(function (key) {
      var i = keys.indexOf(key);
      transitions = transitions.slice(0, i).concat([key], transitions.slice(i));
    });
    transitions = transitions.map(function (transition) {
      var isTransition = typeof transition === 'object';
      var key = isTransition ? transition.key : transition;
      var keyIndex = keys.indexOf(key);
      var item = items ? items[keyIndex] : key;

      if (isTransition) {
        // A transition already exists
        if (deleted.find(function (k) {
          return k === key;
        })) {
          // The transition was removed, re-key it and animate it out
          return _extends({}, transition, {
            destroyed: true,
            prevKey: key,
            key: transition.key + '_',
            to: !transition.destroyed ? ref(leave, _items ? _items[_keys.indexOf(key)] : key) : transition.to
          });
        } // Transition remains untouched, update children and call hook


        return _extends({}, transition, {
          children: children[keyIndex] || transition.children,
          to: update && rest.indexOf(transition.key) !== -1 ? ref(update, item) || transition.to : transition.to
        });
      } // Map added key into transition


      return {
        children: children[keyIndex],
        key: key,
        item: item,
        to: ref(enter, item),
        from: ref(from, item)
      };
    }); // Re-order list

    var ordered = keys.map(function (key) {
      return transitions.find(function (child) {
        return child.key === key;
      });
    });
    transitions.forEach(function (t, i) {
      if (t.destroyed) ordered = ordered.slice(0, i).concat([t], ordered.slice(i));
    });
    return {
      transitions: ordered,
      prevProps: props
    };
  };

  var _proto = Transition.prototype;

  _proto.getValues = function getValues() {
    return undefined;
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        render = _this$props.render,
        _this$props$from = _this$props.from,
        _this$props$enter = _this$props.enter,
        _this$props$leave = _this$props.leave,
        _this$props$native = _this$props.native,
        native = _this$props$native === void 0 ? false : _this$props$native,
        _this$props$config = _this$props.config,
        config$$1 = _this$props$config === void 0 ? config.default : _this$props$config,
        keys = _this$props.keys,
        items = _this$props.items,
        onFrame = _this$props.onFrame,
        onRest = _this$props.onRest,
        extra = _objectWithoutProperties(_this$props, ["render", "from", "enter", "leave", "native", "config", "keys", "items", "onFrame", "onRest"]);

    var props = _extends({
      native: native,
      config: config$$1
    }, extra);

    return this.state.transitions.map(function (transition, i) {
      var prevKey = transition.prevKey,
          key = transition.key,
          item = transition.item,
          children = transition.children,
          from = transition.from,
          rest = _objectWithoutProperties(transition, ["prevKey", "key", "item", "children", "from"]);

      return React.createElement(Spring, _extends({
        ref: function ref(r) {
          return r && (_this2.springs[key] = r);
        },
        key: key,
        onRest: rest.destroyed ? function () {
          return _this2.setState(function (_ref2) {
            var transitions = _ref2.transitions;
            return {
              transitions: transitions.filter(function (t) {
                return t !== transition;
              })
            };
          }, function () {
            return delete _this2.springs[key];
          });
        } : onRest && function (values) {
          return onRest(item, values);
        },
        onFrame: onFrame && function (values) {
          return onFrame(item, values);
        }
      }, rest, props, {
        from: rest.destroyed ? _this2.springs[prevKey].getValues() : from,
        render: render && children,
        children: render ? _this2.props.children : children
      }));
    });
  };

  return Transition;
}(React.PureComponent);

var Trail =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Trail, _React$PureComponent);

  function Trail() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Trail.prototype;

  _proto.getValues = function getValues() {
    return this.instance && this.instance.getValues();
  };

  _proto.componentDidMount = function componentDidMount() {
    this.instance && this.instance.flush();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.instance && this.instance.flush();
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        children = _this$props.children,
        render = _this$props.render,
        _this$props$from = _this$props.from,
        from = _this$props$from === void 0 ? {} : _this$props$from,
        _this$props$to = _this$props.to,
        to = _this$props$to === void 0 ? {} : _this$props$to,
        _this$props$native = _this$props.native,
        native = _this$props$native === void 0 ? false : _this$props$native,
        _this$props$config = _this$props.config,
        config$$1 = _this$props$config === void 0 ? config.default : _this$props$config,
        keys = _this$props.keys,
        delay = _this$props.delay,
        onRest = _this$props.onRest,
        extra = _objectWithoutProperties(_this$props, ["children", "render", "from", "to", "native", "config", "keys", "delay", "onRest"]);

    var animations = new Set();

    var hook = function hook(index, animation) {
      animations.add(animation);
      if (index === 0) return undefined;else return Array.from(animations)[index - 1];
    };

    var props = _extends({}, extra, {
      native: native,
      from: from,
      config: config$$1,
      to: to
    });

    var target = render || children;
    return target.map(function (child, i) {
      var attachedHook = function attachedHook(animation) {
        return hook(i, animation);
      };

      var firstDelay = i === 0 && delay;
      return React.createElement(Spring, _extends({
        ref: function ref(_ref) {
          return i === 0 && (_this.instance = _ref);
        },
        onRest: i === 0 ? onRest : null,
        key: keys[i]
      }, props, {
        delay: firstDelay,
        attach: attachedHook,
        render: render && child,
        children: render ? children : child
      }));
    });
  };

  return Trail;
}(React.PureComponent);

var Keyframes =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(Keyframes, _React$PureComponent);

  function Keyframes() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this, _this.guid = 0, _this.state = {
      primitive: undefined,
      props: {},
      oldProps: {},
      resolve: function resolve() {
        return null;
      }
    }, _this.next = function (primitive, props) {
      return new Promise(function (resolve) {
        _this.setState(function (state) {
          return {
            primitive: primitive,
            props: props,
            oldProps: _extends({}, _this.state.props),
            resolve: resolve
          };
        });
      });
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Keyframes.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.script) this.props.script(this.next);
    this.componentDidUpdate({});
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    if (prevProps.state !== this.props.state) {
      (function () {
        var _this2$props = _this2.props,
            states = _this2$props.states,
            state = _this2$props.state,
            primitive = _this2$props.primitive;

        if (states && state && primitive) {
          (function () {
            var localId = ++_this2.guid;
            var slots = states[state];

            if (Array.isArray(slots)) {
              var q = Promise.resolve();

              var _loop = function _loop() {
                if (_isArray) {
                  if (_i >= _iterator.length) return "break";
                  _ref = _iterator[_i++];
                } else {
                  _i = _iterator.next();
                  if (_i.done) return "break";
                  _ref = _i.value;
                }

                var s = _ref;
                q = q.then(function () {
                  return localId === _this2.guid && _this2.next(primitive, s);
                });
              };

              for (var _iterator = slots, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                var _ret = _loop();

                if (_ret === "break") break;
              }
            } else if (typeof slots === 'function') {
              slots(function (props) {
                return localId === _this2.guid && _this2.next(primitive, props);
              });
            } else {
              _this2.next(primitive, states[state]);
            }
          })();
        }
      })();
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$state = this.state,
        Component = _this$state.primitive,
        props = _this$state.props,
        oldProps = _this$state.oldProps,
        resolve = _this$state.resolve;

    var _this$props = this.props,
        script = _this$props.script,
        ownFrom = _this$props.from,
        _onRest = _this$props.onRest,
        rest = _objectWithoutProperties(_this$props, ["script", "from", "onRest"]);

    if (Component) {
      var current = this.instance && this.instance.getValues();
      var from = typeof props.from === 'function' ? props.from : _extends({}, oldProps.from, current, props.from);
      return React.createElement(Component, _extends({
        ref: function ref(_ref2) {
          return _this3.instance = _ref2;
        }
      }, rest, props, {
        from: _extends({}, from, ownFrom),
        onRest: function onRest(args) {
          resolve(args);
          if (_onRest) _onRest(args);
        }
      }));
    } else return null;
  };

  return Keyframes;
}(React.PureComponent);

Keyframes.create = function (p) {
  return function (s) {
    return function (props) {
      return React.createElement(Keyframes, _extends({
        primitive: p,
        states: s
      }, props));
    };
  };
};

Keyframes.Spring = Keyframes.create(Spring);
Keyframes.Trail = Keyframes.create(Trail);
Keyframes.Transition = Keyframes.create(Transition);

var AnimatedDiv = createAnimatedComponent('div');

var _React$createContext = React.createContext(null),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

function getScrollType(horizontal) {
  return horizontal ? 'scrollLeft' : 'scrollTop';
}

var START_TRANSLATE_3D = 'translate3d(0px,0px,0px)';
var START_TRANSLATE = 'translate(0px,0px)';
var ParallaxLayer =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(ParallaxLayer, _React$PureComponent);

  function ParallaxLayer() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = ParallaxLayer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var parent = this.parent;

    if (parent) {
      parent.layers = parent.layers.concat(this);
      parent.update();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this = this;

    var parent = this.parent;

    if (parent) {
      parent.layers = parent.layers.filter(function (layer) {
        return layer !== _this;
      });
      parent.update();
    }
  };

  _proto.setPosition = function setPosition(height, scrollTop, immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var _this$parent$props = this.parent.props,
        config$$1 = _this$parent$props.config,
        impl = _this$parent$props.impl;
    var targetScroll = Math.floor(this.props.offset) * height;
    var offset = height * this.props.offset + targetScroll * this.props.speed;
    var to = parseFloat(-(scrollTop * this.props.speed) + offset);
    if (!immediate) controller(this.animatedTranslate, _extends({
      to: to
    }, config$$1), impl).start();else this.animatedTranslate.setValue(to);
  };

  _proto.setHeight = function setHeight(height, immediate) {
    if (immediate === void 0) {
      immediate = false;
    }

    var _this$parent$props2 = this.parent.props,
        config$$1 = _this$parent$props2.config,
        impl = _this$parent$props2.impl;
    var to = parseFloat(height * this.props.factor);
    if (!immediate) controller(this.animatedSpace, _extends({
      to: to
    }, config$$1), impl).start();else this.animatedSpace.setValue(to);
  };

  _proto.initialize = function initialize() {
    var props = this.props;
    var parent = this.parent;
    var targetScroll = Math.floor(props.offset) * parent.space;
    var offset = parent.space * props.offset + targetScroll * props.speed;
    var to = parseFloat(-(parent.current * props.speed) + offset);
    this.animatedTranslate = new AnimatedValue(to);
    this.animatedSpace = new AnimatedValue(parent.space * props.factor);
  };

  _proto.renderLayer = function renderLayer() {
    var _extends2;

    var _this$props = this.props,
        style = _this$props.style,
        children = _this$props.children,
        offset = _this$props.offset,
        speed = _this$props.speed,
        factor = _this$props.factor,
        className = _this$props.className,
        props = _objectWithoutProperties(_this$props, ["style", "children", "offset", "speed", "factor", "className"]);

    var horizontal = this.parent.props.horizontal;
    var translate3d = this.animatedTranslate.interpolate({
      range: [0, 1],
      output: horizontal ? [START_TRANSLATE_3D, 'translate3d(1px,0,0)'] : [START_TRANSLATE_3D, 'translate3d(0,1px,0)']
    });
    return React.createElement(AnimatedDiv, _extends({}, props, {
      className: className,
      style: _extends((_extends2 = {
        position: 'absolute',
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
        willChange: 'transform'
      }, _extends2[horizontal ? 'height' : 'width'] = '100%', _extends2[horizontal ? 'width' : 'height'] = this.animatedSpace, _extends2.WebkitTransform = translate3d, _extends2.MsTransform = translate3d, _extends2.transform = translate3d, _extends2), style)
    }), children);
  };

  _proto.render = function render() {
    var _this2 = this;

    return React.createElement(Consumer, null, function (parent) {
      if (parent && !_this2.parent) {
        _this2.parent = parent;

        _this2.initialize();
      }

      return _this2.renderLayer();
    });
  };

  return ParallaxLayer;
}(React.PureComponent);
ParallaxLayer.defaultProps = {
  factor: 1,
  offset: 0,
  speed: 0
};

var Parallax =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inheritsLoose(Parallax, _React$PureComponent2);

  function Parallax() {
    var _temp, _this3;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this3 = _React$PureComponent2.call.apply(_React$PureComponent2, [this].concat(args)) || this, _this3.state = {
      ready: false
    }, _this3.layers = [], _this3.space = 0, _this3.current = 0, _this3.offset = 0, _this3.busy = false, _this3.moveItems = function () {
      _this3.layers.forEach(function (layer) {
        return layer.setPosition(_this3.space, _this3.current);
      });

      _this3.busy = false;
    }, _this3.scrollerRaf = function () {
      return requestAnimationFrame(_this3.moveItems);
    }, _this3.onScroll = function (event) {
      var horizontal = _this3.props.horizontal;

      if (!_this3.busy) {
        _this3.busy = true;

        _this3.scrollerRaf();

        _this3.current = event.target[getScrollType(horizontal)];
      }
    }, _this3.update = function () {
      var _this3$props = _this3.props,
          scrolling = _this3$props.scrolling,
          horizontal = _this3$props.horizontal;
      var scrollType = getScrollType(horizontal);
      if (!_this3.container) return;
      _this3.space = _this3.container[horizontal ? 'clientWidth' : 'clientHeight'];
      if (scrolling) _this3.current = _this3.container[scrollType];else _this3.container[scrollType] = _this3.current = _this3.offset * _this3.space;
      if (_this3.content) _this3.content.style[horizontal ? 'width' : 'height'] = _this3.space * _this3.props.pages + "px";

      _this3.layers.forEach(function (layer) {
        layer.setHeight(_this3.space, true);
        layer.setPosition(_this3.space, _this3.current, true);
      });
    }, _this3.updateRaf = function () {
      requestAnimationFrame(_this3.update); // Some browsers don't fire on maximize

      setTimeout(_this3.update, 150);
    }, _this3.scrollStop = function (event) {
      return _this3.animatedScroll && _this3.animatedScroll.stopAnimation();
    }, _temp) || _assertThisInitialized(_this3);
  }

  var _proto2 = Parallax.prototype;

  _proto2.scrollTo = function scrollTo(offset) {
    var _this$props2 = this.props,
        horizontal = _this$props2.horizontal,
        config$$1 = _this$props2.config,
        impl = _this$props2.impl;
    var scrollType = getScrollType(horizontal);
    this.scrollStop();
    this.offset = offset;
    var target = this.container;
    this.animatedScroll = new AnimatedValue(target[scrollType]);
    this.animatedScroll.addListener(function (_ref) {
      var value = _ref.value;
      return target[scrollType] = value;
    });
    controller(this.animatedScroll, _extends({
      to: offset * this.space
    }, config$$1), impl).start();
  };

  _proto2.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.updateRaf, false);
    this.update();
    this.setState({
      ready: true
    });
  };

  _proto2.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.updateRaf, false);
  };

  _proto2.componentDidUpdate = function componentDidUpdate() {
    this.update();
  };

  _proto2.render = function render() {
    var _this4 = this,
        _extends3;

    var _this$props3 = this.props,
        style = _this$props3.style,
        innerStyle = _this$props3.innerStyle,
        pages = _this$props3.pages,
        className = _this$props3.className,
        scrolling = _this$props3.scrolling,
        children = _this$props3.children,
        horizontal = _this$props3.horizontal;
    var overflow = scrolling ? 'scroll' : 'hidden';
    return React.createElement("div", {
      ref: function ref(node) {
        return _this4.container = node;
      },
      onScroll: this.onScroll,
      onWheel: scrolling ? this.scrollStop : null,
      onTouchStart: scrolling ? this.scrollStop : null,
      style: _extends({
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: overflow,
        overflowY: horizontal ? 'hidden' : overflow,
        overflowX: horizontal ? overflow : 'hidden',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: START_TRANSLATE,
        MsTransform: START_TRANSLATE,
        transform: START_TRANSLATE_3D
      }, style),
      className: className
    }, this.state.ready && React.createElement("div", {
      ref: function ref(node) {
        return _this4.content = node;
      },
      style: _extends((_extends3 = {
        position: 'absolute'
      }, _extends3[horizontal ? 'height' : 'width'] = '100%', _extends3.WebkitTransform = START_TRANSLATE, _extends3.MsTransform = START_TRANSLATE, _extends3.transform = START_TRANSLATE_3D, _extends3.overflow = 'hidden', _extends3[horizontal ? 'width' : 'height'] = this.space * pages, _extends3), innerStyle)
    }, React.createElement(Provider, {
      value: this
    }, children)));
  };

  return Parallax;
}(React.PureComponent);

Parallax.Layer = ParallaxLayer;
Parallax.defaultProps = {
  config: config.slow,
  scrolling: true,
  horizontal: false,
  impl: SpringAnimation
};

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];
var elements = domElements.reduce(function (acc, element) {
  var _extends2;

  return _extends({}, acc, (_extends2 = {}, _extends2[element] = createAnimatedComponent(element), _extends2));
}, {});

assignToFn(createAnimatedComponent, elements);

var createAnimatedComponent$1 = function createAnimatedComponent$$1(comp) {
  return console.warn('createAnimatedComponent is deprecated, use animated(comp) instead') || createAnimatedComponent(comp);
};

exports.Spring = Spring;
exports.Keyframes = Keyframes;
exports.Transition = Transition;
exports.Trail = Trail;
exports.Parallax = Parallax;
exports.ParallaxLayer = ParallaxLayer;
exports.Animation = Animation;
exports.SpringAnimation = SpringAnimation;
exports.AnimatedValue = AnimatedValue;
exports.config = config;
exports.animated = createAnimatedComponent;
exports.controller = controller;
exports.interpolate = interpolate$1;
exports.createAnimatedComponent = createAnimatedComponent$1;
exports.Globals = Globals;
