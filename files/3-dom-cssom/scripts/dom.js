function Dom(selectorOrElements) {
  if (typeof selectorOrElements == 'string') {
    this.selector = selectorOrElements;
    this.elements = document.querySelectorAll(selectorOrElements);
  }
  else {
    if (selectorOrElements instanceof EventTarget) {
      this.elements = [selectorOrElements];
    }
    else {
      this.elements = selectorOrElements;
    }
  }
};

Dom.createElement = function(options) {
  var element = document.createElement(options.tag),
      attributes = Object.keys(options.attributes || {}),
      i = 0;

  for(i; i < attributes.length; i++) {
    element.setAttribute(attributes[i], options.attributes[attributes[i]]);
  }

  element.textContent = options.content;

  return element;
};

Dom.prototype.append = function(newChildElement) {
  var i = 0;

  if (!(newChildElement instanceof Element)) {
    if (newChildElement.hasOwnProperty('tag')) {
      newChildElement = Dom.createElement(newChildElement);
    }
  }

  for (i; i < this.elements.length; i++) {
    this.elements[i].appendChild(newChildElement);
  }
};

Dom.prototype.html = function(htmlString) {
  var i = 0,
      f = 0;

  var fragment = document.createDocumentFragment();
  var root = Dom.createElement({
    tag: 'div',
    attributes: {
      id: 'root'
    }
  });
  root.innerHTML = htmlString;

  for (f; f < root.childNodes.length; f++) {
    fragment.appendChild(root.childNodes[f].cloneNode(true));
  }

  root = null;

  for (i; i < this.elements.length; i++) {
    // this.elements[i].innerHTML = htmlString;
    this.elements[i].appendChild(fragment.cloneNode(true));
  }
};

Dom.prototype.children = function() {
  if (this.elements[0] !== undefined) {
    return new Dom(this.elements[0].children);
  }
  else {
    return Dom.empty([]);
  }
};

Dom.prototype.get = function(attributeName) {
  var i = 0,
      attributeValues = [];

  for (i; i < this.elements.length; i++) {
    attributeValues.push(this.elements[i].getAttribute(attributeName));
  }

  return attributeValues;
};

Dom.prototype.set = function(attributeName, attributeValue) {
  var i = 0;

  for (i; i < this.elements.length; i++) {
    this.elements[i].setAttribute(attributeName, attributeValue);
  }
};

Dom.prototype.unset = function(attributeName) {
  var i = 0;

  for (i; i < this.elements.length; i++) {
    this.elements[i].removeAttribute(attributeName);
  }
};

Dom.prototype.has = function(attributeName) {
  var i = 0,
      hasAttributeValues = [];

  for (i; i < this.elements.length; i++) {
    hasAttributeValues.push(this.elements[i].hasAttribute(attributeName));
  }

  return hasAttributeValues;
};

Dom.prototype.on = function (eventName, callback) {
  var i = 0,
      eventIdentifier = this.selector + ':' + eventName;

  if (this.events == undefined) {
    this.events = {};
  }

  if (this.events[eventIdentifier] == undefined) {
    this.events[eventIdentifier] = [];
  }

  this.events[eventIdentifier].push(callback);

  for (i; i < this.elements.length; i++) {
    this.elements[i].addEventListener(eventName, callback, true);
  }
};

Dom.prototype.off = function(eventName) {
  var i = 0,
      e = 0,
      eventIdentifier = this.selector + ':' + eventName;

  if (this.events == undefined) {
    this.events = {};
  }

  if (this.events[eventIdentifier] != undefined) {
    for (e; e < this.events[eventIdentifier].length; e++) {
      var callback = this.events[eventIdentifier][e];

      for (i; i < this.elements.length; i++) {
        this.elements[i].removeEventListener(eventName, callback, true);
      }
    }
  }

  this.events[eventIdentifier] = [];
};