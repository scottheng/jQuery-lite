/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function(selector) {
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  }
  else {
    const nodeList = document.querySelectorAll(selector);
    const NodeList = Array.from(nodeList);
    return new DOMNodeCollection(NodeList);
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor(nodes) {
    this.nodes = nodes;
  }

  html(string) {
    if (string != undefined) {
      this.nodes.forEach( (node) => {
        node.innerHTML = string;
      })
    }
    else {
      return this.nodes[0].innerHTML();
    }
  }

  empty() {
    this.nodes.forEach( (node) => {
      node.innerHTML = "";
    })
  }

  append(arg) {
    if (typeof arg === "string") {
      this.nodes.forEach( (node) => {
        node.innerHTML.push(arg);
      })
    }
    else {
      this.nodes.forEach( (node) => {
        node.innerHTML.push(arg.outerHTML);
      })
    }
  }

  attr(name, value) {
    if (value != undefined) {
      this.nodes.forEach ( (node) => {
        node.setAttribute(name, value);
      })
    }
    else {
      this.nodes.forEach( (node) => {
        node.getAttribute(name);
      })
    }
  }

  addClass(name) {
    this.nodes.forEach ( (node) => {
      node.className = name;
    })
  }

  removeClass(name) {
    this.nodes.forEach ( (node) => {
      node.className = "";
    })
  }

  children() {
    const children = [];
    this.nodes.forEach ( (node) => {
      const childs = Array.from(node.children);
      childs.forEach( (child) => {
        children.push(child);
      })
    })
    return new DOMNodeCollection(children);
  }

  parent() {
    const parents = [];
    this.nodes.forEach ( (node) => {
      debugger
      parents.push(node.prevObject);
    })
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    const matches = [];
    this.nodes.forEach ( (node) => {
      const matchers = node.querySelectorAll(selector);
      matchers.forEach( (match) => {
        matches.push(match);
      })
    })
    return new DOMNodeCollection(matches);
  }

  remove() {
    this.nodes.forEach ( (node) => {
      node.remove();
    })
  }

  on(type, callback) {
    this.nodes.forEach ( (node) => {
      const event_key = `${type}-callback`;
      node.addEventListener(type, callback);
      if (typeof node[event_key] === 'undefined') {
        node[event_key] = [];
      }
      node[event_key].push(callback);
    });
  }

  off(type) {
    this.nodes.forEach ( (node) => {
      const event_key = `${type}-callback`;
      if (node[event_key]) {
        node[event_key].forEach( (callback) => {
          node.removeEventListener(type, callback);
        })
      }
    })
  }


}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);