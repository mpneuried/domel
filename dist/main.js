(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.domel = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var addD, addDWrap, domHelper, isString, nonAutoAttach,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

isString = function(vr) {
  return typeof vr === 'string' || vr instanceof String;
};

nonAutoAttach = ["domel", "create", "byClass", "byId"];

addDWrap = function(fn, el, elIdx) {
  if (elIdx == null) {
    elIdx = 0;
  }
  return function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    args.splice(elIdx, 0, el);
    return fn.apply(domHelper, args);
  };
};

addD = function(el, key) {
  var j, len, nameFn, ref;
  if (key == null) {
    key = "d";
  }
  if (el == null) {
    return el;
  }
  if (el[key] != null) {
    return el;
  }
  el[key] = {};
  ref = Object.keys(domHelper);
  for (j = 0, len = ref.length; j < len; j++) {
    nameFn = ref[j];
    if (indexOf.call(nonAutoAttach, nameFn) < 0) {
      el[key][nameFn] = addDWrap(domHelper[nameFn], el);
    }
  }
  el[key].find = addDWrap(domHelper, el, 1);
  el[key].byId = addDWrap(domHelper.byId, el, 1);
  el[key].byClass = addDWrap(domHelper.byClass, el, 1);
  return el;
};


/*
	
	DOM helpers
 */

domHelper = function(sel, context, onlyFirst) {
  var _el, _results, _sel, _sels, ref;
  if (context == null) {
    context = document;
  }
  if (onlyFirst == null) {
    onlyFirst = false;
  }
  _sels = sel.split(" ");
  if (_sels.every((function(sel) {
    var ref;
    return (ref = sel[0]) === "." || ref === "#";
  }))) {
    while (_sels.length) {
      if ((_sel = (ref = _sels.splice(0, 1)) != null ? ref[0] : void 0)) {
        switch (_sel[0]) {
          case ".":
            context = domHelper.byClass(_sel, context, onlyFirst);
            break;
          case "#":
            context = domHelper.byId(_sel, context, onlyFirst);
        }
      }
    }
    return context;
  }
  _results = context.querySelectorAll(sel);
  if (onlyFirst) {
    return addD(_results != null ? _results[0] : void 0);
  }
  return (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = _results.length; j < len; j++) {
      _el = _results[j];
      results.push(addD(_el));
    }
    return results;
  })();
};

domHelper.domel = function(el) {
  if (el != null) {
    return addD(el);
  }
};

domHelper.create = function(tag, attributes) {
  var _el, _k, _v;
  if (tag == null) {
    tag = "DIV";
  }
  if (attributes == null) {
    attributes = {};
  }
  _el = document.createElement(tag);
  for (_k in attributes) {
    _v = attributes[_k];
    _el.setAttribute(_k, _v);
  }
  return addD(_el);
};

domHelper.data = function(el, key, val) {
  if ((el != null ? el.dataset : void 0) == null) {
    if (val != null) {
      return;
    }
    return addD(el);
  }
  if ((key != null) && (val != null)) {
    el.dataset[key] = val;
  } else if (key != null) {
    return el.dataset[key];
  }
  return el.dataset;
};

domHelper.attr = function(el, key, val) {
  if ((key != null) && (val != null)) {
    el.setAttribute(key, val);
  } else if (key != null) {
    el.getAttribute(key);
  }
  return el;
};

domHelper.byClass = function(_cl, context, onlyFirst) {
  var _el, _results;
  if (context == null) {
    context = document;
  }
  if (onlyFirst == null) {
    onlyFirst = false;
  }
  if (_cl[0] === ".") {
    _cl = _cl.slice(1);
  }
  _results = context.getElementsByClassName(_cl);
  if (onlyFirst) {
    return addD(_results != null ? _results[0] : void 0);
  }
  return (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = _results.length; j < len; j++) {
      _el = _results[j];
      results.push(addD(_el));
    }
    return results;
  })();
};

domHelper.byId = function(_id, context) {
  if (context == null) {
    context = document;
  }
  if (_id[0] === "#") {
    _id = _id.slice(1);
  }
  return addD(context.getElementById(_id));
};

domHelper.last = function(el, selector) {
  var idx;
  idx = el.childNodes.length - 1;
  while (idx >= 0) {
    if (domHelper.is(el.childNodes[idx], selector)) {
      return addD(el.childNodes[idx]);
      break;
    }
    idx--;
  }
  return null;
};

domHelper.parent = function(el, selector) {
  var _cursor;
  if (selector == null) {
    return addD(el.parentNode);
  }
  _cursor = el;
  while (_cursor.parentNode != null) {
    _cursor = _cursor.parentNode;
    if (domHelper.is(_cursor, selector)) {
      return addD(_cursor);
    }
  }
  return null;
};

domHelper.first = function(el, selector) {
  var child, idx, j, len, ref;
  idx = el.childNodes.length - 1;
  ref = el.childNodes;
  for (j = 0, len = ref.length; j < len; j++) {
    child = ref[j];
    if (domHelper.is(child, selector)) {
      return addD(child);
    }
  }
  return null;
};

