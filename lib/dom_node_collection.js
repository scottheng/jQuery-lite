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
