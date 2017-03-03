const DOMNodeCollection = require("./dom_node_collection.js");

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