domHelper.children = function(el, selector) {
  var child, children, idx, j, len, ref;
  children = [];
  idx = el.childNodes.length - 1;
  ref = el.childNodes;
  for (j = 0, len = ref.length; j < len; j++) {
    child = ref[j];
    if (domHelper.is(child, selector)) {
      children.push(addD(child));
    }
  }
  return children;
};

domHelper.countChildren = function(el, selector) {
  return domHelper.children(el, selector).length;
};

domHelper.is = function(el, selector) {
  if (selector[0] === ".") {
    return domHelper.hasClass(el, selector.slice(1));
  }
  if (selector[0] === "#") {
    return domHelper.hasId(el, selector.slice(1));
  }
  return false;
};

domHelper.hasClass = function(el, classname) {
  var ref;
  if (el.classList != null) {
    return el.classList.contains(classname);
  }
  if ((el != null ? el.className : void 0) == null) {
    return false;
  }
  if (indexOf.call((el != null ? (ref = el.className) != null ? ref.split(" ") : void 0 : void 0) || [], classname) >= 0) {
    return true;
  }
  return false;
};

domHelper.hide = function(el) {
  if ((el != null ? el.style : void 0) == null) {
    return null;
  }
  el.style.display = "none";
  return el;
};

domHelper.show = function(el, display) {
  if (display == null) {
    display = "block";
  }
  if ((el != null ? el.style : void 0) == null) {
    return null;
  }
  el.style.display = display;
  return el;
};

domHelper.addClass = function(element, classname) {
  var _classnames;
  if (this.hasClass(element, classname)) {
    return;
  }
  _classnames = element.className;
  if (!_classnames.length) {
    element.className = classname;
    return;
  }
  element.className += " " + classname;
  return addD(element);
};

domHelper.removeClass = function(element, classname) {
  var _classnames, rxp;
  if (!this.hasClass(element, classname)) {
    return;
  }
  _classnames = element.className;
  rxp = new RegExp("\\s?\\b" + classname + "\\b", "g");
  _classnames = _classnames.replace(rxp, "");
  element.className = _classnames;
  return addD(element);
};

domHelper.hasId = function(el, id) {
  if ((el != null ? el.id : void 0) === id) {
    return true;
  }
  return false;
};

domHelper.append = function(el, html) {
  var _hdiv, child, j, k, len, len1, ref;
  if (isString(html)) {
    _hdiv = document.createElement('div');
    _hdiv.innerHTML = html;
    ref = _hdiv.childNodes;
    for (j = 0, len = ref.length; j < len; j++) {
      child = ref[j];
      if ((child != null ? child.tagName : void 0) != null) {
        el.appendChild(child);
      }
    }
  } else if (html instanceof HTMLCollection) {
    for (k = 0, len1 = html.length; k < len1; k++) {
      child = html[k];
      el.appendChild(child);
    }
  } else if (html instanceof Element) {
    el.appendChild(html);
  }
  return addD(el);
};

domHelper.prepend = function(el, html) {
  var _firstCh, _hdiv, _latestFirst, child, j, ref, ref1;
  _firstCh = (ref = el.childNodes) != null ? ref[0] : void 0;
  if (_firstCh == null) {
    domHelper.append(el, html);
    return;
  }
  _hdiv = document.createElement('div');
  _hdiv.innerHTML = html;
  _latestFirst = _firstCh;
  ref1 = _hdiv.childNodes;
  for (j = ref1.length - 1; j >= 0; j += -1) {
    child = ref1[j];
    if (!((child != null ? child.tagName : void 0) != null)) {
      continue;
    }
    el.insertBefore(child, _latestFirst);
    _latestFirst = child;
  }
  return el;
};

domHelper.remove = function(el) {
  var i;
  if (el instanceof Element) {
    el.parentElement.removeChild(el);
  }
  if (el instanceof HTMLCollection) {
    i = el.length - 1;
    while (i >= 0) {
      if (el[i] && el[i].parentElement) {
        el[i].parentElement.removeChild(el[i]);
      }
      i--;
    }
  }
  return el;
};

domHelper.replaceWith = function(el, elToRepl) {
  domHelper.parent(el).replaceChild(elToRepl, el);
  return el;
};

domHelper.clone = function(el) {
  return addD(el.cloneNode(true));
};

domHelper.on = function(el, type, handler) {
  if (el == null) {
    return;
  }
  if (el.addEventListener != null) {
    el.addEventListener(type, handler, false);
  } else if (el.attachEvent != null) {
    el.attachEvent('on' + type, handler);
  } else {
    el['on' + type] = handler;
  }
  return el;
};

domHelper.off = function(el, type, handler) {
  if (el == null) {
    return;
  }
  if (el.removeEventListener != null) {
    el.removeEventListener(type, handler, false);
  } else if (el.detachEvent != null) {
    el.detachEvent('on' + type, handler);
  } else {
    delete el['on' + type];
  }
  return el;
};

domHelper.emit = function(el, type) {
  var evt;
  evt = document.createEvent('Event');
  evt.initEvent(type, true, false);
  el.dispatchEvent(evt);
  return evt;
};

module.exports = domHelper;


},{}]},{},[1])(1)
});