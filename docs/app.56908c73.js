// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/moment/moment.js":[function(require,module,exports) {
var define;
var global = arguments[3];
//! moment.js
//! version : 2.27.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return (
            input instanceof Array ||
            Object.prototype.toString.call(input) === '[object Array]'
        );
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return (
            input != null &&
            Object.prototype.toString.call(input) === '[object Object]'
        );
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
        } else {
            var k;
            for (k in obj) {
                if (hasOwnProp(obj, k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return (
            typeof input === 'number' ||
            Object.prototype.toString.call(input) === '[object Number]'
        );
    }

    function isDate(input) {
        return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === '[object Date]'
        );
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false,
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this),
                len = t.length >>> 0,
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m),
                parsedParts = some.call(flags.parsedDateParts, function (i) {
                    return i != null;
                }),
                isNowValid =
                    !isNaN(m._d.getTime()) &&
                    flags.overflow < 0 &&
                    !flags.empty &&
                    !flags.invalidEra &&
                    !flags.invalidMonth &&
                    !flags.invalidWeekday &&
                    !flags.weekdayMismatch &&
                    !flags.nullInput &&
                    !flags.invalidFormat &&
                    !flags.userInvalidated &&
                    (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid =
                    isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = (hooks.momentProperties = []),
        updateInProgress = false;

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return (
            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
        );
    }

    function warn(msg) {
        if (
            hooks.suppressDeprecationWarnings === false &&
            typeof console !== 'undefined' &&
            console.warn
        ) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [],
                    arg,
                    i,
                    key;
                for (i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (key in arguments[0]) {
                            if (hasOwnProp(arguments[0], key)) {
                                arg += key + ': ' + arguments[0][key] + ', ';
                            }
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(
                    msg +
                        '\nArguments: ' +
                        Array.prototype.slice.call(args).join('') +
                        '\n' +
                        new Error().stack
                );
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return (
            (typeof Function !== 'undefined' && input instanceof Function) ||
            Object.prototype.toString.call(input) === '[object Function]'
        );
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            if (hasOwnProp(config, i)) {
                prop = config[i];
                if (isFunction(prop)) {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' +
                /\d{1,2}/.source
        );
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (
                hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])
            ) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (
            (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
            absNumber
        );
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        formatFunctions = {},
        formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(
                    func.apply(this, arguments),
                    token
                );
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i])
                    ? array[i].call(mom, format)
                    : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] =
            formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(
                localFormattingTokens,
                replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper
            .match(formattingTokens)
            .map(function (tok) {
                if (
                    tok === 'MMMM' ||
                    tok === 'MM' ||
                    tok === 'DD' ||
                    tok === 'dddd'
                ) {
                    return tok.slice(1);
                }
                return tok;
            })
            .join('');

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d',
        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        w: 'a week',
        ww: '%d weeks',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output)
            ? output(number, withoutSuffix, string, isFuture)
            : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string'
            ? aliases[units] || aliases[units.toLowerCase()]
            : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [],
            u;
        for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
                units.push({ unit: u, priority: priorities[u] });
            }
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid()
            ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
            : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (
                unit === 'FullYear' &&
                isLeapYear(mom.year()) &&
                mom.month() === 1 &&
                mom.date() === 29
            ) {
                value = toInt(value);
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                    value,
                    mom.month(),
                    daysInMonth(value, mom.month())
                );
            } else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units),
                i;
            for (i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    var match1 = /\d/, //       0 - 9
        match2 = /\d\d/, //      00 - 99
        match3 = /\d{3}/, //     000 - 999
        match4 = /\d{4}/, //    0000 - 9999
        match6 = /[+-]?\d{6}/, // -999999 - 999999
        match1to2 = /\d\d?/, //       0 - 99
        match3to4 = /\d\d\d\d?/, //     999 - 9999
        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
        match1to3 = /\d{1,3}/, //       0 - 999
        match1to4 = /\d{1,4}/, //       0 - 9999
        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
        matchUnsigned = /\d+/, //       0 - inf
        matchSigned = /[+-]?\d+/, //    -inf - inf
        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        // any word (or two) characters or numbers including two/three word month in arabic.
        // includes scottish gaelic two word and hyphenated months
        matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        regexes;

    regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex)
            ? regex
            : function (isStrict, localeData) {
                  return isStrict && strictRegex ? strictRegex : regex;
              };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(
            s
                .replace('\\', '')
                .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                    matched,
                    p1,
                    p2,
                    p3,
                    p4
                ) {
                    return p1 || p2 || p3 || p4;
                })
        );
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        WEEK = 7,
        WEEKDAY = 8;

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1
            ? isLeapYear(year)
                ? 29
                : 28
            : 31 - ((modMonth % 7) % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
        ),
        defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
            '_'
        ),
        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        defaultMonthsShortRegex = matchWord,
        defaultMonthsRegex = matchWord;

    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months)
                ? this._months
                : this._months['standalone'];
        }
        return isArray(this._months)
            ? this._months[m.month()]
            : this._months[
                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                      ? 'format'
                      : 'standalone'
              ][m.month()];
    }

    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort)
            ? this._monthsShort[m.month()]
            : this._monthsShort[
                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
              ][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp(
                    '^' + this.months(mom, '').replace('.', '') + '$',
                    'i'
                );
                this._shortMonthsParse[i] = new RegExp(
                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                    'i'
                );
            }
            if (!strict && !this._monthsParse[i]) {
                regex =
                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'MMMM' &&
                this._longMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'MMM' &&
                this._shortMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
        }
    }

    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._monthsShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] =
            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear,
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear,
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
            '_'
        ),
        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        defaultWeekdaysRegex = matchWord,
        defaultWeekdaysShortRegex = matchWord,
        defaultWeekdaysMinRegex = matchWord;

    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays)
            ? this._weekdays
            : this._weekdays[
                  m && m !== true && this._weekdays.isFormat.test(format)
                      ? 'format'
                      : 'standalone'
              ];
        return m === true
            ? shiftWeekdays(weekdays, this._week.dow)
            : m
            ? weekdays[m.day()]
            : weekdays;
    }

    function localeWeekdaysShort(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort[m.day()]
            : this._weekdaysShort;
    }

    function localeWeekdaysMin(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin[m.day()]
            : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._shortWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._minWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
            }
            if (!this._weekdaysParse[i]) {
                regex =
                    '^' +
                    this.weekdays(mom, '') +
                    '|^' +
                    this.weekdaysShort(mom, '') +
                    '|^' +
                    this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'dddd' &&
                this._fullWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'ddd' &&
                this._shortWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'dd' &&
                this._minWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
        }
    }

    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
        }
    }

    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ''));
            shortp = regexEscape(this.weekdaysShort(mom, ''));
            longp = regexEscape(this.weekdays(mom, ''));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._weekdaysShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
        this._weekdaysMinStrictRegex = new RegExp(
            '^(' + minPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return (
            '' +
            hFormat.apply(this) +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return (
            '' +
            this.hours() +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                lowercase
            );
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
        // Setting the hour should keep the time, because the user explicitly
        // specified which hour they want. So trying to maintain the same hour (in
        // a new timezone) makes sense. Adding/subtracting hours does not follow
        // this rule.
        getSetHour = makeGetSet('Hours', true);

    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse,
    };

    // internal storage for locale config files
    var locales = {},
        localeFamilies = {},
        globalLocale;

    function commonPrefix(arr1, arr2) {
        var i,
            minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return i;
            }
        }
        return minl;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (
                    next &&
                    next.length >= j &&
                    commonPrefix(split, next) >= j - 1
                ) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null,
            aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (
            locales[name] === undefined &&
            typeof module !== 'undefined' &&
            module &&
            module.exports
        ) {
            try {
                oldLocale = globalLocale._abbr;
                aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {
                // mark as not found to avoid repeating expensive file require call causing high CPU
                // when trying to find en-US, en_US, en-us for every format call
                locales[name] = null; // null means not found
            }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            } else {
                if (typeof console !== 'undefined' && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn(
                        'Locale ' + key + ' not found. Did you forget to load it?'
                    );
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var locale,
                parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple(
                    'defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                );
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config,
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                tmpLocale,
                parentConfig = baseConfig;

            if (locales[name] != null && locales[name].parentLocale != null) {
                // Update existing child locale in-place to avoid memory-leaks
                locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) {
                    parentConfig = tmpLocale._config;
                }
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) {
                    // updateLocale is called for creating a new locale
                    // Set abbr so it will have a name (getters return
                    // undefined otherwise).
                    config.abbr = name;
                }
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                    if (name === getSetGlobalLocale()) {
                        getSetGlobalLocale(name);
                    }
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow,
            a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH] < 0 || a[MONTH] > 11
                    ? MONTH
                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                    ? DATE
                    : a[HOUR] < 0 ||
                      a[HOUR] > 24 ||
                      (a[HOUR] === 24 &&
                          (a[MINUTE] !== 0 ||
                              a[SECOND] !== 0 ||
                              a[MILLISECOND] !== 0))
                    ? HOUR
                    : a[MINUTE] < 0 || a[MINUTE] > 59
                    ? MINUTE
                    : a[SECOND] < 0 || a[SECOND] > 59
                    ? SECOND
                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                    ? MILLISECOND
                    : -1;

            if (
                getParsingFlags(m)._overflowDayOfYear &&
                (overflow < YEAR || overflow > DATE)
            ) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
            ['YYYY-DDD', /\d{4}-\d{3}/],
            ['YYYY-MM', /\d{4}-\d\d/, false],
            ['YYYYYYMMDD', /[+-]\d{10}/],
            ['YYYYMMDD', /\d{8}/],
            ['GGGG[W]WWE', /\d{4}W\d{3}/],
            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
            ['YYYYDDD', /\d{7}/],
            ['YYYYMM', /\d{6}/, false],
            ['YYYY', /\d{4}/, false],
        ],
        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
            ['HH:mm', /\d\d:\d\d/],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
            ['HHmmss', /\d\d\d\d\d\d/],
            ['HHmm', /\d\d\d\d/],
            ['HH', /\d\d/],
        ],
        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
        rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
        };

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    function extractFromRFC2822Strings(
        yearStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr
    ) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10),
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s
            .replace(/\([^)]*\)|[\n\t]/g, ' ')
            .replace(/(\s\s+)/g, ' ')
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(
                    parsedInput[0],
                    parsedInput[1],
                    parsedInput[2]
                ).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10),
                m = hm % 100,
                h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)),
            parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(
                match[4],
                match[3],
                match[2],
                match[5],
                match[6],
                match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        if (config._strict) {
            config._isValid = false;
        } else {
            // Final attempt, use Input Fallback
            hooks.createFromInputFallback(config);
        }
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
            'discouraged and will be removed in an upcoming major release. Please refer to ' +
            'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [
                nowValue.getUTCFullYear(),
                nowValue.getUTCMonth(),
                nowValue.getUTCDate(),
            ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            expectedWeekday,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (
                config._dayOfYear > daysInYear(yearToUse) ||
                config._dayOfYear === 0
            ) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] =
                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (
            config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0
        ) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
        );
        expectedWeekday = config._useUTC
            ? config._d.getUTCDay()
            : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (
            config._w &&
            typeof config._w.d !== 'undefined' &&
            config._w.d !== expectedWeekday
        ) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(
                w.GG,
                config._a[YEAR],
                weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0,
            era;

        tokens =
            expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(
                    string.indexOf(parsedInput) + parsedInput.length
                );
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver =
            stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (
            config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0
        ) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
        );

        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,
            scoreToBeat,
            i,
            currentScore,
            validFormatFound,
            bestFormatIsValid = false;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (isValid(tempConfig)) {
                validFormatFound = true;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (!bestFormatIsValid) {
                if (
                    scoreToBeat == null ||
                    currentScore < scoreToBeat ||
                    validFormatFound
                ) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) {
                        bestFormatIsValid = true;
                    }
                }
            } else {
                if (currentScore < scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                }
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i),
            dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function (obj) {
                return obj && parseInt(obj, 10);
            }
        );

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (
            (isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)
        ) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other < this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        ),
        prototypeMax = deprecate(
            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other > this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];

    function isDurationValid(m) {
        var key,
            unitHasDecimal = false,
            i;
        for (key in m) {
            if (
                hasOwnProp(m, key) &&
                !(
                    indexOf.call(ordering, key) !== -1 &&
                    (m[key] == null || !isNaN(m[key]))
                )
            ) {
                return false;
            }
        }

        for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds =
            +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (
                (dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
            ) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(),
                sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return (
                sign +
                zeroFill(~~(offset / 60), 2) +
                separator +
                zeroFill(~~offset % 60, 2)
            );
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher),
            chunk,
            parts,
            minutes;

        if (matches === null) {
            return null;
        }

        chunk = matches[matches.length - 1] || [];
        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff =
                (isMoment(input) || isDate(input)
                    ? input.valueOf()
                    : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(
                        this,
                        createDuration(input - offset, 'm'),
                        1,
                        false
                    );
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {},
            other;

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted =
                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        // and further modified to allow for strings containing both week and day
        isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months,
            };
        } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
                duration[key] = +input;
            } else {
                duration.milliseconds = +input;
            }
        } else if ((match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
            };
        } else if ((match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign),
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (
            typeof duration === 'object' &&
            ('from' in duration || 'to' in duration)
        ) {
            diffRes = momentsDifference(
                createLocal(duration.from),
                createLocal(duration.to)
            );

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
            ret._isValid = input._isValid;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months =
            other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(
                    name,
                    'moment().' +
                        name +
                        '(period, number) is deprecated. Please use moment().' +
                        name +
                        '(number, period). ' +
                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                );
                tmp = val;
                val = period;
                period = tmp;
            }

            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add'),
        subtract = createAdder(-1, 'subtract');

    function isString(input) {
        return typeof input === 'string' || input instanceof String;
    }

    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return (
            isMoment(input) ||
            isDate(input) ||
            isString(input) ||
            isNumber(input) ||
            isNumberOrStringArray(input) ||
            isMomentInputObject(input) ||
            input === null ||
            input === undefined
        );
    }

    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'years',
                'year',
                'y',
                'months',
                'month',
                'M',
                'days',
                'day',
                'd',
                'dates',
                'date',
                'D',
                'hours',
                'hour',
                'h',
                'minutes',
                'minute',
                'm',
                'seconds',
                'second',
                's',
                'milliseconds',
                'millisecond',
                'ms',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input),
            dataTypeTest = false;
        if (arrayTest) {
            dataTypeTest =
                input.filter(function (item) {
                    return !isNumber(item) && isString(input);
                }).length === 0;
        }
        return arrayTest && dataTypeTest;
    }

    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'sameDay',
                'nextDay',
                'lastDay',
                'nextWeek',
                'lastWeek',
                'sameElse',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6
            ? 'sameElse'
            : diff < -1
            ? 'lastWeek'
            : diff < 0
            ? 'lastDay'
            : diff < 1
            ? 'sameDay'
            : diff < 2
            ? 'nextDay'
            : diff < 7
            ? 'nextWeek'
            : 'sameElse';
    }

    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse',
            output =
                formats &&
                (isFunction(formats[format])
                    ? formats[format].call(this, now)
                    : formats[format]);

        return this.format(
            output || this.localeData().calendar(format, this, createLocal(now))
        );
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (
            (inclusivity[0] === '('
                ? this.isAfter(localFrom, units)
                : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')'
                ? this.isBefore(localTo, units)
                : !this.isAfter(localTo, units))
        );
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return (
                this.clone().startOf(units).valueOf() <= inputMs &&
                inputMs <= this.clone().endOf(units).valueOf()
            );
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1e3;
                break; // 1000
            case 'minute':
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        if (a.date() < b.date()) {
            // end-of-month calculations work correct when the start month has more
            // days than the end month.
            return -monthDiff(b, a);
        }
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true,
            m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
                m,
                utc
                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                    .toISOString()
                    .replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(
            m,
            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
        );
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment',
            zone = '',
            prefix,
            year,
            datetime,
            suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        prefix = '[' + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        datetime = '-MM-DD[T]HH:mm:ss.SSS';
        suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ to: this, from: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ from: this, to: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData() {
        return this._locale;
    }

    var MS_PER_SECOND = 1000,
        MS_PER_MINUTE = 60 * MS_PER_SECOND,
        MS_PER_HOUR = 60 * MS_PER_MINUTE,
        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return ((dividend % divisor) + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(
                    this.year(),
                    this.month() - (this.month() % 3),
                    1
                );
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday()
                );
                break;
            case 'isoWeek':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1)
                );
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(
                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                    MS_PER_HOUR
                );
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time =
                    startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3) + 3,
                        1
                    ) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday() + 7
                    ) - 1;
                break;
            case 'isoWeek':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1) + 7
                    ) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time +=
                    MS_PER_HOUR -
                    mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    ) -
                    1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(),
        ];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds(),
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
        };
    }

    addFormatToken('N', 0, 0, 'eraAbbr');
    addFormatToken('NN', 0, 0, 'eraAbbr');
    addFormatToken('NNN', 0, 0, 'eraAbbr');
    addFormatToken('NNNN', 0, 0, 'eraName');
    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
    addFormatToken('y', ['yy', 2], 0, 'eraYear');
    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

    addRegexToken('N', matchEraAbbr);
    addRegexToken('NN', matchEraAbbr);
    addRegexToken('NNN', matchEraAbbr);
    addRegexToken('NNNN', matchEraName);
    addRegexToken('NNNNN', matchEraNarrow);

    addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
        input,
        array,
        config,
        token
    ) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) {
            getParsingFlags(config).era = era;
        } else {
            getParsingFlags(config).invalidEra = input;
        }
    });

    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);

    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
    addParseToken(['yo'], function (input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
        }

        if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
            array[YEAR] = parseInt(input, 10);
        }
    });

    function localeEras(m, format) {
        var i,
            l,
            date,
            eras = this._eras || getLocale('en')._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }

            switch (typeof eras[i].until) {
                case 'undefined':
                    eras[i].until = +Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }

    function localeErasParse(eraName, format, strict) {
        var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
        eraName = eraName.toUpperCase();

        for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();

            if (strict) {
                switch (format) {
                    case 'N':
                    case 'NN':
                    case 'NNN':
                        if (abbr === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNN':
                        if (name === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNNN':
                        if (narrow === eraName) {
                            return eras[i];
                        }
                        break;
                }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
            }
        }
    }

    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? +1 : -1;
        if (year === undefined) {
            return hooks(era.since).year();
        } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
        }
    }

    function getEraName() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
            }
        }

        return '';
    }

    function getEraNarrow() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
            }
        }

        return '';
    }

    function getEraAbbr() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
            }
        }

        return '';
    }

    function getEraYear() {
        var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;

            // truncate time
            val = this.startOf('day').valueOf();

            if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
            ) {
                return (
                    (this.year() - hooks(eras[i].since).year()) * dir +
                    eras[i].offset
                );
            }
        }

        return this.year();
    }

    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }

    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }

    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }

    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }

    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }

    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }

    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }

    function computeErasParse() {
        var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();

        for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));

            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }

        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp(
            '^(' + narrowPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
        );
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
        );
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear =
            Math.round(
                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
            ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token, getSetMillisecond;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }

    getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
            return 'Moment<' + this.format() + '>';
        };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
        'dates accessor is deprecated. Use date instead.',
        getSetDayOfMonth
    );
    proto.months = deprecate(
        'months accessor is deprecated. Use month instead',
        getSetMonth
    );
    proto.years = deprecate(
        'years accessor is deprecated. Use year instead',
        getSetYear
    );
    proto.zone = deprecate(
        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
        getSetZone
    );
    proto.isDSTShifted = deprecate(
        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
        isDaylightSavingTimeShifted
    );

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;

    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale(),
            utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i,
            out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: +Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
            },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    toInt((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                        ? 'st'
                        : b === 2
                        ? 'nd'
                        : b === 3
                        ? 'rd'
                        : 'th';
            return number + output;
        },
    });

    // Side effect imports

    hooks.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        getSetGlobalLocale
    );
    hooks.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        getLocale
    );

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (
            !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
            )
        ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return (days * 4800) / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return (months * 146097) / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days,
            months,
            milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms'),
        asSeconds = makeAs('s'),
        asMinutes = makeAs('m'),
        asHours = makeAs('h'),
        asDays = makeAs('d'),
        asWeeks = makeAs('w'),
        asMonths = makeAs('M'),
        asQuarters = makeAs('Q'),
        asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds'),
        seconds = makeGetter('seconds'),
        minutes = makeGetter('minutes'),
        hours = makeGetter('hours'),
        days = makeGetter('days'),
        months = makeGetter('months'),
        years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round,
        thresholds = {
            ss: 44, // a few seconds to seconds
            s: 45, // seconds to minute
            m: 45, // minutes to hour
            h: 22, // hours to day
            d: 26, // days to month/week
            w: null, // weeks to month
            M: 11, // months to year
        };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            weeks = round(duration.as('w')),
            years = round(duration.as('y')),
            a =
                (seconds <= thresholds.ss && ['s', seconds]) ||
                (seconds < thresholds.s && ['ss', seconds]) ||
                (minutes <= 1 && ['m']) ||
                (minutes < thresholds.m && ['mm', minutes]) ||
                (hours <= 1 && ['h']) ||
                (hours < thresholds.h && ['hh', hours]) ||
                (days <= 1 && ['d']) ||
                (days < thresholds.d && ['dd', days]);

        if (thresholds.w != null) {
            a =
                a ||
                (weeks <= 1 && ['w']) ||
                (weeks < thresholds.w && ['ww', weeks]);
        }
        a = a ||
            (months <= 1 && ['M']) ||
            (months < thresholds.M && ['MM', months]) ||
            (years <= 1 && ['y']) || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var withSuffix = false,
            th = thresholds,
            locale,
            output;

        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') {
            withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === 'object') {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
            }
        }

        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

        totalSign = total < 0 ? '-' : '';
        ymSign = sign(this._months) !== sign(total) ? '-' : '';
        daysSign = sign(this._days) !== sign(total) ? '-' : '';
        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return (
            totalSign +
            'P' +
            (years ? ymSign + years + 'Y' : '') +
            (months ? ymSign + months + 'M' : '') +
            (days ? daysSign + days + 'D' : '') +
            (hours || minutes || seconds ? 'T' : '') +
            (hours ? hmsSign + hours + 'H' : '') +
            (minutes ? hmsSign + minutes + 'M' : '') +
            (seconds ? hmsSign + s + 'S' : '')
        );
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    proto$2.toIsoString = deprecate(
        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
        toISOString$1
    );
    proto$2.lang = lang;

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    //! moment.js

    hooks.version = '2.27.0';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD', // <input type="date" />
        TIME: 'HH:mm', // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW', // <input type="week" />
        MONTH: 'YYYY-MM', // <input type="month" />
    };

    return hooks;

})));

},{}],"node_modules/@svgdotjs/svg.js/dist/svg.esm.js":[function(require,module,exports) {
var global = arguments[3];

var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adopt = adopt;
exports.assignNewId = assignNewId;
exports.create = create;
exports.dispatch = dispatch;
exports.eid = eid;
exports.extend = extend;
exports.find = baseFind;
exports.getClass = getClass;
exports.invent = invent;
exports.makeInstance = makeInstance;
exports.makeMorphable = makeMorphable;
exports.mockAdopt = mockAdopt;
exports.nodeOrNew = nodeOrNew;
exports.off = off;
exports.on = on;
exports.parser = parser;
exports.register = register;
exports.registerMorphableType = registerMorphableType;
exports.registerWindow = registerWindow;
exports.wrapWithAttrCheck = wrapWithAttrCheck;
exports.utils = exports.root = exports.regex = exports.namespaces = exports.easing = exports.defaults = exports.Use = exports.Tspan = exports.TransformBag = exports.Timeline = exports.TextPath = exports.Text = exports.Symbol = exports.Svg = exports.Style = exports.Stop = exports.Spring = exports.Shape = exports.SVG = exports.Runner = exports.Rect = exports.Queue = exports.Polyline = exports.Polygon = exports.PointArray = exports.Point = exports.Pattern = exports.PathArray = exports.Path = exports.PID = exports.ObjectBag = exports.Number = exports.NonMorphable = exports.Morphable = exports.Matrix = exports.Mask = exports.Marker = exports.List = exports.Line = exports.Image = exports.Gradient = exports.G = exports.ForeignObject = exports.EventTarget = exports.Ellipse = exports.Element = exports.Ease = exports.Dom = exports.Defs = exports.Controller = exports.Container = exports.Color = exports.ClipPath = exports.Circle = exports.Box = exports.Array = exports.Animator = exports.A = void 0;

/*!
* @svgdotjs/svg.js - A lightweight library for manipulating and animating SVG.
* @version 3.0.16
* https://svgdotjs.github.io/
*
* @copyright Wout Fierens <wout@mick-wout.com>
* @license MIT
*
* BUILT: Tue Nov 12 2019 21:57:16 GMT+0100 (GMT+01:00)
*/
;
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global_1 = // eslint-disable-next-line no-undef
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
}; // Thank's IE8 for his funny defineProperty


var descriptors = !fails(function () {
  return Object.defineProperty({}, 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});
var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;
var objectPropertyIsEnumerable = {
  f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object; // `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
}; // toObject with fallback for non-array-like ES3 strings


var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
}; // `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
}; // Thank's IE8 for his funny defineProperty


var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};
var objectGetOwnPropertyDescriptor = {
  f: f$1
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var objectDefineProperty = {
  f: f$2
};
var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  }

  return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});
var sharedStore = store;
var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.3.6',
    mode: 'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
});
var functionToString = shared('native-function-to-string', Function.toString);
var WeakMap = global_1.WeakMap;
var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));
var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};
var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;

  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store$1, it) || {};
  };

  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };

  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};
var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(functionToString).split('toString');
  shared('inspectSource', function (it) {
    return functionToString.call(it);
  });
  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;

    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }

    if (O === global_1) {
      if (simple) O[key] = value;else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
  });
});
var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).

var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
}; // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};
var indexOf = arrayIncludes.indexOf;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
}; // IE8- don't enum bug keys


var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
  f: f$3
};
var f$4 = Object.getOwnPropertySymbols;
var objectGetOwnPropertySymbols = {
  f: f$4
}; // all object keys, includes non-enumerable and symbols

var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
var isForced_1 = isForced;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/

var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
}; // `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray


var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});
var Symbol$1 = global_1.Symbol;
var store$2 = shared('wks');

var wellKnownSymbol = function (name) {
  return store$2[name] || (store$2[name] = nativeSymbol && Symbol$1[name] || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
};

var userAgent = getBuiltIn('navigator', 'userAgent') || '';
var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var v8Version = version && +version;
var SPECIES = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return v8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var SPECIES$1 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('slice')
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$1];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

    result.length = n;
    return result;
  }
});

var defineProperty = objectDefineProperty.f;
var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name

if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
var toString$1 = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
  f: f$5
};
var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
var FAILS_ON_PRIMITIVES = fails(function () {
  return !Object.getOwnPropertyNames(1);
}); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  getOwnPropertyNames: nativeGetOwnPropertyNames$1
});

function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof2(obj);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
} // `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject


var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
}; // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys


var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
}; // `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties


var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

  return O;
};
var html = getBuiltIn('document', 'documentElement');
var IE_PROTO = sharedKey('IE_PROTO');
var PROTOTYPE = 'prototype';

var Empty = function () {
  /* empty */
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;

  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];

  return createDict();
}; // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create


var objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = createDict();

  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;
var f$6 = wellKnownSymbol;
var wrappedWellKnownSymbol = {
  f: f$6
};
var defineProperty$1 = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
    value: wrappedWellKnownSymbol.f(NAME)
  });
};

var defineProperty$2 = objectDefineProperty.f;
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty$2(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG
    });
  }
};

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
}; // optional / simple context binding


var bindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

var SPECIES$2 = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function (originalArray, length) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES$2];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = bindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push.call(target, value);
            // filter
          } else if (IS_EVERY) return false; // every
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};
var $forEach = arrayIteration.forEach;
var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE$1];
var $Symbol = global_1.Symbol;
var JSON$1 = global_1.JSON;
var nativeJSONStringify = JSON$1 && JSON$1.stringify;
var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var nativeDefineProperty$1 = objectDefineProperty.f;
var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = descriptors && fails(function () {
  return objectCreate(nativeDefineProperty$1({}, 'a', {
    get: function () {
      return nativeDefineProperty$1(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty$1(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!descriptors) symbol.description = description;
  return symbol;
};

var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty$1(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames$2(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames$2(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor


if (!nativeSymbol) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
      configurable: true,
      set: setter
    });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState(this).tag;
  });
  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
  objectDefineProperty.f = $defineProperty;
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
        unsafe: true
      });
    }
  }

  wrappedWellKnownSymbol.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };
}

_export({
  global: true,
  wrap: true,
  forced: !nativeSymbol,
  sham: !nativeSymbol
}, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

_export({
  target: SYMBOL,
  stat: true,
  forced: !nativeSymbol
}, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});

_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol,
  sham: !descriptors
}, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443


_export({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    objectGetOwnPropertySymbols.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return objectGetOwnPropertySymbols.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify


JSON$1 && _export({
  target: 'JSON',
  stat: true,
  forced: !nativeSymbol || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return nativeJSONStringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || nativeJSONStringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || nativeJSONStringify(Object(symbol)) != '{}';
  })
}, {
  stringify: function stringify(it) {
    var args = [it];
    var index = 1;
    var replacer, $replacer;

    while (arguments.length > index) args.push(arguments[index++]);

    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return nativeJSONStringify.apply(JSON$1, args);
  }
}); // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive

if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;
var defineProperty$3 = objectDefineProperty.f;
var NativeSymbol = global_1.Symbol;

if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
NativeSymbol().description !== undefined)) {
  var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
    : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;
  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty$3(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  _export({
    global: true,
    forced: true
  }, {
    Symbol: SymbolWrapper
  });
} // `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator


defineWellKnownSymbol('iterator');
var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, objectCreate(null));
} // add a key to Array.prototype[@@unscopables]


var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var iterators = {};
var correctPrototypeGetter = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});
var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype$1 = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype$1 : null;
};
var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () {
  return this;
}; // `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

if (!has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};
var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var returnThis$1 = function () {
  return this;
};

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
}; // `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */


var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);
var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$2 = function () {
  return this;
};

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
        }
      } // Set @@toStringTag to native iterators


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
  }

  iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$1(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
var nativeAssign = Object.assign; // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
// should work with symbols and should have deterministic property order (V8 bug)

var objectAssign = !nativeAssign || fails(function () {
  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  }

  return T;
} : nativeAssign; // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign

_export({
  target: 'Object',
  stat: true,
  forced: Object.assign !== objectAssign
}, {
  assign: objectAssign
});

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG$2] = 'z'; // `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

var objectToString = String(test) !== '[object z]' ? function toString() {
  return '[object ' + classof(this) + ']';
} : test.toString;
var ObjectPrototype$2 = Object.prototype; // `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

if (objectToString !== ObjectPrototype$2.toString) {
  redefine(ObjectPrototype$2, 'toString', objectToString, {
    unsafe: true
  });
}

var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});
var internalMetadata = createCommonjsModule(function (module) {
  var defineProperty = objectDefineProperty.f;
  var METADATA = uid('meta');
  var id = 0;

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, {
      value: {
        objectID: 'O' + ++id,
        // object ID
        weakData: {} // weak collections IDs

      }
    });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMetadata(it); // return object ID
    }

    return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMetadata(it); // return the store of weak collections IDs
    }

    return it[METADATA].weakData;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function (it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };
  hiddenKeys[METADATA] = true;
});
var ITERATOR$2 = wellKnownSymbol('iterator');
var ArrayPrototype$1 = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
};

var ITERATOR$3 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)];
}; // call something on iterator step with safe closing on error


var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var iterate_1 = createCommonjsModule(function (module) {
  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
    var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
    var iterator, iterFn, index, length, result, next, step;

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
          if (result && result instanceof Result) return result;
        }

        return new Result(false);
      }

      iterator = iterFn.call(iterable);
    }

    next = iterator.next;

    while (!(step = next.call(iterator)).done) {
      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
      if (typeof result == 'object' && result && result instanceof Result) return result;
    }

    return new Result(false);
  };

  iterate.stop = function (result) {
    return new Result(true, result);
  };
});

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};

var ITERATOR$4 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR$4] = function () {
    return this;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR$4] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
}; // makes subclassing work correct for wrapped built-ins


var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if ( // it can work only with native `setPrototypeOf`
  objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var collection = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var ADDER = IS_MAP ? 'set' : 'add';
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
      nativeMethod.call(this, value === 0 ? 0 : value);
      return this;
    } : KEY == 'delete' ? function (key) {
      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'get' ? function get(key) {
      return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'has' ? function has(key) {
      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : function set(key, value) {
      nativeMethod.call(this, key === 0 ? 0 : key, value);
      return this;
    });
  }; // eslint-disable-next-line max-len


  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new

    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
      new NativeConstructor(iterable);
    }); // for early implementations -0 and +0 not the same

    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;

      while (index--) $instance[ADDER](index, index);

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;

  _export({
    global: true,
    forced: Constructor != NativeConstructor
  }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};

var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);

  return target;
};

var SPECIES$3 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

var defineProperty$4 = objectDefineProperty.f;
var fastKey = internalMetadata.fastKey;
var setInternalState$2 = internalState.set;
var internalStateGetterFor = internalState.getterFor;
var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$2(that, {
        type: CONSTRUCTOR_NAME,
        index: objectCreate(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!descriptors) that.size = 0;
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index; // change existing entry

      if (entry) {
        entry.value = value; // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (descriptors) state.size++;else that.size++; // add to index

        if (index !== 'F') state.index[index] = entry;
      }

      return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that); // fast case

      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index]; // frozen object case

      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;

        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }

        state.first = state.last = undefined;
        if (descriptors) state.size = 0;else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);

        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (descriptors) state.size--;else that.size--;
        }

        return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn
      /* , that = undefined */
      ) {
        var state = getInternalState(this);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;

        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this); // revert to the last existing entry

          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });
    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (descriptors) defineProperty$4(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME); // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState$2(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last; // revert to the last existing entry

      while (entry && entry.removed) entry = entry.previous; // get next entry


      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return {
          value: undefined,
          done: true
        };
      } // return step by kind


      if (kind == 'keys') return {
        value: entry.key,
        done: false
      };
      if (kind == 'values') return {
        value: entry.value,
        done: false
      };
      return {
        value: [entry.key, entry.value],
        done: false
      };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

    setSpecies(CONSTRUCTOR_NAME);
  }
}; // `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects

var es_set = collection('Set', function (get) {
  return function Set() {
    return get(this, arguments.length ? arguments[0] : undefined);
  };
}, collectionStrong); // `String.prototype.{ codePointAt, at }` methods implementation

var createMethod$2 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$2(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$2(true)
};
var charAt = stringMultibyte.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState$3 = internalState.set;
var getInternalState$2 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState$3(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$2(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
}); // iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods

var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};
var ITERATOR$5 = wellKnownSymbol('iterator');
var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$5] = ArrayValues;
    }

    if (!CollectionPrototype[TO_STRING_TAG$3]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
    }

    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

var methods = {};
var names = [];

function registerMethods(name, m) {
  if (Array.isArray(name)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = name[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _name = _step.value;
        registerMethods(_name, m);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return;
  }

  if (_typeof(name) === 'object') {
    for (var _name2 in name) {
      registerMethods(_name2, name[_name2]);
    }

    return;
  }

  addMethodNames(Object.getOwnPropertyNames(m));
  methods[name] = Object.assign(methods[name] || {}, m);
}

function getMethodsFor(name) {
  return methods[name] || {};
}

function getMethodNames() {
  return _toConsumableArray(new Set(names));
}

function addMethodNames(_names) {
  names.push.apply(names, _toConsumableArray(_names));
}

var $includes = arrayIncludes.includes; // `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes

_export({
  target: 'Array',
  proto: true
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables


addToUnscopables('includes'); // `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.

var nativeReplace = String.prototype.replace;
var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

_export({
  target: 'RegExp',
  proto: true,
  forced: /./.exec !== regexpExec
}, {
  exec: regexpExec
});

var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};

var MATCH$1 = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH$1] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) {
      /* empty */
    }
  }

  return false;
}; // `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes


_export({
  target: 'String',
  proto: true,
  forced: !correctIsRegexpLogic('includes')
}, {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~String(requireObjectCoercible(this)).indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var SPECIES$4 = wellKnownSymbol('species');
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;

  re.exec = function () {
    var result = [];
    result.groups = {
      a: '7'
    };
    return result;
  };

  return ''.replace(re, '$<a>') !== '7';
}); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;

  re.exec = function () {
    return originalExec.apply(this, arguments);
  };

  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);
  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.

      re.constructor = {};

      re.constructor[SPECIES$4] = function () {
        return re;
      };

      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return {
            done: true,
            value: nativeRegExpMethod.call(regexp, str, arg2)
          };
        }

        return {
          done: true,
          value: nativeMethod.call(str, regexp, arg2)
        };
      }

      return {
        done: false
      };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];
    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return regexMethod.call(string, this, arg);
    } // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return regexMethod.call(string, this);
    });
    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
  }
};

var charAt$1 = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex

var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
}; // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec


var regexpExecAbstract = function (R, S) {
  var exec = R.exec;

  if (typeof exec === 'function') {
    var result = exec.call(R, S);

    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }

    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

var max$2 = Math.max;
var min$2 = Math.min;
var floor$1 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
}; // @@replace logic


fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
  return [// `String.prototype.replace` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
    return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
  }, // `RegExp.prototype[@@replace]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
  function (regexp, replaceValue) {
    var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    var global = rx.global;

    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }

    var results = [];

    while (true) {
      var result = regexpExecAbstract(rx, S);
      if (result === null) break;
      results.push(result);
      if (!global) break;
      var matchStr = String(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
    }

    var accumulatedResult = '';
    var nextSourcePosition = 0;

    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = String(result[0]);
      var position = max$2(min$2(toInteger(result.index), S.length), 0);
      var captures = []; // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

      var namedCaptures = result.groups;

      if (functionalReplace) {
        var replacerArgs = [matched].concat(captures, position, S);
        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
        var replacement = String(replaceValue.apply(undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }

      if (position >= nextSourcePosition) {
        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return accumulatedResult + S.slice(nextSourcePosition);
  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }

    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;

      switch (ch.charAt(0)) {
        case '$':
          return '$';

        case '&':
          return matched;

        case '`':
          return str.slice(0, position);

        case "'":
          return str.slice(tailPos);

        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;

        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;

          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  }
}); // a string of all valid unicode whitespaces
// eslint-disable-next-line max-len

var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod$3 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$3(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$3(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$3(3)
};
var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
// of whitespaces and has a correct name

var forcedStringTrimMethod = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $trim = stringTrim.trim; // `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim

_export({
  target: 'String',
  proto: true,
  forced: forcedStringTrimMethod('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
}); // Map function


function map(array, block) {
  var i;
  var il = array.length;
  var result = [];

  for (i = 0; i < il; i++) {
    result.push(block(array[i]));
  }

  return result;
} // Filter function


function filter(array, block) {
  var i;
  var il = array.length;
  var result = [];

  for (i = 0; i < il; i++) {
    if (block(array[i])) {
      result.push(array[i]);
    }
  }

  return result;
} // Degrees to radians


function radians(d) {
  return d % 360 * Math.PI / 180;
} // Radians to degrees


function degrees(r) {
  return r * 180 / Math.PI % 360;
} // Convert dash-separated-string to camelCase


function camelCase(s) {
  return s.toLowerCase().replace(/-(.)/g, function (m, g) {
    return g.toUpperCase();
  });
} // Convert camel cased string to string seperated


function unCamelCase(s) {
  return s.replace(/([A-Z])/g, function (m, g) {
    return '-' + g.toLowerCase();
  });
} // Capitalize first letter of a string


function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
} // Calculate proportional width and height values when necessary


function proportionalSize(element, width, height, box) {
  if (width == null || height == null) {
    box = box || element.bbox();

    if (width == null) {
      width = box.width / box.height * height;
    } else if (height == null) {
      height = box.height / box.width * width;
    }
  }

  return {
    width: width,
    height: height
  };
}

function getOrigin(o, element) {
  // Allow origin or around as the names
  var origin = o.origin; // o.around == null ? o.origin : o.around

  var ox, oy; // Allow the user to pass a string to rotate around a given point

  if (typeof origin === 'string' || origin == null) {
    // Get the bounding box of the element with no transformations applied
    var string = (origin || 'center').toLowerCase().trim();

    var _element$bbox = element.bbox(),
        height = _element$bbox.height,
        width = _element$bbox.width,
        x = _element$bbox.x,
        y = _element$bbox.y; // Calculate the transformed x and y coordinates


    var bx = string.includes('left') ? x : string.includes('right') ? x + width : x + width / 2;
    var by = string.includes('top') ? y : string.includes('bottom') ? y + height : y + height / 2; // Set the bounds eg : "bottom-left", "Top right", "middle" etc...

    ox = o.ox != null ? o.ox : bx;
    oy = o.oy != null ? o.oy : by;
  } else {
    ox = origin[0];
    oy = origin[1];
  } // Return the origin as it is if it wasn't a string


  return [ox, oy];
}

var utils = {
  __proto__: null,
  map: map,
  filter: filter,
  radians: radians,
  degrees: degrees,
  camelCase: camelCase,
  unCamelCase: unCamelCase,
  capitalize: capitalize,
  proportionalSize: proportionalSize,
  getOrigin: getOrigin
}; // Default namespaces

exports.utils = utils;
var ns = 'http://www.w3.org/2000/svg';
var xmlns = 'http://www.w3.org/2000/xmlns/';
var xlink = 'http://www.w3.org/1999/xlink';
var svgjs = 'http://svgjs.com/svgjs';
var namespaces = {
  __proto__: null,
  ns: ns,
  xmlns: xmlns,
  xlink: xlink,
  svgjs: svgjs
};
exports.namespaces = namespaces;
var globals = {
  window: typeof window === 'undefined' ? null : window,
  document: typeof document === 'undefined' ? null : document
};

function registerWindow() {
  var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  globals.window = win;
  globals.document = doc;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Base = function Base() {
  _classCallCheck(this, Base);
};

var elements = {};
var root = '___SYMBOL___ROOT___'; // Method for element creation

exports.root = root;

function create(name) {
  // create element
  return globals.document.createElementNS(ns, name);
}

function makeInstance(element) {
  if (element instanceof Base) return element;

  if (_typeof(element) === 'object') {
    return adopter(element);
  }

  if (element == null) {
    return new elements[root]();
  }

  if (typeof element === 'string' && element.charAt(0) !== '<') {
    return adopter(globals.document.querySelector(element));
  }

  var node = create('svg');
  node.innerHTML = element; // We can use firstChild here because we know,
  // that the first char is < and thus an element

  element = adopter(node.firstChild);
  return element;
}

function nodeOrNew(name, node) {
  return node instanceof globals.window.Node ? node : create(name);
} // Adopt existing svg elements


function adopt(node) {
  // check for presence of node
  if (!node) return null; // make sure a node isn't already adopted

  if (node.instance instanceof Base) return node.instance; // initialize variables

  var className = capitalize(node.nodeName || 'Dom'); // Make sure that gradients are adopted correctly

  if (className === 'LinearGradient' || className === 'RadialGradient') {
    className = 'Gradient'; // Fallback to Dom if element is not known
  } else if (!elements[className]) {
    className = 'Dom';
  }

  return new elements[className](node);
}

var adopter = adopt;

function mockAdopt() {
  var mock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : adopt;
  adopter = mock;
}

function register(element) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : element.name;
  var asRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  elements[name] = element;
  if (asRoot) elements[root] = element;
  addMethodNames(Object.getOwnPropertyNames(element.prototype));
  return element;
}

function getClass(name) {
  return elements[name];
} // Element id sequence


var did = 1000; // Get next named element id

function eid(name) {
  return 'Svgjs' + capitalize(name) + did++;
} // Deep new id assignment


function assignNewId(node) {
  // do the same for SVG child nodes as well
  for (var i = node.children.length - 1; i >= 0; i--) {
    assignNewId(node.children[i]);
  }

  if (node.id) {
    return adopt(node).id(eid(node.nodeName));
  }

  return adopt(node);
} // Method for extending objects


function extend(modules, methods, attrCheck) {
  var key, i;
  modules = Array.isArray(modules) ? modules : [modules];

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) {
      var method = methods[key];

      if (attrCheck) {
        method = wrapWithAttrCheck(methods[key]);
      }

      modules[i].prototype[key] = method;
    }
  }
} // export function extendWithAttrCheck (...args) {
//   extend(...args, true)
// }


function wrapWithAttrCheck(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var o = args[args.length - 1];

    if (o && o.constructor === Object && !(o instanceof Array)) {
      return fn.apply(this, args.slice(0, -1)).attr(o);
    } else {
      return fn.apply(this, args);
    }
  };
}

function invent(config) {
  // Create element initializer
  var initializer = typeof config.create === 'function' ? config.create : function (node) {
    this.constructor(node || create(config.create));
  }; // Inherit prototype

  if (config.inherit) {
    /* eslint new-cap: off */
    initializer.prototype = new config.inherit();
    initializer.prototype.constructor = initializer;
  } // Extend with methods


  if (config.extend) {
    extend(initializer, config.extend);
  } // Attach construct method to parent


  if (config.construct) {
    extend(config.parent || elements.Container, config.construct);
  }

  return initializer;
}

function siblings() {
  return this.parent().children();
} // Get the curent position siblings


function position() {
  return this.parent().index(this);
} // Get the next element (will return null if there is none)


function next() {
  return this.siblings()[this.position() + 1];
} // Get the next element (will return null if there is none)


function prev() {
  return this.siblings()[this.position() - 1];
} // Send given element one step forward


function forward() {
  var i = this.position() + 1;
  var p = this.parent(); // move node one step forward

  p.removeElement(this).add(this, i); // make sure defs node is always at the top

  if (typeof p.isRoot === 'function' && p.isRoot()) {
    p.node.appendChild(p.defs().node);
  }

  return this;
} // Send given element one step backward


function backward() {
  var i = this.position();

  if (i > 0) {
    this.parent().removeElement(this).add(this, i - 1);
  }

  return this;
} // Send given element all the way to the front


function front() {
  var p = this.parent(); // Move node forward

  p.node.appendChild(this.node); // Make sure defs node is always at the top

  if (typeof p.isRoot === 'function' && p.isRoot()) {
    p.node.appendChild(p.defs().node);
  }

  return this;
} // Send given element all the way to the back


function back() {
  if (this.position() > 0) {
    this.parent().removeElement(this).add(this, 0);
  }

  return this;
} // Inserts a given element before the targeted element


function before(element) {
  element = makeInstance(element);
  element.remove();
  var i = this.position();
  this.parent().add(element, i);
  return this;
} // Inserts a given element after the targeted element


function after(element) {
  element = makeInstance(element);
  element.remove();
  var i = this.position();
  this.parent().add(element, i + 1);
  return this;
}

function insertBefore(element) {
  element = makeInstance(element);
  element.before(this);
  return this;
}

function insertAfter(element) {
  element = makeInstance(element);
  element.after(this);
  return this;
}

registerMethods('Dom', {
  siblings: siblings,
  position: position,
  next: next,
  prev: prev,
  forward: forward,
  backward: backward,
  front: front,
  back: back,
  before: before,
  after: after,
  insertBefore: insertBefore,
  insertAfter: insertAfter
});
var $filter = arrayIteration.filter; // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('filter')
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var sloppyArrayMethod = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

var $indexOf = arrayIncludes.indexOf;
var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf'); // `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

_export({
  target: 'Array',
  proto: true,
  forced: NEGATIVE_ZERO || SLOPPY_METHOD
}, {
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var nativeJoin = [].join;
var ES3_STRINGS = indexedObject != Object;
var SLOPPY_METHOD$1 = sloppyArrayMethod('join', ','); // `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join

_export({
  target: 'Array',
  proto: true,
  forced: ES3_STRINGS || SLOPPY_METHOD$1
}, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

var SPECIES$5 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor

var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
};

var arrayPush = [].push;
var min$3 = Math.min;
var MAX_UINT32 = 0xFFFFFFFF; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

var SUPPORTS_Y = !fails(function () {
  return !RegExp(MAX_UINT32, 'y');
}); // @@split logic

fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;

  if ('abbc'.split(/(b)*/)[1] == 'c' || 'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

      if (!isRegexp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }

      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;

      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }

        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }

      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output.length > lim ? output.slice(0, lim) : output;
    }; // Chakra, V8

  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [// `String.prototype.split` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = requireObjectCoercible(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  }, // `RegExp.prototype[@@split]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var C = speciesConstructor(rx, RegExp);
    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.

    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];

    while (q < S.length) {
      splitter.lastIndex = SUPPORTS_Y ? q : 0;
      var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
      var e;

      if (z === null || (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
        q = advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;

        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }

        q = p = e;
      }
    }

    A.push(S.slice(p));
    return A;
  }];
}, !SUPPORTS_Y); // Parse unit value

var numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i; // Parse hex value

var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i; // Parse rgb value

var rgb = /rgb\((\d+),(\d+),(\d+)\)/; // Parse reference id

var reference = /(#[a-z0-9\-_]+)/i; // splits a transformation chain

var transforms = /\)\s*,?\s*/; // Whitespace

var whitespace$1 = /\s/g; // Test hex value

var isHex = /^#[a-f0-9]{3,6}$/i; // Test rgb value

var isRgb = /^rgb\(/; // Test css declaration

var isCss = /[^:]+:[^;]+;?/; // Test for blank string

var isBlank = /^(\s+)?$/; // Test for numeric string

var isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i; // Test for percent value

var isPercent = /^-?[\d.]+%$/; // Test for image url

var isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i; // split at whitespace and comma

var delimiter = /[\s,]+/; // The following regex are used to parse the d attribute of a path
// Matches all hyphens which are not after an exponent

var hyphen = /([^e])-/gi; // Replaces and tests for all path letters

var pathLetters = /[MLHVCSQTAZ]/gi; // yes we need this one, too

var isPathLetter = /[MLHVCSQTAZ]/i; // matches 0.154.23.45

var numbersWithDots = /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi; // matches .

var dots = /\./g;
var regex = {
  __proto__: null,
  numberAndUnit: numberAndUnit,
  hex: hex,
  rgb: rgb,
  reference: reference,
  transforms: transforms,
  whitespace: whitespace$1,
  isHex: isHex,
  isRgb: isRgb,
  isCss: isCss,
  isBlank: isBlank,
  isNumber: isNumber,
  isPercent: isPercent,
  isImage: isImage,
  delimiter: delimiter,
  hyphen: hyphen,
  pathLetters: pathLetters,
  isPathLetter: isPathLetter,
  numbersWithDots: numbersWithDots,
  dots: dots
};
exports.regex = regex;

function classes() {
  var attr = this.attr('class');
  return attr == null ? [] : attr.trim().split(delimiter);
} // Return true if class exists on the node, false otherwise


function hasClass(name) {
  return this.classes().indexOf(name) !== -1;
} // Add class to the node


function addClass(name) {
  if (!this.hasClass(name)) {
    var array = this.classes();
    array.push(name);
    this.attr('class', array.join(' '));
  }

  return this;
} // Remove class from the node


function removeClass(name) {
  if (this.hasClass(name)) {
    this.attr('class', this.classes().filter(function (c) {
      return c !== name;
    }).join(' '));
  }

  return this;
} // Toggle the presence of a class on the node


function toggleClass(name) {
  return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
}

registerMethods('Dom', {
  classes: classes,
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass
});
var $forEach$1 = arrayIteration.forEach; // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach; // `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

_export({
  target: 'Array',
  proto: true,
  forced: [].forEach != arrayForEach
}, {
  forEach: arrayForEach
});

for (var COLLECTION_NAME$1 in domIterables) {
  var Collection$1 = global_1[COLLECTION_NAME$1];
  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

  if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
    createNonEnumerableProperty(CollectionPrototype$1, 'forEach', arrayForEach);
  } catch (error) {
    CollectionPrototype$1.forEach = arrayForEach;
  }
}

function css(style, val) {
  var ret = {};

  if (arguments.length === 0) {
    // get full style as object
    this.node.style.cssText.split(/\s*;\s*/).filter(function (el) {
      return !!el.length;
    }).forEach(function (el) {
      var t = el.split(/\s*:\s*/);
      ret[t[0]] = t[1];
    });
    return ret;
  }

  if (arguments.length < 2) {
    // get style properties in the array
    if (Array.isArray(style)) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = style[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;
          var cased = camelCase(name);
          ret[cased] = this.node.style[cased];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return ret;
    } // get style for property


    if (typeof style === 'string') {
      return this.node.style[camelCase(style)];
    } // set styles in object


    if (_typeof(style) === 'object') {
      for (var _name in style) {
        // set empty string if null/undefined/'' was given
        this.node.style[camelCase(_name)] = style[_name] == null || isBlank.test(style[_name]) ? '' : style[_name];
      }
    }
  } // set style for property


  if (arguments.length === 2) {
    this.node.style[camelCase(style)] = val == null || isBlank.test(val) ? '' : val;
  }

  return this;
} // Show element


function show() {
  return this.css('display', '');
} // Hide element


function hide() {
  return this.css('display', 'none');
} // Is element visible?


function visible() {
  return this.css('display') !== 'none';
}

registerMethods('Dom', {
  css: css,
  show: show,
  hide: hide,
  visible: visible
});

function data$1(a, v, r) {
  if (_typeof(a) === 'object') {
    for (v in a) {
      this.data(v, a[v]);
    }
  } else if (arguments.length < 2) {
    try {
      return JSON.parse(this.attr('data-' + a));
    } catch (e) {
      return this.attr('data-' + a);
    }
  } else {
    this.attr('data-' + a, v === null ? null : r === true || typeof v === 'string' || typeof v === 'number' ? v : JSON.stringify(v));
  }

  return this;
}

registerMethods('Dom', {
  data: data$1
});

function remember(k, v) {
  // remember every item in an object individually
  if (_typeof(arguments[0]) === 'object') {
    for (var key in k) {
      this.remember(key, k[key]);
    }
  } else if (arguments.length === 1) {
    // retrieve memory
    return this.memory()[k];
  } else {
    // store memory
    this.memory()[k] = v;
  }

  return this;
} // Erase a given memory


function forget() {
  if (arguments.length === 0) {
    this._memory = {};
  } else {
    for (var i = arguments.length - 1; i >= 0; i--) {
      delete this.memory()[arguments[i]];
    }
  }

  return this;
} // This triggers creation of a new hidden class which is not performant
// However, this function is not rarely used so it will not happen frequently
// Return local memory object


function memory() {
  return this._memory = this._memory || {};
}

registerMethods('Dom', {
  remember: remember,
  forget: forget,
  memory: memory
}); // `Array.prototype.{ reduce, reduceRight }` methods implementation

var createMethod$4 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }

    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$4(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$4(true)
};
var $reduce = arrayReduce.left; // `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

_export({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('reduce')
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var listenerId = 0;
var windowEvents = {};

function getEvents(instance) {
  var n = instance.getEventHolder(); // We dont want to save events in global space

  if (n === globals.window) n = windowEvents;
  if (!n.events) n.events = {};
  return n.events;
}

function getEventTarget(instance) {
  return instance.getEventTarget();
}

function clearEvents(instance) {
  var n = instance.getEventHolder();
  if (n.events) n.events = {};
} // Add event binder in the SVG namespace


function on(node, events, listener, binding, options) {
  var l = listener.bind(binding || node);
  var instance = makeInstance(node);
  var bag = getEvents(instance);
  var n = getEventTarget(instance); // events can be an array of events or a string of events

  events = Array.isArray(events) ? events : events.split(delimiter); // add id to listener

  if (!listener._svgjsListenerId) {
    listener._svgjsListenerId = ++listenerId;
  }

  events.forEach(function (event) {
    var ev = event.split('.')[0];
    var ns = event.split('.')[1] || '*'; // ensure valid object

    bag[ev] = bag[ev] || {};
    bag[ev][ns] = bag[ev][ns] || {}; // reference listener

    bag[ev][ns][listener._svgjsListenerId] = l; // add listener

    n.addEventListener(ev, l, options || false);
  });
} // Add event unbinder in the SVG namespace


function off(node, events, listener, options) {
  var instance = makeInstance(node);
  var bag = getEvents(instance);
  var n = getEventTarget(instance); // listener can be a function or a number

  if (typeof listener === 'function') {
    listener = listener._svgjsListenerId;
    if (!listener) return;
  } // events can be an array of events or a string or undefined


  events = Array.isArray(events) ? events : (events || '').split(delimiter);
  events.forEach(function (event) {
    var ev = event && event.split('.')[0];
    var ns = event && event.split('.')[1];
    var namespace, l;

    if (listener) {
      // remove listener reference
      if (bag[ev] && bag[ev][ns || '*']) {
        // removeListener
        n.removeEventListener(ev, bag[ev][ns || '*'][listener], options || false);
        delete bag[ev][ns || '*'][listener];
      }
    } else if (ev && ns) {
      // remove all listeners for a namespaced event
      if (bag[ev] && bag[ev][ns]) {
        for (l in bag[ev][ns]) {
          off(n, [ev, ns].join('.'), l);
        }

        delete bag[ev][ns];
      }
    } else if (ns) {
      // remove all listeners for a specific namespace
      for (event in bag) {
        for (namespace in bag[event]) {
          if (ns === namespace) {
            off(n, [event, ns].join('.'));
          }
        }
      }
    } else if (ev) {
      // remove all listeners for the event
      if (bag[ev]) {
        for (namespace in bag[ev]) {
          off(n, [ev, namespace].join('.'));
        }

        delete bag[ev];
      }
    } else {
      // remove all listeners on a given node
      for (event in bag) {
        off(n, event);
      }

      clearEvents(instance);
    }
  });
}

function dispatch(node, event, data) {
  var n = getEventTarget(node); // Dispatch event

  if (event instanceof globals.window.Event) {
    n.dispatchEvent(event);
  } else {
    event = new globals.window.CustomEvent(event, {
      detail: data,
      cancelable: true
    });
    n.dispatchEvent(event);
  }

  return event;
}

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = v8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

_export({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  concat: function concat(arg) {
    // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

var $map = arrayIteration.map; // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('map')
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime; // `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring

if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this); // eslint-disable-next-line no-self-compare

    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}

var trim = stringTrim.trim;
var nativeParseInt = global_1.parseInt;
var hex$1 = /^[+-]?0[Xx]/;
var FORCED$1 = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22; // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix

var _parseInt = FORCED$1 ? function parseInt(string, radix) {
  var S = trim(String(string));
  return nativeParseInt(S, radix >>> 0 || (hex$1.test(S) ? 16 : 10));
} : nativeParseInt; // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix


_export({
  global: true,
  forced: parseInt != _parseInt
}, {
  parseInt: _parseInt
});

var TO_STRING$1 = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING$1];
var NOT_GENERIC = fails(function () {
  return nativeToString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
}); // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = nativeToString.name != TO_STRING$1; // `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING$1, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, {
    unsafe: true
  });
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function sixDigitHex(hex) {
  return hex.length === 4 ? ['#', hex.substring(1, 2), hex.substring(1, 2), hex.substring(2, 3), hex.substring(2, 3), hex.substring(3, 4), hex.substring(3, 4)].join('') : hex;
}

function componentHex(component) {
  var integer = Math.round(component);
  var bounded = Math.max(0, Math.min(255, integer));
  var hex = bounded.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function is(object, space) {
  for (var i = space.length; i--;) {
    if (object[space[i]] == null) {
      return false;
    }
  }

  return true;
}

function getParameters(a, b) {
  var params = is(a, 'rgb') ? {
    _a: a.r,
    _b: a.g,
    _c: a.b,
    space: 'rgb'
  } : is(a, 'xyz') ? {
    _a: a.x,
    _b: a.y,
    _c: a.z,
    _d: 0,
    space: 'xyz'
  } : is(a, 'hsl') ? {
    _a: a.h,
    _b: a.s,
    _c: a.l,
    _d: 0,
    space: 'hsl'
  } : is(a, 'lab') ? {
    _a: a.l,
    _b: a.a,
    _c: a.b,
    _d: 0,
    space: 'lab'
  } : is(a, 'lch') ? {
    _a: a.l,
    _b: a.c,
    _c: a.h,
    _d: 0,
    space: 'lch'
  } : is(a, 'cmyk') ? {
    _a: a.c,
    _b: a.m,
    _c: a.y,
    _d: a.k,
    space: 'cmyk'
  } : {
    _a: 0,
    _b: 0,
    _c: 0,
    space: 'rgb'
  };
  params.space = b || params.space;
  return params;
}

function cieSpace(space) {
  if (space === 'lab' || space === 'xyz' || space === 'lch') {
    return true;
  } else {
    return false;
  }
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

var Color = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);

    this.init.apply(this, arguments);
  }

  _createClass(Color, [{
    key: "init",
    value: function init() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var space = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'rgb'; // This catches the case when a falsy value is passed like ''

      a = !a ? 0 : a; // Reset all values in case the init function is rerun with new color space

      if (this.space) {
        for (var component in this.space) {
          delete this[this.space[component]];
        }
      }

      if (typeof a === 'number') {
        // Allow for the case that we don't need d...
        space = typeof d === 'string' ? d : space;
        d = typeof d === 'string' ? 0 : d; // Assign the values straight to the color

        Object.assign(this, {
          _a: a,
          _b: b,
          _c: c,
          _d: d,
          space: space
        }); // If the user gave us an array, make the color from it
      } else if (a instanceof Array) {
        this.space = b || (typeof a[3] === 'string' ? a[3] : a[4]) || 'rgb';
        Object.assign(this, {
          _a: a[0],
          _b: a[1],
          _c: a[2],
          _d: a[3] || 0
        });
      } else if (a instanceof Object) {
        // Set the object up and assign its values directly
        var values = getParameters(a, b);
        Object.assign(this, values);
      } else if (typeof a === 'string') {
        if (isRgb.test(a)) {
          var noWhitespace = a.replace(whitespace$1, '');

          var _rgb$exec$slice$map = rgb.exec(noWhitespace).slice(1, 4).map(function (v) {
            return parseInt(v);
          }),
              _rgb$exec$slice$map2 = _slicedToArray(_rgb$exec$slice$map, 3),
              _a2 = _rgb$exec$slice$map2[0],
              _b2 = _rgb$exec$slice$map2[1],
              _c2 = _rgb$exec$slice$map2[2];

          Object.assign(this, {
            _a: _a2,
            _b: _b2,
            _c: _c2,
            _d: 0,
            space: 'rgb'
          });
        } else if (isHex.test(a)) {
          var hexParse = function hexParse(v) {
            return parseInt(v, 16);
          };

          var _hex$exec$map = hex.exec(sixDigitHex(a)).map(hexParse),
              _hex$exec$map2 = _slicedToArray(_hex$exec$map, 4),
              _a3 = _hex$exec$map2[1],
              _b3 = _hex$exec$map2[2],
              _c3 = _hex$exec$map2[3];

          Object.assign(this, {
            _a: _a3,
            _b: _b3,
            _c: _c3,
            _d: 0,
            space: 'rgb'
          });
        } else throw Error('Unsupported string format, can\'t construct Color');
      } // Now add the components as a convenience


      var _a = this._a,
          _b = this._b,
          _c = this._c,
          _d = this._d;
      var components = this.space === 'rgb' ? {
        r: _a,
        g: _b,
        b: _c
      } : this.space === 'xyz' ? {
        x: _a,
        y: _b,
        z: _c
      } : this.space === 'hsl' ? {
        h: _a,
        s: _b,
        l: _c
      } : this.space === 'lab' ? {
        l: _a,
        a: _b,
        b: _c
      } : this.space === 'lch' ? {
        l: _a,
        c: _b,
        h: _c
      } : this.space === 'cmyk' ? {
        c: _a,
        m: _b,
        y: _c,
        k: _d
      } : {};
      Object.assign(this, components);
    }
    /*
    Conversion Methods
    */

  }, {
    key: "rgb",
    value: function rgb() {
      if (this.space === 'rgb') {
        return this;
      } else if (cieSpace(this.space)) {
        // Convert to the xyz color space
        var x = this.x,
            y = this.y,
            z = this.z;

        if (this.space === 'lab' || this.space === 'lch') {
          // Get the values in the lab space
          var l = this.l,
              a = this.a,
              _b4 = this.b;

          if (this.space === 'lch') {
            var c = this.c,
                h = this.h;
            var dToR = Math.PI / 180;
            a = c * Math.cos(dToR * h);
            _b4 = c * Math.sin(dToR * h);
          } // Undo the nonlinear function


          var yL = (l + 16) / 116;
          var xL = a / 500 + yL;
          var zL = yL - _b4 / 200; // Get the xyz values

          var ct = 16 / 116;
          var mx = 0.008856;
          var nm = 7.787;
          x = 0.95047 * (Math.pow(xL, 3) > mx ? Math.pow(xL, 3) : (xL - ct) / nm);
          y = 1.00000 * (Math.pow(yL, 3) > mx ? Math.pow(yL, 3) : (yL - ct) / nm);
          z = 1.08883 * (Math.pow(zL, 3) > mx ? Math.pow(zL, 3) : (zL - ct) / nm);
        } // Convert xyz to unbounded rgb values


        var rU = x * 3.2406 + y * -1.5372 + z * -0.4986;
        var gU = x * -0.9689 + y * 1.8758 + z * 0.0415;
        var bU = x * 0.0557 + y * -0.2040 + z * 1.0570; // Convert the values to true rgb values

        var pow = Math.pow;
        var bd = 0.0031308;
        var r = rU > bd ? 1.055 * pow(rU, 1 / 2.4) - 0.055 : 12.92 * rU;
        var g = gU > bd ? 1.055 * pow(gU, 1 / 2.4) - 0.055 : 12.92 * gU;
        var b = bU > bd ? 1.055 * pow(bU, 1 / 2.4) - 0.055 : 12.92 * bU; // Make and return the color

        var color = new Color(255 * r, 255 * g, 255 * b);
        return color;
      } else if (this.space === 'hsl') {
        // https://bgrins.github.io/TinyColor/docs/tinycolor.html
        // Get the current hsl values
        var _h = this.h,
            s = this.s,
            _l = this.l;
        _h /= 360;
        s /= 100;
        _l /= 100; // If we are grey, then just make the color directly

        if (s === 0) {
          _l *= 255;

          var _color2 = new Color(_l, _l, _l);

          return _color2;
        } // TODO I have no idea what this does :D If you figure it out, tell me!


        var q = _l < 0.5 ? _l * (1 + s) : _l + s - _l * s;
        var p = 2 * _l - q; // Get the rgb values

        var _r = 255 * hueToRgb(p, q, _h + 1 / 3);

        var _g = 255 * hueToRgb(p, q, _h);

        var _b5 = 255 * hueToRgb(p, q, _h - 1 / 3); // Make a new color


        var _color = new Color(_r, _g, _b5);

        return _color;
      } else if (this.space === 'cmyk') {
        // https://gist.github.com/felipesabino/5066336
        // Get the normalised cmyk values
        var _c4 = this.c,
            m = this.m,
            _y = this.y,
            k = this.k; // Get the rgb values

        var _r2 = 255 * (1 - Math.min(1, _c4 * (1 - k) + k));

        var _g2 = 255 * (1 - Math.min(1, m * (1 - k) + k));

        var _b6 = 255 * (1 - Math.min(1, _y * (1 - k) + k)); // Form the color and return it


        var _color3 = new Color(_r2, _g2, _b6);

        return _color3;
      } else {
        return this;
      }
    }
  }, {
    key: "lab",
    value: function lab() {
      // Get the xyz color
      var _this$xyz = this.xyz(),
          x = _this$xyz.x,
          y = _this$xyz.y,
          z = _this$xyz.z; // Get the lab components


      var l = 116 * y - 16;
      var a = 500 * (x - y);
      var b = 200 * (y - z); // Construct and return a new color

      var color = new Color(l, a, b, 'lab');
      return color;
    }
  }, {
    key: "xyz",
    value: function xyz() {
      // Normalise the red, green and blue values
      var _this$rgb = this.rgb(),
          r255 = _this$rgb._a,
          g255 = _this$rgb._b,
          b255 = _this$rgb._c;

      var _map = [r255, g255, b255].map(function (v) {
        return v / 255;
      }),
          _map2 = _slicedToArray(_map, 3),
          r = _map2[0],
          g = _map2[1],
          b = _map2[2]; // Convert to the lab rgb space


      var rL = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      var gL = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      var bL = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92; // Convert to the xyz color space without bounding the values

      var xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047;
      var yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1.00000;
      var zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883; // Get the proper xyz values by applying the bounding

      var x = xU > 0.008856 ? Math.pow(xU, 1 / 3) : 7.787 * xU + 16 / 116;
      var y = yU > 0.008856 ? Math.pow(yU, 1 / 3) : 7.787 * yU + 16 / 116;
      var z = zU > 0.008856 ? Math.pow(zU, 1 / 3) : 7.787 * zU + 16 / 116; // Make and return the color

      var color = new Color(x, y, z, 'xyz');
      return color;
    }
  }, {
    key: "lch",
    value: function lch() {
      // Get the lab color directly
      var _this$lab = this.lab(),
          l = _this$lab.l,
          a = _this$lab.a,
          b = _this$lab.b; // Get the chromaticity and the hue using polar coordinates


      var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      var h = 180 * Math.atan2(b, a) / Math.PI;

      if (h < 0) {
        h *= -1;
        h = 360 - h;
      } // Make a new color and return it


      var color = new Color(l, c, h, 'lch');
      return color;
    }
  }, {
    key: "hsl",
    value: function hsl() {
      // Get the rgb values
      var _this$rgb2 = this.rgb(),
          _a = _this$rgb2._a,
          _b = _this$rgb2._b,
          _c = _this$rgb2._c;

      var _map3 = [_a, _b, _c].map(function (v) {
        return v / 255;
      }),
          _map4 = _slicedToArray(_map3, 3),
          r = _map4[0],
          g = _map4[1],
          b = _map4[2]; // Find the maximum and minimum values to get the lightness


      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var l = (max + min) / 2; // If the r, g, v values are identical then we are grey

      var isGrey = max === min; // Calculate the hue and saturation

      var delta = max - min;
      var s = isGrey ? 0 : l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      var h = isGrey ? 0 : max === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / delta + 2) / 6 : max === b ? ((r - g) / delta + 4) / 6 : 0; // Construct and return the new color

      var color = new Color(360 * h, 100 * s, 100 * l, 'hsl');
      return color;
    }
  }, {
    key: "cmyk",
    value: function cmyk() {
      // Get the rgb values for the current color
      var _this$rgb3 = this.rgb(),
          _a = _this$rgb3._a,
          _b = _this$rgb3._b,
          _c = _this$rgb3._c;

      var _map5 = [_a, _b, _c].map(function (v) {
        return v / 255;
      }),
          _map6 = _slicedToArray(_map5, 3),
          r = _map6[0],
          g = _map6[1],
          b = _map6[2]; // Get the cmyk values in an unbounded format


      var k = Math.min(1 - r, 1 - g, 1 - b);

      if (k === 1) {
        // Catch the black case
        return new Color(0, 0, 0, 1, 'cmyk');
      }

      var c = (1 - r - k) / (1 - k);
      var m = (1 - g - k) / (1 - k);
      var y = (1 - b - k) / (1 - k); // Construct the new color

      var color = new Color(c, m, y, k, 'cmyk');
      return color;
    }
    /*
    Input and Output methods
    */

  }, {
    key: "_clamped",
    value: function _clamped() {
      var _this$rgb4 = this.rgb(),
          _a = _this$rgb4._a,
          _b = _this$rgb4._b,
          _c = _this$rgb4._c;

      var max = Math.max,
          min = Math.min,
          round = Math.round;

      var format = function format(v) {
        return max(0, min(round(v), 255));
      };

      return [_a, _b, _c].map(format);
    }
  }, {
    key: "toHex",
    value: function toHex() {
      var _this$_clamped$map = this._clamped().map(componentHex),
          _this$_clamped$map2 = _slicedToArray(_this$_clamped$map, 3),
          r = _this$_clamped$map2[0],
          g = _this$_clamped$map2[1],
          b = _this$_clamped$map2[2];

      return "#".concat(r).concat(g).concat(b);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.toHex();
    }
  }, {
    key: "toRgb",
    value: function toRgb() {
      var _this$_clamped = this._clamped(),
          _this$_clamped2 = _slicedToArray(_this$_clamped, 3),
          rV = _this$_clamped2[0],
          gV = _this$_clamped2[1],
          bV = _this$_clamped2[2];

      var string = "rgb(".concat(rV, ",").concat(gV, ",").concat(bV, ")");
      return string;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var _a = this._a,
          _b = this._b,
          _c = this._c,
          _d = this._d,
          space = this.space;
      return [_a, _b, _c, _d, space];
    }
    /*
    Generating random colors
    */

  }], [{
    key: "random",
    value: function random() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'vibrant';
      var t = arguments.length > 1 ? arguments[1] : undefined; // Get the math modules

      var random = Math.random,
          round = Math.round,
          sin = Math.sin,
          pi = Math.PI; // Run the correct generator

      if (mode === 'vibrant') {
        var l = (81 - 57) * random() + 57;
        var c = (83 - 45) * random() + 45;
        var h = 360 * random();
        var color = new Color(l, c, h, 'lch');
        return color;
      } else if (mode === 'sine') {
        t = t == null ? random() : t;
        var r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150);
        var g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200);
        var b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150);

        var _color4 = new Color(r, g, b);

        return _color4;
      } else if (mode === 'pastel') {
        var _l2 = (94 - 86) * random() + 86;

        var _c5 = (26 - 9) * random() + 9;

        var _h2 = 360 * random();

        var _color5 = new Color(_l2, _c5, _h2, 'lch');

        return _color5;
      } else if (mode === 'dark') {
        var _l3 = 10 + 10 * random();

        var _c6 = (125 - 75) * random() + 86;

        var _h3 = 360 * random();

        var _color6 = new Color(_l3, _c6, _h3, 'lch');

        return _color6;
      } else if (mode === 'rgb') {
        var _r3 = 255 * random();

        var _g3 = 255 * random();

        var _b7 = 255 * random();

        var _color7 = new Color(_r3, _g3, _b7);

        return _color7;
      } else if (mode === 'lab') {
        var _l4 = 100 * random();

        var a = 256 * random() - 128;

        var _b8 = 256 * random() - 128;

        var _color8 = new Color(_l4, a, _b8, 'lab');

        return _color8;
      } else if (mode === 'grey') {
        var grey = 255 * random();

        var _color9 = new Color(grey, grey, grey);

        return _color9;
      }
    }
    /*
    Constructing colors
    */
    // Test if given value is a color string

  }, {
    key: "test",
    value: function test(color) {
      return typeof color === 'string' && (isHex.test(color) || isRgb.test(color));
    } // Test if given value is an rgb object

  }, {
    key: "isRgb",
    value: function isRgb(color) {
      return color && typeof color.r === 'number' && typeof color.g === 'number' && typeof color.b === 'number';
    } // Test if given value is a color

  }, {
    key: "isColor",
    value: function isColor(color) {
      return color && (color instanceof Color || this.isRgb(color) || this.test(color));
    }
  }]);

  return Color;
}();

exports.Color = Color;
var FAILS_ON_PRIMITIVES$1 = fails(function () {
  objectKeys(1);
}); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$1
}, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
}); // @@match logic


fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [// `String.prototype.match` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = requireObjectCoercible(this);
    var matcher = regexp == undefined ? undefined : regexp[MATCH];
    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, // `RegExp.prototype[@@match]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative(nativeMatch, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    if (!rx.global) return regexpExecAbstract(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regexpExecAbstract(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var defineProperty$5 = objectDefineProperty.f;
var trim$1 = stringTrim.trim;
var NUMBER = 'Number';
var NativeNumber = global_1[NUMBER];
var NumberPrototype = NativeNumber.prototype; // Opera ~12 has broken Object#toString

var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER; // `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber

var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;

  if (typeof it == 'string' && it.length > 2) {
    it = trim$1(it);
    first = it.charCodeAt(0);

    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal of /^0o[0-7]+$/i

        default:
          return +it;
      }

      digits = it.slice(2);
      length = digits.length;

      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
}; // `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor


if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper // check on 1..constructor(foo) case
    && (BROKEN_CLASSOF ? fails(function () {
      NumberPrototype.valueOf.call(dummy);
    }) : classofRaw(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };

  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys$1.length > j; j++) {
    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
      defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
    }
  }

  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global_1, NUMBER, NumberWrapper);
}

var trim$2 = stringTrim.trim;
var nativeParseFloat = global_1.parseFloat;
var FORCED$2 = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity; // `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string

var _parseFloat = FORCED$2 ? function parseFloat(string) {
  var trimmedString = trim$2(String(string));
  var result = nativeParseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : nativeParseFloat; // `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string


_export({
  global: true,
  forced: parseFloat != _parseFloat
}, {
  parseFloat: _parseFloat
});

var Point = /*#__PURE__*/function () {
  // Initialize
  function Point() {
    _classCallCheck(this, Point);

    this.init.apply(this, arguments);
  }

  _createClass(Point, [{
    key: "init",
    value: function init(x, y) {
      var base = {
        x: 0,
        y: 0
      }; // ensure source as object

      var source = Array.isArray(x) ? {
        x: x[0],
        y: x[1]
      } : _typeof(x) === 'object' ? {
        x: x.x,
        y: x.y
      } : {
        x: x,
        y: y
      }; // merge source

      this.x = source.x == null ? base.x : source.x;
      this.y = source.y == null ? base.y : source.y;
      return this;
    } // Clone point

  }, {
    key: "clone",
    value: function clone() {
      return new Point(this);
    }
  }, {
    key: "transform",
    value: function transform(m) {
      return this.clone().transformO(m);
    } // Transform point with matrix

  }, {
    key: "transformO",
    value: function transformO(m) {
      if (!Matrix.isMatrixLike(m)) {
        m = new Matrix(m);
      }

      var x = this.x,
          y = this.y; // Perform the matrix multiplication

      this.x = m.a * x + m.c * y + m.e;
      this.y = m.b * x + m.d * y + m.f;
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.x, this.y];
    }
  }]);

  return Point;
}();

exports.Point = Point;

function point(x, y) {
  return new Point(x, y).transform(this.screenCTM().inverse());
}

function closeEnough(a, b, threshold) {
  return Math.abs(b - a) < (threshold || 1e-6);
}

var Matrix = /*#__PURE__*/function () {
  function Matrix() {
    _classCallCheck(this, Matrix);

    this.init.apply(this, arguments);
  } // Initialize


  _createClass(Matrix, [{
    key: "init",
    value: function init(source) {
      var base = Matrix.fromArray([1, 0, 0, 1, 0, 0]); // ensure source as object

      source = source instanceof Element ? source.matrixify() : typeof source === 'string' ? Matrix.fromArray(source.split(delimiter).map(parseFloat)) : Array.isArray(source) ? Matrix.fromArray(source) : _typeof(source) === 'object' && Matrix.isMatrixLike(source) ? source : _typeof(source) === 'object' ? new Matrix().transform(source) : arguments.length === 6 ? Matrix.fromArray([].slice.call(arguments)) : base; // Merge the source matrix with the base matrix

      this.a = source.a != null ? source.a : base.a;
      this.b = source.b != null ? source.b : base.b;
      this.c = source.c != null ? source.c : base.c;
      this.d = source.d != null ? source.d : base.d;
      this.e = source.e != null ? source.e : base.e;
      this.f = source.f != null ? source.f : base.f;
      return this;
    } // Clones this matrix

  }, {
    key: "clone",
    value: function clone() {
      return new Matrix(this);
    } // Transform a matrix into another matrix by manipulating the space

  }, {
    key: "transform",
    value: function transform(o) {
      // Check if o is a matrix and then left multiply it directly
      if (Matrix.isMatrixLike(o)) {
        var matrix = new Matrix(o);
        return matrix.multiplyO(this);
      } // Get the proposed transformations and the current transformations


      var t = Matrix.formatTransforms(o);
      var current = this;

      var _transform = new Point(t.ox, t.oy).transform(current),
          ox = _transform.x,
          oy = _transform.y; // Construct the resulting matrix


      var transformer = new Matrix().translateO(t.rx, t.ry).lmultiplyO(current).translateO(-ox, -oy).scaleO(t.scaleX, t.scaleY).skewO(t.skewX, t.skewY).shearO(t.shear).rotateO(t.theta).translateO(ox, oy); // If we want the origin at a particular place, we force it there

      if (isFinite(t.px) || isFinite(t.py)) {
        var origin = new Point(ox, oy).transform(transformer); // TODO: Replace t.px with isFinite(t.px)

        var dx = t.px ? t.px - origin.x : 0;
        var dy = t.py ? t.py - origin.y : 0;
        transformer.translateO(dx, dy);
      } // Translate now after positioning


      transformer.translateO(t.tx, t.ty);
      return transformer;
    } // Applies a matrix defined by its affine parameters

  }, {
    key: "compose",
    value: function compose(o) {
      if (o.origin) {
        o.originX = o.origin[0];
        o.originY = o.origin[1];
      } // Get the parameters


      var ox = o.originX || 0;
      var oy = o.originY || 0;
      var sx = o.scaleX || 1;
      var sy = o.scaleY || 1;
      var lam = o.shear || 0;
      var theta = o.rotate || 0;
      var tx = o.translateX || 0;
      var ty = o.translateY || 0; // Apply the standard matrix

      var result = new Matrix().translateO(-ox, -oy).scaleO(sx, sy).shearO(lam).rotateO(theta).translateO(tx, ty).lmultiplyO(this).translateO(ox, oy);
      return result;
    } // Decomposes this matrix into its affine parameters

  }, {
    key: "decompose",
    value: function decompose() {
      var cx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var cy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Get the parameters from the matrix

      var a = this.a;
      var b = this.b;
      var c = this.c;
      var d = this.d;
      var e = this.e;
      var f = this.f; // Figure out if the winding direction is clockwise or counterclockwise

      var determinant = a * d - b * c;
      var ccw = determinant > 0 ? 1 : -1; // Since we only shear in x, we can use the x basis to get the x scale
      // and the rotation of the resulting matrix

      var sx = ccw * Math.sqrt(a * a + b * b);
      var thetaRad = Math.atan2(ccw * b, ccw * a);
      var theta = 180 / Math.PI * thetaRad;
      var ct = Math.cos(thetaRad);
      var st = Math.sin(thetaRad); // We can then solve the y basis vector simultaneously to get the other
      // two affine parameters directly from these parameters

      var lam = (a * c + b * d) / determinant;
      var sy = c * sx / (lam * a - b) || d * sx / (lam * b + a); // Use the translations

      var tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy);
      var ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy); // Construct the decomposition and return it

      return {
        // Return the affine parameters
        scaleX: sx,
        scaleY: sy,
        shear: lam,
        rotate: theta,
        translateX: tx,
        translateY: ty,
        originX: cx,
        originY: cy,
        // Return the matrix parameters
        a: this.a,
        b: this.b,
        c: this.c,
        d: this.d,
        e: this.e,
        f: this.f
      };
    } // Left multiplies by the given matrix

  }, {
    key: "multiply",
    value: function multiply(matrix) {
      return this.clone().multiplyO(matrix);
    }
  }, {
    key: "multiplyO",
    value: function multiplyO(matrix) {
      // Get the matrices
      var l = this;
      var r = matrix instanceof Matrix ? matrix : new Matrix(matrix);
      return Matrix.matrixMultiply(l, r, this);
    }
  }, {
    key: "lmultiply",
    value: function lmultiply(matrix) {
      return this.clone().lmultiplyO(matrix);
    }
  }, {
    key: "lmultiplyO",
    value: function lmultiplyO(matrix) {
      var r = this;
      var l = matrix instanceof Matrix ? matrix : new Matrix(matrix);
      return Matrix.matrixMultiply(l, r, this);
    } // Inverses matrix

  }, {
    key: "inverseO",
    value: function inverseO() {
      // Get the current parameters out of the matrix
      var a = this.a;
      var b = this.b;
      var c = this.c;
      var d = this.d;
      var e = this.e;
      var f = this.f; // Invert the 2x2 matrix in the top left

      var det = a * d - b * c;
      if (!det) throw new Error('Cannot invert ' + this); // Calculate the top 2x2 matrix

      var na = d / det;
      var nb = -b / det;
      var nc = -c / det;
      var nd = a / det; // Apply the inverted matrix to the top right

      var ne = -(na * e + nc * f);
      var nf = -(nb * e + nd * f); // Construct the inverted matrix

      this.a = na;
      this.b = nb;
      this.c = nc;
      this.d = nd;
      this.e = ne;
      this.f = nf;
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      return this.clone().inverseO();
    } // Translate matrix

  }, {
    key: "translate",
    value: function translate(x, y) {
      return this.clone().translateO(x, y);
    }
  }, {
    key: "translateO",
    value: function translateO(x, y) {
      this.e += x || 0;
      this.f += y || 0;
      return this;
    } // Scale matrix

  }, {
    key: "scale",
    value: function scale(x, y, cx, cy) {
      var _this$clone;

      return (_this$clone = this.clone()).scaleO.apply(_this$clone, arguments);
    }
  }, {
    key: "scaleO",
    value: function scaleO(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var cx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var cy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0; // Support uniform scaling

      if (arguments.length === 3) {
        cy = cx;
        cx = y;
        y = x;
      }

      var a = this.a,
          b = this.b,
          c = this.c,
          d = this.d,
          e = this.e,
          f = this.f;
      this.a = a * x;
      this.b = b * y;
      this.c = c * x;
      this.d = d * y;
      this.e = e * x - cx * x + cx;
      this.f = f * y - cy * y + cy;
      return this;
    } // Rotate matrix

  }, {
    key: "rotate",
    value: function rotate(r, cx, cy) {
      return this.clone().rotateO(r, cx, cy);
    }
  }, {
    key: "rotateO",
    value: function rotateO(r) {
      var cx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0; // Convert degrees to radians

      r = radians(r);
      var cos = Math.cos(r);
      var sin = Math.sin(r);
      var a = this.a,
          b = this.b,
          c = this.c,
          d = this.d,
          e = this.e,
          f = this.f;
      this.a = a * cos - b * sin;
      this.b = b * cos + a * sin;
      this.c = c * cos - d * sin;
      this.d = d * cos + c * sin;
      this.e = e * cos - f * sin + cy * sin - cx * cos + cx;
      this.f = f * cos + e * sin - cx * sin - cy * cos + cy;
      return this;
    } // Flip matrix on x or y, at a given offset

  }, {
    key: "flip",
    value: function flip(axis, around) {
      return this.clone().flipO(axis, around);
    }
  }, {
    key: "flipO",
    value: function flipO(axis, around) {
      return axis === 'x' ? this.scaleO(-1, 1, around, 0) : axis === 'y' ? this.scaleO(1, -1, 0, around) : this.scaleO(-1, -1, axis, around || axis); // Define an x, y flip point
    } // Shear matrix

  }, {
    key: "shear",
    value: function shear(a, cx, cy) {
      return this.clone().shearO(a, cx, cy);
    }
  }, {
    key: "shearO",
    value: function shearO(lx) {
      var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var a = this.a,
          b = this.b,
          c = this.c,
          d = this.d,
          e = this.e,
          f = this.f;
      this.a = a + b * lx;
      this.c = c + d * lx;
      this.e = e + f * lx - cy * lx;
      return this;
    } // Skew Matrix

  }, {
    key: "skew",
    value: function skew(x, y, cx, cy) {
      var _this$clone2;

      return (_this$clone2 = this.clone()).skewO.apply(_this$clone2, arguments);
    }
  }, {
    key: "skewO",
    value: function skewO(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var cx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var cy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0; // support uniformal skew

      if (arguments.length === 3) {
        cy = cx;
        cx = y;
        y = x;
      } // Convert degrees to radians


      x = radians(x);
      y = radians(y);
      var lx = Math.tan(x);
      var ly = Math.tan(y);
      var a = this.a,
          b = this.b,
          c = this.c,
          d = this.d,
          e = this.e,
          f = this.f;
      this.a = a + b * lx;
      this.b = b + a * ly;
      this.c = c + d * lx;
      this.d = d + c * ly;
      this.e = e + f * lx - cy * lx;
      this.f = f + e * ly - cx * ly;
      return this;
    } // SkewX

  }, {
    key: "skewX",
    value: function skewX(x, cx, cy) {
      return this.skew(x, 0, cx, cy);
    }
  }, {
    key: "skewXO",
    value: function skewXO(x, cx, cy) {
      return this.skewO(x, 0, cx, cy);
    } // SkewY

  }, {
    key: "skewY",
    value: function skewY(y, cx, cy) {
      return this.skew(0, y, cx, cy);
    }
  }, {
    key: "skewYO",
    value: function skewYO(y, cx, cy) {
      return this.skewO(0, y, cx, cy);
    } // Transform around a center point

  }, {
    key: "aroundO",
    value: function aroundO(cx, cy, matrix) {
      var dx = cx || 0;
      var dy = cy || 0;
      return this.translateO(-dx, -dy).lmultiplyO(matrix).translateO(dx, dy);
    }
  }, {
    key: "around",
    value: function around(cx, cy, matrix) {
      return this.clone().aroundO(cx, cy, matrix);
    } // Check if two matrices are equal

  }, {
    key: "equals",
    value: function equals(other) {
      var comp = new Matrix(other);
      return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b) && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d) && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f);
    } // Convert matrix to string

  }, {
    key: "toString",
    value: function toString() {
      return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')';
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.a, this.b, this.c, this.d, this.e, this.f];
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return {
        a: this.a,
        b: this.b,
        c: this.c,
        d: this.d,
        e: this.e,
        f: this.f
      };
    }
  }], [{
    key: "fromArray",
    value: function fromArray(a) {
      return {
        a: a[0],
        b: a[1],
        c: a[2],
        d: a[3],
        e: a[4],
        f: a[5]
      };
    }
  }, {
    key: "isMatrixLike",
    value: function isMatrixLike(o) {
      return o.a != null || o.b != null || o.c != null || o.d != null || o.e != null || o.f != null;
    }
  }, {
    key: "formatTransforms",
    value: function formatTransforms(o) {
      // Get all of the parameters required to form the matrix
      var flipBoth = o.flip === 'both' || o.flip === true;
      var flipX = o.flip && (flipBoth || o.flip === 'x') ? -1 : 1;
      var flipY = o.flip && (flipBoth || o.flip === 'y') ? -1 : 1;
      var skewX = o.skew && o.skew.length ? o.skew[0] : isFinite(o.skew) ? o.skew : isFinite(o.skewX) ? o.skewX : 0;
      var skewY = o.skew && o.skew.length ? o.skew[1] : isFinite(o.skew) ? o.skew : isFinite(o.skewY) ? o.skewY : 0;
      var scaleX = o.scale && o.scale.length ? o.scale[0] * flipX : isFinite(o.scale) ? o.scale * flipX : isFinite(o.scaleX) ? o.scaleX * flipX : flipX;
      var scaleY = o.scale && o.scale.length ? o.scale[1] * flipY : isFinite(o.scale) ? o.scale * flipY : isFinite(o.scaleY) ? o.scaleY * flipY : flipY;
      var shear = o.shear || 0;
      var theta = o.rotate || o.theta || 0;
      var origin = new Point(o.origin || o.around || o.ox || o.originX, o.oy || o.originY);
      var ox = origin.x;
      var oy = origin.y;
      var position = new Point(o.position || o.px || o.positionX, o.py || o.positionY);
      var px = position.x;
      var py = position.y;
      var translate = new Point(o.translate || o.tx || o.translateX, o.ty || o.translateY);
      var tx = translate.x;
      var ty = translate.y;
      var relative = new Point(o.relative || o.rx || o.relativeX, o.ry || o.relativeY);
      var rx = relative.x;
      var ry = relative.y; // Populate all of the values

      return {
        scaleX: scaleX,
        scaleY: scaleY,
        skewX: skewX,
        skewY: skewY,
        shear: shear,
        theta: theta,
        rx: rx,
        ry: ry,
        tx: tx,
        ty: ty,
        ox: ox,
        oy: oy,
        px: px,
        py: py
      };
    } // left matrix, right matrix, target matrix which is overwritten

  }, {
    key: "matrixMultiply",
    value: function matrixMultiply(l, r, o) {
      // Work out the product directly
      var a = l.a * r.a + l.c * r.b;
      var b = l.b * r.a + l.d * r.b;
      var c = l.a * r.c + l.c * r.d;
      var d = l.b * r.c + l.d * r.d;
      var e = l.e + l.a * r.e + l.c * r.f;
      var f = l.f + l.b * r.e + l.d * r.f; // make sure to use local variables because l/r and o could be the same

      o.a = a;
      o.b = b;
      o.c = c;
      o.d = d;
      o.e = e;
      o.f = f;
      return o;
    }
  }]);

  return Matrix;
}();

exports.Matrix = Matrix;

function ctm() {
  return new Matrix(this.node.getCTM());
}

function screenCTM() {
  /* https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
     This is needed because FF does not return the transformation matrix
     for the inner coordinate system when getScreenCTM() is called on nested svgs.
     However all other Browsers do that */
  if (typeof this.isRoot === 'function' && !this.isRoot()) {
    var rect = this.rect(1, 1);
    var m = rect.node.getScreenCTM();
    rect.remove();
    return new Matrix(m);
  }

  return new Matrix(this.node.getScreenCTM());
}

register(Matrix, 'Matrix');

function parser() {
  // Reuse cached element if possible
  if (!parser.nodes) {
    var svg = makeInstance().size(2, 0);
    svg.node.style.cssText = ['opacity: 0', 'position: absolute', 'left: -100%', 'top: -100%', 'overflow: hidden'].join(';');
    svg.attr('focusable', 'false');
    svg.attr('aria-hidden', 'true');
    var path = svg.path().node;
    parser.nodes = {
      svg: svg,
      path: path
    };
  }

  if (!parser.nodes.svg.node.parentNode) {
    var b = globals.document.body || globals.document.documentElement;
    parser.nodes.svg.addTo(b);
  }

  return parser.nodes;
}

function isNulledBox(box) {
  return !box.width && !box.height && !box.x && !box.y;
}

function domContains(node) {
  return node === globals.document || (globals.document.documentElement.contains || function (node) {
    // This is IE - it does not support contains() for top-level SVGs
    while (node.parentNode) {
      node = node.parentNode;
    }

    return node === globals.document;
  }).call(globals.document.documentElement, node);
}

var Box = /*#__PURE__*/function () {
  function Box() {
    _classCallCheck(this, Box);

    this.init.apply(this, arguments);
  }

  _createClass(Box, [{
    key: "init",
    value: function init(source) {
      var base = [0, 0, 0, 0];
      source = typeof source === 'string' ? source.split(delimiter).map(parseFloat) : Array.isArray(source) ? source : _typeof(source) === 'object' ? [source.left != null ? source.left : source.x, source.top != null ? source.top : source.y, source.width, source.height] : arguments.length === 4 ? [].slice.call(arguments) : base;
      this.x = source[0] || 0;
      this.y = source[1] || 0;
      this.width = this.w = source[2] || 0;
      this.height = this.h = source[3] || 0; // Add more bounding box properties

      this.x2 = this.x + this.w;
      this.y2 = this.y + this.h;
      this.cx = this.x + this.w / 2;
      this.cy = this.y + this.h / 2;
      return this;
    } // Merge rect box with another, return a new instance

  }, {
    key: "merge",
    value: function merge(box) {
      var x = Math.min(this.x, box.x);
      var y = Math.min(this.y, box.y);
      var width = Math.max(this.x + this.width, box.x + box.width) - x;
      var height = Math.max(this.y + this.height, box.y + box.height) - y;
      return new Box(x, y, width, height);
    }
  }, {
    key: "transform",
    value: function transform(m) {
      if (!(m instanceof Matrix)) {
        m = new Matrix(m);
      }

      var xMin = Infinity;
      var xMax = -Infinity;
      var yMin = Infinity;
      var yMax = -Infinity;
      var pts = [new Point(this.x, this.y), new Point(this.x2, this.y), new Point(this.x, this.y2), new Point(this.x2, this.y2)];
      pts.forEach(function (p) {
        p = p.transform(m);
        xMin = Math.min(xMin, p.x);
        xMax = Math.max(xMax, p.x);
        yMin = Math.min(yMin, p.y);
        yMax = Math.max(yMax, p.y);
      });
      return new Box(xMin, yMin, xMax - xMin, yMax - yMin);
    }
  }, {
    key: "addOffset",
    value: function addOffset() {
      // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
      this.x += globals.window.pageXOffset;
      this.y += globals.window.pageYOffset;
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.x, this.y, this.width, this.height];
    }
  }, {
    key: "isNulled",
    value: function isNulled() {
      return isNulledBox(this);
    }
  }]);

  return Box;
}();

exports.Box = Box;

function getBox(cb, retry) {
  var box;

  try {
    box = cb(this.node);

    if (isNulledBox(box) && !domContains(this.node)) {
      throw new Error('Element not in the dom');
    }
  } catch (e) {
    box = retry(this);
  }

  return box;
}

function bbox() {
  return new Box(getBox.call(this, function (node) {
    return node.getBBox();
  }, function (el) {
    try {
      var clone = el.clone().addTo(parser().svg).show();
      var box = clone.node.getBBox();
      clone.remove();
      return box;
    } catch (e) {
      throw new Error('Getting bbox of element "' + el.node.nodeName + '" is not possible. ' + e.toString());
    }
  }));
}

function rbox(el) {
  var box = new Box(getBox.call(this, function (node) {
    return node.getBoundingClientRect();
  }, function (el) {
    throw new Error('Getting rbox of element "' + el.node.nodeName + '" is not possible');
  }));
  if (el) return box.transform(el.screenCTM().inverse());
  return box.addOffset();
}

registerMethods({
  viewbox: {
    viewbox: function viewbox(x, y, width, height) {
      // act as getter
      if (x == null) return new Box(this.attr('viewBox')); // act as setter

      return this.attr('viewBox', new Box(x, y, width, height));
    },
    zoom: function zoom(level, point) {
      var width = this.node.clientWidth;
      var height = this.node.clientHeight;
      var v = this.viewbox(); // Firefox does not support clientHeight and returns 0
      // https://bugzilla.mozilla.org/show_bug.cgi?id=874811

      if (!width && !height) {
        var style = window.getComputedStyle(this.node);
        width = parseFloat(style.getPropertyValue('width'));
        height = parseFloat(style.getPropertyValue('height'));
      }

      var zoomX = width / v.width;
      var zoomY = height / v.height;
      var zoom = Math.min(zoomX, zoomY);

      if (level == null) {
        return zoom;
      }

      var zoomAmount = zoom / level;
      if (zoomAmount === Infinity) zoomAmount = Number.MIN_VALUE;
      point = point || new Point(width / 2 / zoomX + v.x, height / 2 / zoomY + v.y);
      var box = new Box(v).transform(new Matrix({
        scale: zoomAmount,
        origin: point
      }));
      return this.viewbox(box);
    }
  }
});
register(Box, 'Box');
/* eslint no-new-func: "off" */

var subClassArray = function () {
  try {
    // try es6 subclassing
    return Function('name', 'baseClass', '_constructor', ['baseClass = baseClass || Array', 'return {', '  [name]: class extends baseClass {', '    constructor (...args) {', '      super(...args)', '      _constructor && _constructor.apply(this, args)', '    }', '  }', '}[name]'].join('\n'));
  } catch (e) {
    // Use es5 approach
    return function (name) {
      var baseClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Array;

      var _constructor = arguments.length > 2 ? arguments[2] : undefined;

      var Arr = function Arr() {
        baseClass.apply(this, arguments);
        _constructor && _constructor.apply(this, arguments);
      };

      Arr.prototype = Object.create(baseClass.prototype);
      Arr.prototype.constructor = Arr;

      Arr.prototype.map = function (fn) {
        var arr = new Arr();
        arr.push.apply(arr, Array.prototype.map.call(this, fn));
        return arr;
      };

      return Arr;
    };
  }
}();

var List = subClassArray('List', Array, function () {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []; // This catches the case, that native map tries to create an array with new Array(1)

  if (typeof arr === 'number') return this;
  this.length = 0;
  this.push.apply(this, _toConsumableArray(arr));
});
exports.List = List;
extend(List, {
  each: function each(fnOrMethodName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (typeof fnOrMethodName === 'function') {
      return this.map(function (el) {
        return fnOrMethodName.call(el, el);
      });
    } else {
      return this.map(function (el) {
        return el[fnOrMethodName].apply(el, args);
      });
    }
  },
  toArray: function toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
var reserved = ['toArray', 'constructor', 'each'];

List.extend = function (methods) {
  methods = methods.reduce(function (obj, name) {
    // Don't overwrite own methods
    if (reserved.includes(name)) return obj; // Don't add private methods

    if (name[0] === '_') return obj; // Relay every call to each()

    obj[name] = function () {
      for (var _len2 = arguments.length, attrs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        attrs[_key2] = arguments[_key2];
      }

      return this.each.apply(this, [name].concat(attrs));
    };

    return obj;
  }, {});
  extend(List, methods);
};

function baseFind(query, parent) {
  return new List(map((parent || globals.document).querySelectorAll(query), function (node) {
    return adopt(node);
  }));
} // Scoped find method


function find(query) {
  return baseFind(query, this.node);
}

function findOne(query) {
  return adopt(this.node.querySelector(query));
}

var EventTarget = /*#__PURE__*/function (_Base) {
  _inherits(EventTarget, _Base);

  function EventTarget() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$events = _ref.events,
        events = _ref$events === void 0 ? {} : _ref$events;

    _classCallCheck(this, EventTarget);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EventTarget).call(this));
    _this.events = events;
    return _this;
  }

  _createClass(EventTarget, [{
    key: "addEventListener",
    value: function addEventListener() {}
  }, {
    key: "dispatch",
    value: function dispatch$1(event, data) {
      return dispatch(this, event, data);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      var bag = this.getEventHolder().events;
      if (!bag) return true;
      var events = bag[event.type];

      for (var i in events) {
        for (var j in events[i]) {
          events[i][j](event);
        }
      }

      return !event.defaultPrevented;
    } // Fire given event

  }, {
    key: "fire",
    value: function fire(event, data) {
      this.dispatch(event, data);
      return this;
    }
  }, {
    key: "getEventHolder",
    value: function getEventHolder() {
      return this;
    }
  }, {
    key: "getEventTarget",
    value: function getEventTarget() {
      return this;
    } // Unbind event from listener

  }, {
    key: "off",
    value: function off$1(event, listener) {
      off(this, event, listener);
      return this;
    } // Bind given event to listener

  }, {
    key: "on",
    value: function on$1(event, listener, binding, options) {
      on(this, event, listener, binding, options);
      return this;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {}
  }]);

  return EventTarget;
}(Base);

exports.EventTarget = EventTarget;
register(EventTarget, 'EventTarget');

function noop() {} // Default animation values


var timeline = {
  duration: 400,
  ease: '>',
  delay: 0
}; // Default attribute values

var attrs = {
  // fill and stroke
  'fill-opacity': 1,
  'stroke-opacity': 1,
  'stroke-width': 0,
  'stroke-linejoin': 'miter',
  'stroke-linecap': 'butt',
  fill: '#000000',
  stroke: '#000000',
  opacity: 1,
  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  // size
  width: 0,
  height: 0,
  // radius
  r: 0,
  rx: 0,
  ry: 0,
  // gradient
  offset: 0,
  'stop-opacity': 1,
  'stop-color': '#000000',
  // text
  'text-anchor': 'start'
};
var defaults = {
  __proto__: null,
  noop: noop,
  timeline: timeline,
  attrs: attrs
};
exports.defaults = defaults;
var SVGArray = subClassArray('SVGArray', Array, function (arr) {
  this.init(arr);
});
exports.Array = SVGArray;
extend(SVGArray, {
  init: function init(arr) {
    // This catches the case, that native map tries to create an array with new Array(1)
    if (typeof arr === 'number') return this;
    this.length = 0;
    this.push.apply(this, _toConsumableArray(this.parse(arr)));
    return this;
  },
  toArray: function toArray() {
    return Array.prototype.concat.apply([], this);
  },
  toString: function toString() {
    return this.join(' ');
  },
  // Flattens the array if needed
  valueOf: function valueOf() {
    var ret = [];
    ret.push.apply(ret, _toConsumableArray(this));
    return ret;
  },
  // Parse whitespace separated string
  parse: function parse() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []; // If already is an array, no need to parse it

    if (array instanceof Array) return array;
    return array.trim().split(delimiter).map(parseFloat);
  },
  clone: function clone() {
    return new this.constructor(this);
  },
  toSet: function toSet() {
    return new Set(this);
  }
});

var SVGNumber = /*#__PURE__*/function () {
  // Initialize
  function SVGNumber() {
    _classCallCheck(this, SVGNumber);

    this.init.apply(this, arguments);
  }

  _createClass(SVGNumber, [{
    key: "init",
    value: function init(value, unit) {
      unit = Array.isArray(value) ? value[1] : unit;
      value = Array.isArray(value) ? value[0] : value; // initialize defaults

      this.value = 0;
      this.unit = unit || ''; // parse value

      if (typeof value === 'number') {
        // ensure a valid numeric value
        this.value = isNaN(value) ? 0 : !isFinite(value) ? value < 0 ? -3.4e+38 : +3.4e+38 : value;
      } else if (typeof value === 'string') {
        unit = value.match(numberAndUnit);

        if (unit) {
          // make value numeric
          this.value = parseFloat(unit[1]); // normalize

          if (unit[5] === '%') {
            this.value /= 100;
          } else if (unit[5] === 's') {
            this.value *= 1000;
          } // store unit


          this.unit = unit[5];
        }
      } else {
        if (value instanceof SVGNumber) {
          this.value = value.valueOf();
          this.unit = value.unit;
        }
      }

      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return (this.unit === '%' ? ~~(this.value * 1e8) / 1e6 : this.unit === 's' ? this.value / 1e3 : this.value) + this.unit;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toString();
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.value, this.unit];
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    } // Add number

  }, {
    key: "plus",
    value: function plus(number) {
      number = new SVGNumber(number);
      return new SVGNumber(this + number, this.unit || number.unit);
    } // Subtract number

  }, {
    key: "minus",
    value: function minus(number) {
      number = new SVGNumber(number);
      return new SVGNumber(this - number, this.unit || number.unit);
    } // Multiply number

  }, {
    key: "times",
    value: function times(number) {
      number = new SVGNumber(number);
      return new SVGNumber(this * number, this.unit || number.unit);
    } // Divide number

  }, {
    key: "divide",
    value: function divide(number) {
      number = new SVGNumber(number);
      return new SVGNumber(this / number, this.unit || number.unit);
    }
  }, {
    key: "convert",
    value: function convert(unit) {
      return new SVGNumber(this.value, unit);
    }
  }]);

  return SVGNumber;
}();

exports.Number = SVGNumber;
var hooks = [];

function registerAttrHook(fn) {
  hooks.push(fn);
} // Set svg element attribute


function attr(attr, val, ns) {
  var _this = this; // act as full getter


  if (attr == null) {
    // get an object of attributes
    attr = {};
    val = this.node.attributes;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;
        attr[node.nodeName] = isNumber.test(node.nodeValue) ? parseFloat(node.nodeValue) : node.nodeValue;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return attr;
  } else if (attr instanceof Array) {
    // loop through array and get all values
    return attr.reduce(function (last, curr) {
      last[curr] = _this.attr(curr);
      return last;
    }, {});
  } else if (_typeof(attr) === 'object' && attr.constructor === Object) {
    // apply every attribute individually if an object is passed
    for (val in attr) {
      this.attr(val, attr[val]);
    }
  } else if (val === null) {
    // remove value
    this.node.removeAttribute(attr);
  } else if (val == null) {
    // act as a getter if the first and only argument is not an object
    val = this.node.getAttribute(attr);
    return val == null ? attrs[attr] : isNumber.test(val) ? parseFloat(val) : val;
  } else {
    // Loop through hooks and execute them to convert value
    val = hooks.reduce(function (_val, hook) {
      return hook(attr, _val, _this);
    }, val); // ensure correct numeric values (also accepts NaN and Infinity)

    if (typeof val === 'number') {
      val = new SVGNumber(val);
    } else if (Color.isColor(val)) {
      // ensure full hex color
      val = new Color(val);
    } else if (val.constructor === Array) {
      // Check for plain arrays and parse array values
      val = new SVGArray(val);
    } // if the passed attribute is leading...


    if (attr === 'leading') {
      // ... call the leading method instead
      if (this.leading) {
        this.leading(val);
      }
    } else {
      // set given attribute on node
      typeof ns === 'string' ? this.node.setAttributeNS(ns, attr, val.toString()) : this.node.setAttribute(attr, val.toString());
    } // rebuild if required


    if (this.rebuild && (attr === 'font-size' || attr === 'x')) {
      this.rebuild();
    }
  }

  return this;
}

var Dom = /*#__PURE__*/function (_EventTarget) {
  _inherits(Dom, _EventTarget);

  function Dom(node, attrs) {
    var _this2;

    _classCallCheck(this, Dom);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Dom).call(this, node));
    _this2.node = node;
    _this2.type = node.nodeName;

    if (attrs && node !== attrs) {
      _this2.attr(attrs);
    }

    return _this2;
  } // Add given element at a position


  _createClass(Dom, [{
    key: "add",
    value: function add(element, i) {
      element = makeInstance(element);

      if (i == null) {
        this.node.appendChild(element.node);
      } else if (element.node !== this.node.childNodes[i]) {
        this.node.insertBefore(element.node, this.node.childNodes[i]);
      }

      return this;
    } // Add element to given container and return self

  }, {
    key: "addTo",
    value: function addTo(parent) {
      return makeInstance(parent).put(this);
    } // Returns all child elements

  }, {
    key: "children",
    value: function children() {
      return new List(map(this.node.children, function (node) {
        return adopt(node);
      }));
    } // Remove all elements in this container

  }, {
    key: "clear",
    value: function clear() {
      // remove children
      while (this.node.hasChildNodes()) {
        this.node.removeChild(this.node.lastChild);
      }

      return this;
    } // Clone element

  }, {
    key: "clone",
    value: function clone() {
      // write dom data to the dom so the clone can pickup the data
      this.writeDataToDom(); // clone element and assign new id

      return assignNewId(this.node.cloneNode(true));
    } // Iterates over all children and invokes a given block

  }, {
    key: "each",
    value: function each(block, deep) {
      var children = this.children();
      var i, il;

      for (i = 0, il = children.length; i < il; i++) {
        block.apply(children[i], [i, children]);

        if (deep) {
          children[i].each(block, deep);
        }
      }

      return this;
    }
  }, {
    key: "element",
    value: function element(nodeName) {
      return this.put(new Dom(create(nodeName)));
    } // Get first child

  }, {
    key: "first",
    value: function first() {
      return adopt(this.node.firstChild);
    } // Get a element at the given index

  }, {
    key: "get",
    value: function get(i) {
      return adopt(this.node.childNodes[i]);
    }
  }, {
    key: "getEventHolder",
    value: function getEventHolder() {
      return this.node;
    }
  }, {
    key: "getEventTarget",
    value: function getEventTarget() {
      return this.node;
    } // Checks if the given element is a child

  }, {
    key: "has",
    value: function has(element) {
      return this.index(element) >= 0;
    } // Get / set id

  }, {
    key: "id",
    value: function id(_id) {
      // generate new id if no id set
      if (typeof _id === 'undefined' && !this.node.id) {
        this.node.id = eid(this.type);
      } // dont't set directly width this.node.id to make `null` work correctly


      return this.attr('id', _id);
    } // Gets index of given element

  }, {
    key: "index",
    value: function index(element) {
      return [].slice.call(this.node.childNodes).indexOf(element.node);
    } // Get the last child

  }, {
    key: "last",
    value: function last() {
      return adopt(this.node.lastChild);
    } // matches the element vs a css selector

  }, {
    key: "matches",
    value: function matches(selector) {
      var el = this.node;
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    } // Returns the parent element instance

  }, {
    key: "parent",
    value: function parent(type) {
      var parent = this; // check for parent

      if (!parent.node.parentNode) return null; // get parent element

      parent = adopt(parent.node.parentNode);
      if (!type) return parent; // loop trough ancestors if type is given

      while (parent) {
        if (typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent;
        if (!parent.node.parentNode || parent.node.parentNode.nodeName === '#document' || parent.node.parentNode.nodeName === '#document-fragment') return null; // #759, #720

        parent = adopt(parent.node.parentNode);
      }
    } // Basically does the same as `add()` but returns the added element instead

  }, {
    key: "put",
    value: function put(element, i) {
      this.add(element, i);
      return element;
    } // Add element to given container and return container

  }, {
    key: "putIn",
    value: function putIn(parent) {
      return makeInstance(parent).add(this);
    } // Remove element

  }, {
    key: "remove",
    value: function remove() {
      if (this.parent()) {
        this.parent().removeElement(this);
      }

      return this;
    } // Remove a given child

  }, {
    key: "removeElement",
    value: function removeElement(element) {
      this.node.removeChild(element.node);
      return this;
    } // Replace this with element

  }, {
    key: "replace",
    value: function replace(element) {
      element = makeInstance(element);
      this.node.parentNode.replaceChild(element.node, this.node);
      return element;
    }
  }, {
    key: "round",
    value: function round() {
      var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      var map = arguments.length > 1 ? arguments[1] : undefined;
      var factor = Math.pow(10, precision);
      var attrs = this.attr(); // If we have no map, build one from attrs

      if (!map) {
        map = Object.keys(attrs);
      } // Holds rounded attributes


      var newAttrs = {};
      map.forEach(function (key) {
        newAttrs[key] = Math.round(attrs[key] * factor) / factor;
      });
      this.attr(newAttrs);
      return this;
    } // Return id on string conversion

  }, {
    key: "toString",
    value: function toString() {
      return this.id();
    } // Import raw svg

  }, {
    key: "svg",
    value: function svg(svgOrFn, outerHTML) {
      var well, len, fragment;

      if (svgOrFn === false) {
        outerHTML = false;
        svgOrFn = null;
      } // act as getter if no svg string is given


      if (svgOrFn == null || typeof svgOrFn === 'function') {
        // The default for exports is, that the outerNode is included
        outerHTML = outerHTML == null ? true : outerHTML; // write svgjs data to the dom

        this.writeDataToDom();
        var current = this; // An export modifier was passed

        if (svgOrFn != null) {
          current = adopt(current.node.cloneNode(true)); // If the user wants outerHTML we need to process this node, too

          if (outerHTML) {
            var result = svgOrFn(current);
            current = result || current; // The user does not want this node? Well, then he gets nothing

            if (result === false) return '';
          } // Deep loop through all children and apply modifier


          current.each(function () {
            var result = svgOrFn(this);

            var _this = result || this; // If modifier returns false, discard node


            if (result === false) {
              this.remove(); // If modifier returns new node, use it
            } else if (result && this !== _this) {
              this.replace(_this);
            }
          }, true);
        } // Return outer or inner content


        return outerHTML ? current.node.outerHTML : current.node.innerHTML;
      } // Act as setter if we got a string
      // The default for import is, that the current node is not replaced


      outerHTML = outerHTML == null ? false : outerHTML; // Create temporary holder

      well = globals.document.createElementNS(ns, 'svg');
      fragment = globals.document.createDocumentFragment(); // Dump raw svg

      well.innerHTML = svgOrFn; // Transplant nodes into the fragment

      for (len = well.children.length; len--;) {
        fragment.appendChild(well.firstElementChild);
      }

      var parent = this.parent(); // Add the whole fragment at once

      return outerHTML ? this.replace(fragment) && parent : this.add(fragment);
    }
  }, {
    key: "words",
    value: function words(text) {
      // This is faster than removing all children and adding a new one
      this.node.textContent = text;
      return this;
    } // write svgjs data to the dom

  }, {
    key: "writeDataToDom",
    value: function writeDataToDom() {
      // dump variables recursively
      this.each(function () {
        this.writeDataToDom();
      });
      return this;
    }
  }]);

  return Dom;
}(EventTarget);

exports.Dom = Dom;
extend(Dom, {
  attr: attr,
  find: find,
  findOne: findOne
});
register(Dom, 'Dom');

var Element = /*#__PURE__*/function (_Dom) {
  _inherits(Element, _Dom);

  function Element(node, attrs) {
    var _this;

    _classCallCheck(this, Element);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Element).call(this, node, attrs)); // initialize data object

    _this.dom = {}; // create circular reference

    _this.node.instance = _assertThisInitialized(_this);

    if (node.hasAttribute('svgjs:data')) {
      // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
      _this.setData(JSON.parse(node.getAttribute('svgjs:data')) || {});
    }

    return _this;
  } // Move element by its center


  _createClass(Element, [{
    key: "center",
    value: function center(x, y) {
      return this.cx(x).cy(y);
    } // Move by center over x-axis

  }, {
    key: "cx",
    value: function cx(x) {
      return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2);
    } // Move by center over y-axis

  }, {
    key: "cy",
    value: function cy(y) {
      return y == null ? this.y() + this.height() / 2 : this.y(y - this.height() / 2);
    } // Get defs

  }, {
    key: "defs",
    value: function defs() {
      return this.root().defs();
    } // Relative move over x and y axes

  }, {
    key: "dmove",
    value: function dmove(x, y) {
      return this.dx(x).dy(y);
    } // Relative move over x axis

  }, {
    key: "dx",
    value: function dx() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this.x(new SVGNumber(x).plus(this.x()));
    } // Relative move over y axis

  }, {
    key: "dy",
    value: function dy() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this.y(new SVGNumber(y).plus(this.y()));
    } // Get parent document

  }, {
    key: "root",
    value: function root$1() {
      var p = this.parent(getClass(root));
      return p && p.root();
    }
  }, {
    key: "getEventHolder",
    value: function getEventHolder() {
      return this;
    } // Set height of element

  }, {
    key: "height",
    value: function height(_height) {
      return this.attr('height', _height);
    } // Checks whether the given point inside the bounding box of the element

  }, {
    key: "inside",
    value: function inside(x, y) {
      var box = this.bbox();
      return x > box.x && y > box.y && x < box.x + box.width && y < box.y + box.height;
    } // Move element to given x and y values

  }, {
    key: "move",
    value: function move(x, y) {
      return this.x(x).y(y);
    } // return array of all ancestors of given type up to the root svg

  }, {
    key: "parents",
    value: function parents() {
      var until = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globals.document;
      until = makeInstance(until);
      var parents = new List();
      var parent = this;

      while ((parent = parent.parent()) && parent.node !== until.node && parent.node !== globals.document) {
        parents.push(parent);
      }

      return parents;
    } // Get referenced element form attribute value

  }, {
    key: "reference",
    value: function reference$1(attr) {
      attr = this.attr(attr);
      if (!attr) return null;
      var m = attr.match(reference);
      return m ? makeInstance(m[1]) : null;
    } // set given data to the elements data property

  }, {
    key: "setData",
    value: function setData(o) {
      this.dom = o;
      return this;
    } // Set element size to given width and height

  }, {
    key: "size",
    value: function size(width, height) {
      var p = proportionalSize(this, width, height);
      return this.width(new SVGNumber(p.width)).height(new SVGNumber(p.height));
    } // Set width of element

  }, {
    key: "width",
    value: function width(_width) {
      return this.attr('width', _width);
    } // write svgjs data to the dom

  }, {
    key: "writeDataToDom",
    value: function writeDataToDom() {
      // remove previously set data
      this.node.removeAttribute('svgjs:data');

      if (Object.keys(this.dom).length) {
        this.node.setAttribute('svgjs:data', JSON.stringify(this.dom)); // see #428
      }

      return _get(_getPrototypeOf(Element.prototype), "writeDataToDom", this).call(this);
    } // Move over x-axis

  }, {
    key: "x",
    value: function x(_x) {
      return this.attr('x', _x);
    } // Move over y-axis

  }, {
    key: "y",
    value: function y(_y) {
      return this.attr('y', _y);
    }
  }]);

  return Element;
}(Dom);

exports.Element = Element;
extend(Element, {
  bbox: bbox,
  rbox: rbox,
  point: point,
  ctm: ctm,
  screenCTM: screenCTM
});
register(Element, 'Element');
var sugar = {
  stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset'],
  fill: ['color', 'opacity', 'rule'],
  prefix: function prefix(t, a) {
    return a === 'color' ? t : t + '-' + a;
  }
} // Add sugar for fill and stroke
;
['fill', 'stroke'].forEach(function (m) {
  var extension = {};
  var i;

  extension[m] = function (o) {
    if (typeof o === 'undefined') {
      return this.attr(m);
    }

    if (typeof o === 'string' || o instanceof Color || Color.isRgb(o) || o instanceof Element) {
      this.attr(m, o);
    } else {
      // set all attributes from sugar.fill and sugar.stroke list
      for (i = sugar[m].length - 1; i >= 0; i--) {
        if (o[sugar[m][i]] != null) {
          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
        }
      }
    }

    return this;
  };

  registerMethods(['Element', 'Runner'], extension);
});
registerMethods(['Element', 'Runner'], {
  // Let the user set the matrix directly
  matrix: function matrix(mat, b, c, d, e, f) {
    // Act as a getter
    if (mat == null) {
      return new Matrix(this);
    } // Act as a setter, the user can pass a matrix or a set of numbers


    return this.attr('transform', new Matrix(mat, b, c, d, e, f));
  },
  // Map rotation to transform
  rotate: function rotate(angle, cx, cy) {
    return this.transform({
      rotate: angle,
      ox: cx,
      oy: cy
    }, true);
  },
  // Map skew to transform
  skew: function skew(x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      skew: x,
      ox: y,
      oy: cx
    }, true) : this.transform({
      skew: [x, y],
      ox: cx,
      oy: cy
    }, true);
  },
  shear: function shear(lam, cx, cy) {
    return this.transform({
      shear: lam,
      ox: cx,
      oy: cy
    }, true);
  },
  // Map scale to transform
  scale: function scale(x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      scale: x,
      ox: y,
      oy: cx
    }, true) : this.transform({
      scale: [x, y],
      ox: cx,
      oy: cy
    }, true);
  },
  // Map translate to transform
  translate: function translate(x, y) {
    return this.transform({
      translate: [x, y]
    }, true);
  },
  // Map relative translations to transform
  relative: function relative(x, y) {
    return this.transform({
      relative: [x, y]
    }, true);
  },
  // Map flip to transform
  flip: function flip(direction, around) {
    var directionString = typeof direction === 'string' ? direction : isFinite(direction) ? 'both' : 'both';
    var origin = direction === 'both' && isFinite(around) ? [around, around] : direction === 'x' ? [around, 0] : direction === 'y' ? [0, around] : isFinite(direction) ? [direction, direction] : [0, 0];
    return this.transform({
      flip: directionString,
      origin: origin
    }, true);
  },
  // Opacity
  opacity: function opacity(value) {
    return this.attr('opacity', value);
  }
});
registerMethods('radius', {
  // Add x and y radius
  radius: function radius(x, y) {
    var type = (this._element || this).type;
    return type === 'radialGradient' || type === 'radialGradient' ? this.attr('r', new SVGNumber(x)) : this.rx(x).ry(y == null ? x : y);
  }
});
registerMethods('Path', {
  // Get path length
  length: function length() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function pointAt(length) {
    return new Point(this.node.getPointAtLength(length));
  }
});
registerMethods(['Element', 'Runner'], {
  // Set font
  font: function font(a, v) {
    if (_typeof(a) === 'object') {
      for (v in a) {
        this.font(v, a[v]);
      }

      return this;
    }

    return a === 'leading' ? this.leading(v) : a === 'anchor' ? this.attr('text-anchor', v) : a === 'size' || a === 'family' || a === 'weight' || a === 'stretch' || a === 'variant' || a === 'style' ? this.attr('font-' + a, v) : this.attr(a, v);
  }
});
registerMethods('Text', {
  ax: function ax(x) {
    return this.attr('x', x);
  },
  ay: function ay(y) {
    return this.attr('y', y);
  },
  amove: function amove(x, y) {
    return this.ax(x).ay(y);
  }
}); // Add events to elements

var methods$1 = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave', 'touchstart', 'touchmove', 'touchleave', 'touchend', 'touchcancel'].reduce(function (last, event) {
  // add event to Element
  var fn = function fn(f) {
    if (f === null) {
      off(this, event);
    } else {
      on(this, event, f);
    }

    return this;
  };

  last[event] = fn;
  return last;
}, {});
registerMethods('Element', methods$1);
var nativeReverse = [].reverse;
var test$1 = [1, 2]; // `Array.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794

_export({
  target: 'Array',
  proto: true,
  forced: String(test$1) === String(test$1.reverse())
}, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
}); // `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties


_export({
  target: 'Object',
  stat: true,
  forced: !descriptors,
  sham: !descriptors
}, {
  defineProperties: objectDefineProperties
}); // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty


_export({
  target: 'Object',
  stat: true,
  forced: !descriptors,
  sham: !descriptors
}, {
  defineProperty: objectDefineProperty.f
});

var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var FAILS_ON_PRIMITIVES$2 = fails(function () {
  nativeGetOwnPropertyDescriptor$2(1);
});
var FORCED$3 = !descriptors || FAILS_ON_PRIMITIVES$2; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

_export({
  target: 'Object',
  stat: true,
  forced: FORCED$3,
  sham: !descriptors
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
  }
}); // `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors


_export({
  target: 'Object',
  stat: true,
  sham: !descriptors
}, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;

    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }

    return result;
  }
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function untransform() {
  return this.attr('transform', null);
} // merge the whole transformation chain into one matrix and returns it


function matrixify() {
  var matrix = (this.attr('transform') || ''). // split transformations
  split(transforms).slice(0, -1).map(function (str) {
    // generate key => value pairs
    var kv = str.trim().split('(');
    return [kv[0], kv[1].split(delimiter).map(function (str) {
      return parseFloat(str);
    })];
  }).reverse() // merge every transformation into one matrix
  .reduce(function (matrix, transform) {
    if (transform[0] === 'matrix') {
      return matrix.lmultiply(Matrix.fromArray(transform[1]));
    }

    return matrix[transform[0]].apply(matrix, transform[1]);
  }, new Matrix());
  return matrix;
} // add an element to another parent without changing the visual representation on the screen


function toParent(parent) {
  if (this === parent) return this;
  var ctm = this.screenCTM();
  var pCtm = parent.screenCTM().inverse();
  this.addTo(parent).untransform().transform(pCtm.multiply(ctm));
  return this;
} // same as above with parent equals root-svg


function toRoot() {
  return this.toParent(this.root());
} // Add transformations


function transform(o, relative) {
  // Act as a getter if no object was passed
  if (o == null || typeof o === 'string') {
    var decomposed = new Matrix(this).decompose();
    return o == null ? decomposed : decomposed[o];
  }

  if (!Matrix.isMatrixLike(o)) {
    // Set the origin according to the defined transform
    o = _objectSpread({}, o, {
      origin: getOrigin(o, this)
    });
  } // The user can pass a boolean, an Element or an Matrix or nothing


  var cleanRelative = relative === true ? this : relative || false;
  var result = new Matrix(cleanRelative).transform(o);
  return this.attr('transform', result);
}

registerMethods('Element', {
  untransform: untransform,
  matrixify: matrixify,
  toParent: toParent,
  toRoot: toRoot,
  transform: transform
});

function rx(rx) {
  return this.attr('rx', rx);
} // Radius y value


function ry(ry) {
  return this.attr('ry', ry);
} // Move over x-axis


function x(x) {
  return x == null ? this.cx() - this.rx() : this.cx(x + this.rx());
} // Move over y-axis


function y(y) {
  return y == null ? this.cy() - this.ry() : this.cy(y + this.ry());
} // Move by center over x-axis


function cx(x) {
  return x == null ? this.attr('cx') : this.attr('cx', x);
} // Move by center over y-axis


function cy(y) {
  return y == null ? this.attr('cy') : this.attr('cy', y);
} // Set width of element


function width(width) {
  return width == null ? this.rx() * 2 : this.rx(new SVGNumber(width).divide(2));
} // Set height of element


function height(height) {
  return height == null ? this.ry() * 2 : this.ry(new SVGNumber(height).divide(2));
}

var circled = {
  __proto__: null,
  rx: rx,
  ry: ry,
  x: x,
  y: y,
  cx: cx,
  cy: cy,
  width: width,
  height: height
};

var Shape = /*#__PURE__*/function (_Element) {
  _inherits(Shape, _Element);

  function Shape() {
    _classCallCheck(this, Shape);

    return _possibleConstructorReturn(this, _getPrototypeOf(Shape).apply(this, arguments));
  }

  return Shape;
}(Element);

exports.Shape = Shape;
register(Shape, 'Shape');

var Circle = /*#__PURE__*/function (_Shape) {
  _inherits(Circle, _Shape);

  function Circle(node) {
    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this, nodeOrNew('circle', node), node));
  }

  _createClass(Circle, [{
    key: "radius",
    value: function radius(r) {
      return this.attr('r', r);
    } // Radius x value

  }, {
    key: "rx",
    value: function rx(_rx) {
      return this.attr('r', _rx);
    } // Alias radius x value

  }, {
    key: "ry",
    value: function ry(_ry) {
      return this.rx(_ry);
    }
  }, {
    key: "size",
    value: function size(_size) {
      return this.radius(new SVGNumber(_size).divide(2));
    }
  }]);

  return Circle;
}(Shape);

exports.Circle = Circle;
extend(Circle, {
  x: x,
  y: y,
  cx: cx,
  cy: cy,
  width: width,
  height: height
});
registerMethods({
  Container: {
    // Create circle element
    circle: wrapWithAttrCheck(function (size) {
      return this.put(new Circle()).size(size).move(0, 0);
    })
  }
});
register(Circle, 'Circle');

var Container = /*#__PURE__*/function (_Element) {
  _inherits(Container, _Element);

  function Container() {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, _getPrototypeOf(Container).apply(this, arguments));
  }

  _createClass(Container, [{
    key: "flatten",
    value: function flatten(parent) {
      this.each(function () {
        if (this instanceof Container) return this.flatten(parent).ungroup(parent);
        return this.toParent(parent);
      }); // we need this so that the root does not get removed

      this.node.firstElementChild || this.remove();
      return this;
    }
  }, {
    key: "ungroup",
    value: function ungroup(parent) {
      parent = parent || this.parent();
      this.each(function () {
        return this.toParent(parent);
      });
      this.remove();
      return this;
    }
  }]);

  return Container;
}(Element);

exports.Container = Container;
register(Container, 'Container');

var Defs = /*#__PURE__*/function (_Container) {
  _inherits(Defs, _Container);

  function Defs(node) {
    _classCallCheck(this, Defs);

    return _possibleConstructorReturn(this, _getPrototypeOf(Defs).call(this, nodeOrNew('defs', node), node));
  }

  _createClass(Defs, [{
    key: "flatten",
    value: function flatten() {
      return this;
    }
  }, {
    key: "ungroup",
    value: function ungroup() {
      return this;
    }
  }]);

  return Defs;
}(Container);

exports.Defs = Defs;
register(Defs, 'Defs');

var Ellipse = /*#__PURE__*/function (_Shape) {
  _inherits(Ellipse, _Shape);

  function Ellipse(node) {
    _classCallCheck(this, Ellipse);

    return _possibleConstructorReturn(this, _getPrototypeOf(Ellipse).call(this, nodeOrNew('ellipse', node), node));
  }

  _createClass(Ellipse, [{
    key: "size",
    value: function size(width, height) {
      var p = proportionalSize(this, width, height);
      return this.rx(new SVGNumber(p.width).divide(2)).ry(new SVGNumber(p.height).divide(2));
    }
  }]);

  return Ellipse;
}(Shape);

exports.Ellipse = Ellipse;
extend(Ellipse, circled);
registerMethods('Container', {
  // Create an ellipse
  ellipse: wrapWithAttrCheck(function () {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;
    return this.put(new Ellipse()).size(width, height).move(0, 0);
  })
});
register(Ellipse, 'Ellipse');

var Stop = /*#__PURE__*/function (_Element) {
  _inherits(Stop, _Element);

  function Stop(node) {
    _classCallCheck(this, Stop);

    return _possibleConstructorReturn(this, _getPrototypeOf(Stop).call(this, nodeOrNew('stop', node), node));
  } // add color stops


  _createClass(Stop, [{
    key: "update",
    value: function update(o) {
      if (typeof o === 'number' || o instanceof SVGNumber) {
        o = {
          offset: arguments[0],
          color: arguments[1],
          opacity: arguments[2]
        };
      } // set attributes


      if (o.opacity != null) this.attr('stop-opacity', o.opacity);
      if (o.color != null) this.attr('stop-color', o.color);
      if (o.offset != null) this.attr('offset', new SVGNumber(o.offset));
      return this;
    }
  }]);

  return Stop;
}(Element);

exports.Stop = Stop;
register(Stop, 'Stop');

function from(x, y) {
  return (this._element || this).type === 'radialGradient' ? this.attr({
    fx: new SVGNumber(x),
    fy: new SVGNumber(y)
  }) : this.attr({
    x1: new SVGNumber(x),
    y1: new SVGNumber(y)
  });
}

function to(x, y) {
  return (this._element || this).type === 'radialGradient' ? this.attr({
    cx: new SVGNumber(x),
    cy: new SVGNumber(y)
  }) : this.attr({
    x2: new SVGNumber(x),
    y2: new SVGNumber(y)
  });
}

var gradiented = {
  __proto__: null,
  from: from,
  to: to
};

var Gradient = /*#__PURE__*/function (_Container) {
  _inherits(Gradient, _Container);

  function Gradient(type, attrs) {
    _classCallCheck(this, Gradient);

    return _possibleConstructorReturn(this, _getPrototypeOf(Gradient).call(this, nodeOrNew(type + 'Gradient', typeof type === 'string' ? null : type), attrs));
  } // Add a color stop


  _createClass(Gradient, [{
    key: "stop",
    value: function stop(offset, color, opacity) {
      return this.put(new Stop()).update(offset, color, opacity);
    } // Update gradient

  }, {
    key: "update",
    value: function update(block) {
      // remove all stops
      this.clear(); // invoke passed block

      if (typeof block === 'function') {
        block.call(this, this);
      }

      return this;
    } // Return the fill id

  }, {
    key: "url",
    value: function url() {
      return 'url(#' + this.id() + ')';
    } // Alias string convertion to fill

  }, {
    key: "toString",
    value: function toString() {
      return this.url();
    } // custom attr to handle transform

  }, {
    key: "attr",
    value: function attr(a, b, c) {
      if (a === 'transform') a = 'gradientTransform';
      return _get(_getPrototypeOf(Gradient.prototype), "attr", this).call(this, a, b, c);
    }
  }, {
    key: "targets",
    value: function targets() {
      return baseFind('svg [fill*="' + this.id() + '"]');
    }
  }, {
    key: "bbox",
    value: function bbox() {
      return new Box();
    }
  }]);

  return Gradient;
}(Container);

exports.Gradient = Gradient;
extend(Gradient, gradiented);
registerMethods({
  Container: {
    // Create gradient element in defs
    gradient: wrapWithAttrCheck(function (type, block) {
      return this.defs().gradient(type, block);
    })
  },
  // define gradient
  Defs: {
    gradient: wrapWithAttrCheck(function (type, block) {
      return this.put(new Gradient(type)).update(block);
    })
  }
});
register(Gradient, 'Gradient');

var Pattern = /*#__PURE__*/function (_Container) {
  _inherits(Pattern, _Container); // Initialize node


  function Pattern(node) {
    _classCallCheck(this, Pattern);

    return _possibleConstructorReturn(this, _getPrototypeOf(Pattern).call(this, nodeOrNew('pattern', node), node));
  } // Return the fill id


  _createClass(Pattern, [{
    key: "url",
    value: function url() {
      return 'url(#' + this.id() + ')';
    } // Update pattern by rebuilding

  }, {
    key: "update",
    value: function update(block) {
      // remove content
      this.clear(); // invoke passed block

      if (typeof block === 'function') {
        block.call(this, this);
      }

      return this;
    } // Alias string convertion to fill

  }, {
    key: "toString",
    value: function toString() {
      return this.url();
    } // custom attr to handle transform

  }, {
    key: "attr",
    value: function attr(a, b, c) {
      if (a === 'transform') a = 'patternTransform';
      return _get(_getPrototypeOf(Pattern.prototype), "attr", this).call(this, a, b, c);
    }
  }, {
    key: "targets",
    value: function targets() {
      return baseFind('svg [fill*="' + this.id() + '"]');
    }
  }, {
    key: "bbox",
    value: function bbox() {
      return new Box();
    }
  }]);

  return Pattern;
}(Container);

exports.Pattern = Pattern;
registerMethods({
  Container: {
    // Create pattern element in defs
    pattern: function pattern() {
      var _this$defs;

      return (_this$defs = this.defs()).pattern.apply(_this$defs, arguments);
    }
  },
  Defs: {
    pattern: wrapWithAttrCheck(function (width, height, block) {
      return this.put(new Pattern()).update(block).attr({
        x: 0,
        y: 0,
        width: width,
        height: height,
        patternUnits: 'userSpaceOnUse'
      });
    })
  }
});
register(Pattern, 'Pattern');

var Image = /*#__PURE__*/function (_Shape) {
  _inherits(Image, _Shape);

  function Image(node) {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, _getPrototypeOf(Image).call(this, nodeOrNew('image', node), node));
  } // (re)load image


  _createClass(Image, [{
    key: "load",
    value: function load(url, callback) {
      if (!url) return this;
      var img = new globals.window.Image();
      on(img, 'load', function (e) {
        var p = this.parent(Pattern); // ensure image size

        if (this.width() === 0 && this.height() === 0) {
          this.size(img.width, img.height);
        }

        if (p instanceof Pattern) {
          // ensure pattern size if not set
          if (p.width() === 0 && p.height() === 0) {
            p.size(this.width(), this.height());
          }
        }

        if (typeof callback === 'function') {
          callback.call(this, e);
        }
      }, this);
      on(img, 'load error', function () {
        // dont forget to unbind memory leaking events
        off(img);
      });
      return this.attr('href', img.src = url, xlink);
    }
  }]);

  return Image;
}(Shape);

exports.Image = Image;
registerAttrHook(function (attr, val, _this) {
  // convert image fill and stroke to patterns
  if (attr === 'fill' || attr === 'stroke') {
    if (isImage.test(val)) {
      val = _this.root().defs().image(val);
    }
  }

  if (val instanceof Image) {
    val = _this.root().defs().pattern(0, 0, function (pattern) {
      pattern.add(val);
    });
  }

  return val;
});
registerMethods({
  Container: {
    // create image element, load image and set its size
    image: wrapWithAttrCheck(function (source, callback) {
      return this.put(new Image()).size(0, 0).load(source, callback);
    })
  }
});
register(Image, 'Image');
var PointArray = subClassArray('PointArray', SVGArray);
exports.PointArray = PointArray;
extend(PointArray, {
  // Convert array to string
  toString: function toString() {
    // convert to a poly point string
    for (var i = 0, il = this.length, array = []; i < il; i++) {
      array.push(this[i].join(','));
    }

    return array.join(' ');
  },
  // Convert array to line object
  toLine: function toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    };
  },
  // Get morphed array at given position
  at: function at(pos) {
    // make sure a destination is defined
    if (!this.destination) return this; // generate morphed point string

    for (var i = 0, il = this.length, array = []; i < il; i++) {
      array.push([this[i][0] + (this.destination[i][0] - this[i][0]) * pos, this[i][1] + (this.destination[i][1] - this[i][1]) * pos]);
    }

    return new PointArray(array);
  },
  // Parse point string and flat array
  parse: function parse() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [[0, 0]];
    var points = []; // if it is an array

    if (array instanceof Array) {
      // and it is not flat, there is no need to parse it
      if (array[0] instanceof Array) {
        return array;
      }
    } else {
      // Else, it is considered as a string
      // parse points
      array = array.trim().split(delimiter).map(parseFloat);
    } // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
    // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.


    if (array.length % 2 !== 0) array.pop(); // wrap points in two-tuples

    for (var i = 0, len = array.length; i < len; i = i + 2) {
      points.push([array[i], array[i + 1]]);
    }

    return points;
  },
  // transform points with matrix (similar to Point.transform)
  transform: function transform(m) {
    var points = [];

    for (var i = 0; i < this.length; i++) {
      var point = this[i]; // Perform the matrix multiplication

      points.push([m.a * point[0] + m.c * point[1] + m.e, m.b * point[0] + m.d * point[1] + m.f]);
    } // Return the required point


    return new PointArray(points);
  },
  // Move point string
  move: function move(x, y) {
    var box = this.bbox(); // get relative offset

    x -= box.x;
    y -= box.y; // move every point

    if (!isNaN(x) && !isNaN(y)) {
      for (var i = this.length - 1; i >= 0; i--) {
        this[i] = [this[i][0] + x, this[i][1] + y];
      }
    }

    return this;
  },
  // Resize poly string
  size: function size(width, height) {
    var i;
    var box = this.bbox(); // recalculate position of all points according to new size

    for (i = this.length - 1; i >= 0; i--) {
      if (box.width) this[i][0] = (this[i][0] - box.x) * width / box.width + box.x;
      if (box.height) this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
    }

    return this;
  },
  // Get bounding box of points
  bbox: function bbox() {
    var maxX = -Infinity;
    var maxY = -Infinity;
    var minX = Infinity;
    var minY = Infinity;
    this.forEach(function (el) {
      maxX = Math.max(el[0], maxX);
      maxY = Math.max(el[1], maxY);
      minX = Math.min(el[0], minX);
      minY = Math.min(el[1], minY);
    });
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
});
var MorphArray = PointArray; // Move by left top corner over x-axis

function x$1(x) {
  return x == null ? this.bbox().x : this.move(x, this.bbox().y);
} // Move by left top corner over y-axis


function y$1(y) {
  return y == null ? this.bbox().y : this.move(this.bbox().x, y);
} // Set width of element


function width$1(width) {
  var b = this.bbox();
  return width == null ? b.width : this.size(width, b.height);
} // Set height of element


function height$1(height) {
  var b = this.bbox();
  return height == null ? b.height : this.size(b.width, height);
}

var pointed = {
  __proto__: null,
  MorphArray: MorphArray,
  x: x$1,
  y: y$1,
  width: width$1,
  height: height$1
};

var Line = /*#__PURE__*/function (_Shape) {
  _inherits(Line, _Shape); // Initialize node


  function Line(node) {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this, nodeOrNew('line', node), node));
  } // Get array


  _createClass(Line, [{
    key: "array",
    value: function array() {
      return new PointArray([[this.attr('x1'), this.attr('y1')], [this.attr('x2'), this.attr('y2')]]);
    } // Overwrite native plot() method

  }, {
    key: "plot",
    value: function plot(x1, y1, x2, y2) {
      if (x1 == null) {
        return this.array();
      } else if (typeof y1 !== 'undefined') {
        x1 = {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2
        };
      } else {
        x1 = new PointArray(x1).toLine();
      }

      return this.attr(x1);
    } // Move by left top corner

  }, {
    key: "move",
    value: function move(x, y) {
      return this.attr(this.array().move(x, y).toLine());
    } // Set element size to given width and height

  }, {
    key: "size",
    value: function size(width, height) {
      var p = proportionalSize(this, width, height);
      return this.attr(this.array().size(p.width, p.height).toLine());
    }
  }]);

  return Line;
}(Shape);

exports.Line = Line;
extend(Line, pointed);
registerMethods({
  Container: {
    // Create a line element
    line: wrapWithAttrCheck(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      } // make sure plot is called as a setter
      // x1 is not necessarily a number, it can also be an array, a string and a PointArray


      return Line.prototype.plot.apply(this.put(new Line()), args[0] != null ? args : [0, 0, 0, 0]);
    })
  }
});
register(Line, 'Line');

var Marker = /*#__PURE__*/function (_Container) {
  _inherits(Marker, _Container); // Initialize node


  function Marker(node) {
    _classCallCheck(this, Marker);

    return _possibleConstructorReturn(this, _getPrototypeOf(Marker).call(this, nodeOrNew('marker', node), node));
  } // Set width of element


  _createClass(Marker, [{
    key: "width",
    value: function width(_width) {
      return this.attr('markerWidth', _width);
    } // Set height of element

  }, {
    key: "height",
    value: function height(_height) {
      return this.attr('markerHeight', _height);
    } // Set marker refX and refY

  }, {
    key: "ref",
    value: function ref(x, y) {
      return this.attr('refX', x).attr('refY', y);
    } // Update marker

  }, {
    key: "update",
    value: function update(block) {
      // remove all content
      this.clear(); // invoke passed block

      if (typeof block === 'function') {
        block.call(this, this);
      }

      return this;
    } // Return the fill id

  }, {
    key: "toString",
    value: function toString() {
      return 'url(#' + this.id() + ')';
    }
  }]);

  return Marker;
}(Container);

exports.Marker = Marker;
registerMethods({
  Container: {
    marker: function marker() {
      var _this$defs; // Create marker element in defs


      return (_this$defs = this.defs()).marker.apply(_this$defs, arguments);
    }
  },
  Defs: {
    // Create marker
    marker: wrapWithAttrCheck(function (width, height, block) {
      // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
      return this.put(new Marker()).size(width, height).ref(width / 2, height / 2).viewbox(0, 0, width, height).attr('orient', 'auto').update(block);
    })
  },
  marker: {
    // Create and attach markers
    marker: function marker(_marker, width, height, block) {
      var attr = ['marker']; // Build attribute name

      if (_marker !== 'all') attr.push(_marker);
      attr = attr.join('-'); // Set marker attribute

      _marker = arguments[1] instanceof Marker ? arguments[1] : this.defs().marker(width, height, block);
      return this.attr(attr, _marker);
    }
  }
});
register(Marker, 'Marker');
var nativeSort = [].sort;
var test$2 = [1, 2, 3]; // IE8-

var FAILS_ON_UNDEFINED = fails(function () {
  test$2.sort(undefined);
}); // V8 bug

var FAILS_ON_NULL = fails(function () {
  test$2.sort(null);
}); // Old WebKit

var SLOPPY_METHOD$2 = sloppyArrayMethod('sort');
var FORCED$4 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD$2; // `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort

_export({
  target: 'Array',
  proto: true,
  forced: FORCED$4
}, {
  sort: function sort(comparefn) {
    return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction$1(comparefn));
  }
});
/***
Base Class
==========
The base stepper class that will be
***/


function makeSetterGetter(k, f) {
  return function (v) {
    if (v == null) return this[v];
    this[k] = v;
    if (f) f.call(this);
    return this;
  };
}

var easing = {
  '-': function _(pos) {
    return pos;
  },
  '<>': function _(pos) {
    return -Math.cos(pos * Math.PI) / 2 + 0.5;
  },
  '>': function _(pos) {
    return Math.sin(pos * Math.PI / 2);
  },
  '<': function _(pos) {
    return -Math.cos(pos * Math.PI / 2) + 1;
  },
  bezier: function bezier(x1, y1, x2, y2) {
    // see https://www.w3.org/TR/css-easing-1/#cubic-bezier-algo
    return function (t) {
      if (t < 0) {
        if (x1 > 0) {
          return y1 / x1 * t;
        } else if (x2 > 0) {
          return y2 / x2 * t;
        } else {
          return 0;
        }
      } else if (t > 1) {
        if (x2 < 1) {
          return (1 - y2) / (1 - x2) * t + (y2 - x2) / (1 - x2);
        } else if (x1 < 1) {
          return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1);
        } else {
          return 1;
        }
      } else {
        return 3 * t * Math.pow(1 - t, 2) * y1 + 3 * Math.pow(t, 2) * (1 - t) * y2 + Math.pow(t, 3);
      }
    };
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function steps(_steps) {
    var stepPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end'; // deal with "jump-" prefix

    stepPosition = stepPosition.split('-').reverse()[0];
    var jumps = _steps;

    if (stepPosition === 'none') {
      --jumps;
    } else if (stepPosition === 'both') {
      ++jumps;
    } // The beforeFlag is essentially useless


    return function (t) {
      var beforeFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false; // Step is called currentStep in referenced url

      var step = Math.floor(t * _steps);
      var jumping = t * step % 1 === 0;

      if (stepPosition === 'start' || stepPosition === 'both') {
        ++step;
      }

      if (beforeFlag && jumping) {
        --step;
      }

      if (t >= 0 && step < 0) {
        step = 0;
      }

      if (t <= 1 && step > jumps) {
        step = jumps;
      }

      return step / jumps;
    };
  }
};
exports.easing = easing;

var Stepper = /*#__PURE__*/function () {
  function Stepper() {
    _classCallCheck(this, Stepper);
  }

  _createClass(Stepper, [{
    key: "done",
    value: function done() {
      return false;
    }
  }]);

  return Stepper;
}();
/***
Easing Functions
================
***/


var Ease = /*#__PURE__*/function (_Stepper) {
  _inherits(Ease, _Stepper);

  function Ease(fn) {
    var _this;

    _classCallCheck(this, Ease);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ease).call(this));
    _this.ease = easing[fn || timeline.ease] || fn;
    return _this;
  }

  _createClass(Ease, [{
    key: "step",
    value: function step(from, to, pos) {
      if (typeof from !== 'number') {
        return pos < 1 ? from : to;
      }

      return from + (to - from) * this.ease(pos);
    }
  }]);

  return Ease;
}(Stepper);
/***
Controller Types
================
***/


exports.Ease = Ease;

var Controller = /*#__PURE__*/function (_Stepper2) {
  _inherits(Controller, _Stepper2);

  function Controller(fn) {
    var _this2;

    _classCallCheck(this, Controller);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Controller).call(this));
    _this2.stepper = fn;
    return _this2;
  }

  _createClass(Controller, [{
    key: "step",
    value: function step(current, target, dt, c) {
      return this.stepper(current, target, dt, c);
    }
  }, {
    key: "done",
    value: function done(c) {
      return c.done;
    }
  }]);

  return Controller;
}(Stepper);

exports.Controller = Controller;

function recalculate() {
  // Apply the default parameters
  var duration = (this._duration || 500) / 1000;
  var overshoot = this._overshoot || 0; // Calculate the PID natural response

  var eps = 1e-10;
  var pi = Math.PI;
  var os = Math.log(overshoot / 100 + eps);
  var zeta = -os / Math.sqrt(pi * pi + os * os);
  var wn = 3.9 / (zeta * duration); // Calculate the Spring values

  this.d = 2 * zeta * wn;
  this.k = wn * wn;
}

var Spring = /*#__PURE__*/function (_Controller) {
  _inherits(Spring, _Controller);

  function Spring(duration, overshoot) {
    var _this3;

    _classCallCheck(this, Spring);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Spring).call(this));

    _this3.duration(duration || 500).overshoot(overshoot || 0);

    return _this3;
  }

  _createClass(Spring, [{
    key: "step",
    value: function step(current, target, dt, c) {
      if (typeof current === 'string') return current;
      c.done = dt === Infinity;
      if (dt === Infinity) return target;
      if (dt === 0) return current;
      if (dt > 100) dt = 16;
      dt /= 1000; // Get the previous velocity

      var velocity = c.velocity || 0; // Apply the control to get the new position and store it

      var acceleration = -this.d * velocity - this.k * (current - target);
      var newPosition = current + velocity * dt + acceleration * dt * dt / 2; // Store the velocity

      c.velocity = velocity + acceleration * dt; // Figure out if we have converged, and if so, pass the value

      c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 0.002;
      return c.done ? target : newPosition;
    }
  }]);

  return Spring;
}(Controller);

exports.Spring = Spring;
extend(Spring, {
  duration: makeSetterGetter('_duration', recalculate),
  overshoot: makeSetterGetter('_overshoot', recalculate)
});

var PID = /*#__PURE__*/function (_Controller2) {
  _inherits(PID, _Controller2);

  function PID(p, i, d, windup) {
    var _this4;

    _classCallCheck(this, PID);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(PID).call(this));
    p = p == null ? 0.1 : p;
    i = i == null ? 0.01 : i;
    d = d == null ? 0 : d;
    windup = windup == null ? 1000 : windup;

    _this4.p(p).i(i).d(d).windup(windup);

    return _this4;
  }

  _createClass(PID, [{
    key: "step",
    value: function step(current, target, dt, c) {
      if (typeof current === 'string') return current;
      c.done = dt === Infinity;
      if (dt === Infinity) return target;
      if (dt === 0) return current;
      var p = target - current;
      var i = (c.integral || 0) + p * dt;
      var d = (p - (c.error || 0)) / dt;
      var windup = this.windup; // antiwindup

      if (windup !== false) {
        i = Math.max(-windup, Math.min(i, windup));
      }

      c.error = p;
      c.integral = i;
      c.done = Math.abs(p) < 0.001;
      return c.done ? target : current + (this.P * p + this.I * i + this.D * d);
    }
  }]);

  return PID;
}(Controller);

exports.PID = PID;
extend(PID, {
  windup: makeSetterGetter('windup'),
  p: makeSetterGetter('P'),
  i: makeSetterGetter('I'),
  d: makeSetterGetter('D')
});
var PathArray = subClassArray('PathArray', SVGArray);
exports.PathArray = PathArray;

function pathRegReplace(a, b, c, d) {
  return c + d.replace(dots, ' .');
}

function arrayToString(a) {
  for (var i = 0, il = a.length, s = ''; i < il; i++) {
    s += a[i][0];

    if (a[i][1] != null) {
      s += a[i][1];

      if (a[i][2] != null) {
        s += ' ';
        s += a[i][2];

        if (a[i][3] != null) {
          s += ' ';
          s += a[i][3];
          s += ' ';
          s += a[i][4];

          if (a[i][5] != null) {
            s += ' ';
            s += a[i][5];
            s += ' ';
            s += a[i][6];

            if (a[i][7] != null) {
              s += ' ';
              s += a[i][7];
            }
          }
        }
      }
    }
  }

  return s + ' ';
}

var pathHandlers = {
  M: function M(c, p, p0) {
    p.x = p0.x = c[0];
    p.y = p0.y = c[1];
    return ['M', p.x, p.y];
  },
  L: function L(c, p) {
    p.x = c[0];
    p.y = c[1];
    return ['L', c[0], c[1]];
  },
  H: function H(c, p) {
    p.x = c[0];
    return ['H', c[0]];
  },
  V: function V(c, p) {
    p.y = c[0];
    return ['V', c[0]];
  },
  C: function C(c, p) {
    p.x = c[4];
    p.y = c[5];
    return ['C', c[0], c[1], c[2], c[3], c[4], c[5]];
  },
  S: function S(c, p) {
    p.x = c[2];
    p.y = c[3];
    return ['S', c[0], c[1], c[2], c[3]];
  },
  Q: function Q(c, p) {
    p.x = c[2];
    p.y = c[3];
    return ['Q', c[0], c[1], c[2], c[3]];
  },
  T: function T(c, p) {
    p.x = c[0];
    p.y = c[1];
    return ['T', c[0], c[1]];
  },
  Z: function Z(c, p, p0) {
    p.x = p0.x;
    p.y = p0.y;
    return ['Z'];
  },
  A: function A(c, p) {
    p.x = c[5];
    p.y = c[6];
    return ['A', c[0], c[1], c[2], c[3], c[4], c[5], c[6]];
  }
};
var mlhvqtcsaz = 'mlhvqtcsaz'.split('');

for (var i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
  pathHandlers[mlhvqtcsaz[i]] = function (i) {
    return function (c, p, p0) {
      if (i === 'H') c[0] = c[0] + p.x;else if (i === 'V') c[0] = c[0] + p.y;else if (i === 'A') {
        c[5] = c[5] + p.x;
        c[6] = c[6] + p.y;
      } else {
        for (var j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x);
        }
      }
      return pathHandlers[i](c, p, p0);
    };
  }(mlhvqtcsaz[i].toUpperCase());
}

extend(PathArray, {
  // Convert array to string
  toString: function toString() {
    return arrayToString(this);
  },
  // Move path string
  move: function move(x, y) {
    // get bounding box of current situation
    var box = this.bbox(); // get relative offset

    x -= box.x;
    y -= box.y;

    if (!isNaN(x) && !isNaN(y)) {
      // move every point
      for (var l, i = this.length - 1; i >= 0; i--) {
        l = this[i][0];

        if (l === 'M' || l === 'L' || l === 'T') {
          this[i][1] += x;
          this[i][2] += y;
        } else if (l === 'H') {
          this[i][1] += x;
        } else if (l === 'V') {
          this[i][1] += y;
        } else if (l === 'C' || l === 'S' || l === 'Q') {
          this[i][1] += x;
          this[i][2] += y;
          this[i][3] += x;
          this[i][4] += y;

          if (l === 'C') {
            this[i][5] += x;
            this[i][6] += y;
          }
        } else if (l === 'A') {
          this[i][6] += x;
          this[i][7] += y;
        }
      }
    }

    return this;
  },
  // Resize path string
  size: function size(width, height) {
    // get bounding box of current situation
    var box = this.bbox();
    var i, l; // If the box width or height is 0 then we ignore
    // transformations on the respective axis

    box.width = box.width === 0 ? 1 : box.width;
    box.height = box.height === 0 ? 1 : box.height; // recalculate position of all points according to new size

    for (i = this.length - 1; i >= 0; i--) {
      l = this[i][0];

      if (l === 'M' || l === 'L' || l === 'T') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
      } else if (l === 'H') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
      } else if (l === 'V') {
        this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
      } else if (l === 'C' || l === 'S' || l === 'Q') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
        this[i][3] = (this[i][3] - box.x) * width / box.width + box.x;
        this[i][4] = (this[i][4] - box.y) * height / box.height + box.y;

        if (l === 'C') {
          this[i][5] = (this[i][5] - box.x) * width / box.width + box.x;
          this[i][6] = (this[i][6] - box.y) * height / box.height + box.y;
        }
      } else if (l === 'A') {
        // resize radii
        this[i][1] = this[i][1] * width / box.width;
        this[i][2] = this[i][2] * height / box.height; // move position values

        this[i][6] = (this[i][6] - box.x) * width / box.width + box.x;
        this[i][7] = (this[i][7] - box.y) * height / box.height + box.y;
      }
    }

    return this;
  },
  // Test if the passed path array use the same path data commands as this path array
  equalCommands: function equalCommands(pathArray) {
    var i, il, equalCommands;
    pathArray = new PathArray(pathArray);
    equalCommands = this.length === pathArray.length;

    for (i = 0, il = this.length; equalCommands && i < il; i++) {
      equalCommands = this[i][0] === pathArray[i][0];
    }

    return equalCommands;
  },
  // Make path array morphable
  morph: function morph(pathArray) {
    pathArray = new PathArray(pathArray);

    if (this.equalCommands(pathArray)) {
      this.destination = pathArray;
    } else {
      this.destination = null;
    }

    return this;
  },
  // Get morphed path array at given position
  at: function at(pos) {
    // make sure a destination is defined
    if (!this.destination) return this;
    var sourceArray = this;
    var destinationArray = this.destination.value;
    var array = [];
    var pathArray = new PathArray();
    var i, il, j, jl; // Animate has specified in the SVG spec
    // See: https://www.w3.org/TR/SVG11/paths.html#PathElement

    for (i = 0, il = sourceArray.length; i < il; i++) {
      array[i] = [sourceArray[i][0]];

      for (j = 1, jl = sourceArray[i].length; j < jl; j++) {
        array[i][j] = sourceArray[i][j] + (destinationArray[i][j] - sourceArray[i][j]) * pos;
      } // For the two flags of the elliptical arc command, the SVG spec say:
      // Flags and booleans are interpolated as fractions between zero and one, with any non-zero value considered to be a value of one/true
      // Elliptical arc command as an array followed by corresponding indexes:
      // ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
      //   0    1   2        3                 4             5      6  7


      if (array[i][0] === 'A') {
        array[i][4] = +(array[i][4] !== 0);
        array[i][5] = +(array[i][5] !== 0);
      }
    } // Directly modify the value of a path array, this is done this way for performance


    pathArray.value = array;
    return pathArray;
  },
  // Absolutize and parse path to array
  parse: function parse() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [['M', 0, 0]]; // if it's already a patharray, no need to parse it

    if (array instanceof PathArray) return array; // prepare for parsing

    var s;
    var paramCnt = {
      M: 2,
      L: 2,
      H: 1,
      V: 1,
      C: 6,
      S: 4,
      Q: 4,
      T: 2,
      A: 7,
      Z: 0
    };

    if (typeof array === 'string') {
      array = array.replace(numbersWithDots, pathRegReplace) // convert 45.123.123 to 45.123 .123
      .replace(pathLetters, ' $& ') // put some room between letters and numbers
      .replace(hyphen, '$1 -') // add space before hyphen
      .trim() // trim
      .split(delimiter); // split into array
    } else {
      array = array.reduce(function (prev, curr) {
        return [].concat.call(prev, curr);
      }, []);
    } // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]


    var result = [];
    var p = new Point();
    var p0 = new Point();
    var index = 0;
    var len = array.length;

    do {
      // Test if we have a path letter
      if (isPathLetter.test(array[index])) {
        s = array[index];
        ++index; // If last letter was a move command and we got no new, it defaults to [L]ine
      } else if (s === 'M') {
        s = 'L';
      } else if (s === 'm') {
        s = 'l';
      }

      result.push(pathHandlers[s].call(null, array.slice(index, index = index + paramCnt[s.toUpperCase()]).map(parseFloat), p, p0));
    } while (len > index);

    return result;
  },
  // Get bounding box of path
  bbox: function bbox() {
    parser().path.setAttribute('d', this.toString());
    return parser.nodes.path.getBBox();
  }
});

var Morphable = /*#__PURE__*/function () {
  function Morphable(stepper) {
    _classCallCheck(this, Morphable);

    this._stepper = stepper || new Ease('-');
    this._from = null;
    this._to = null;
    this._type = null;
    this._context = null;
    this._morphObj = null;
  }

  _createClass(Morphable, [{
    key: "from",
    value: function from(val) {
      if (val == null) {
        return this._from;
      }

      this._from = this._set(val);
      return this;
    }
  }, {
    key: "to",
    value: function to(val) {
      if (val == null) {
        return this._to;
      }

      this._to = this._set(val);
      return this;
    }
  }, {
    key: "type",
    value: function type(_type) {
      // getter
      if (_type == null) {
        return this._type;
      } // setter


      this._type = _type;
      return this;
    }
  }, {
    key: "_set",
    value: function _set(value) {
      if (!this._type) {
        var type = _typeof(value);

        if (type === 'number') {
          this.type(SVGNumber);
        } else if (type === 'string') {
          if (Color.isColor(value)) {
            this.type(Color);
          } else if (delimiter.test(value)) {
            this.type(pathLetters.test(value) ? PathArray : SVGArray);
          } else if (numberAndUnit.test(value)) {
            this.type(SVGNumber);
          } else {
            this.type(NonMorphable);
          }
        } else if (morphableTypes.indexOf(value.constructor) > -1) {
          this.type(value.constructor);
        } else if (Array.isArray(value)) {
          this.type(SVGArray);
        } else if (type === 'object') {
          this.type(ObjectBag);
        } else {
          this.type(NonMorphable);
        }
      }

      var result = new this._type(value);

      if (this._type === Color) {
        result = this._to ? result[this._to[4]]() : this._from ? result[this._from[4]]() : result;
      }

      result = result.toArray();
      this._morphObj = this._morphObj || new this._type();
      this._context = this._context || Array.apply(null, Array(result.length)).map(Object).map(function (o) {
        o.done = true;
        return o;
      });
      return result;
    }
  }, {
    key: "stepper",
    value: function stepper(_stepper) {
      if (_stepper == null) return this._stepper;
      this._stepper = _stepper;
      return this;
    }
  }, {
    key: "done",
    value: function done() {
      var complete = this._context.map(this._stepper.done).reduce(function (last, curr) {
        return last && curr;
      }, true);

      return complete;
    }
  }, {
    key: "at",
    value: function at(pos) {
      var _this = this;

      return this._morphObj.fromArray(this._from.map(function (i, index) {
        return _this._stepper.step(i, _this._to[index], pos, _this._context[index], _this._context);
      }));
    }
  }]);

  return Morphable;
}();

exports.Morphable = Morphable;

var NonMorphable = /*#__PURE__*/function () {
  function NonMorphable() {
    _classCallCheck(this, NonMorphable);

    this.init.apply(this, arguments);
  }

  _createClass(NonMorphable, [{
    key: "init",
    value: function init(val) {
      val = Array.isArray(val) ? val[0] : val;
      this.value = val;
      return this;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.value];
    }
  }]);

  return NonMorphable;
}();

exports.NonMorphable = NonMorphable;

var TransformBag = /*#__PURE__*/function () {
  function TransformBag() {
    _classCallCheck(this, TransformBag);

    this.init.apply(this, arguments);
  }

  _createClass(TransformBag, [{
    key: "init",
    value: function init(obj) {
      if (Array.isArray(obj)) {
        obj = {
          scaleX: obj[0],
          scaleY: obj[1],
          shear: obj[2],
          rotate: obj[3],
          translateX: obj[4],
          translateY: obj[5],
          originX: obj[6],
          originY: obj[7]
        };
      }

      Object.assign(this, TransformBag.defaults, obj);
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var v = this;
      return [v.scaleX, v.scaleY, v.shear, v.rotate, v.translateX, v.translateY, v.originX, v.originY];
    }
  }]);

  return TransformBag;
}();

exports.TransformBag = TransformBag;
TransformBag.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};

var ObjectBag = /*#__PURE__*/function () {
  function ObjectBag() {
    _classCallCheck(this, ObjectBag);

    this.init.apply(this, arguments);
  }

  _createClass(ObjectBag, [{
    key: "init",
    value: function init(objOrArr) {
      this.values = [];

      if (Array.isArray(objOrArr)) {
        this.values = objOrArr;
        return;
      }

      objOrArr = objOrArr || {};
      var entries = [];

      for (var i in objOrArr) {
        entries.push([i, objOrArr[i]]);
      }

      entries.sort(function (a, b) {
        return a[0] - b[0];
      });
      this.values = entries.reduce(function (last, curr) {
        return last.concat(curr);
      }, []);
      return this;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      var obj = {};
      var arr = this.values;

      for (var i = 0, len = arr.length; i < len; i += 2) {
        obj[arr[i]] = arr[i + 1];
      }

      return obj;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this.values;
    }
  }]);

  return ObjectBag;
}();

exports.ObjectBag = ObjectBag;
var morphableTypes = [NonMorphable, TransformBag, ObjectBag];

function registerMorphableType() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  morphableTypes.push.apply(morphableTypes, _toConsumableArray([].concat(type)));
}

function makeMorphable() {
  extend(morphableTypes, {
    to: function to(val) {
      return new Morphable().type(this.constructor).from(this.valueOf()).to(val);
    },
    fromArray: function fromArray(arr) {
      this.init(arr);
      return this;
    }
  });
}

var Path = /*#__PURE__*/function (_Shape) {
  _inherits(Path, _Shape); // Initialize node


  function Path(node) {
    _classCallCheck(this, Path);

    return _possibleConstructorReturn(this, _getPrototypeOf(Path).call(this, nodeOrNew('path', node), node));
  } // Get array


  _createClass(Path, [{
    key: "array",
    value: function array() {
      return this._array || (this._array = new PathArray(this.attr('d')));
    } // Plot new path

  }, {
    key: "plot",
    value: function plot(d) {
      return d == null ? this.array() : this.clear().attr('d', typeof d === 'string' ? d : this._array = new PathArray(d));
    } // Clear array cache

  }, {
    key: "clear",
    value: function clear() {
      delete this._array;
      return this;
    } // Move by left top corner

  }, {
    key: "move",
    value: function move(x, y) {
      return this.attr('d', this.array().move(x, y));
    } // Move by left top corner over x-axis

  }, {
    key: "x",
    value: function x(_x) {
      return _x == null ? this.bbox().x : this.move(_x, this.bbox().y);
    } // Move by left top corner over y-axis

  }, {
    key: "y",
    value: function y(_y) {
      return _y == null ? this.bbox().y : this.move(this.bbox().x, _y);
    } // Set element size to given width and height

  }, {
    key: "size",
    value: function size(width, height) {
      var p = proportionalSize(this, width, height);
      return this.attr('d', this.array().size(p.width, p.height));
    } // Set width of element

  }, {
    key: "width",
    value: function width(_width) {
      return _width == null ? this.bbox().width : this.size(_width, this.bbox().height);
    } // Set height of element

  }, {
    key: "height",
    value: function height(_height) {
      return _height == null ? this.bbox().height : this.size(this.bbox().width, _height);
    }
  }, {
    key: "targets",
    value: function targets() {
      return baseFind('svg textpath [href*="' + this.id() + '"]');
    }
  }]);

  return Path;
}(Shape); // Define morphable array


exports.Path = Path;
Path.prototype.MorphArray = PathArray; // Add parent method

registerMethods({
  Container: {
    // Create a wrapped path element
    path: wrapWithAttrCheck(function (d) {
      // make sure plot is called as a setter
      return this.put(new Path()).plot(d || new PathArray());
    })
  }
});
register(Path, 'Path');

function array() {
  return this._array || (this._array = new PointArray(this.attr('points')));
} // Plot new path


function plot(p) {
  return p == null ? this.array() : this.clear().attr('points', typeof p === 'string' ? p : this._array = new PointArray(p));
} // Clear array cache


function clear() {
  delete this._array;
  return this;
} // Move by left top corner


function move(x, y) {
  return this.attr('points', this.array().move(x, y));
} // Set element size to given width and height


function size(width, height) {
  var p = proportionalSize(this, width, height);
  return this.attr('points', this.array().size(p.width, p.height));
}

var poly = {
  __proto__: null,
  array: array,
  plot: plot,
  clear: clear,
  move: move,
  size: size
};

var Polygon = /*#__PURE__*/function (_Shape) {
  _inherits(Polygon, _Shape); // Initialize node


  function Polygon(node) {
    _classCallCheck(this, Polygon);

    return _possibleConstructorReturn(this, _getPrototypeOf(Polygon).call(this, nodeOrNew('polygon', node), node));
  }

  return Polygon;
}(Shape);

exports.Polygon = Polygon;
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polygon: wrapWithAttrCheck(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polygon()).plot(p || new PointArray());
    })
  }
});
extend(Polygon, pointed);
extend(Polygon, poly);
register(Polygon, 'Polygon');

var Polyline = /*#__PURE__*/function (_Shape) {
  _inherits(Polyline, _Shape); // Initialize node


  function Polyline(node) {
    _classCallCheck(this, Polyline);

    return _possibleConstructorReturn(this, _getPrototypeOf(Polyline).call(this, nodeOrNew('polyline', node), node));
  }

  return Polyline;
}(Shape);

exports.Polyline = Polyline;
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polyline: wrapWithAttrCheck(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polyline()).plot(p || new PointArray());
    })
  }
});
extend(Polyline, pointed);
extend(Polyline, poly);
register(Polyline, 'Polyline');

var Rect = /*#__PURE__*/function (_Shape) {
  _inherits(Rect, _Shape); // Initialize node


  function Rect(node) {
    _classCallCheck(this, Rect);

    return _possibleConstructorReturn(this, _getPrototypeOf(Rect).call(this, nodeOrNew('rect', node), node));
  }

  return Rect;
}(Shape);

exports.Rect = Rect;
extend(Rect, {
  rx: rx,
  ry: ry
});
registerMethods({
  Container: {
    // Create a rect element
    rect: wrapWithAttrCheck(function (width, height) {
      return this.put(new Rect()).size(width, height);
    })
  }
});
register(Rect, 'Rect');
var max$3 = Math.max;
var min$4 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('splice')
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$4(max$3(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var Queue = /*#__PURE__*/function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this._first = null;
    this._last = null;
  }

  _createClass(Queue, [{
    key: "push",
    value: function push(value) {
      // An item stores an id and the provided value
      var item = value.next ? value : {
        value: value,
        next: null,
        prev: null
      }; // Deal with the queue being empty or populated

      if (this._last) {
        item.prev = this._last;
        this._last.next = item;
        this._last = item;
      } else {
        this._last = item;
        this._first = item;
      } // Return the current item


      return item;
    }
  }, {
    key: "shift",
    value: function shift() {
      // Check if we have a value
      var remove = this._first;
      if (!remove) return null; // If we do, remove it and relink things

      this._first = remove.next;
      if (this._first) this._first.prev = null;
      this._last = this._first ? this._last : null;
      return remove.value;
    } // Shows us the first item in the list

  }, {
    key: "first",
    value: function first() {
      return this._first && this._first.value;
    } // Shows us the last item in the list

  }, {
    key: "last",
    value: function last() {
      return this._last && this._last.value;
    } // Removes the item that was returned from the push

  }, {
    key: "remove",
    value: function remove(item) {
      // Relink the previous item
      if (item.prev) item.prev.next = item.next;
      if (item.next) item.next.prev = item.prev;
      if (item === this._last) this._last = item.prev;
      if (item === this._first) this._first = item.next; // Invalidate item

      item.prev = null;
      item.next = null;
    }
  }]);

  return Queue;
}();

exports.Queue = Queue;
var Animator = {
  nextDraw: null,
  frames: new Queue(),
  timeouts: new Queue(),
  immediates: new Queue(),
  timer: function timer() {
    return globals.window.performance || globals.window.Date;
  },
  transforms: [],
  frame: function frame(fn) {
    // Store the node
    var node = Animator.frames.push({
      run: fn
    }); // Request an animation frame if we don't have one

    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    } // Return the node so we can remove it easily


    return node;
  },
  timeout: function timeout(fn, delay) {
    delay = delay || 0; // Work out when the event should fire

    var time = Animator.timer().now() + delay; // Add the timeout to the end of the queue

    var node = Animator.timeouts.push({
      run: fn,
      time: time
    }); // Request another animation frame if we need one

    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }

    return node;
  },
  immediate: function immediate(fn) {
    // Add the immediate fn to the end of the queue
    var node = Animator.immediates.push(fn); // Request another animation frame if we need one

    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }

    return node;
  },
  cancelFrame: function cancelFrame(node) {
    node != null && Animator.frames.remove(node);
  },
  clearTimeout: function clearTimeout(node) {
    node != null && Animator.timeouts.remove(node);
  },
  cancelImmediate: function cancelImmediate(node) {
    node != null && Animator.immediates.remove(node);
  },
  _draw: function _draw(now) {
    // Run all the timeouts we can run, if they are not ready yet, add them
    // to the end of the queue immediately! (bad timeouts!!! [sarcasm])
    var nextTimeout = null;
    var lastTimeout = Animator.timeouts.last();

    while (nextTimeout = Animator.timeouts.shift()) {
      // Run the timeout if its time, or push it to the end
      if (now >= nextTimeout.time) {
        nextTimeout.run();
      } else {
        Animator.timeouts.push(nextTimeout);
      } // If we hit the last item, we should stop shifting out more items


      if (nextTimeout === lastTimeout) break;
    } // Run all of the animation frames


    var nextFrame = null;
    var lastFrame = Animator.frames.last();

    while (nextFrame !== lastFrame && (nextFrame = Animator.frames.shift())) {
      nextFrame.run(now);
    }

    var nextImmediate = null;

    while (nextImmediate = Animator.immediates.shift()) {
      nextImmediate();
    } // If we have remaining timeouts or frames, draw until we don't anymore


    Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first() ? globals.window.requestAnimationFrame(Animator._draw) : null;
  }
};
exports.Animator = Animator;

var makeSchedule = function makeSchedule(runnerInfo) {
  var start = runnerInfo.start;
  var duration = runnerInfo.runner.duration();
  var end = start + duration;
  return {
    start: start,
    duration: duration,
    end: end,
    runner: runnerInfo.runner
  };
};

var defaultSource = function defaultSource() {
  var w = globals.window;
  return (w.performance || w.Date).now();
};

var Timeline = /*#__PURE__*/function (_EventTarget) {
  _inherits(Timeline, _EventTarget); // Construct a new timeline on the given element


  function Timeline() {
    var _this;

    var timeSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSource;

    _classCallCheck(this, Timeline);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Timeline).call(this));
    _this._timeSource = timeSource; // Store the timing variables

    _this._startTime = 0;
    _this._speed = 1.0; // Determines how long a runner is hold in memory. Can be a dt or true/false

    _this._persist = 0; // Keep track of the running animations and their starting parameters

    _this._nextFrame = null;
    _this._paused = true;
    _this._runners = [];
    _this._runnerIds = [];
    _this._lastRunnerId = -1;
    _this._time = 0;
    _this._lastSourceTime = 0;
    _this._lastStepTime = 0; // Make sure that step is always called in class context

    _this._step = _this._stepFn.bind(_assertThisInitialized(_this), false);
    _this._stepImmediate = _this._stepFn.bind(_assertThisInitialized(_this), true);
    return _this;
  } // schedules a runner on the timeline


  _createClass(Timeline, [{
    key: "schedule",
    value: function schedule(runner, delay, when) {
      if (runner == null) {
        return this._runners.map(makeSchedule);
      } // The start time for the next animation can either be given explicitly,
      // derived from the current timeline time or it can be relative to the
      // last start time to chain animations direclty


      var absoluteStartTime = 0;
      var endTime = this.getEndTime();
      delay = delay || 0; // Work out when to start the animation

      if (when == null || when === 'last' || when === 'after') {
        // Take the last time and increment
        absoluteStartTime = endTime;
      } else if (when === 'absolute' || when === 'start') {
        absoluteStartTime = delay;
        delay = 0;
      } else if (when === 'now') {
        absoluteStartTime = this._time;
      } else if (when === 'relative') {
        var _runnerInfo = this._runners[runner.id];

        if (_runnerInfo) {
          absoluteStartTime = _runnerInfo.start + delay;
          delay = 0;
        }
      } else {
        throw new Error('Invalid value for the "when" parameter');
      } // Manage runner


      runner.unschedule();
      runner.timeline(this);
      var persist = runner.persist();
      var runnerInfo = {
        persist: persist === null ? this._persist : persist,
        start: absoluteStartTime + delay,
        runner: runner
      };
      this._lastRunnerId = runner.id;

      this._runners.push(runnerInfo);

      this._runners.sort(function (a, b) {
        return a.start - b.start;
      });

      this._runnerIds = this._runners.map(function (info) {
        return info.runner.id;
      });

      this.updateTime()._continue();

      return this;
    } // Remove the runner from this timeline

  }, {
    key: "unschedule",
    value: function unschedule(runner) {
      var index = this._runnerIds.indexOf(runner.id);

      if (index < 0) return this;

      this._runners.splice(index, 1);

      this._runnerIds.splice(index, 1);

      runner.timeline(null);
      return this;
    } // Calculates the end of the timeline

  }, {
    key: "getEndTime",
    value: function getEndTime() {
      var lastRunnerInfo = this._runners[this._runnerIds.indexOf(this._lastRunnerId)];

      var lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0;
      var lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : 0;
      return lastStartTime + lastDuration;
    }
  }, {
    key: "getEndTimeOfTimeline",
    value: function getEndTimeOfTimeline() {
      var lastEndTime = 0;

      for (var i = 0; i < this._runners.length; i++) {
        var runnerInfo = this._runners[i];
        var duration = runnerInfo ? runnerInfo.runner.duration() : 0;
        var startTime = runnerInfo ? runnerInfo.start : 0;
        var endTime = startTime + duration;

        if (endTime > lastEndTime) {
          lastEndTime = endTime;
        }
      }

      return lastEndTime;
    } // Makes sure, that after pausing the time doesn't jump

  }, {
    key: "updateTime",
    value: function updateTime() {
      if (!this.active()) {
        this._lastSourceTime = this._timeSource();
      }

      return this;
    }
  }, {
    key: "play",
    value: function play() {
      // Now make sure we are not paused and continue the animation
      this._paused = false;
      return this.updateTime()._continue();
    }
  }, {
    key: "pause",
    value: function pause() {
      this._paused = true;
      return this._continue();
    }
  }, {
    key: "stop",
    value: function stop() {
      // Go to start and pause
      this.time(0);
      return this.pause();
    }
  }, {
    key: "finish",
    value: function finish() {
      // Go to end and pause
      this.time(this.getEndTimeOfTimeline() + 1);
      return this.pause();
    }
  }, {
    key: "speed",
    value: function speed(_speed) {
      if (_speed == null) return this._speed;
      this._speed = _speed;
      return this;
    }
  }, {
    key: "reverse",
    value: function reverse(yes) {
      var currentSpeed = this.speed();
      if (yes == null) return this.speed(-currentSpeed);
      var positive = Math.abs(currentSpeed);
      return this.speed(yes ? positive : -positive);
    }
  }, {
    key: "seek",
    value: function seek(dt) {
      return this.time(this._time + dt);
    }
  }, {
    key: "time",
    value: function time(_time) {
      if (_time == null) return this._time;
      this._time = _time;
      return this._continue(true);
    }
  }, {
    key: "persist",
    value: function persist(dtOrForever) {
      if (dtOrForever == null) return this._persist;
      this._persist = dtOrForever;
      return this;
    }
  }, {
    key: "source",
    value: function source(fn) {
      if (fn == null) return this._timeSource;
      this._timeSource = fn;
      return this;
    }
  }, {
    key: "_stepFn",
    value: function _stepFn() {
      var immediateStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false; // Get the time delta from the last time and update the time

      var time = this._timeSource();

      var dtSource = time - this._lastSourceTime;
      if (immediateStep) dtSource = 0;
      var dtTime = this._speed * dtSource + (this._time - this._lastStepTime);
      this._lastSourceTime = time; // Only update the time if we use the timeSource.
      // Otherwise use the current time

      if (!immediateStep) {
        // Update the time
        this._time += dtTime;
        this._time = this._time < 0 ? 0 : this._time;
      }

      this._lastStepTime = this._time;
      this.fire('time', this._time); // This is for the case that the timeline was seeked so that the time
      // is now before the startTime of the runner. Thats why we need to set
      // the runner to position 0
      // FIXME:
      // However, reseting in insertion order leads to bugs. Considering the case,
      // where 2 runners change the same attriute but in different times,
      // reseting both of them will lead to the case where the later defined
      // runner always wins the reset even if the other runner started earlier
      // and therefore should win the attribute battle
      // this can be solved by reseting them backwards

      for (var k = this._runners.length; k--;) {
        // Get and run the current runner and ignore it if its inactive
        var runnerInfo = this._runners[k];
        var runner = runnerInfo.runner; // Make sure that we give the actual difference
        // between runner start time and now

        var dtToStart = this._time - runnerInfo.start; // Dont run runner if not started yet
        // and try to reset it

        if (dtToStart <= 0) {
          runner.reset();
        }
      } // Run all of the runners directly


      var runnersLeft = false;

      for (var i = 0, len = this._runners.length; i < len; i++) {
        // Get and run the current runner and ignore it if its inactive
        var _runnerInfo2 = this._runners[i];
        var _runner = _runnerInfo2.runner;
        var dt = dtTime; // Make sure that we give the actual difference
        // between runner start time and now

        var _dtToStart = this._time - _runnerInfo2.start; // Dont run runner if not started yet


        if (_dtToStart <= 0) {
          runnersLeft = true;
          continue;
        } else if (_dtToStart < dt) {
          // Adjust dt to make sure that animation is on point
          dt = _dtToStart;
        }

        if (!_runner.active()) continue; // If this runner is still going, signal that we need another animation
        // frame, otherwise, remove the completed runner

        var finished = _runner.step(dt).done;

        if (!finished) {
          runnersLeft = true; // continue
        } else if (_runnerInfo2.persist !== true) {
          // runner is finished. And runner might get removed
          var endTime = _runner.duration() - _runner.time() + this._time;

          if (endTime + _runnerInfo2.persist < this._time) {
            // Delete runner and correct index
            _runner.unschedule();

            --i;
            --len;
          }
        }
      } // Basically: we continue when there are runners right from us in time
      // when -->, and when runners are left from us when <--


      if (runnersLeft && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0) {
        this._continue();
      } else {
        this.pause();
        this.fire('finished');
      }

      return this;
    } // Checks if we are running and continues the animation

  }, {
    key: "_continue",
    value: function _continue() {
      var immediateStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      Animator.cancelFrame(this._nextFrame);
      this._nextFrame = null;
      if (immediateStep) return this._stepImmediate();
      if (this._paused) return this;
      this._nextFrame = Animator.frame(this._step);
      return this;
    }
  }, {
    key: "active",
    value: function active() {
      return !!this._nextFrame;
    }
  }]);

  return Timeline;
}(EventTarget);

exports.Timeline = Timeline;
registerMethods({
  Element: {
    timeline: function timeline(_timeline) {
      if (_timeline == null) {
        this._timeline = this._timeline || new Timeline();
        return this._timeline;
      } else {
        this._timeline = _timeline;
        return this;
      }
    }
  }
});

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$2(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var Runner = /*#__PURE__*/function (_EventTarget) {
  _inherits(Runner, _EventTarget);

  function Runner(options) {
    var _this;

    _classCallCheck(this, Runner);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Runner).call(this)); // Store a unique id on the runner, so that we can identify it later

    _this.id = Runner.id++; // Ensure a default value

    options = options == null ? timeline.duration : options; // Ensure that we get a controller

    options = typeof options === 'function' ? new Controller(options) : options; // Declare all of the variables

    _this._element = null;
    _this._timeline = null;
    _this.done = false;
    _this._queue = []; // Work out the stepper and the duration

    _this._duration = typeof options === 'number' && options;
    _this._isDeclarative = options instanceof Controller;
    _this._stepper = _this._isDeclarative ? options : new Ease(); // We copy the current values from the timeline because they can change

    _this._history = {}; // Store the state of the runner

    _this.enabled = true;
    _this._time = 0;
    _this._lastTime = 0; // At creation, the runner is in reseted state

    _this._reseted = true; // Save transforms applied to this runner

    _this.transforms = new Matrix();
    _this.transformId = 1; // Looping variables

    _this._haveReversed = false;
    _this._reverse = false;
    _this._loopsDone = 0;
    _this._swing = false;
    _this._wait = 0;
    _this._times = 1;
    _this._frameId = null; // Stores how long a runner is stored after beeing done

    _this._persist = _this._isDeclarative ? true : null;
    return _this;
  }
  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */


  _createClass(Runner, [{
    key: "element",
    value: function element(_element) {
      if (_element == null) return this._element;
      this._element = _element;

      _element._prepareRunner();

      return this;
    }
  }, {
    key: "timeline",
    value: function timeline(_timeline) {
      // check explicitly for undefined so we can set the timeline to null
      if (typeof _timeline === 'undefined') return this._timeline;
      this._timeline = _timeline;
      return this;
    }
  }, {
    key: "animate",
    value: function animate(duration, delay, when) {
      var o = Runner.sanitise(duration, delay, when);
      var runner = new Runner(o.duration);
      if (this._timeline) runner.timeline(this._timeline);
      if (this._element) runner.element(this._element);
      return runner.loop(o).schedule(o.delay, o.when);
    }
  }, {
    key: "schedule",
    value: function schedule(timeline, delay, when) {
      // The user doesn't need to pass a timeline if we already have one
      if (!(timeline instanceof Timeline)) {
        when = delay;
        delay = timeline;
        timeline = this.timeline();
      } // If there is no timeline, yell at the user...


      if (!timeline) {
        throw Error('Runner cannot be scheduled without timeline');
      } // Schedule the runner on the timeline provided


      timeline.schedule(this, delay, when);
      return this;
    }
  }, {
    key: "unschedule",
    value: function unschedule() {
      var timeline = this.timeline();
      timeline && timeline.unschedule(this);
      return this;
    }
  }, {
    key: "loop",
    value: function loop(times, swing, wait) {
      // Deal with the user passing in an object
      if (_typeof(times) === 'object') {
        swing = times.swing;
        wait = times.wait;
        times = times.times;
      } // Sanitise the values and store them


      this._times = times || Infinity;
      this._swing = swing || false;
      this._wait = wait || 0; // Allow true to be passed

      if (this._times === true) {
        this._times = Infinity;
      }

      return this;
    }
  }, {
    key: "delay",
    value: function delay(_delay) {
      return this.animate(0, _delay);
    }
    /*
    Basic Functionality
    ===================
    These methods allow us to attach basic functions to the runner directly
    */

  }, {
    key: "queue",
    value: function queue(initFn, runFn, retargetFn, isTransform) {
      this._queue.push({
        initialiser: initFn || noop,
        runner: runFn || noop,
        retarget: retargetFn,
        isTransform: isTransform,
        initialised: false,
        finished: false
      });

      var timeline = this.timeline();
      timeline && this.timeline()._continue();
      return this;
    }
  }, {
    key: "during",
    value: function during(fn) {
      return this.queue(null, fn);
    }
  }, {
    key: "after",
    value: function after(fn) {
      return this.on('finished', fn);
    }
    /*
    Runner animation methods
    ========================
    Control how the animation plays
    */

  }, {
    key: "time",
    value: function time(_time) {
      if (_time == null) {
        return this._time;
      }

      var dt = _time - this._time;
      this.step(dt);
      return this;
    }
  }, {
    key: "duration",
    value: function duration() {
      return this._times * (this._wait + this._duration) - this._wait;
    }
  }, {
    key: "loops",
    value: function loops(p) {
      var loopDuration = this._duration + this._wait;

      if (p == null) {
        var loopsDone = Math.floor(this._time / loopDuration);
        var relativeTime = this._time - loopsDone * loopDuration;
        var position = relativeTime / this._duration;
        return Math.min(loopsDone + position, this._times);
      }

      var whole = Math.floor(p);
      var partial = p % 1;
      var time = loopDuration * whole + this._duration * partial;
      return this.time(time);
    }
  }, {
    key: "persist",
    value: function persist(dtOrForever) {
      if (dtOrForever == null) return this._persist;
      this._persist = dtOrForever;
      return this;
    }
  }, {
    key: "position",
    value: function position(p) {
      // Get all of the variables we need
      var x = this._time;
      var d = this._duration;
      var w = this._wait;
      var t = this._times;
      var s = this._swing;
      var r = this._reverse;
      var position;

      if (p == null) {
        /*
        This function converts a time to a position in the range [0, 1]
        The full explanation can be found in this desmos demonstration
          https://www.desmos.com/calculator/u4fbavgche
        The logic is slightly simplified here because we can use booleans
        */
        // Figure out the value without thinking about the start or end time
        var f = function f(x) {
          var swinging = s * Math.floor(x % (2 * (w + d)) / (w + d));
          var backwards = swinging && !r || !swinging && r;
          var uncliped = Math.pow(-1, backwards) * (x % (w + d)) / d + backwards;
          var clipped = Math.max(Math.min(uncliped, 1), 0);
          return clipped;
        }; // Figure out the value by incorporating the start time


        var endTime = t * (w + d) - w;
        position = x <= 0 ? Math.round(f(1e-5)) : x < endTime ? f(x) : Math.round(f(endTime - 1e-5));
        return position;
      } // Work out the loops done and add the position to the loops done


      var loopsDone = Math.floor(this.loops());
      var swingForward = s && loopsDone % 2 === 0;
      var forwards = swingForward && !r || r && swingForward;
      position = loopsDone + (forwards ? p : 1 - p);
      return this.loops(position);
    }
  }, {
    key: "progress",
    value: function progress(p) {
      if (p == null) {
        return Math.min(1, this._time / this.duration());
      }

      return this.time(p * this.duration());
    }
  }, {
    key: "step",
    value: function step(dt) {
      // If we are inactive, this stepper just gets skipped
      if (!this.enabled) return this; // Update the time and get the new position

      dt = dt == null ? 16 : dt;
      this._time += dt;
      var position = this.position(); // Figure out if we need to run the stepper in this frame

      var running = this._lastPosition !== position && this._time >= 0;
      this._lastPosition = position; // Figure out if we just started

      var duration = this.duration();
      var justStarted = this._lastTime <= 0 && this._time > 0;
      var justFinished = this._lastTime < duration && this._time >= duration;
      this._lastTime = this._time;

      if (justStarted) {
        this.fire('start', this);
      } // Work out if the runner is finished set the done flag here so animations
      // know, that they are running in the last step (this is good for
      // transformations which can be merged)


      var declarative = this._isDeclarative;
      this.done = !declarative && !justFinished && this._time >= duration; // Runner is running. So its not in reseted state anymore

      this._reseted = false; // Call initialise and the run function

      if (running || declarative) {
        this._initialise(running); // clear the transforms on this runner so they dont get added again and again


        this.transforms = new Matrix();

        var converged = this._run(declarative ? dt : position);

        this.fire('step', this);
      } // correct the done flag here
      // declaritive animations itself know when they converged


      this.done = this.done || converged && declarative;

      if (justFinished) {
        this.fire('finished', this);
      }

      return this;
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this._reseted) return this;
      this.time(0);
      this._reseted = true;
      return this;
    }
  }, {
    key: "finish",
    value: function finish() {
      return this.step(Infinity);
    }
  }, {
    key: "reverse",
    value: function reverse(_reverse) {
      this._reverse = _reverse == null ? !this._reverse : _reverse;
      return this;
    }
  }, {
    key: "ease",
    value: function ease(fn) {
      this._stepper = new Ease(fn);
      return this;
    }
  }, {
    key: "active",
    value: function active(enabled) {
      if (enabled == null) return this.enabled;
      this.enabled = enabled;
      return this;
    }
    /*
    Private Methods
    ===============
    Methods that shouldn't be used externally
    */
    // Save a morpher to the morpher list so that we can retarget it later

  }, {
    key: "_rememberMorpher",
    value: function _rememberMorpher(method, morpher) {
      this._history[method] = {
        morpher: morpher,
        caller: this._queue[this._queue.length - 1]
      }; // We have to resume the timeline in case a controller
      // is already done without beeing ever run
      // This can happen when e.g. this is done:
      //    anim = el.animate(new SVG.Spring)
      // and later
      //    anim.move(...)

      if (this._isDeclarative) {
        var timeline = this.timeline();
        timeline && timeline.play();
      }
    } // Try to set the target for a morpher if the morpher exists, otherwise
    // do nothing and return false

  }, {
    key: "_tryRetarget",
    value: function _tryRetarget(method, target, extra) {
      if (this._history[method]) {
        // if the last method wasnt even initialised, throw it away
        if (!this._history[method].caller.initialised) {
          var index = this._queue.indexOf(this._history[method].caller);

          this._queue.splice(index, 1);

          return false;
        } // for the case of transformations, we use the special retarget function
        // which has access to the outer scope


        if (this._history[method].caller.retarget) {
          this._history[method].caller.retarget(target, extra); // for everything else a simple morpher change is sufficient

        } else {
          this._history[method].morpher.to(target);
        }

        this._history[method].caller.finished = false;
        var timeline = this.timeline();
        timeline && timeline.play();
        return true;
      }

      return false;
    } // Run each initialise function in the runner if required

  }, {
    key: "_initialise",
    value: function _initialise(running) {
      // If we aren't running, we shouldn't initialise when not declarative
      if (!running && !this._isDeclarative) return; // Loop through all of the initialisers

      for (var i = 0, len = this._queue.length; i < len; ++i) {
        // Get the current initialiser
        var current = this._queue[i]; // Determine whether we need to initialise

        var needsIt = this._isDeclarative || !current.initialised && running;
        running = !current.finished; // Call the initialiser if we need to

        if (needsIt && running) {
          current.initialiser.call(this);
          current.initialised = true;
        }
      }
    } // Run each run function for the position or dt given

  }, {
    key: "_run",
    value: function _run(positionOrDt) {
      // Run all of the _queue directly
      var allfinished = true;

      for (var i = 0, len = this._queue.length; i < len; ++i) {
        // Get the current function to run
        var current = this._queue[i]; // Run the function if its not finished, we keep track of the finished
        // flag for the sake of declarative _queue

        var converged = current.runner.call(this, positionOrDt);
        current.finished = current.finished || converged === true;
        allfinished = allfinished && current.finished;
      } // We report when all of the constructors are finished


      return allfinished;
    }
  }, {
    key: "addTransform",
    value: function addTransform(transform, index) {
      this.transforms.lmultiplyO(transform);
      return this;
    }
  }, {
    key: "clearTransform",
    value: function clearTransform() {
      this.transforms = new Matrix();
      return this;
    } // TODO: Keep track of all transformations so that deletion is faster

  }, {
    key: "clearTransformsFromQueue",
    value: function clearTransformsFromQueue() {
      if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
        this._queue = this._queue.filter(function (item) {
          return !item.isTransform;
        });
      }
    }
  }], [{
    key: "sanitise",
    value: function sanitise(duration, delay, when) {
      // Initialise the default parameters
      var times = 1;
      var swing = false;
      var wait = 0;
      duration = duration || timeline.duration;
      delay = delay || timeline.delay;
      when = when || 'last'; // If we have an object, unpack the values

      if (_typeof(duration) === 'object' && !(duration instanceof Stepper)) {
        delay = duration.delay || delay;
        when = duration.when || when;
        swing = duration.swing || swing;
        times = duration.times || times;
        wait = duration.wait || wait;
        duration = duration.duration || timeline.duration;
      }

      return {
        duration: duration,
        delay: delay,
        swing: swing,
        times: times,
        wait: wait,
        when: when
      };
    }
  }]);

  return Runner;
}(EventTarget);

exports.Runner = Runner;
Runner.id = 0;

var FakeRunner = /*#__PURE__*/function () {
  function FakeRunner() {
    var transforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Matrix();
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, FakeRunner);

    this.transforms = transforms;
    this.id = id;
    this.done = done;
  }

  _createClass(FakeRunner, [{
    key: "clearTransformsFromQueue",
    value: function clearTransformsFromQueue() {}
  }]);

  return FakeRunner;
}();

extend([Runner, FakeRunner], {
  mergeWith: function mergeWith(runner) {
    return new FakeRunner(runner.transforms.lmultiply(this.transforms), runner.id);
  }
}); // FakeRunner.emptyRunner = new FakeRunner()

var lmultiply = function lmultiply(last, curr) {
  return last.lmultiplyO(curr);
};

var getRunnerTransform = function getRunnerTransform(runner) {
  return runner.transforms;
};

function mergeTransforms() {
  // Find the matrix to apply to the element and apply it
  var runners = this._transformationRunners.runners;
  var netTransform = runners.map(getRunnerTransform).reduce(lmultiply, new Matrix());
  this.transform(netTransform);

  this._transformationRunners.merge();

  if (this._transformationRunners.length() === 1) {
    this._frameId = null;
  }
}

var RunnerArray = /*#__PURE__*/function () {
  function RunnerArray() {
    _classCallCheck(this, RunnerArray);

    this.runners = [];
    this.ids = [];
  }

  _createClass(RunnerArray, [{
    key: "add",
    value: function add(runner) {
      if (this.runners.includes(runner)) return;
      var id = runner.id + 1;
      this.runners.push(runner);
      this.ids.push(id);
      return this;
    }
  }, {
    key: "getByID",
    value: function getByID(id) {
      return this.runners[this.ids.indexOf(id + 1)];
    }
  }, {
    key: "remove",
    value: function remove(id) {
      var index = this.ids.indexOf(id + 1);
      this.ids.splice(index, 1);
      this.runners.splice(index, 1);
      return this;
    }
  }, {
    key: "merge",
    value: function merge() {
      var _this2 = this;

      var lastRunner = null;
      this.runners.forEach(function (runner, i) {
        var condition = lastRunner && runner.done && lastRunner.done // don't merge runner when persisted on timeline
        && (!runner._timeline || !runner._timeline._runnerIds.includes(runner.id)) && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id));

        if (condition) {
          // the +1 happens in the function
          _this2.remove(runner.id);

          _this2.edit(lastRunner.id, runner.mergeWith(lastRunner));
        }

        lastRunner = runner;
      });
      return this;
    }
  }, {
    key: "edit",
    value: function edit(id, newRunner) {
      var index = this.ids.indexOf(id + 1);
      this.ids.splice(index, 1, id + 1);
      this.runners.splice(index, 1, newRunner);
      return this;
    }
  }, {
    key: "length",
    value: function length() {
      return this.ids.length;
    }
  }, {
    key: "clearBefore",
    value: function clearBefore(id) {
      var deleteCnt = this.ids.indexOf(id + 1) || 1;
      this.ids.splice(0, deleteCnt, 0);
      this.runners.splice(0, deleteCnt, new FakeRunner()).forEach(function (r) {
        return r.clearTransformsFromQueue();
      });
      return this;
    }
  }]);

  return RunnerArray;
}();

registerMethods({
  Element: {
    animate: function animate(duration, delay, when) {
      var o = Runner.sanitise(duration, delay, when);
      var timeline = this.timeline();
      return new Runner(o.duration).loop(o).element(this).timeline(timeline.play()).schedule(o.delay, o.when);
    },
    delay: function delay(by, when) {
      return this.animate(0, by, when);
    },
    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwfrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore: function _clearTransformRunnersBefore(currentRunner) {
      this._transformationRunners.clearBefore(currentRunner.id);
    },
    _currentTransform: function _currentTransform(current) {
      return this._transformationRunners.runners // we need the equal sign here to make sure, that also transformations
      // on the same runner which execute before the current transformation are
      // taken into account
      .filter(function (runner) {
        return runner.id <= current.id;
      }).map(getRunnerTransform).reduce(lmultiply, new Matrix());
    },
    _addRunner: function _addRunner(runner) {
      this._transformationRunners.add(runner); // Make sure that the runner merge is executed at the very end of
      // all Animator functions. Thats why we use immediate here to execute
      // the merge right after all frames are run


      Animator.cancelImmediate(this._frameId);
      this._frameId = Animator.immediate(mergeTransforms.bind(this));
    },
    _prepareRunner: function _prepareRunner() {
      if (this._frameId == null) {
        this._transformationRunners = new RunnerArray().add(new FakeRunner(new Matrix(this)));
      }
    }
  }
});
extend(Runner, {
  attr: function attr(a, v) {
    return this.styleAttr('attr', a, v);
  },
  // Add animatable styles
  css: function css(s, v) {
    return this.styleAttr('css', s, v);
  },
  styleAttr: function styleAttr(type, name, val) {
    // apply attributes individually
    if (_typeof(name) === 'object') {
      for (var key in name) {
        this.styleAttr(type, key, name[key]);
      }

      return this;
    }

    var morpher = new Morphable(this._stepper).to(val);
    this.queue(function () {
      morpher = morpher.from(this.element()[type](name));
    }, function (pos) {
      this.element()[type](name, morpher.at(pos));
      return morpher.done();
    });
    return this;
  },
  zoom: function zoom(level, point) {
    if (this._tryRetarget('zoom', to, point)) return this;
    var morpher = new Morphable(this._stepper).to(new SVGNumber(level));
    this.queue(function () {
      morpher = morpher.from(this.element().zoom());
    }, function (pos) {
      this.element().zoom(morpher.at(pos), point);
      return morpher.done();
    }, function (newLevel, newPoint) {
      point = newPoint;
      morpher.to(newLevel);
    });

    this._rememberMorpher('zoom', morpher);

    return this;
  },

  /**
   ** absolute transformations
   **/
  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)
  transform: function transform(transforms, relative, affine) {
    // If we have a declarative function, we should retarget it if possible
    relative = transforms.relative || relative;

    if (this._isDeclarative && !relative && this._tryRetarget('transform', transforms)) {
      return this;
    } // Parse the parameters


    var isMatrix = Matrix.isMatrixLike(transforms);
    affine = transforms.affine != null ? transforms.affine : affine != null ? affine : !isMatrix; // Create a morepher and set its type

    var morpher = new Morphable(this._stepper).type(affine ? TransformBag : Matrix);
    var origin;
    var element;
    var current;
    var currentAngle;
    var startTransform;

    function setup() {
      // make sure element and origin is defined
      element = element || this.element();
      origin = origin || getOrigin(transforms, element);
      startTransform = new Matrix(relative ? undefined : element); // add the runner to the element so it can merge transformations

      element._addRunner(this); // Deactivate all transforms that have run so far if we are absolute


      if (!relative) {
        element._clearTransformRunnersBefore(this);
      }
    }

    function run(pos) {
      // clear all other transforms before this in case something is saved
      // on this runner. We are absolute. We dont need these!
      if (!relative) this.clearTransform();

      var _transform = new Point(origin).transform(element._currentTransform(this)),
          x = _transform.x,
          y = _transform.y;

      var target = new Matrix(_objectSpread$1({}, transforms, {
        origin: [x, y]
      }));
      var start = this._isDeclarative && current ? current : startTransform;

      if (affine) {
        target = target.decompose(x, y);
        start = start.decompose(x, y); // Get the current and target angle as it was set

        var rTarget = target.rotate;
        var rCurrent = start.rotate; // Figure out the shortest path to rotate directly

        var possibilities = [rTarget - 360, rTarget, rTarget + 360];
        var distances = possibilities.map(function (a) {
          return Math.abs(a - rCurrent);
        });
        var shortest = Math.min.apply(Math, _toConsumableArray(distances));
        var index = distances.indexOf(shortest);
        target.rotate = possibilities[index];
      }

      if (relative) {
        // we have to be careful here not to overwrite the rotation
        // with the rotate method of Matrix
        if (!isMatrix) {
          target.rotate = transforms.rotate || 0;
        }

        if (this._isDeclarative && currentAngle) {
          start.rotate = currentAngle;
        }
      }

      morpher.from(start);
      morpher.to(target);
      var affineParameters = morpher.at(pos);
      currentAngle = affineParameters.rotate;
      current = new Matrix(affineParameters);
      this.addTransform(current);

      element._addRunner(this);

      return morpher.done();
    }

    function retarget(newTransforms) {
      // only get a new origin if it changed since the last call
      if ((newTransforms.origin || 'center').toString() !== (transforms.origin || 'center').toString()) {
        origin = getOrigin(transforms, element);
      } // overwrite the old transformations with the new ones


      transforms = _objectSpread$1({}, newTransforms, {
        origin: origin
      });
    }

    this.queue(setup, run, retarget, true);
    this._isDeclarative && this._rememberMorpher('transform', morpher);
    return this;
  },
  // Animatable x-axis
  x: function x(_x, relative) {
    return this._queueNumber('x', _x);
  },
  // Animatable y-axis
  y: function y(_y) {
    return this._queueNumber('y', _y);
  },
  dx: function dx() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return this._queueNumberDelta('x', x);
  },
  dy: function dy() {
    var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return this._queueNumberDelta('y', y);
  },
  dmove: function dmove(x, y) {
    return this.dx(x).dy(y);
  },
  _queueNumberDelta: function _queueNumberDelta(method, to) {
    to = new SVGNumber(to); // Try to change the target if we have this method already registerd

    if (this._tryRetarget(method, to)) return this; // Make a morpher and queue the animation

    var morpher = new Morphable(this._stepper).to(to);
    var from = null;
    this.queue(function () {
      from = this.element()[method]();
      morpher.from(from);
      morpher.to(from + to);
    }, function (pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done();
    }, function (newTo) {
      morpher.to(from + new SVGNumber(newTo));
    }); // Register the morpher so that if it is changed again, we can retarget it

    this._rememberMorpher(method, morpher);

    return this;
  },
  _queueObject: function _queueObject(method, to) {
    // Try to change the target if we have this method already registerd
    if (this._tryRetarget(method, to)) return this; // Make a morpher and queue the animation

    var morpher = new Morphable(this._stepper).to(to);
    this.queue(function () {
      morpher.from(this.element()[method]());
    }, function (pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done();
    }); // Register the morpher so that if it is changed again, we can retarget it

    this._rememberMorpher(method, morpher);

    return this;
  },
  _queueNumber: function _queueNumber(method, value) {
    return this._queueObject(method, new SVGNumber(value));
  },
  // Animatable center x-axis
  cx: function cx(x) {
    return this._queueNumber('cx', x);
  },
  // Animatable center y-axis
  cy: function cy(y) {
    return this._queueNumber('cy', y);
  },
  // Add animatable move
  move: function move(x, y) {
    return this.x(x).y(y);
  },
  // Add animatable center
  center: function center(x, y) {
    return this.cx(x).cy(y);
  },
  // Add animatable size
  size: function size(width, height) {
    // animate bbox based size for all other elements
    var box;

    if (!width || !height) {
      box = this._element.bbox();
    }

    if (!width) {
      width = box.width / box.height * height;
    }

    if (!height) {
      height = box.height / box.width * width;
    }

    return this.width(width).height(height);
  },
  // Add animatable width
  width: function width(_width) {
    return this._queueNumber('width', _width);
  },
  // Add animatable height
  height: function height(_height) {
    return this._queueNumber('height', _height);
  },
  // Add animatable plot
  plot: function plot(a, b, c, d) {
    // Lines can be plotted with 4 arguments
    if (arguments.length === 4) {
      return this.plot([a, b, c, d]);
    }

    if (this._tryRetarget('plot', a)) return this;
    var morpher = new Morphable(this._stepper).type(this._element.MorphArray).to(a);
    this.queue(function () {
      morpher.from(this._element.array());
    }, function (pos) {
      this._element.plot(morpher.at(pos));

      return morpher.done();
    });

    this._rememberMorpher('plot', morpher);

    return this;
  },
  // Add leading method
  leading: function leading(value) {
    return this._queueNumber('leading', value);
  },
  // Add animatable viewbox
  viewbox: function viewbox(x, y, width, height) {
    return this._queueObject('viewbox', new Box(x, y, width, height));
  },
  update: function update(o) {
    if (_typeof(o) !== 'object') {
      return this.update({
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      });
    }

    if (o.opacity != null) this.attr('stop-opacity', o.opacity);
    if (o.color != null) this.attr('stop-color', o.color);
    if (o.offset != null) this.attr('offset', o.offset);
    return this;
  }
});
extend(Runner, {
  rx: rx,
  ry: ry,
  from: from,
  to: to
});
register(Runner, 'Runner');

var Svg = /*#__PURE__*/function (_Container) {
  _inherits(Svg, _Container);

  function Svg(node) {
    var _this;

    _classCallCheck(this, Svg);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Svg).call(this, nodeOrNew('svg', node), node));

    _this.namespace();

    return _this;
  }

  _createClass(Svg, [{
    key: "isRoot",
    value: function isRoot() {
      return !this.node.parentNode || !(this.node.parentNode instanceof globals.window.SVGElement) || this.node.parentNode.nodeName === '#document';
    } // Check if this is a root svg
    // If not, call docs from this element

  }, {
    key: "root",
    value: function root() {
      if (this.isRoot()) return this;
      return _get(_getPrototypeOf(Svg.prototype), "root", this).call(this);
    } // Add namespaces

  }, {
    key: "namespace",
    value: function namespace() {
      if (!this.isRoot()) return this.root().namespace();
      return this.attr({
        xmlns: ns,
        version: '1.1'
      }).attr('xmlns:xlink', xlink, xmlns).attr('xmlns:svgjs', svgjs, xmlns);
    } // Creates and returns defs element

  }, {
    key: "defs",
    value: function defs() {
      if (!this.isRoot()) return this.root().defs();
      return adopt(this.node.querySelector('defs')) || this.put(new Defs());
    } // custom parent method

  }, {
    key: "parent",
    value: function parent(type) {
      if (this.isRoot()) {
        return this.node.parentNode.nodeName === '#document' ? null : adopt(this.node.parentNode);
      }

      return _get(_getPrototypeOf(Svg.prototype), "parent", this).call(this, type);
    }
  }, {
    key: "clear",
    value: function clear() {
      // remove children
      while (this.node.hasChildNodes()) {
        this.node.removeChild(this.node.lastChild);
      } // remove defs reference


      delete this._defs;
      return this;
    }
  }]);

  return Svg;
}(Container);

exports.Svg = Svg;
registerMethods({
  Container: {
    // Create nested svg document
    nested: wrapWithAttrCheck(function () {
      return this.put(new Svg());
    })
  }
});
register(Svg, 'Svg', true);

var _Symbol = /*#__PURE__*/function (_Container) {
  _inherits(_Symbol, _Container); // Initialize node


  function _Symbol(node) {
    _classCallCheck(this, _Symbol);

    return _possibleConstructorReturn(this, _getPrototypeOf(_Symbol).call(this, nodeOrNew('symbol', node), node));
  }

  return _Symbol;
}(Container);

exports.Symbol = _Symbol;
registerMethods({
  Container: {
    symbol: wrapWithAttrCheck(function () {
      return this.put(new _Symbol());
    })
  }
});
register(_Symbol, 'Symbol');

function plain(text) {
  // clear if build mode is disabled
  if (this._build === false) {
    this.clear();
  } // create text node


  this.node.appendChild(globals.document.createTextNode(text));
  return this;
} // Get length of text element


function length() {
  return this.node.getComputedTextLength();
}

var textable = {
  __proto__: null,
  plain: plain,
  length: length
};

var Text = /*#__PURE__*/function (_Shape) {
  _inherits(Text, _Shape); // Initialize node


  function Text(node) {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, nodeOrNew('text', node), node));
    _this.dom.leading = new SVGNumber(1.3); // store leading value for rebuilding

    _this._rebuild = true; // enable automatic updating of dy values

    _this._build = false; // disable build mode for adding multiple lines

    return _this;
  } // Move over x-axis
  // Text is moved its bounding box
  // text-anchor does NOT matter


  _createClass(Text, [{
    key: "x",
    value: function x(_x) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

      if (_x == null) {
        return box.x;
      }

      return this.attr('x', this.attr('x') + _x - box.x);
    } // Move over y-axis

  }, {
    key: "y",
    value: function y(_y) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

      if (_y == null) {
        return box.y;
      }

      return this.attr('y', this.attr('y') + _y - box.y);
    }
  }, {
    key: "move",
    value: function move(x, y) {
      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
      return this.x(x, box).y(y, box);
    } // Move center over x-axis

  }, {
    key: "cx",
    value: function cx(x) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

      if (x == null) {
        return box.cx;
      }

      return this.attr('x', this.attr('x') + x - box.cx);
    } // Move center over y-axis

  }, {
    key: "cy",
    value: function cy(y) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

      if (y == null) {
        return box.cy;
      }

      return this.attr('y', this.attr('y') + y - box.cy);
    }
  }, {
    key: "center",
    value: function center(x, y) {
      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
      return this.cx(x, box).cy(y, box);
    } // Set the text content

  }, {
    key: "text",
    value: function text(_text) {
      // act as getter
      if (_text === undefined) {
        var children = this.node.childNodes;
        var firstLine = 0;
        _text = '';

        for (var i = 0, len = children.length; i < len; ++i) {
          // skip textPaths - they are no lines
          if (children[i].nodeName === 'textPath') {
            if (i === 0) firstLine = 1;
            continue;
          } // add newline if its not the first child and newLined is set to true


          if (i !== firstLine && children[i].nodeType !== 3 && adopt(children[i]).dom.newLined === true) {
            _text += '\n';
          } // add content of this node


          _text += children[i].textContent;
        }

        return _text;
      } // remove existing content


      this.clear().build(true);

      if (typeof _text === 'function') {
        // call block
        _text.call(this, this);
      } else {
        // store text and make sure text is not blank
        _text = _text.split('\n'); // build new lines

        for (var j = 0, jl = _text.length; j < jl; j++) {
          this.tspan(_text[j]).newLine();
        }
      } // disable build mode and rebuild lines


      return this.build(false).rebuild();
    } // Set / get leading

  }, {
    key: "leading",
    value: function leading(value) {
      // act as getter
      if (value == null) {
        return this.dom.leading;
      } // act as setter


      this.dom.leading = new SVGNumber(value);
      return this.rebuild();
    } // Rebuild appearance type

  }, {
    key: "rebuild",
    value: function rebuild(_rebuild) {
      // store new rebuild flag if given
      if (typeof _rebuild === 'boolean') {
        this._rebuild = _rebuild;
      } // define position of all lines


      if (this._rebuild) {
        var self = this;
        var blankLineOffset = 0;
        var leading = this.dom.leading;
        this.each(function () {
          var fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
          var dy = leading * new SVGNumber(fontSize);

          if (this.dom.newLined) {
            this.attr('x', self.attr('x'));

            if (this.text() === '\n') {
              blankLineOffset += dy;
            } else {
              this.attr('dy', dy + blankLineOffset);
              blankLineOffset = 0;
            }
          }
        });
        this.fire('rebuild');
      }

      return this;
    } // Enable / disable build mode

  }, {
    key: "build",
    value: function build(_build) {
      this._build = !!_build;
      return this;
    } // overwrite method from parent to set data properly

  }, {
    key: "setData",
    value: function setData(o) {
      this.dom = o;
      this.dom.leading = new SVGNumber(o.leading || 1.3);
      return this;
    }
  }]);

  return Text;
}(Shape);

exports.Text = Text;
extend(Text, textable);
registerMethods({
  Container: {
    // Create text element
    text: wrapWithAttrCheck(function (text) {
      return this.put(new Text()).text(text);
    }),
    // Create plain text element
    plain: wrapWithAttrCheck(function (text) {
      return this.put(new Text()).plain(text);
    })
  }
});
register(Text, 'Text');

var Tspan = /*#__PURE__*/function (_Text) {
  _inherits(Tspan, _Text); // Initialize node


  function Tspan(node) {
    _classCallCheck(this, Tspan);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tspan).call(this, nodeOrNew('tspan', node), node));
  } // Set text content


  _createClass(Tspan, [{
    key: "text",
    value: function text(_text) {
      if (_text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '');
      typeof _text === 'function' ? _text.call(this, this) : this.plain(_text);
      return this;
    } // Shortcut dx

  }, {
    key: "dx",
    value: function dx(_dx) {
      return this.attr('dx', _dx);
    } // Shortcut dy

  }, {
    key: "dy",
    value: function dy(_dy) {
      return this.attr('dy', _dy);
    }
  }, {
    key: "x",
    value: function x(_x) {
      return this.attr('x', _x);
    }
  }, {
    key: "y",
    value: function y(_y) {
      return this.attr('x', _y);
    }
  }, {
    key: "move",
    value: function move(x, y) {
      return this.x(x).y(y);
    } // Create new line

  }, {
    key: "newLine",
    value: function newLine() {
      // fetch text parent
      var t = this.parent(Text); // mark new line

      this.dom.newLined = true;
      var fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
      var dy = t.dom.leading * new SVGNumber(fontSize); // apply new position

      return this.dy(dy).attr('x', t.x());
    }
  }]);

  return Tspan;
}(Text);

exports.Tspan = Tspan;
extend(Tspan, textable);
registerMethods({
  Tspan: {
    tspan: wrapWithAttrCheck(function (text) {
      var tspan = new Tspan(); // clear if build mode is disabled

      if (!this._build) {
        this.clear();
      } // add new tspan


      this.node.appendChild(tspan.node);
      return tspan.text(text);
    })
  }
});
register(Tspan, 'Tspan');

var ClipPath = /*#__PURE__*/function (_Container) {
  _inherits(ClipPath, _Container);

  function ClipPath(node) {
    _classCallCheck(this, ClipPath);

    return _possibleConstructorReturn(this, _getPrototypeOf(ClipPath).call(this, nodeOrNew('clipPath', node), node));
  } // Unclip all clipped elements and remove itself


  _createClass(ClipPath, [{
    key: "remove",
    value: function remove() {
      // unclip all targets
      this.targets().forEach(function (el) {
        el.unclip();
      }); // remove clipPath from parent

      return _get(_getPrototypeOf(ClipPath.prototype), "remove", this).call(this);
    }
  }, {
    key: "targets",
    value: function targets() {
      return baseFind('svg [clip-path*="' + this.id() + '"]');
    }
  }]);

  return ClipPath;
}(Container);

exports.ClipPath = ClipPath;
registerMethods({
  Container: {
    // Create clipping element
    clip: wrapWithAttrCheck(function () {
      return this.defs().put(new ClipPath());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipWith: function clipWith(element) {
      // use given clip or create a new one
      var clipper = element instanceof ClipPath ? element : this.parent().clip().add(element); // apply mask

      return this.attr('clip-path', 'url("#' + clipper.id() + '")');
    },
    // Unclip element
    unclip: function unclip() {
      return this.attr('clip-path', null);
    },
    clipper: function clipper() {
      return this.reference('clip-path');
    }
  }
});
register(ClipPath, 'ClipPath');

var ForeignObject = /*#__PURE__*/function (_Element) {
  _inherits(ForeignObject, _Element);

  function ForeignObject(node) {
    _classCallCheck(this, ForeignObject);

    return _possibleConstructorReturn(this, _getPrototypeOf(ForeignObject).call(this, nodeOrNew('foreignObject', node), node));
  }

  return ForeignObject;
}(Element);

exports.ForeignObject = ForeignObject;
registerMethods({
  Container: {
    foreignObject: wrapWithAttrCheck(function (width, height) {
      return this.put(new ForeignObject()).size(width, height);
    })
  }
});
register(ForeignObject, 'ForeignObject');

var G = /*#__PURE__*/function (_Container) {
  _inherits(G, _Container);

  function G(node) {
    _classCallCheck(this, G);

    return _possibleConstructorReturn(this, _getPrototypeOf(G).call(this, nodeOrNew('g', node), node));
  }

  _createClass(G, [{
    key: "x",
    value: function x(_x) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
      if (_x == null) return box.x;
      return this.move(_x, box.y, box);
    }
  }, {
    key: "y",
    value: function y(_y) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
      if (_y == null) return box.y;
      return this.move(box.x, _y, box);
    }
  }, {
    key: "move",
    value: function move() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
      var dx = x - box.x;
      var dy = y - box.y;
      return this.dmove(dx, dy);
    }
  }, {
    key: "dx",
    value: function dx(_dx) {
      return this.dmove(_dx, 0);
    }
  }, {
    key: "dy",
    value: function dy(_dy) {
      return this.dmove(0, _dy);
    }
  }, {
    key: "dmove",
    value: function dmove(dx, dy) {
      this.children().forEach(function (child, i) {
        // Get the childs bbox
        var bbox = child.bbox(); // Get childs matrix

        var m = new Matrix(child); // Translate childs matrix by amount and
        // transform it back into parents space

        var matrix = m.translate(dx, dy).transform(m.inverse()); // Calculate new x and y from old box

        var p = new Point(bbox.x, bbox.y).transform(matrix); // Move element

        child.move(p.x, p.y);
      });
      return this;
    }
  }, {
    key: "width",
    value: function width(_width) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
      if (_width == null) return box.width;
      return this.size(_width, box.height, box);
    }
  }, {
    key: "height",
    value: function height(_height) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
      if (_height == null) return box.height;
      return this.size(box.width, _height, box);
    }
  }, {
    key: "size",
    value: function size(width, height) {
      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
      var p = proportionalSize(this, width, height, box);
      var scaleX = p.width / box.width;
      var scaleY = p.height / box.height;
      this.children().forEach(function (child, i) {
        var o = new Point(box).transform(new Matrix(child).inverse());
        child.scale(scaleX, scaleY, o.x, o.y);
      });
      return this;
    }
  }]);

  return G;
}(Container);

exports.G = G;
registerMethods({
  Container: {
    // Create a group element
    group: wrapWithAttrCheck(function () {
      return this.put(new G());
    })
  }
});
register(G, 'G');

var A = /*#__PURE__*/function (_Container) {
  _inherits(A, _Container);

  function A(node) {
    _classCallCheck(this, A);

    return _possibleConstructorReturn(this, _getPrototypeOf(A).call(this, nodeOrNew('a', node), node));
  } // Link url


  _createClass(A, [{
    key: "to",
    value: function to(url) {
      return this.attr('href', url, xlink);
    } // Link target attribute

  }, {
    key: "target",
    value: function target(_target) {
      return this.attr('target', _target);
    }
  }]);

  return A;
}(Container);

exports.A = A;
registerMethods({
  Container: {
    // Create a hyperlink element
    link: wrapWithAttrCheck(function (url) {
      return this.put(new A()).to(url);
    })
  },
  Element: {
    // Create a hyperlink element
    linkTo: function linkTo(url) {
      var link = new A();

      if (typeof url === 'function') {
        url.call(link, link);
      } else {
        link.to(url);
      }

      return this.parent().put(link).put(this);
    }
  }
});
register(A, 'A');

var Mask = /*#__PURE__*/function (_Container) {
  _inherits(Mask, _Container); // Initialize node


  function Mask(node) {
    _classCallCheck(this, Mask);

    return _possibleConstructorReturn(this, _getPrototypeOf(Mask).call(this, nodeOrNew('mask', node), node));
  } // Unmask all masked elements and remove itself


  _createClass(Mask, [{
    key: "remove",
    value: function remove() {
      // unmask all targets
      this.targets().forEach(function (el) {
        el.unmask();
      }); // remove mask from parent

      return _get(_getPrototypeOf(Mask.prototype), "remove", this).call(this);
    }
  }, {
    key: "targets",
    value: function targets() {
      return baseFind('svg [mask*="' + this.id() + '"]');
    }
  }]);

  return Mask;
}(Container);

exports.Mask = Mask;
registerMethods({
  Container: {
    mask: wrapWithAttrCheck(function () {
      return this.defs().put(new Mask());
    })
  },
  Element: {
    // Distribute mask to svg element
    maskWith: function maskWith(element) {
      // use given mask or create a new one
      var masker = element instanceof Mask ? element : this.parent().mask().add(element); // apply mask

      return this.attr('mask', 'url("#' + masker.id() + '")');
    },
    // Unmask element
    unmask: function unmask() {
      return this.attr('mask', null);
    },
    masker: function masker() {
      return this.reference('mask');
    }
  }
});
register(Mask, 'Mask');

function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$3(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$3(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function cssRule(selector, rule) {
  if (!selector) return '';
  if (!rule) return selector;
  var ret = selector + '{';

  for (var i in rule) {
    ret += unCamelCase(i) + ':' + rule[i] + ';';
  }

  ret += '}';
  return ret;
}

var Style = /*#__PURE__*/function (_Element) {
  _inherits(Style, _Element);

  function Style(node) {
    _classCallCheck(this, Style);

    return _possibleConstructorReturn(this, _getPrototypeOf(Style).call(this, nodeOrNew('style', node), node));
  }

  _createClass(Style, [{
    key: "addText",
    value: function addText() {
      var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.node.textContent += w;
      return this;
    }
  }, {
    key: "font",
    value: function font(name, src) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.rule('@font-face', _objectSpread$2({
        fontFamily: name,
        src: src
      }, params));
    }
  }, {
    key: "rule",
    value: function rule(selector, obj) {
      return this.addText(cssRule(selector, obj));
    }
  }]);

  return Style;
}(Element);

exports.Style = Style;
registerMethods('Dom', {
  style: wrapWithAttrCheck(function (selector, obj) {
    return this.put(new Style()).rule(selector, obj);
  }),
  fontface: wrapWithAttrCheck(function (name, src, params) {
    return this.put(new Style()).font(name, src, params);
  })
});
register(Style, 'Style');

var TextPath = /*#__PURE__*/function (_Text) {
  _inherits(TextPath, _Text); // Initialize node


  function TextPath(node) {
    _classCallCheck(this, TextPath);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextPath).call(this, nodeOrNew('textPath', node), node));
  } // return the array of the path track element


  _createClass(TextPath, [{
    key: "array",
    value: function array() {
      var track = this.track();
      return track ? track.array() : null;
    } // Plot path if any

  }, {
    key: "plot",
    value: function plot(d) {
      var track = this.track();
      var pathArray = null;

      if (track) {
        pathArray = track.plot(d);
      }

      return d == null ? pathArray : this;
    } // Get the path element

  }, {
    key: "track",
    value: function track() {
      return this.reference('href');
    }
  }]);

  return TextPath;
}(Text);

exports.TextPath = TextPath;
registerMethods({
  Container: {
    textPath: wrapWithAttrCheck(function (text, path) {
      // Convert text to instance if needed
      if (!(text instanceof Text)) {
        text = this.text(text);
      }

      return text.path(path);
    })
  },
  Text: {
    // Create path for text to run on
    path: wrapWithAttrCheck(function (track) {
      var importNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var textPath = new TextPath(); // if track is a path, reuse it

      if (!(track instanceof Path)) {
        // create path element
        track = this.defs().path(track);
      } // link textPath to path and add content


      textPath.attr('href', '#' + track, xlink); // Transplant all nodes from text to textPath

      var node;

      if (importNodes) {
        while (node = this.node.firstChild) {
          textPath.node.appendChild(node);
        }
      } // add textPath element as child node and return textPath


      return this.put(textPath);
    }),
    // Get the textPath children
    textPath: function textPath() {
      return this.findOne('textPath');
    }
  },
  Path: {
    // creates a textPath from this path
    text: wrapWithAttrCheck(function (text) {
      // Convert text to instance if needed
      if (!(text instanceof Text)) {
        text = new Text().addTo(this.parent()).text(text);
      } // Create textPath from text and path and return


      return text.path(this);
    }),
    targets: function targets() {
      return baseFind('svg [href*="' + this.id() + '"]');
    }
  }
});
TextPath.prototype.MorphArray = PathArray;
register(TextPath, 'TextPath');

var Use = /*#__PURE__*/function (_Shape) {
  _inherits(Use, _Shape);

  function Use(node) {
    _classCallCheck(this, Use);

    return _possibleConstructorReturn(this, _getPrototypeOf(Use).call(this, nodeOrNew('use', node), node));
  } // Use element as a reference


  _createClass(Use, [{
    key: "element",
    value: function element(_element, file) {
      // Set lined element
      return this.attr('href', (file || '') + '#' + _element, xlink);
    }
  }]);

  return Use;
}(Shape);

exports.Use = Use;
registerMethods({
  Container: {
    // Create a use element
    use: wrapWithAttrCheck(function (element, file) {
      return this.put(new Use()).element(element, file);
    })
  }
});
register(Use, 'Use');
/* Optional Modules */

var SVG = makeInstance;
exports.SVG = SVG;
extend([Svg, _Symbol, Image, Pattern, Marker], getMethodsFor('viewbox'));
extend([Line, Polyline, Polygon, Path], getMethodsFor('marker'));
extend(Text, getMethodsFor('Text'));
extend(Path, getMethodsFor('Path'));
extend(Defs, getMethodsFor('Defs'));
extend([Text, Tspan], getMethodsFor('Tspan'));
extend([Rect, Ellipse, Circle, Gradient], getMethodsFor('radius'));
extend(EventTarget, getMethodsFor('EventTarget'));
extend(Dom, getMethodsFor('Dom'));
extend(Element, getMethodsFor('Element'));
extend(Shape, getMethodsFor('Shape')); // extend(Element, getConstructor('Memory'))

extend(Container, getMethodsFor('Container'));
extend(Runner, getMethodsFor('Runner'));
List.extend(getMethodNames());
registerMorphableType([SVGNumber, Color, Box, Matrix, SVGArray, PointArray, PathArray]);
makeMorphable();
},{}],"node_modules/@svgdotjs/svg.filter.js/src/svg.filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _svg = require("@svgdotjs/svg.js");

class Filter extends _svg.Element {
  constructor(node) {
    super((0, _svg.nodeOrNew)('filter', node), node);
    this.$source = 'SourceGraphic';
    this.$sourceAlpha = 'SourceAlpha';
    this.$background = 'BackgroundImage';
    this.$backgroundAlpha = 'BackgroundAlpha';
    this.$fill = 'FillPaint';
    this.$stroke = 'StrokePaint';
    this.$autoSetIn = true;
  }

  put(element, i) {
    element = super.put(element, i);

    if (!element.attr('in') && this.$autoSetIn) {
      element.attr('in', this.$source);
    }

    if (!element.attr('result')) {
      element.attr('result', element.id());
    }

    return element;
  } // Unmask all masked elements and remove itself


  remove() {
    // unmask all targets
    this.targets().each('unfilter'); // remove mask from parent

    return super.remove();
  }

  targets() {
    return (0, _svg.find)('svg [filter*="' + this.id() + '"]');
  }

  toString() {
    return 'url(#' + this.id() + ')';
  }

} // Create Effect class


exports.default = Filter;

class Effect extends _svg.Element {
  constructor(node) {
    super(node, node);
    this.result(this.id());
  }

  in(effect) {
    // Act as getter
    if (effect == null) {
      const _in = this.attr('in');

      const ref = this.parent() && this.parent().find(`[result="${_in}"]`)[0];
      return ref || _in;
    } // Avr as setter


    return this.attr('in', effect);
  } // Named result


  result(result) {
    return this.attr('result', result);
  } // Stringification


  toString() {
    return this.result();
  }

} // This function takes an array with attr keys and sets for every key the
// attribute to the value of one paramater
// getAttrSetter(['a', 'b']) becomes this.attr({a: param1, b: param2})


const getAttrSetter = params => {
  return function (...args) {
    for (let i = params.length; i--;) {
      if (args[i] != null) {
        this.attr(params[i], args[i]);
      }
    }
  };
};

const updateFunctions = {
  blend: getAttrSetter(['in', 'in2', 'mode']),
  // ColorMatrix effect
  colorMatrix: getAttrSetter(['type', 'values']),
  // Composite effect
  composite: getAttrSetter(['in', 'in2', 'operator']),
  // ConvolveMatrix effect
  convolveMatrix: function (matrix) {
    matrix = new _svg.Array(matrix).toString();
    this.attr({
      order: Math.sqrt(matrix.split(' ').length),
      kernelMatrix: matrix
    });
  },
  // DiffuseLighting effect
  diffuseLighting: getAttrSetter(['surfaceScale', 'lightingColor', 'diffuseConstant', 'kernelUnitLength']),
  // DisplacementMap effect
  displacementMap: getAttrSetter(['in', 'in2', 'scale', 'xChannelSelector', 'yChannelSelector']),
  // DropShadow effect
  dropShadow: getAttrSetter(['in', 'dx', 'dy', 'stdDeviation']),
  // Flood effect
  flood: getAttrSetter(['flood-color', 'flood-opacity']),
  // Gaussian Blur effect
  gaussianBlur: function (x = 0, y = x) {
    this.attr('stdDeviation', x + ' ' + y);
  },
  // Image effect
  image: function (src) {
    this.attr('href', src, _svg.namespaces.xlink);
  },
  // Morphology effect
  morphology: getAttrSetter(['operator', 'radius']),
  // Offset effect
  offset: getAttrSetter(['dx', 'dy']),
  // SpecularLighting effect
  specularLighting: getAttrSetter(['surfaceScale', 'lightingColor', 'diffuseConstant', 'specularExponent', 'kernelUnitLength']),
  // Tile effect
  tile: getAttrSetter([]),
  // Turbulence effect
  turbulence: getAttrSetter(['baseFrequency', 'numOctaves', 'seed', 'stitchTiles', 'type'])
};
const filterNames = ['blend', 'colorMatrix', 'componentTransfer', 'composite', 'convolveMatrix', 'diffuseLighting', 'displacementMap', 'dropShadow', 'flood', 'gaussianBlur', 'image', 'merge', 'morphology', 'offset', 'specularLighting', 'tile', 'turbulence']; // For every filter create a class

filterNames.forEach(effect => {
  const name = _svg.utils.capitalize(effect);

  const fn = updateFunctions[effect];
  Filter[name + 'Effect'] = class extends Effect {
    constructor(node) {
      super((0, _svg.nodeOrNew)('fe' + name, node), node);
    } // This function takes all parameters from the factory call
    // and updates the attributes according to the updateFunctions


    update(args) {
      fn.apply(this, args);
      return this;
    }

  }; // Add factory function to filter
  // Allow to pass a function or object
  // The attr object is catched from "wrapWithAttrCheck"

  Filter.prototype[effect] = (0, _svg.wrapWithAttrCheck)(function (fn, ...args) {
    const effect = new Filter[name + 'Effect']();
    if (fn == null) return this.put(effect); // For Effects which can take children, a function is allowed

    if (typeof fn === 'function') {
      fn.call(effect, effect);
    } else {
      // In case it is not a function, add it to arguments
      args.unshift(fn);
    }

    return this.put(effect).update(args);
  });
}); // Correct factories which are not that simple

(0, _svg.extend)(Filter, {
  merge(arrayOrFn) {
    const node = this.put(new Filter.MergeEffect()); // If a function was passed, execute it
    // That makes stuff like this possible:
    // filter.merge((mergeEffect) => mergeEffect.mergeNode(in))

    if (typeof arrayOrFn === 'function') {
      arrayOrFn.call(node, node);
      return node;
    } // Check if first child is an array, otherwise use arguments as array


    var children = arrayOrFn instanceof Array ? arrayOrFn : [...arguments];
    children.forEach(child => {
      if (child instanceof Filter.MergeNode) {
        node.put(child);
      } else {
        node.mergeNode(child);
      }
    });
    return node;
  },

  componentTransfer(components = {}) {
    const node = this.put(new Filter.ComponentTransferEffect());

    if (typeof components === 'function') {
      components.call(node, node);
      return node;
    } // If no component is set, we use the given object for all components


    if (!components.r && !components.g && !components.b && !components.a) {
      const temp = components;
      components = {
        r: temp,
        g: temp,
        b: temp,
        a: temp
      };
    }

    for (const c in components) {
      // components[c] has to hold an attributes object
      node.add(new Filter['Func' + c.toUpperCase()](components[c]));
    }

    return node;
  }

});
const filterChildNodes = ['distantLight', 'pointLight', 'spotLight', 'mergeNode', 'FuncR', 'FuncG', 'FuncB', 'FuncA'];
filterChildNodes.forEach(child => {
  const name = _svg.utils.capitalize(child);

  Filter[name] = class extends Effect {
    constructor(node) {
      super((0, _svg.nodeOrNew)('fe' + name, node), node);
    }

  };
});
const componentFuncs = ['funcR', 'funcG', 'funcB', 'funcA']; // Add an update function for componentTransfer-children

componentFuncs.forEach(function (c) {
  const _class = Filter[_svg.utils.capitalize(c)];

  const fn = (0, _svg.wrapWithAttrCheck)(function () {
    return this.put(new _class());
  });
  Filter.ComponentTransferEffect.prototype[c] = fn;
});
const lights = ['distantLight', 'pointLight', 'spotLight']; // Add light sources factories to lightining effects

lights.forEach(light => {
  const _class = Filter[_svg.utils.capitalize(light)];

  const fn = (0, _svg.wrapWithAttrCheck)(function () {
    return this.put(new _class());
  });
  Filter.DiffuseLightingEffect.prototype[light] = fn;
  Filter.SpecularLightingEffect.prototype[light] = fn;
});
(0, _svg.extend)(Filter.MergeEffect, {
  mergeNode(_in) {
    return this.put(new Filter.MergeNode()).attr('in', _in);
  }

}); // add .filter function

(0, _svg.extend)(_svg.Defs, {
  // Define filter
  filter: function (block) {
    var filter = this.put(new Filter());
    /* invoke passed block */

    if (typeof block === 'function') {
      block.call(filter, filter);
    }

    return filter;
  }
});
(0, _svg.extend)(_svg.Container, {
  // Define filter on defs
  filter: function (block) {
    return this.defs().filter(block);
  }
});
(0, _svg.extend)(_svg.Element, {
  // Create filter element in defs and store reference
  filterWith: function (block) {
    const filter = block instanceof Filter ? block : this.defs().filter(block);
    return this.attr('filter', filter);
  },
  // Remove filter
  unfilter: function (remove) {
    /* remove filter attribute */
    return this.attr('filter', null);
  },

  filterer() {
    return this.reference('filter');
  }

}); // chaining

var chainingEffects = {
  // Blend effect
  blend: function (in2, mode) {
    return this.parent() && this.parent().blend(this, in2, mode); // pass this as the first input
  },
  // ColorMatrix effect
  colorMatrix: function (type, values) {
    return this.parent() && this.parent().colorMatrix(type, values).in(this);
  },
  // ComponentTransfer effect
  componentTransfer: function (components) {
    return this.parent() && this.parent().componentTransfer(components).in(this);
  },
  // Composite effect
  composite: function (in2, operator) {
    return this.parent() && this.parent().composite(this, in2, operator); // pass this as the first input
  },
  // ConvolveMatrix effect
  convolveMatrix: function (matrix) {
    return this.parent() && this.parent().convolveMatrix(matrix).in(this);
  },
  // DiffuseLighting effect
  diffuseLighting: function (surfaceScale, lightingColor, diffuseConstant, kernelUnitLength) {
    return this.parent() && this.parent().diffuseLighting(surfaceScale, diffuseConstant, kernelUnitLength).in(this);
  },
  // DisplacementMap effect
  displacementMap: function (in2, scale, xChannelSelector, yChannelSelector) {
    return this.parent() && this.parent().displacementMap(this, in2, scale, xChannelSelector, yChannelSelector); // pass this as the first input
  },
  // DisplacementMap effect
  dropShadow: function (x, y, stdDeviation) {
    return this.parent() && this.parent().dropShadow(this, x, y, stdDeviation).in(this); // pass this as the first input
  },
  // Flood effect
  flood: function (color, opacity) {
    return this.parent() && this.parent().flood(color, opacity); // this effect dont have inputs
  },
  // Gaussian Blur effect
  gaussianBlur: function (x, y) {
    return this.parent() && this.parent().gaussianBlur(x, y).in(this);
  },
  // Image effect
  image: function (src) {
    return this.parent() && this.parent().image(src); // this effect dont have inputs
  },
  // Merge effect
  merge: function (arg) {
    arg = arg instanceof Array ? arg : [...arg];
    return this.parent() && this.parent().merge(this, ...arg); // pass this as the first argument
  },
  // Morphology effect
  morphology: function (operator, radius) {
    return this.parent() && this.parent().morphology(operator, radius).in(this);
  },
  // Offset effect
  offset: function (dx, dy) {
    return this.parent() && this.parent().offset(dx, dy).in(this);
  },
  // SpecularLighting effect
  specularLighting: function (surfaceScale, lightingColor, diffuseConstant, specularExponent, kernelUnitLength) {
    return this.parent() && this.parent().specularLighting(surfaceScale, diffuseConstant, specularExponent, kernelUnitLength).in(this);
  },
  // Tile effect
  tile: function () {
    return this.parent() && this.parent().tile().in(this);
  },
  // Turbulence effect
  turbulence: function (baseFrequency, numOctaves, seed, stitchTiles, type) {
    return this.parent() && this.parent().turbulence(baseFrequency, numOctaves, seed, stitchTiles, type).in(this);
  }
};
(0, _svg.extend)(Effect, chainingEffects); // Effect-specific extensions

(0, _svg.extend)(Filter.MergeEffect, {
  in: function (effect) {
    if (effect instanceof Filter.MergeNode) {
      this.add(effect, 0);
    } else {
      this.add(new Filter.MergeNode().in(effect), 0);
    }

    return this;
  }
});
(0, _svg.extend)([Filter.CompositeEffect, Filter.BlendEffect, Filter.DisplacementMapEffect], {
  in2: function (effect) {
    if (effect == null) {
      const in2 = this.attr('in2');
      const ref = this.parent() && this.parent().find(`[result="${in2}"]`)[0];
      return ref || in2;
    }

    return this.attr('in2', effect);
  }
}); // Presets

Filter.filter = {
  sepiatone: [0.343, 0.669, 0.119, 0, 0, 0.249, 0.626, 0.130, 0, 0, 0.172, 0.334, 0.111, 0, 0, 0.000, 0.000, 0.000, 1, 0]
};
},{"@svgdotjs/svg.js":"node_modules/@svgdotjs/svg.js/dist/svg.esm.js"}],"assets/js/app.js":[function(require,module,exports) {
"use strict";

var _moment = _interopRequireDefault(require("moment"));

var _svg = require("@svgdotjs/svg.js");

var _svgFilter = _interopRequireDefault(require("@svgdotjs/svg.filter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This object holds all the data for each plant type
const plantData = [{
  plant_name: 'Artichokes, globe',
  plant_id: '0000',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Artichokes, Jerusalem',
  plant_id: '0001',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Arugula',
  plant_id: '0002',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Asparagus',
  plant_id: '0003',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Basil',
  plant_id: '0004',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Lima Beans, bush',
  plant_id: '0005',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Lima Beans, pole',
  plant_id: '0006',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Snap Beans, bush',
  plant_id: '0007',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Snap Beans, pole',
  plant_id: '0008',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Beets',
  plant_id: '0009',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Broccoli',
  plant_id: '0010',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Brussels sprouts',
  plant_id: '0011',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Cabbage',
  plant_id: '0012',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Cabbage, Chinese',
  plant_id: '0013',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Carrots',
  plant_id: '0014',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Cauliflower',
  plant_id: '0015',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Celery',
  plant_id: '0016',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Chard, Swiss',
  plant_id: '0017',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Cilantro',
  plant_id: '0018',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Collard greens',
  plant_id: '0019',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Corn, sweet',
  plant_id: '0020',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Cucumbers',
  plant_id: '0021',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Dill',
  plant_id: '0022',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Eggplant',
  plant_id: '0023',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Fennel, Florence',
  plant_id: '0024',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Garlic',
  plant_id: '0025',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Kale',
  plant_id: '0026',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Kohlrabi',
  plant_id: '0027',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Leek',
  plant_id: '0028',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Lettuce, head',
  plant_id: '0029',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Lettuce, leaf',
  plant_id: '0030',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Cantaloupe',
  plant_id: '0031',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Watermelon',
  plant_id: '0032',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Mustard',
  plant_id: '0033',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Okra',
  plant_id: '0034',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Onions, bulb',
  plant_id: '0035',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Onions, green',
  plant_id: '0036',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Pac choi',
  plant_id: '0037',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Parsley',
  plant_id: '0038',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Parsnips',
  plant_id: '0039',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Peanuts',
  plant_id: '0040',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Peanuts',
  plant_id: '0040',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Peas, bush',
  plant_id: '0041',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Peas, vining',
  plant_id: '0042',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Peas, field',
  plant_id: '0043',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Peppers',
  plant_id: '0044',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Potatoes, Irish',
  plant_id: '0045',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Sweetpotatoes',
  plant_id: '0046',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Pumpkin',
  plant_id: '0047',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Radishes',
  plant_id: '0048',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Rutabega',
  plant_id: '0049',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Spinach',
  plant_id: '0050',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Squash, summer',
  plant_id: '0051',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Squash, winter',
  plant_id: '0052',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Sunflower',
  plant_id: '0053',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}, {
  plant_name: 'Tomatoes',
  plant_id: '0054',
  calender_times: [{
    start: 0,
    end: 0,
    plant_varient: ''
  }],
  harvest_times: [{
    days: 0,
    to_bloom: 0,
    to_end: 0,
    plant_varient: ''
  }]
}]; // This array is created for search results
// Will also need to add filtering to allow for plants that can be grown in the current hardiness zone

const plantSearchArray = [];

for (var i = 0; i < plantData.length; i++) {
  plantSearchArray.push(plantData[i].plant_name);
} // This array contains all the label colors for any of the cell labling systems


const labelColors = ["#5FAD41", "#28AFB0", "#FF7D00", "#F0A202", "#FC6DAB", "#E94F37", "#CA7DF9", "#8261FA", "#398CD0", "#F45B69", "#FFDA22", "#004F2D", "#052FC7", "#25F88F", "#604488", "#982649", "#A0DDFF", "#FF6F59", "#B80000", "#145C9E", "#0A100D", "#B30089", "#F896D8", "#724CF9"]; // This is the save file format

class SaveFile {
  constructor(save_object, location_object, current_step_object, beds_array) {
    this.save_data = save_object;
    this.location = location_object;
    this.current_step = current_step_object;
    this.beds = beds_array;
  }

} // This function generates a new bed


function bedAddition() {
  // Change the style of the forward button
  document.querySelector('.button-forward').setAttribute('class', 'button-primary button-forward'); // Determine what the bed id will be
  // Get the total number of beds

  let totalBeds = document.querySelectorAll('.content-bed-item').length; // If adding another bed would put you over the 26 bed limit, notify the user no more beds can be made

  if (totalBeds > 25) {
    // Grey out the add bed button
    document.querySelector('.content-bed-add').setAttribute('style', 'color: #596475; opacity: .38; pointer-events: none; cursor: not-allowed;');
    document.querySelector('.add-icon').setAttribute('class', 'add-icon-null'); // Create a new ID for the warning

    let warnID = new Date().getTime(); // Add the warning crumb

    document.querySelector('.viewport-ui').insertAdjacentHTML('beforeend', '<div class="warn-viewport warn-crumb warn-primary" id="warn-' + warnID + '">You can’t create any more beds.</div>'); // Animate the warning crumb

    gsap.timeline().from('#warn-' + warnID, {
      duration: .25,
      ease: 'linear',
      opacity: 0
    }).from('#warn-' + warnID, {
      duration: .5,
      ease: 'power3.out',
      y: '75%'
    }, '-=.25').to('#warn-' + warnID, {
      duration: .5,
      ease: 'linear',
      opacity: 0
    }, '+=1').call(removeByAttr, ['#', 'warn-' + warnID], '+=.5');
  } else {
    // Ungrey the add bed button
    document.querySelector('.content-bed-add').removeAttribute("style");

    if (document.querySelector('.add-icon-null') !== null) {
      document.querySelector('.add-icon-null').setAttribute('class', 'add-icon');
    } // Another bed can be added


    if (totalBeds == 0) {
      // No beds exist, create the first one
      addBed('a', totalBeds);
    } else {
      // This function gives the next character from an input character
      function nextChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
      } // Dictate the new bed id based on the id of the most recent bed id


      let previousBedID = document.querySelectorAll('.content-bed-item')[document.querySelectorAll('.content-bed-item').length - 1].getAttribute('data-bed-id').split('_')[1]; // Create the new bed

      addBed(nextChar(previousBedID), totalBeds);
    } // Update the bounds of the viewport to show all beds


    updateViewBounds();
  } // This function creates a new bed


  function addBed(bedID, bedCount) {
    let cellSize = 100; // Add the DOM elements
    // Add the bed parent

    document.querySelector('.content-bed-add').insertAdjacentHTML('beforebegin', '<div class="content-bed-item" data-bed-id="bed_' + bedID + '"><div class="container"></div></div>');
    let bedLabel = '<div class="bed-label"><div class="subtract-icon"></div><input type="text" class="input-text-nofill" value="Bed ' + bedID.toUpperCase() + '" id="bed_' + bedID + '_name"></input></div>';
    let bedWidthSlider = '<div class="bed-slider"><div class="container"><input type="range" min="1" max="12" value="2" step="1" class="width-range" id="bed_' + bedID + '_width" data-label="Width" list="bed_' + bedID + '_width-tick-list"><datalist id="bed_' + bedID + '_width-tick-list"></datalist></div><div class="slider-value" id="bed_' + bedID + '_width-value">2</div></div>';
    let bedHeightSlider = '<div class="bed-slider"><div class="container"><input type="range" min="1" max="12" value="2" step="1" class="height-range" id="bed_' + bedID + '_height" data-label="Height" list="bed_' + bedID + '_height-tick-list"><datalist id="bed_' + bedID + '_height-tick-list"></datalist></div><div class="slider-value" id="bed_' + bedID + '_height-value">2</div></div>'; // Add the 3 main elements to the bed item

    document.querySelector('div[data-bed-id="bed_' + bedID + '"] > .container').insertAdjacentHTML('beforeend', bedLabel);
    document.querySelector('div[data-bed-id="bed_' + bedID + '"] > .container').insertAdjacentHTML('beforeend', bedWidthSlider);
    document.querySelector('div[data-bed-id="bed_' + bedID + '"] > .container').insertAdjacentHTML('beforeend', bedHeightSlider); // Add the ticks to each range slider

    document.querySelectorAll('div[data-bed-id="bed_' + bedID + '"]  > .container datalist').forEach(function (e) {
      // Add 12 ticks (1 for every value in the slider)
      for (var i = 0; i < 12; i++) {
        document.querySelector('#' + e.id).insertAdjacentHTML('beforeend', '<option></option>');
      }
    }); // Functionality
    // Add event listener to the minus button to allow for bed removal

    document.querySelector('div[data-bed-id="bed_' + bedID + '"] .subtract-icon').addEventListener('click', function (e) {
      // Delete the DOM element
      document.querySelector('div[data-bed-id="bed_' + bedID + '"]').remove(); // If there are no more beds, grey out the forward button

      if (document.querySelectorAll('.panel-content > div').length == 1) {
        // Change the style of the forward button
        document.querySelector('.button-forward').setAttribute('class', 'button-no-select button-forward');
      } // Delete the SVG elements


      let filterID = (0, _svg.SVG)('#bed_' + bedID + '_shadow').attr('filter').split(')')[0].substr(4, (0, _svg.SVG)('#bed_' + bedID + '_shadow').attr('filter').length);
      let missingCol = (0, _svg.SVG)('#bed_' + bedID).attr('data-col'); // Add the col value to the parent row in the missing data tag

      let currentMissing = (0, _svg.SVG)('#row-' + (0, _svg.SVG)('#bed_' + bedID).attr('data-row')).attr('data-missing');

      if (currentMissing == null || currentMissing == 'undefined') {
        (0, _svg.SVG)('#row-' + (0, _svg.SVG)('#bed_' + bedID).attr('data-row')).attr('data-missing', missingCol);
      } else {
        // Add the new element to the existing tag
        let existingValue = (0, _svg.SVG)('#row-' + (0, _svg.SVG)('#bed_' + bedID).attr('data-row')).attr('data-missing');
        let unsortedArray = existingValue + ',' + missingCol;
        unsortedArray = unsortedArray.split(',');
        let sortedArray = unsortedArray.sort();
        (0, _svg.SVG)('#row-' + (0, _svg.SVG)('#bed_' + bedID).attr('data-row')).attr('data-missing', sortedArray.join(','));
      }

      (0, _svg.SVG)(filterID).remove();
      (0, _svg.SVG)('#bed_' + bedID).remove(); // Check to update the viewport

      updateViewBounds(); // Ungrey the add bed button

      document.querySelector('.content-bed-add').removeAttribute("style");

      if (document.querySelector('.add-icon-null') !== null) {
        document.querySelector('.add-icon-null').setAttribute('class', 'add-icon');
      }
    }, true); // Add event listener to the label name to set the default name if the label has no value after user leaves input

    document.querySelector('#bed_' + bedID + '_name').addEventListener('change', function (e) {
      // If the value of the label is nothing or only spaces replace the label with the default name
      if (this.value == '' || !this.value.replace(/\s/g, '').length) {
        this.value = this.id.split('_').splice(0, 2).join(' ').replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
        manageBed(bedID);
      }
    }, true); // Add event listeners to each range to update the slider value display on input

    document.querySelectorAll('div[data-bed-id="bed_' + bedID + '"] input[type="range"]').forEach(function (e) {
      e.addEventListener('input', function (r) {
        document.querySelector('#' + this.id + '-value').innerHTML = this.value;
        manageBed(bedID); // Check to update the viewport

        updateViewBounds();
      }, true);
    }); // Add event listener to the label name to update bed label name

    document.querySelector('#bed_' + bedID + '_name').addEventListener('input', function (e) {
      manageBed(bedID);
    }, true); // Calculate what row and column the bed will reside in
    // Check to make sure the number of total beds is the same as the amount of beds that exist

    let bedRow = 0;
    let bedCol = 0;
    let missingBeds = document.querySelectorAll('g[data-missing]').length;

    if (missingBeds == 0) {
      bedRow = Math.floor(bedCount / 5);
      bedCol = bedCount % 5;
    } else {
      bedRow = parseInt(document.querySelectorAll('g[data-missing]')[0].getAttribute('id').split('-')[1]);

      if (document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing').length !== 1) {
        parseInt(bedCol = document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing'));
      } else {
        bedCol = parseInt(document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing').split(',')[0]);
      } // Remove the item from the missing tag


      if (document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing').split(',').length == 1) {
        document.querySelectorAll('g[data-missing]')[0].removeAttribute('data-missing');
      } else {
        document.querySelectorAll('g[data-missing]')[0].setAttribute('data-missing', document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing').substr(2, document.querySelectorAll('g[data-missing]')[0].getAttribute('data-missing').length));
      }
    } // Add the row group if it does not already exist


    if (document.querySelector('#row-' + bedRow) == null) {
      draw.group().attr({
        id: 'row-' + bedRow
      }).putIn((0, _svg.SVG)('#bed-group'));
    } // Add a group for the current bed into the correct row


    let bedItem = draw.group().attr({
      id: 'bed_' + bedID,
      'data-name': document.querySelector('#bed_' + bedID + '_name').value,
      'data-row': bedRow,
      'data-col': bedCol
    }).putIn((0, _svg.SVG)('#row-' + bedRow));
    let xPlace = 0;
    let yPlace = 0; // Determine the current x/y placement for the new bed

    if (bedCount !== 0 && bedCol !== 0) {
      // The bed is in an existing row
      xPlace = (0, _svg.SVG)('#row-' + bedRow + ' g[data-col="' + (bedCol - 1) + '"] rect').bbox().x2 + cellSize;
      yPlace = (0, _svg.SVG)('g[data-row="' + bedRow + '"] rect').bbox().y;
    } else if (bedCol == 0 && bedRow !== 0) {
      // The bed is in a new row, thus xPlace = 0
      // Iterate through the previous row of beds to get the max y value
      let maxY = 0;
      document.querySelectorAll('#row-' + (bedRow - 1) + ' g').forEach(function (e) {
        let cID = e.id;
        let thisMaxY = (0, _svg.SVG)('#' + cID + '_base').bbox().y2;

        if (thisMaxY > maxY) {
          maxY = thisMaxY;
        }
      });
      yPlace = maxY + cellSize;
    } // Add the bed rect, label, and shadow to the bed group


    let bed = draw.rect(2 * 100, 2 * 100).attr({
      x: xPlace,
      y: yPlace,
      fill: '#dddee0',
      id: 'bed_' + bedID + '_base'
    }).stroke({
      width: 6,
      color: '#ffffff'
    }).putIn((0, _svg.SVG)('#bed_' + bedID));
    let label = draw.plain(document.querySelector('#bed_' + bedID + '_name').value).font({
      family: 'Surt Exp',
      size: '1.75em',
      anchor: 'middle'
    }).attr({
      fill: '#ffffff',
      x: (0, _svg.SVG)('#bed_' + bedID).bbox().cx,
      y: (0, _svg.SVG)('#bed_' + bedID).bbox().cy,
      id: 'bed_' + bedID + '_label',
      style: 'transform: translate(0px, .4375em);'
    }).putIn((0, _svg.SVG)('#bed_' + bedID));
    let bedBBox = (0, _svg.SVG)('#bed_' + bedID + '_base').bbox(); // Draw the shadow

    let shadowPoints = [bedBBox.x + ',' + bedBBox.y, bedBBox.x + cellSize / 2 + ',' + (bedBBox.y - cellSize / 2), bedBBox.x2 + cellSize / 2 + ',' + (bedBBox.y - cellSize / 2), bedBBox.x2 + cellSize / 2 + ',' + (bedBBox.y2 - cellSize / 2), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs

    let shadow = draw.polygon(shadowPoints.join(' ')).fill('#596475').attr({
      id: 'bed_' + bedID + '_shadow',
      opacity: .2
    }); // Blur the shadow

    shadow.filterWith(function (add) {
      add.gaussianBlur(5);
    }); // Place the bed shadow in bed group, at back

    shadow.putIn((0, _svg.SVG)('#bed_' + bedID));
    shadow.back();
  } // This function manages the bed's height, width, and label


  function manageBed(bedID) {
    let cellSize = 100; // Label Check

    let inputText = document.querySelector('#bed_' + bedID + '_name').value;
    let labelText = document.querySelector('#bed_' + bedID + '_label').textContent; // Test if the label needs an update

    if (inputText !== labelText) {
      (0, _svg.SVG)('#bed_' + bedID).attr({
        'data-name': inputText
      });
      document.querySelector('#bed_' + bedID + '_label').textContent = inputText;
    } // Width Check


    let inputWidth = document.querySelector('#bed_' + bedID + '_width').value * cellSize;
    let bedWidth = (0, _svg.SVG)('#bed_' + bedID + '_base').bbox().width;

    if (inputWidth !== bedWidth) {
      let widthChange = inputWidth - bedWidth; // Update Width

      (0, _svg.SVG)('#bed_' + bedID + '_base').width(inputWidth);
      let bedBBox = (0, _svg.SVG)('#bed_' + bedID + '_base').bbox(); // Update Text Position

      (0, _svg.SVG)('#bed_' + bedID + '_label').attr({
        x: bedBBox.cx,
        y: bedBBox.cy
      }); // Create new Shadow Points

      let shadowPoints = [bedBBox.x + ',' + bedBBox.y, bedBBox.x + cellSize / 2 + ',' + (bedBBox.y - cellSize / 2), bedBBox.x2 + cellSize / 2 + ',' + (bedBBox.y - cellSize / 2), bedBBox.x2 + cellSize / 2 + ',' + (bedBBox.y2 - cellSize / 2), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs
      // Update the shadow

      (0, _svg.SVG)('#bed_' + bedID + '_shadow').attr({
        points: shadowPoints.join(' ')
      }); // Update the other beds to the right

      updatePositionRight(widthChange, parseInt((0, _svg.SVG)('#bed_' + bedID).attr('data-row')), parseInt((0, _svg.SVG)('#bed_' + bedID).attr('data-col')));
    } // Height Check


    let inputHeight = document.querySelector('#bed_' + bedID + '_height').value * cellSize;
    let bedHeight = (0, _svg.SVG)('#bed_' + bedID + '_base').bbox().height;

    if (inputHeight !== bedHeight) {
      // Update Height
      (0, _svg.SVG)('#bed_' + bedID + '_base').height(inputHeight);
      let bedBBox = (0, _svg.SVG)('#bed_' + bedID + '_base').bbox(); // Update Text Position

      (0, _svg.SVG)('#bed_' + bedID + '_label').attr({
        x: bedBBox.cx,
        y: bedBBox.cy
      }); // Create new Shadow Points

      let shadowPoints = [bedBBox.x + ',' + bedBBox.y, bedBBox.x + cellSize / 2 + ',' + (bedBBox.y - cellSize / 2), bedBBox.x2 + cellSize / 2 + ',' + (bedBBox.y - cellSize / 2), bedBBox.x2 + cellSize / 2 + ',' + (bedBBox.y2 - cellSize / 2), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs
      // Update the shadow

      (0, _svg.SVG)('#bed_' + bedID + '_shadow').attr({
        points: shadowPoints.join(' ')
      }); // Update the other beds below
      // Find the largest height in the current row

      let currentRow = parseInt((0, _svg.SVG)('#bed_' + bedID).attr('data-row'));
      let maxY = 0;
      document.querySelectorAll('#row-' + currentRow + ' g').forEach(function (e) {
        if ((0, _svg.SVG)('#' + e.id).bbox().y2 > maxY) {
          maxY = (0, _svg.SVG)('#' + e.id).bbox().y2;
        }
      });
      updatePositionBelow(maxY, parseInt((0, _svg.SVG)('#bed_' + bedID).attr('data-row')));
    } // This function updates the position of everything to the right of a bed in a row


    function updatePositionRight(xChange, rowIn, colOn) {
      let cellSize = 100; // Only make further changes if the column is below 4, as this column is the last in any row

      if (colOn < 4) {
        // Iterate over every bed in the row
        document.querySelectorAll('g[data-row="' + rowIn + '"]').forEach(function (e) {
          // Only effect items in columns after the passed column
          if (parseInt(e.getAttribute('data-col')) > colOn) {
            // Move the matched elements
            (0, _svg.SVG)('#' + e.id + '_base').dx(xChange);
            (0, _svg.SVG)('#' + e.id + '_label').dx(xChange);
            let bedBBox = (0, _svg.SVG)('#' + e.id + '_base').bbox(); // Update the shadow

            let shadowPoints = [bedBBox.x + ',' + bedBBox.y, bedBBox.x + cellSize / 2 + ',' + (bedBBox.y - cellSize / 2), bedBBox.x2 + cellSize / 2 + ',' + (bedBBox.y - cellSize / 2), bedBBox.x2 + cellSize / 2 + ',' + (bedBBox.y2 - cellSize / 2), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs

            (0, _svg.SVG)('#' + e.id + '_shadow').attr({
              points: shadowPoints.join(' ')
            });
          }
        });
      }
    } // This function updates the position of everything below the bed in a row


    function updatePositionBelow(yMax, rowIn) {
      let cellSize = 100;

      if (rowIn < 5 && (0, _svg.SVG)('#row-' + (rowIn + 1)) !== null) {
        // Determine the y-offset given the max y of the previous row
        let nextRowMinY = 0;
        document.querySelectorAll('#row-' + (rowIn + 1) + ' g').forEach(function (e) {
          if ((0, _svg.SVG)('#' + e.id + '_base').bbox().y > nextRowMinY) {
            nextRowMinY = (0, _svg.SVG)('#' + e.id + '_base').bbox().y;
          }
        });
        let changeHeight = yMax + cellSize - nextRowMinY; // Iterate over every bed in the row

        document.querySelectorAll('#bed-group > g').forEach(function (e) {
          if (parseInt(e.id.split('-')[1]) > rowIn) {
            // Move the matched elements
            document.querySelectorAll('#' + e.id + ' g').forEach(function (a) {
              (0, _svg.SVG)('#' + a.id + '_base').dy(changeHeight);
              (0, _svg.SVG)('#' + a.id + '_label').dy(changeHeight);
              let bedBBox = (0, _svg.SVG)('#' + a.id + '_base').bbox(); // Update the shadow

              let shadowPoints = [bedBBox.x + ',' + bedBBox.y, bedBBox.x + cellSize / 2 + ',' + (bedBBox.y - cellSize / 2), bedBBox.x2 + cellSize / 2 + ',' + (bedBBox.y - cellSize / 2), bedBBox.x2 + cellSize / 2 + ',' + (bedBBox.y2 - cellSize / 2), bedBBox.x2 + ',' + bedBBox.y2, bedBBox.x + ',' + bedBBox.y2]; // Sets of x,y pairs

              (0, _svg.SVG)('#' + a.id + '_shadow').attr({
                points: shadowPoints.join(' ')
              });
            });
          }
        });
      }
    }
  } // This function animates to a new viewport bounds to show all beds


  function updateViewBounds() {
    // Create a bounds object to store the min/max values
    let bounds = {
      min: {
        x: 0,
        y: 0
      },
      max: {
        x: 0,
        y: 0
      }
    };
    document.querySelectorAll('#bed-group g g').forEach(function (e, i) {
      // Text the lower and upper bounds for the object and store them in the bounds array if they are larger than the current values
      let bbox = (0, _svg.SVG)('#' + e.id + ' rect').bbox(); // If the element is the first in the iteration, set the bounds min/max values to its values

      if (i == 0) {
        bounds.min.x = bbox.x;
        bounds.min.y = bbox.y;
        bounds.max.x = bbox.x2;
        bounds.max.y = bbox.y2;
      }

      if (bbox.x < bounds.min.x) {
        bounds.min.x = bbox.x;
      }

      if (bbox.y < bounds.min.y) {
        bounds.min.y = bbox.y;
      }

      if (bbox.x2 > bounds.max.x) {
        bounds.max.x = bbox.x2;
      }

      if (bbox.y2 > bounds.max.y) {
        bounds.max.y = bbox.y2;
      }
    }); // Add a 2 cell margin around the entire view bounds

    bounds.min.x = bounds.min.x - 100;
    bounds.min.y = bounds.min.y - 100;
    bounds.max.x = bounds.max.x + 100 * 2;
    bounds.max.y = bounds.max.y + 100 * 2; // Animate the viewport to the new viewbox

    draw.animate(375, 0, 'now').ease('<>').viewbox(bounds.min.x, bounds.min.y, bounds.max.x, bounds.max.y).attr({
      opacity: 1
    }); // Update the grid size

    document.querySelectorAll('line[data-type="grid-line"]').forEach(function (e) {
      e.remove();
    });
    updateGrid(draw, 100, bounds); // This function renders the viewport grid

    function updateGrid(svgObject, cellSize, boundsObj) {
      // Determine the max size of the grid by adding 2 cell margins to the passed bounds
      boundsObj.min.x = boundsObj.min.x - cellSize * 2;
      boundsObj.min.y = boundsObj.min.y - cellSize * 2;
      boundsObj.max.x = boundsObj.max.x + cellSize * 2;
      boundsObj.max.y = boundsObj.max.y + cellSize * 2;
      var grid = (0, _svg.SVG)('#grid-floor');
      let lowBedBounds = {
        x: (0, _svg.SVG)('#bed_a_base').bbox().x,
        y: (0, _svg.SVG)('#bed_a_base').bbox().y
      };
      let highBedBounds = {
        x: (0, _svg.SVG)('#bed_a_base').bbox().x2,
        y: (0, _svg.SVG)('#bed_a_base').bbox().y2
      }; // Iterate over all the beds to find the furthest to the left bed

      document.querySelectorAll('#bed-group g').forEach(function (e) {
        if (e.getBBox().x < lowBedBounds.x) {
          lowBedBounds = {
            x: e.getBBox().x,
            y: e.getBBox().y
          };
        }

        if (e.getBBox().x + e.getBBox().width > highBedBounds.x) {
          highBedBounds = {
            x: e.getBBox().x + e.getBBox().width,
            y: e.getBBox().y + e.getBBox().height
          };
        }
      }); // Iterate over the width, placing lines vertically

      for (var i = 0; i < (highBedBounds.x - lowBedBounds.x) / cellSize + 12; i++) {
        let line = svgObject.line(lowBedBounds.x + (i - 6) * cellSize, lowBedBounds.y - cellSize * 20, lowBedBounds.x + (i - 6) * cellSize, lowBedBounds.y + (highBedBounds.x - lowBedBounds.x) + cellSize * 20).stroke({
          width: 1,
          color: '#d8dadd',
          opacity: 1
        }).attr({
          'data-type': 'grid-line'
        });
        grid.add(line);
      } // Iterate over the height, placing lines horizontally


      for (var i = 0; i < (highBedBounds.x - lowBedBounds.x) / cellSize + 60; i++) {
        let line = svgObject.line(lowBedBounds.x - cellSize * 20, lowBedBounds.y + (i - 40) * cellSize, lowBedBounds.x + (highBedBounds.x - lowBedBounds.x) + cellSize * 20, lowBedBounds.y + (i - 40) * cellSize).stroke({
          width: 1,
          color: '#d8dadd',
          opacity: 1
        }).attr({
          'data-type': 'grid-line'
        });
        grid.add(line);
      }

      grid.after(bedGroup);
    }
  }
} // TEMP CODE
// Add event listener to Add Bed button when clicked


document.querySelector('.content-bed-add').addEventListener('click', function () {
  bedAddition();
}, true); // TEMP CODE
// When clicking the forward button move to the next step

document.querySelector('.button-forward').addEventListener('click', function () {
  // Test that the button is active
  if (this.classList.contains('button-no-select') !== true) {
    transitionStep(document.querySelector('body').getAttribute('data-step'), this.getAttribute('data-next-step'));
  }
}, true); // This function removes a warning crumb based on the passed ID

function removeByAttr(attr, value) {
  document.querySelector(attr + value).remove();
} // This function transitions from one state to another


function transitionStep(stepFrom, stepTo) {
  switch (true) {
    case stepFrom == 'bed-layout' && stepTo == 'plant-selection':
      // From bed layout to plant selection
      // Set the body step to plant selection
      document.querySelector('body').setAttribute('data-step', 'plant-selection');
      gsap.timeline().to('.side-panel > .container > h1', {
        duration: .375,
        delay: .125,
        ease: "power2.inOut",
        y: '105%',
        opacity: 0
      }).to('.content-bed-item > .container', {
        duration: .4,
        ease: "power1.inOut",
        y: '110%',
        opacity: 0,
        stagger: {
          each: 0.075,
          from: "start",
          grid: "auto",
          ease: "power3.in"
        }
      }, "-=.25").call(zoomViewboxOut, [500, 0, 'now', '<>']).to('.content-bed-add *', {
        duration: .375,
        ease: "power1.inOut",
        y: '250%',
        opacity: 0
      }, "-=.3").call(textChange, ['.side-panel > .container > h1', 'Choose Plants']).call(removeElement, ['.panel-content > div']).to('.side-panel > .container > h1', {
        duration: .375,
        delay: .125,
        ease: "power2.inOut",
        y: '0%',
        opacity: 1
      }).call(generateCells).call(cellTransition).call(populatePanel, [stepTo]);
      break;

    default: // code block

  }
} // Create a viewport svg right off the bat


var draw = (0, _svg.SVG)().addTo('.viewport').size('100%', '100%').attr({
  id: 'viewport-svg',
  opacity: 1
}).viewbox('0 150 850 500');
var bedGroup = draw.group().attr({
  id: 'bed-group'
});
var gridGroup = draw.group().attr({
  id: 'grid-floor'
}); // This function generates a set of swap arrows between two points

function generateSwapArrows(p1, p2) {
  let cellSize = 100; // If swap arrows exist, remove them

  if ((0, _svg.SVG)('#swap_arrows') !== null) {
    (0, _svg.SVG)('#swap_arrows').remove();
  } // Calculate distance between the two points


  let dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)); // Draw two 'lines' (rect) from p1 to p2, shortened by half the cell size, offset to the right by 1/4th the cell size, also offset it down/up by 3.5, also offset it left/right by 4px

  let lineThickness = 3;
  let topPoints = [p1.x + cellSize / 4 + ',' + (p1.y - (3.5 + lineThickness / 2)), p1.x + (dist - (cellSize / 4 + 4)) + ',' + (p1.y - (3.5 + lineThickness / 2)), p1.x + (dist - (cellSize / 4 + 4)) + ',' + (p1.y - (3.5 - lineThickness / 2)), p1.x + cellSize / 4 + ',' + (p1.y - (3.5 - lineThickness / 2))];
  let lineTop = draw.polygon(topPoints.join(' ')).attr({
    id: 'top_line'
  });
  let lineTopStroke = draw.polygon(topPoints.join(' ')).attr({
    id: 'top_line_stroke'
  });
  let bottomPoints = [p1.x + (cellSize / 4 + 4) + ',' + (p1.y + (3.5 + lineThickness / 2)), p1.x + (dist - cellSize / 4) + ',' + (p1.y + (3.5 + lineThickness / 2)), p1.x + (dist - cellSize / 4) + ',' + (p1.y + (3.5 - lineThickness / 2)), p1.x + (cellSize / 4 + 4) + ',' + (p1.y + (3.5 - lineThickness / 2))];
  let lineBottom = draw.polygon(bottomPoints.join(' ')).attr({
    id: 'bottom_line'
  });
  let lineBottomStroke = draw.polygon(bottomPoints.join(' ')).attr({
    id: 'bottom_line_stroke'
  }); // Draw two arrowheads and position them at the ends of the lines

  let arrowheadTopPoints = [p1.x + (dist - cellSize / 4 - 8) + ',' + (p1.y - (3.5 + 4.5)), p1.x + (dist - cellSize / 4) + 1 + ',' + (p1.y - 3.5), p1.x + (dist - cellSize / 4 - 8) + ',' + (p1.y - (3.5 - 4.5))];
  let arrowheadTop = draw.polygon(arrowheadTopPoints.join(' ')).attr({
    id: 'top_arrow'
  });
  let arrowheadTopStroke = draw.polygon(arrowheadTopPoints.join(' ')).attr({
    id: 'top_arrow_stroke'
  });
  let arrowheadBottomPoints = [p1.x + (cellSize / 4 + 8) + ',' + (p1.y + (3.5 + 4.5)), p1.x + (cellSize / 4 - 1) + ',' + (p1.y + 3.5), p1.x + (cellSize / 4 + 8) + ',' + (p1.y + (3.5 - 4.5))];
  let arrowheadBottom = draw.polygon(arrowheadBottomPoints.join(' ')).attr({
    id: 'bottom_arrow'
  });
  let arrowheadBottomStroke = draw.polygon(arrowheadBottomPoints.join(' ')).attr({
    id: 'bottom_arrow_stroke'
  }); // Group the objects

  let swapGroup = draw.group().attr({
    id: 'swap_arrows',
    opacity: 0
  });
  let swapGroupStroke = draw.group().attr({
    id: 'swap_stroke'
  });
  let swapGroupFill = draw.group().attr({
    id: 'swap_fill'
  }); // Stroke

  lineTopStroke.putIn(swapGroupStroke);
  lineBottomStroke.putIn(swapGroupStroke);
  arrowheadTopStroke.putIn(swapGroupStroke);
  arrowheadBottomStroke.putIn(swapGroupStroke); // Fill

  lineTop.putIn(swapGroupFill);
  lineBottom.putIn(swapGroupFill);
  arrowheadTop.putIn(swapGroupFill);
  arrowheadBottom.putIn(swapGroupFill); // Group

  swapGroupStroke.putIn(swapGroup);
  swapGroupFill.putIn(swapGroup); // Style

  swapGroupFill.fill("#2D936C");
  swapGroupStroke.stroke({
    width: 6,
    color: '#ffffff',
    linejoin: 'round'
  }); // Calculate rotation

  let rot = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
  swapGroup.rotate(rot, p1.x, p1.y); // Animate in

  swapGroup.animate(200, '<>', 0).attr({
    opacity: 1
  });
} // This function generates a set of swap arrows between two points


function generateRemoveX(p1) {
  let cellSize = 100; // If remove x exists, remove it

  if ((0, _svg.SVG)('#x_icon') !== null) {
    (0, _svg.SVG)('#x_icon').remove();
  } // Draw a polgon x


  let lineThickness = 3;
  let lineLength = 14;
  let xValues = {
    xMin: p1.x - lineLength,
    xInMin: p1.x - lineThickness / 2,
    xInMax: p1.x + lineThickness / 2,
    xMax: p1.x + lineLength
  };
  let yValues = {
    yMin: p1.y - lineLength,
    yInMin: p1.y - lineThickness / 2,
    yInMax: p1.y + lineThickness / 2,
    yMax: p1.y + lineLength
  };
  let xPoints = [xValues.xInMax + ',' + yValues.yInMin, xValues.xMax + ',' + yValues.yInMin, xValues.xMax + ',' + yValues.yInMax, xValues.xInMax + ',' + yValues.yInMax, xValues.xInMax + ',' + yValues.yMax, xValues.xInMin + ',' + yValues.yMax, xValues.xInMin + ',' + yValues.yInMax, xValues.xMin + ',' + yValues.yInMax, xValues.xMin + ',' + yValues.yInMin, xValues.xInMin + ',' + yValues.yInMin, xValues.xInMin + ',' + yValues.yMin, xValues.xInMax + ',' + yValues.yMin];
  let xPoly = draw.polygon(xPoints.join(' ')).attr({
    id: 'x_poly_poly'
  });
  let xStroke = draw.polygon(xPoints.join(' ')).attr({
    id: 'x_stroke_poly'
  }); // Group the objects

  let xGroup = draw.group().attr({
    id: 'x_icon',
    opacity: 0
  });
  let xGroupStroke = draw.group().attr({
    id: 'x_stroke'
  });
  let xGroupFill = draw.group().attr({
    id: 'x_fill'
  }); // Stroke

  xStroke.putIn(xGroupStroke); // Fill

  xPoly.putIn(xGroupFill); // Group

  xGroupStroke.putIn(xGroup);
  xGroupFill.putIn(xGroup); // Style

  xGroupFill.fill("#DB4535");
  xGroupStroke.stroke({
    width: 6,
    color: '#ffffff',
    linejoin: 'round'
  }); // Calculate rotation

  let rot = 45;
  xGroup.rotate(rot, p1.x, p1.y); // Animate in

  xGroup.animate(200, '<>', 0).attr({
    opacity: 1
  });
} // This function changes the text of a passed element to passed text


function textChange(selector, text) {
  document.querySelector(selector).textContent = text;
} // This function removes all matched passed elements


function removeElement(selector) {
  document.querySelectorAll(selector).forEach(function (e) {
    e.remove();
  });
} // This function zooms out the viewbox on the viewport SVG given passed values


function zoomViewboxOut(duration, delay, when, ease) {
  let cellSize = 100; // Zoom out a bit

  let currentViewbox = draw.viewbox();
  draw.animate(duration, delay, when).ease(ease).viewbox(currentViewbox.x - cellSize, currentViewbox.y - cellSize, currentViewbox.width + cellSize * 2, currentViewbox.height + cellSize * 2);
} // This function creates cells and dividers for each bed


function generateCells() {
  let cellSize = 100; // Iterate over each row

  document.querySelectorAll('#bed-group > g').forEach(function (row) {
    let rowNumb = row.id.split('-')[1]; // Iterate over each bed in this row

    document.querySelectorAll('#' + row.id + ' g').forEach(function (bed) {
      // Get the height and width of the current bed
      let thisHeight = (0, _svg.SVG)('#' + bed.id + '_base').height();
      let thisWidth = (0, _svg.SVG)('#' + bed.id + '_base').width(); // Create a group for the cells and dividers to go in

      let cellGroup = draw.group().attr({
        id: bed.id + '_cells'
      });
      let dividerGroup = draw.group().attr({
        id: bed.id + '_dividers'
      });
      let contentGroup = draw.group().attr({
        id: bed.id + '_content'
      }); // Place the groups in order

      cellGroup.putIn(contentGroup);
      dividerGroup.putIn(contentGroup);
      contentGroup.putIn((0, _svg.SVG)('#' + bed.id)); // Store the bbox for the current bed

      let bedBBox = (0, _svg.SVG)('#' + bed.id + '_base').bbox(); // Iterate over the width of the bed, creating vertical dividers

      for (var i = 0; i < thisWidth / cellSize - 1; i++) {
        // Start placement at x1 + cellSize
        let vDivider = draw.line(bedBBox.x + cellSize * (i + 1), bedBBox.y, bedBBox.x + cellSize * (i + 1), bedBBox.y2).stroke({
          width: 2,
          color: '#ffffff',
          dasharray: bedBBox.y2 - bedBBox.y + ' ' + (bedBBox.y2 - bedBBox.y + 10),
          dashoffset: bedBBox.y2 - bedBBox.y + 10
        }).attr({
          class: 'vert-divider'
        }); // Place the divder in the divider group

        vDivider.putIn(dividerGroup);
      } // Iterate over the height of the bed, creating horizontal dividers


      for (var i = 0; i < thisHeight / cellSize - 1; i++) {
        // Start placement at x1 + cellSize
        let hDivider = draw.line(bedBBox.x, bedBBox.y + cellSize * (i + 1), bedBBox.x2, bedBBox.y + cellSize * (i + 1)).stroke({
          width: 2,
          color: '#ffffff',
          dasharray: bedBBox.x2 - bedBBox.x + ' ' + (bedBBox.x2 - bedBBox.x + 10),
          dashoffset: bedBBox.x2 - bedBBox.x + 10
        }).attr({
          class: 'horz-divider'
        });
        hDivider.putIn(dividerGroup);
      } // Add a border-rect to the divder group


      let border = draw.rect(bedBBox.width, bedBBox.height).cx(bedBBox.cx).cy(bedBBox.cy).attr({
        class: 'bed-border',
        fill: 'none'
      }).stroke({
        width: 6,
        color: '#ffffff'
      });
      border.putIn(dividerGroup); // Create the cells
      // Iterate over the height

      let totalCellCount = 0;

      for (var h = 0; h < thisHeight / cellSize; h++) {
        // Iterate over the width
        for (var w = 0; w < thisWidth / cellSize; w++) {
          // Create a cell at the right height and width coordinate
          let cellID = 'cell_' + bed.id.split('_')[1] + '_' + totalCellCount;
          let cell = draw.rect(cellSize, cellSize).x(bedBBox.x + w * cellSize).y(bedBBox.y + h * cellSize).attr({
            id: cellID,
            class: 'bed-cell'
          }).fill({
            color: '#596475',
            opacity: 0
          });
          cell.putIn(cellGroup);
          totalCellCount++;
        }
      } // Move the cell group behind the divider group


      cellGroup.back();
    });
  });
} // This function transitions the beds from the bed view to the cell view


function cellTransition() {
  let cellSize = 100; // Order of timeline
  // Move each bed label up and change its color and opacity
  // Draw in each horizontal divider
  // Draw in each vertical divder
  // Iterate over the beds, setting the y position of the text label to above the bed

  document.querySelectorAll('#bed-group > g > g').forEach(function (bed, i) {
    // Calculate what y position the label will be at
    let minBedY = (0, _svg.SVG)('#' + bed.id + '_base').bbox().y;
    let delay = 50 * i; // Animate the text label

    (0, _svg.SVG)('#' + bed.id + '_label').animate(500, delay, 'now').ease('<>').attr({
      fill: '#596475',
      opacity: .38,
      y: minBedY - cellSize / 2
    });
  }); // Animate the dividers

  gsap.timeline().to('#bed-group > g > g > g > g > line', {
    duration: .5,
    delay: .2,
    ease: 'power2.inOut',
    strokeDashoffset: 0,
    stagger: {
      each: .025,
      from: 'start',
      ease: 'power1.inOut'
    }
  });
} // PANEL STATE CHANGE
// This function populates the panel based on passed states


function populatePanel(state) {
  switch (true) {
    case state == 'plant-selection':
      // Add Plant Search to panel content
      document.querySelector('.panel-content').insertAdjacentHTML('afterbegin', '<div class="search-wrapper"><div class="container"><div class="plant-search"><div class="search-box"><input type="text" placeholder="Start Typing" id="search-plants"><div class="search-suggestions"></div></div><div class="add-option" id="remove-zone"></div></div><div class="plant-items" id="no_bed_plants"><div id="search-container-dropzone"></div></div></div></div>'); // Event Listeners for Search
      // This adds an event listener to the search box so that when it is in focus the search results are open

      document.querySelector("#search-plants").addEventListener("focusin", function (e) {
        gsap.to('.search-suggestions', {
          duration: .1,
          ease: 'linear',
          height: 'auto',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 16px 2px var(--secondary-color-min)',
          paddingTop: '36px'
        });
        let query = document.querySelector("#search-plants").value;
        updatePlantSearchResult(query);
      }); // And when focus is out

      document.querySelector("#search-plants").addEventListener("focusout", function (e) {
        gsap.to('.search-suggestions', {
          duration: .1,
          ease: 'linear',
          clearProps: 'all'
        }); // When there is any value in the search box and it matches an item in the search array, color the add button

        let query = document.querySelector("#search-plants").value;

        if (query.length > 0 && plantSearchArray.indexOf(query) !== -1) {
          gsap.to('.plant-search > .add-option', {
            duration: .2,
            ease: 'power2.inOut',
            backgroundColor: 'var(--primary-color)'
          });
        } else {
          gsap.to('.plant-search > .add-option', {
            duration: .2,
            ease: 'power2.inOut',
            clearProps: 'backgroundColor'
          });
        }
      }); // Add plant item to no-parent area if the add icon is active

      document.querySelector(".plant-search > .add-option").addEventListener("click", function (e) {
        // Add the option to the no-parent area
        addPlantOption(plantData[plantSearchArray.indexOf(document.querySelector("#search-plants").value)]); // Clear search

        gsap.to('.add-option', {
          duration: .2,
          ease: 'power2.inOut',
          clearProps: 'backgroundColor'
        });
        document.querySelector("#search-plants").value = '';
      }); // Add the update plant search result to the plant search box

      document.querySelector("#search-plants").addEventListener("input", function () {
        let query = document.querySelector("#search-plants").value;
        updatePlantSearchResult(query); // When there is any value in the search box and it matches an item in the search array, color the add button

        if (query.length > 0 && plantSearchArray.indexOf(query) !== -1) {
          gsap.to('.plant-search > .add-option', {
            duration: .2,
            ease: 'power2.inOut',
            backgroundColor: 'var(--primary-color)'
          });
        } else {
          gsap.to('.plant-search > .add-option', {
            duration: .2,
            ease: 'power2.inOut',
            clearProps: 'backgroundColor'
          });
        }
      }); // Add the bed wrapper

      document.querySelector('.panel-content').insertAdjacentHTML('beforeend', '<div class="bed-area"><div class="container"></div></div>'); // Iterate over each bed

      document.querySelectorAll('#bed-group > g > g').forEach(function (bed) {
        // Create a bed wrapper for the current bed in the panel content
        document.querySelector('.panel-content > .bed-area > .container').insertAdjacentHTML('beforeend', '<div class="bed-wrapper" id="' + bed.id + '_plants" data-name="' + bed.getAttribute('data-name') + '" data-bed-id="' + bed.id + '"></div>'); // Iterate over each cell in the bed

        document.querySelectorAll('#' + bed.id + '_cells > rect').forEach(function (cell) {
          // Store info about the current cell
          let cellBed = cell.id.split('_')[1];
          let cellNum = cell.id.split('_')[2]; // Insert an empty item into the bed wrapper for this cell

          document.querySelector('#' + bed.id + '_plants').insertAdjacentHTML('beforeend', '<div class="blank-item" data-cell="' + cellNum + '" id="empty_' + cellBed + '_' + cellNum + '"></div>'); // Add event listeners to the empty item for DnD functionality

          document.querySelector('#empty_' + cellBed + '_' + cellNum).addEventListener('dragenter', handleDragEnter, false);
          document.querySelector('#empty_' + cellBed + '_' + cellNum).addEventListener('dragover', allowDrop, false);
          document.querySelector('#empty_' + cellBed + '_' + cellNum).addEventListener('dragleave', handleDragLeave, false);
        });
      }); // Add the drag info div

      document.querySelector('.panel-content').insertAdjacentHTML('beforeend', '<div id="drag-info"></div>'); // Add event listeners to the remove item for DnD removal

      document.querySelector('#remove-zone').addEventListener('dragenter', handleDragEnter, false);
      document.querySelector('#remove-zone').addEventListener('dragover', allowDrop, false);
      document.querySelector('#remove-zone').addEventListener('dragleave', handleDragLeave, false); // Add event listeners to the add item for DnD addition

      document.querySelector('#search-container-dropzone').addEventListener('dragenter', handleDragEnter, false);
      document.querySelector('#search-container-dropzone').addEventListener('dragover', allowDrop, false);
      document.querySelector('#search-container-dropzone').addEventListener('dragleave', handleDragLeave, false); // Animate the content in
      // gsap.timeline()
      // .to('.plant-search > div', {duration: .375, ease: "power2.inOut", y: '0%'}, "-=.125")
      // .to('.plant-search', {duration: .05, ease: 'linear', clearProps: 'all'}, '+=.375')
      // .to('.plant-search > div', {duration: .05, ease: 'linear', clearProps: 'all'})
      // .to('.bed-wrapper', {duration: .4, ease: "power2.out", y: '0%', opacity: 1, stagger: {each: .075, from: 'start', grid: 'auto', ease: 'power1.out'}}, "-=.5")
      // .to('.bed-wrapper > div', {duration: .25, ease: "power2.out", y: '0%', opacity: 1, stagger: {each: .025, from: 'start', grid: 'auto', ease: 'linear'}}, "-=.5")
      // .to('.bed-wrapper', {duration: .05, ease: 'linear', clearProps: 'all', stagger: {each: .075, from: 'start', grid: 'auto', ease: 'power1.out'}}, "+=.45")

      break;

    default: // ADD DEFAULT HOME SCREEN HERE

  }
} // PLANT SELECTION
// This function updates the search results


function updatePlantSearchResult(query) {
  let resultList = document.querySelector(".search-suggestions");
  resultList.innerHTML = "";
  plantSearchArray.map(function (algo) {
    query.split(" ").map(function (word) {
      if (algo.toLowerCase().indexOf(word.toLowerCase()) != -1 && resultList.childNodes.length < 5) {
        resultList.innerHTML += `<li>${algo}</li>`;
      }
    });
  }); // Add event listener to each search item

  document.querySelectorAll(".search-suggestions > li").forEach(function (e) {
    e.addEventListener("click", function () {
      // Fill the search box in with the clicked value
      document.querySelector("#search-plants").value = e.textContent; // When there is any value in the search box and it matches an item in the search array, color the add button

      if (e.textContent.length > 0 && plantSearchArray.indexOf(e.textContent) !== -1) {
        gsap.to('.plant-search > .add-option', {
          duration: .2,
          ease: 'power2.inOut',
          backgroundColor: 'var(--primary-color)'
        });
      } else {
        gsap.to('.plant-search > .add-option', {
          duration: .2,
          ease: 'power2.inOut',
          clearProps: 'backgroundColor'
        });
      }
    });
  });
}

; // This function adds a search item to the no-parent container for new search items

function addPlantOption(plantObj) {
  let itemCount = document.querySelectorAll('.grab-item').length; // Select a color from the label color array given the total items % the number of items in the label color array

  let labelColor = labelColors[itemCount % labelColors.length]; // Add the item to the no-parent container

  let newPlantCount = document.querySelectorAll('.grab-item').length + 1;
  let newItem = '<div class="grab-item" data-label-color="' + labelColor + '" id="plant_' + newPlantCount + '" data-cell="-1" draggable="true">' + plantObj.plant_name + '</div>';
  console.log('plantCount: ' + newPlantCount); // Add the drag and drop event listeners to the new item

  document.querySelector('#no_bed_plants').insertAdjacentHTML('afterbegin', newItem);
  addDragAndDrop('#plant_' + newPlantCount); // Move the bed area to just below the search results

  gsap.to('.bed-area', {
    duration: .125,
    ease: 'power2-inOut',
    top: document.querySelector('.search-wrapper').offsetHeight + 10 + 'px'
  });
} // This is the drag and drop data transfer format


class DnDItem {
  constructor(id, container, place, text, color) {
    this.id = id;
    this.container = container;
    this.place = place;
    this.text = text;
    this.color = color;
  }

}

function dragStart(ev) {
  // Style this element to indicate it is being dragged
  gsap.to(this, {
    duration: .2,
    ease: 'power2.inOut',
    opacity: .5
  }); // Add the drag item's data to the drag-info div

  let dragInfoElement = document.querySelector('#drag-info');
  let dragItem = new DnDItem(this.id, this.parentNode.id, this.getAttribute('data-cell'), this.textContent, this.getAttribute('data-label-color'));
  dragInfoElement.setAttribute('data-drag', JSON.stringify(dragItem)); // Style the search area components

  styleSearch('dragging');
}

function dragEnd(ev) {
  // Style this element to indicate it is being dragged
  gsap.to(this, {
    duration: .2,
    ease: 'power2.inOut',
    clearProps: 'opacity'
  }); // Style the search area components

  styleSearch('default'); // Grab drag data

  let dragData = JSON.parse(document.querySelector('#drag-info').getAttribute('data-drag'));
  let targetData = document.querySelector('#drag-info').getAttribute('data-target'); // Determine what action will be taken
  // Check to see if anything happened

  if (targetData !== null) {
    // Something happened
    targetData = JSON.parse(document.querySelector('#drag-info').getAttribute('data-target'));

    if (targetData.id == 'remove-zone') {
      // The drag item should be removed
      if (dragData.place !== null && dragData.place !== '-1') {
        // The drag item is in a cell, replace it with an empty item
        // Replace the drag item with a blank item
        document.querySelector('#' + dragData.id).setAttribute('class', 'blank-item');
        document.querySelector('#' + dragData.id).removeAttribute('data-label-color');
        document.querySelector('#' + dragData.id).removeAttribute('draggable');
        document.querySelector('#' + dragData.id).textContent = ''; // Remove all event listeners

        removeDragAndDrop('#' + dragData.id); // Add new event listeners

        addDragAndDrop('#' + dragData.id);
        document.querySelector('#' + dragData.id).setAttribute('id', 'empty_' + dragData.container.split('_')[1] + '_' + dragData.place); // Determine the cell id of the drag item

        let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place; // Set the drag cell fill

        (0, _svg.SVG)(dragCellID).animate(250, 0, 'now').ease('<>').fill({
          color: '#596475',
          opacity: 0
        }); // If remove x exists, remove it

        if ((0, _svg.SVG)('#x_icon') !== null) {
          (0, _svg.SVG)('#x_icon').remove();
        }
      } else {
        // Just remove the item
        document.querySelector('#' + dragData.id).remove();
      }
    }

    if (targetData.id == 'search-container-dropzone') {
      // The drag item should be moved to the no bed list
      if (dragData.place !== null && dragData.place !== '-1') {
        // The drag item is in a cell, replace it with an empty item
        // Replace the drag item with an empty cell
        document.querySelector('#' + dragData.id).setAttribute('class', 'blank-item');
        document.querySelector('#' + dragData.id).removeAttribute('data-label-color');
        document.querySelector('#' + dragData.id).removeAttribute('draggable');
        document.querySelector('#' + dragData.id).textContent = ''; // Determine the cell id of the drag item

        let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place; // Set the drag cell fill

        (0, _svg.SVG)(dragCellID).animate(250, 0, 'now').ease('<>').fill({
          color: '#596475',
          opacity: 0
        }); // Remove all event listeners

        removeDragAndDrop('#' + dragData.id); // Add new event listeners

        addDragAndDrop('#' + dragData.id);
        document.querySelector('#' + dragData.id).setAttribute('id', 'empty_' + dragData.container.split('_')[1] + '_' + dragData.place); // Add the plant item back into the no bed list
        // Set the label color from the old drag item

        let labelColor = dragData.color; // Add the item to the no-parent container

        let newPlantCount = document.querySelector('#no_bed_plants').childElementCount - 1 + 1;
        let newItem = '<div class="grab-item" data-label-color="' + labelColor + '" id="plant_' + newPlantCount + '" data-cell="-1" draggable="true">' + dragData.text + '</div>'; // Add the drag and drop event listeners to the new item

        document.querySelector('#no_bed_plants').insertAdjacentHTML('afterbegin', newItem);
        addDragAndDrop('#plant_' + newPlantCount); // Move the bed area to just below the search results

        gsap.to('.bed-area', {
          duration: .125,
          ease: 'power2-inOut',
          top: document.querySelector('.search-wrapper').offsetHeight + 10 + 'px'
        }); // If remove x exists, remove it

        if ((0, _svg.SVG)('#x_icon') !== null) {
          (0, _svg.SVG)('#x_icon').remove();
        }
      } else {// Do nothing as the plant is already in the list
      }
    }

    if (targetData.place !== null && targetData.place !== '-1') {
      // The target item is a cell reference
      if (dragData.place !== null && dragData.place !== '-1') {
        // The drag item is also a cell reference
        if (targetData.text !== '') {
          // The target is a cell reference and is not empty
          // Set the target cell color to the drag item color and the drag cell to the target item color
          // Determine the cell id of the target item
          let targetCellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place; // Determine the cell id of the drag item

          let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place; // Set the target cell fill

          (0, _svg.SVG)(targetCellID).animate(250, 0, 'now').ease('<>').fill({
            color: dragData.color,
            opacity: 1
          }); // Set the drag cell fill

          (0, _svg.SVG)(dragCellID).animate(250, 0, 'now').ease('<>').fill({
            color: targetData.color,
            opacity: 1
          }); // Replace the target item with the drag item

          document.querySelector('#' + targetData.id).setAttribute('class', 'grab-item');
          document.querySelector('#' + targetData.id).setAttribute('data-label-color', dragData.color);
          document.querySelector('#' + targetData.id).setAttribute('draggable', 'true');
          document.querySelector('#' + targetData.id).textContent = dragData.text;
          document.querySelector('#' + targetData.id).setAttribute('id', 'NEWDRAG'); // Replace the drag item with the target item

          document.querySelector('#' + dragData.id).setAttribute('class', 'grab-item');
          document.querySelector('#' + dragData.id).setAttribute('data-label-color', targetData.color);
          document.querySelector('#' + dragData.id).setAttribute('draggable', 'true');
          document.querySelector('#' + dragData.id).textContent = targetData.text;
          document.querySelector('#' + dragData.id).setAttribute('id', targetData.id);
          document.querySelector('#NEWDRAG').setAttribute('id', dragData.id); // Remove all event listeners

          removeDragAndDrop('#' + dragData.id);
          removeDragAndDrop('#' + targetData.id); // Add new event listeners

          addDragAndDrop('#' + dragData.id);
          addDragAndDrop('#' + targetData.id); // Remove swap arrows

          if ((0, _svg.SVG)('#swap_arrows') !== null) {
            (0, _svg.SVG)('#swap_arrows').remove();
          } // If remove x exists, remove it


          if ((0, _svg.SVG)('#x_icon') !== null) {
            (0, _svg.SVG)('#x_icon').remove();
          }
        } else {
          // The target is a cell reference but is empty
          // Set the target cell color to the drag item color
          // Determine the cell id of the target item
          let targetCellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place; // Determine the cell id of the drag item

          let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place; // Set the target cell fill

          (0, _svg.SVG)(targetCellID).animate(250, 0, 'now').ease('<>').fill({
            color: dragData.color,
            opacity: 1
          }); // Set the drag cell fill

          (0, _svg.SVG)(dragCellID).animate(250, 0, 'now').ease('<>').fill({
            color: '#596475',
            opacity: 0
          }); // Replace the target item with the drag item

          document.querySelector('#' + targetData.id).setAttribute('class', 'grab-item');
          document.querySelector('#' + targetData.id).setAttribute('data-label-color', dragData.color);
          document.querySelector('#' + targetData.id).setAttribute('draggable', 'true');
          document.querySelector('#' + targetData.id).textContent = dragData.text;
          document.querySelector('#' + targetData.id).setAttribute('id', 'NEWDRAG'); // Replace the drag item with the target item

          document.querySelector('#' + dragData.id).setAttribute('class', 'blank-item');
          document.querySelector('#' + dragData.id).removeAttribute('data-label-color');
          document.querySelector('#' + dragData.id).removeAttribute('draggable');
          document.querySelector('#' + dragData.id).textContent = '';
          document.querySelector('#' + dragData.id).setAttribute('id', 'empty_' + dragData.container.split('_')[1] + '_' + dragData.place);
          document.querySelector('#NEWDRAG').setAttribute('id', dragData.id); // Remove all event listeners

          removeDragAndDrop('#' + dragData.id);
          removeDragAndDrop('#' + targetData.id); // Add new event listeners

          addDragAndDrop('#' + dragData.id);
          document.querySelector('#empty_' + dragData.container.split('_')[1] + '_' + dragData.place).addEventListener('dragenter', handleDragEnter, false);
          document.querySelector('#empty_' + dragData.container.split('_')[1] + '_' + dragData.place).addEventListener('dragover', allowDrop, false);
          document.querySelector('#empty_' + dragData.container.split('_')[1] + '_' + dragData.place).addEventListener('dragleave', handleDragLeave, false); // Remove swap arrows

          if ((0, _svg.SVG)('#swap_arrows') !== null) {
            (0, _svg.SVG)('#swap_arrows').remove();
          } // If remove x exists, remove it


          if ((0, _svg.SVG)('#x_icon') !== null) {
            (0, _svg.SVG)('#x_icon').remove();
          }
        }
      } else {
        // The drag item is not a cell reference
        // Set the cell color to the drag item color
        // Determine the cell id of the target item
        let targetCellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place; // Set the cell fill

        (0, _svg.SVG)(targetCellID).animate(250, 0, 'now').ease('<>').fill({
          color: dragData.color,
          opacity: 1
        }); // Replace the target item with the drag item

        document.querySelector('#' + targetData.id).setAttribute('class', 'grab-item');
        document.querySelector('#' + targetData.id).setAttribute('data-label-color', dragData.color);
        document.querySelector('#' + targetData.id).setAttribute('draggable', 'true');
        document.querySelector('#' + targetData.id).textContent = dragData.text;
        document.querySelector('#' + targetData.id).setAttribute('id', 'NEWDRAG'); // Replace the drag item with the target item

        document.querySelector('#' + dragData.id).setAttribute('class', 'grab-item');
        document.querySelector('#' + dragData.id).setAttribute('data-label-color', targetData.color);
        document.querySelector('#' + dragData.id).setAttribute('draggable', 'true');
        document.querySelector('#' + dragData.id).textContent = targetData.text;
        document.querySelector('#' + dragData.id).setAttribute('id', targetData.id);
        document.querySelector('#NEWDRAG').setAttribute('id', dragData.id); // Remove all event listeners

        removeDragAndDrop('#' + dragData.id);
        removeDragAndDrop('#' + targetData.id); // Add new event listeners

        addDragAndDrop('#' + dragData.id);
        addDragAndDrop('#' + targetData.id); // Remove swap arrows

        if ((0, _svg.SVG)('#swap_arrows') !== null) {
          (0, _svg.SVG)('#swap_arrows').remove();
        } // If remove x exists, remove it


        if ((0, _svg.SVG)('#x_icon') !== null) {
          (0, _svg.SVG)('#x_icon').remove();
        }

        if (targetData.id.split('_')[0] == 'empty') {
          // The target item was an empty cell, remove it from the no bed list
          document.querySelector('#' + targetData.id).remove();
        }
      }
    } // Once finished, remove all the drag and target data


    document.querySelector('#drag-info').removeAttribute('data-drag');
    document.querySelector('#drag-info').removeAttribute('data-target');
  } // Once all is finished
  // If any items in the viewport have a data-ghost tag on them, set their fills to their old fill data


  if (document.querySelectorAll('rect[data-ghost="true"]').length !== null || document.querySelectorAll('rect[data-ghost="true"]').length !== 0) {
    console.log('Clearing ghost items'); // Iterate over the items

    document.querySelectorAll('rect[data-ghost="true"]').forEach(function (e) {
      let currentID = '#' + e.id; // Remove the ghost and old fill attributes

      document.querySelector(currentID).removeAttribute('data-ghost');
      document.querySelector(currentID).removeAttribute('data-old-fill');
    }); // Reset the search height offset for the beds

    styleSearch('default');
  }
}

function allowDrop(ev) {
  ev.preventDefault();
  return false;
}

function handleDragEnter(ev) {
  ev.preventDefault(); // A dragging item has entered a target
  // Add the target item's data to the drag-info div

  let dragInfoElement = document.querySelector('#drag-info');
  let targetItem = new DnDItem(this.id, this.parentNode.id, this.getAttribute('data-cell'), this.textContent, this.getAttribute('data-label-color'));
  dragInfoElement.setAttribute('data-target', JSON.stringify(targetItem)); // Here if the drag target is a cell reference, display the cell change in the viewport
  // If the drag item is also from a cell, include reference arrows and style the drag cell as well
  // If a cell is showing data preview, add a data-ghost tag to it
  // Store the old fill data to a fill data tag
  // Grab drag data

  let dragData = JSON.parse(document.querySelector('#drag-info').getAttribute('data-drag'));
  let targetData = JSON.parse(document.querySelector('#drag-info').getAttribute('data-target'));

  if (targetData.id == dragData.id && targetData.place == dragData.place) {// The items are the same, do nothing
  } else {
    // The items are not the same
    if (targetData.id == 'remove-zone') {
      // The drag item should be removed
      if (dragData.place !== null && dragData.place !== '-1') {
        // The drag item is in a cell, show a remove x
        // Add a remove x
        let cellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place;
        let cellCenter = {
          x: (0, _svg.SVG)(cellID).bbox().cx,
          y: (0, _svg.SVG)(cellID).bbox().cy
        };
        generateRemoveX(cellCenter);
      }
    }

    if (targetData.id == 'search-container-dropzone') {
      // The drag item should be moved to the no bed list
      if (dragData.place !== null && dragData.place !== '-1') {
        // The drag item is in a cell, show a remove x
        // Add a remove x
        let cellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place;
        let cellCenter = {
          x: (0, _svg.SVG)(cellID).bbox().cx,
          y: (0, _svg.SVG)(cellID).bbox().cy
        };
        generateRemoveX(cellCenter);
      }
    }

    if (targetData.place !== null && targetData.place !== '-1') {
      // The target item is a cell reference
      if (dragData.place !== null && dragData.place !== '-1') {
        // The drag item is also a cell reference
        if (targetData.text !== '') {
          // The target is a cell reference and is not empty
          // Preview the drag item color in the target cell and the target cell color in the drag cell
          // Determine the cell id of the target item
          let targetCellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place; // Store the old fill data

          (0, _svg.SVG)(targetCellID).data('ghost', 'true', true);
          let oldTargetFillData = JSON.stringify({
            fill: (0, _svg.SVG)(targetCellID).attr('fill'),
            opacity: (0, _svg.SVG)(targetCellID).attr('fill-opacity')
          });
          (0, _svg.SVG)(targetCellID).data('old-fill', oldTargetFillData, true); // Determine the cell id of the drag item

          let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place; // Store the old fill data

          (0, _svg.SVG)(dragCellID).data('ghost', 'true', true);
          let oldDragFillData = JSON.stringify({
            fill: (0, _svg.SVG)(dragCellID).attr('fill'),
            opacity: (0, _svg.SVG)(dragCellID).attr('fill-opacity')
          });
          (0, _svg.SVG)(dragCellID).data('old-fill', oldDragFillData, true); // Set the preview fill

          (0, _svg.SVG)(targetCellID).animate(250, 0, 'now').ease('<>').fill({
            color: dragData.color,
            opacity: .5
          });
          (0, _svg.SVG)(dragCellID).animate(250, 0, 'now').ease('<>').fill({
            color: targetData.color,
            opacity: .5
          }); // Add swap arrows

          let dragCellCenter = {
            x: (0, _svg.SVG)(dragCellID).bbox().cx,
            y: (0, _svg.SVG)(dragCellID).bbox().cy
          };
          let targetCellCenter = {
            x: (0, _svg.SVG)(targetCellID).bbox().cx,
            y: (0, _svg.SVG)(targetCellID).bbox().cy
          };
          generateSwapArrows(dragCellCenter, targetCellCenter);
        } else {
          // The target is a cell reference but is empty
          // Preview the drag item color in the cell
          // Determine the cell id of the target item
          let targetCellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place; // Store the old fill data

          (0, _svg.SVG)(targetCellID).data('ghost', 'true', true);
          let oldTargetFillData = JSON.stringify({
            fill: (0, _svg.SVG)(targetCellID).attr('fill'),
            opacity: (0, _svg.SVG)(targetCellID).attr('fill-opacity')
          });
          (0, _svg.SVG)(targetCellID).data('old-fill', oldTargetFillData, true); // Determine the cell id of the drag item

          let dragCellID = '#cell_' + dragData.container.split('_')[1] + '_' + dragData.place; // Store the old fill data

          (0, _svg.SVG)(dragCellID).data('ghost', 'true', true);
          let oldDragFillData = JSON.stringify({
            fill: (0, _svg.SVG)(dragCellID).attr('fill'),
            opacity: (0, _svg.SVG)(dragCellID).attr('fill-opacity')
          });
          (0, _svg.SVG)(dragCellID).data('old-fill', oldDragFillData, true); // Set the preview fill

          (0, _svg.SVG)(targetCellID).animate(250, 0, 'now').ease('<>').fill({
            color: dragData.color,
            opacity: .5
          });
          (0, _svg.SVG)(dragCellID).animate(250, 0, 'now').ease('<>').fill({
            color: dragData.color,
            opacity: 0
          }); // Add swap arrows

          let dragCellCenter = {
            x: (0, _svg.SVG)(dragCellID).bbox().cx,
            y: (0, _svg.SVG)(dragCellID).bbox().cy
          };
          let targetCellCenter = {
            x: (0, _svg.SVG)(targetCellID).bbox().cx,
            y: (0, _svg.SVG)(targetCellID).bbox().cy
          };
          generateSwapArrows(dragCellCenter, targetCellCenter);
        }
      } else {
        // The drag item is not a cell reference
        // Preview the drag item color in the cell
        // Determine the cell id of the target item
        let cellID = '#cell_' + targetData.container.split('_')[1] + '_' + targetData.place; // Store the old fill data

        (0, _svg.SVG)(cellID).data('ghost', 'true', true);
        let oldFillData = JSON.stringify({
          fill: (0, _svg.SVG)(cellID).attr('fill'),
          opacity: (0, _svg.SVG)(cellID).attr('fill-opacity')
        });
        (0, _svg.SVG)(cellID).data('old-fill', oldFillData, true); // Set the preview fill

        (0, _svg.SVG)(cellID).animate(250, 0, 'now').ease('<>').fill({
          color: dragData.color,
          opacity: .5
        });
      }
    }
  }
}

function handleDragLeave(ev) {
  ev.preventDefault(); // A dragging item has left a target
  // Add the target item's data to the drag-info div

  let dragInfoElement = document.querySelector('#drag-info');
  dragInfoElement.removeAttribute('data-target'); // If any items in the viewport have a data-ghost tag on them, set their fills to their old fill data

  if (document.querySelectorAll('rect[data-ghost="true"]').length !== null || document.querySelectorAll('rect[data-ghost="true"]').length !== 0) {
    console.log('Clearing ghost items'); // Iterate over the items

    document.querySelectorAll('rect[data-ghost="true"]').forEach(function (e) {
      let currentID = '#' + e.id; // Set the fill back to the old fill

      let fillData = (0, _svg.SVG)(currentID).data('old-fill');
      (0, _svg.SVG)(currentID).animate(250, 0, 'now').ease('<>').fill({
        color: fillData.fill,
        opacity: fillData.opacity
      }); // Remove the ghost and old fill attributes

      document.querySelector(currentID).removeAttribute('data-ghost');
      document.querySelector(currentID).removeAttribute('data-old-fill');
    });
  } // Remove swap arrows


  if ((0, _svg.SVG)('#swap_arrows') !== null) {
    (0, _svg.SVG)('#swap_arrows').remove();
  } // If remove x exists, remove it


  if ((0, _svg.SVG)('#x_icon') !== null) {
    (0, _svg.SVG)('#x_icon').remove();
  }
} // This function adds the standard set of event listeners to a drag and drop item


function addDragAndDrop(elements) {
  let dragableItems = document.querySelectorAll(elements);
  dragableItems.forEach(function (item) {
    item.addEventListener('dragstart', dragStart, false);
    item.addEventListener('dragend', dragEnd, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', allowDrop, false);
    item.addEventListener('dragleave', handleDragLeave, false); // item.addEventListener('drop', handleDrop, false);
  });
} // This function adds the standard set of event listeners to a drag and drop item


function removeDragAndDrop(elements) {
  let dragableItems = document.querySelectorAll(elements);
  dragableItems.forEach(function (item) {
    item.removeEventListener('dragstart', dragStart);
    item.removeEventListener('dragend', dragEnd);
    item.removeEventListener('dragenter', handleDragEnter);
    item.removeEventListener('dragover', allowDrop);
    item.removeEventListener('dragleave', handleDragLeave);
  });
} // This function styles the search area components into their standard or dragging states


function styleSearch(state) {
  // Test the state
  if (state == 'dragging') {
    // Display the drop area for search and the remove area
    gsap.timeline().to('#search-container-dropzone', {
      duration: .375,
      ease: 'power2.inOut',
      height: 'calc(1.1em + 13px)',
      paddingTop: '8px',
      paddingBottom: '5px',
      marginTop: '12px'
    }).to('#search-container-dropzone', {
      duration: .375,
      ease: 'power2.inOut',
      opacity: .2
    }, "-=.125").call(optionClassSwap, ['remove-option']).to('.search-box', {
      duration: .5,
      ease: 'power2.inOut',
      width: '0px',
      marginRight: '0px',
      opacity: 0
    }, "-=.25").to('.bed-area', {
      duration: .375,
      ease: 'power2.inOut',
      top: document.querySelector('.search-wrapper').offsetHeight + 30 + 'px'
    }, "-=1");
  } else {
    // Reset the search components
    gsap.timeline().to('#search-container-dropzone', {
      duration: .375,
      ease: 'power2.inOut',
      opacity: .0
    }).to('#search-container-dropzone', {
      duration: .375,
      ease: 'power2.inOut',
      height: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      marginTop: '0px'
    }, "-=.125").call(optionClassSwap, ['default']).to('.search-box', {
      duration: .375,
      ease: 'power2.inOut',
      width: 'calc(100% - 38px)',
      marginRight: '8px',
      opacity: 1
    }, "-=.25").to('.bed-area', {
      duration: .375,
      ease: 'power2.inOut',
      top: document.querySelector('.search-wrapper').offsetHeight + 10 + 'px'
    }, "-=.5");
  } // This function swaps the classes of the add-option/remove option button


  function optionClassSwap(swapTo) {
    if (swapTo == 'remove-option') {
      document.querySelector('.add-option').classList.add('remove-option');
      document.querySelector('.add-option').classList.remove('add-option');
      document.querySelector('.remove-option').textContent = 'Drop Here to Remove';
    } else {
      document.querySelector('.remove-option').classList.add('add-option');
      document.querySelector('.remove-option').classList.remove('remove-option');
      document.querySelector('.add-option').textContent = '';
    }
  }
} // END PLANT SELECTION
// Auto-save function


function autoSave() {
  // Display the autosave notification and hide it after save completion
  gsap.timeline().to('.autosave-wrapper', {
    duration: .75,
    ease: 'power2.inOut',
    opacity: 1
  }).to('.autosave-wrapper', {
    duration: 1,
    ease: 'power2.out',
    scale: 1
  }, "-=.75").to('.autosave-wrapper', {
    duration: .625,
    ease: 'power2.inOut',
    scale: .9
  }, "+=2.75").to('.autosave-wrapper', {
    duration: .375,
    ease: 'linear',
    opacity: 0
  }, "-=.5");
  let saveData = saveState(); // Save the file to local storage as a temp file
  // First determine how many auto saves exist

  let autoSaveCount = -1;

  for (var i = 0; i < 3; i++) {
    // If an autosave with the current name exists add to the auto-save count
    if (checkLocalStorage('sqFtGdn_autoSave_' + i) == true) {
      autoSaveCount = autoSaveCount + 1;
    }
  }

  if (autoSaveCount >= 2) {
    // There are already 3 autosaves
    // Find the oldest auto save and save over it with new data
    // Add each exipry to an array
    let autoSaveTimes = [];

    for (var i = 0; i < 3; i++) {
      autoSaveTimes.push(readLocalStorage('sqFtGdn_autoSave_' + i).expiry);
    } // Determine which auto save is the oldest


    autoSaveCount = indexOfSmallest(autoSaveTimes); // This function returns the index of the lowest value in a given array

    function indexOfSmallest(a) {
      var lowest = 0;

      for (var i = 1; i < a.length; i++) {
        if (a[i] < a[lowest]) lowest = i;
      }

      return lowest;
    } // Save the new auto save over the oldest save


    writeLocalStorage('sqFtGdn_autoSave_' + autoSaveCount, JSON.stringify(saveData), ['never'], 'Auto Save');
    console.log('Auto-saved progress to: "autoSave_' + autoSaveCount + '" on ' + (0, _moment.default)().format('L [at] h:mm:ssa'));
  } else {
    // There are less than 3 autosaves present, save to a new auto save slot
    autoSaveCount = autoSaveCount + 1;
    writeLocalStorage('sqFtGdn_autoSave_' + autoSaveCount, JSON.stringify(saveData), ['never'], 'Auto Save');
    console.log('Auto-saved progress to: "autoSave_' + autoSaveCount + '" on ' + (0, _moment.default)().format('L [at] h:mm:ssa'));
  }
}

var autoSaveInterval = setInterval(function () {
  autoSave();
}, 120000); // This function returns an object of save data

function saveState(fileName) {
  // Save Info
  let save_date = (0, _moment.default)().unix();
  let save_name = '_autosave-1';
  let autosave = true;
  let saveObject = {
    save_date,
    save_name,
    autosave
  }; // Location Info

  let type = 'lat/long';
  let value = [-35.59673, 78.02848];
  let hardiness = 4;
  let locationObject = {
    type,
    value,
    hardiness
  }; // Current Step

  let step = 'bed-layout';
  let view = '';
  let currentStepObject = {
    step,
    view
  }; // Crops
  // CODE HERE
  // Beds

  let bedsArray = []; // Iterate over each bed, adding a bed object to the bed array

  document.querySelectorAll('.content-bed-item').forEach(function (e) {
    let bed_id = e.getAttribute('data-bed-id');
    let bed_name = document.querySelector('#' + bed_id + '_name').value;
    let bed_width = document.querySelector('#' + bed_id + '_width').value;
    let bed_height = document.querySelector('#' + bed_id + '_height').value;
    let bed_cells = {}; // Iterate over each row, adding its rows to the cells object

    for (var i = 0; i < bed_height; i++) {
      let row_name = 'row_' + (i + 1);
      let rowArray = []; // Iterate over each cell within the row, adding its data to the row array

      for (var j = 0; j < bed_width; j++) {
        let cell_id = i + j;
        let cell_contents = [];
        let cell_object = {
          cell_id,
          cell_contents
        }; // Add the cell object to the row array

        rowArray.push(cell_object);
      }

      bed_cells[row_name] = rowArray;
    }

    let bedObject = {
      bed_id,
      bed_name,
      bed_width,
      bed_height,
      bed_cells
    }; // Add the current bed object to the bed array

    bedsArray.push(bedObject);
  });
  let saveFile = new SaveFile(saveObject, locationObject, currentStepObject, bedsArray);
  console.log(saveFile);
} // This function writes data to local storage
// Expire time is an array which contains an operation cue and a value given the operation


function writeLocalStorage(name, data, expireTime, category) {
  let expiringEpoch = 0;

  if (expireTime[0] == 'epoch') {
    // Expire time provided as an exact epoch time
    expiringEpoch = expireTime[1];
  }

  if (expireTime[0] == 'hourstil') {
    // Expire time provided as hours until
    let date = new Date();
    let exp = date.setTime(+date + expireTime[1] * 3600000);
    expiringEpoch = Math.floor(exp / 1000);
  }

  if (expireTime[0] == 'eod') {
    // Expire time set to End of current day
    let midnight = new Date();
    midnight.setHours(23, 59, 59, 0);
    expiringEpoch = midnight.getTime() / 1000;
  }

  if (expireTime[0] == 'never') {
    // Expire time set to a long time in the future
    let date = (0, _moment.default)().unix();
    let exp = date + 10000000000 * 3600000;
    expiringEpoch = Math.floor(exp);
  }

  category = category || 'Default';
  const item = {
    value: data,
    category: category,
    expiry: expiringEpoch
  };
  localStorage.setItem(name, JSON.stringify(item));
} // This function reads data from local storage and returns the data and expiry in an object


function readLocalStorage(name) {
  let fetchedItem = JSON.parse(localStorage.getItem(name));
  const item = {
    'value': fetchedItem.value,
    'category': fetchedItem.category,
    'expiry': fetchedItem.expiry
  };
  return item;
} // This function checks for an item in local storage, returns a bool value if the item exists or not


function checkLocalStorage(name) {
  if (localStorage.getItem(name) === null) {
    return false;
  } else {
    return true;
  }
} // This function removes an item from local storage


function removeItemLocalStorage(name) {
  localStorage.removeItem(name);
} // This function removes items from local storage that have expired


function expireLocalStorage() {
  let search = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;

  for (; key = keys[i]; i++) {
    let item = JSON.parse(localStorage.getItem(key));
    let currentTime = new Date();
    currentTime = Math.floor(currentTime.getTime() / 1000);

    if (item.expiry <= currentTime) {
      removeItemLocalStorage(key);
    }
  }
} // This function looks for items in local storage that match a category tag


function localStorageCategorySearch(category) {
  let search = [],
      keys = Object.keys(localStorage),
      i = 0,
      key;

  for (; key = keys[i]; i++) {
    let item = JSON.parse(localStorage.getItem(key));

    if (item.category == category) {
      search.push(key);
    }
  } // If items are found return their key array, else return false


  if (search.length > 0) {
    return search;
  } else {
    return false;
  }
}
},{"moment":"node_modules/moment/moment.js","@svgdotjs/svg.js":"node_modules/@svgdotjs/svg.js/dist/svg.esm.js","@svgdotjs/svg.filter.js":"node_modules/@svgdotjs/svg.filter.js/src/svg.filter.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62883" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/app.js"], null)
//# sourceMappingURL=/app.56908c73.js.map