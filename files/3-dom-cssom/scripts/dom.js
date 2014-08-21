function Dom(selectorOrElements) {
  if (typeof selectorOrElements === 'string') {
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

function dom(selectorOrElements) {
  return new Dom(selectorOrElements);
};

Dom.prototype.at = function(index) {
  return this.elements[index];
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
    this.elements[i].textContent = '';
  }

  for (i = 0; i < this.elements.length; i++) {
    this.elements[i].innerHTML = htmlString;
    // this.elements[i].appendChild(fragment.cloneNode(true));
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

  if (this.events === undefined) {
    this.events = {};
  }

  if (this.events[eventIdentifier] === undefined) {
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

  if (this.events === undefined) {
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

Dom.match = function(element, selector) {
  var matchesSelector = element.matchesSelector || element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.msMatchesSelector;

  return matchesSelector.call(element, selector);
};

Dom.prototype.delegate = function(eventName, selector, callback) {
  var i = 0,
      eventIdentifier = selector + ':' + eventName;

  if (this.events === undefined) {
    this.events = {};
  }

  if (this.events[eventIdentifier] === undefined) {
    this.events[eventIdentifier] = [];
  }

  this.events[eventIdentifier].push(callback);

  for (i; i < this.elements.length; i++) {
    this.elements[i].addEventListener(eventName, function(e) {
      if (Dom.match(e.target, selector)) {
        callback(e);
      }
    }, true);
  }
};

Dom.prototype.style = function() {
  var i = 0;

  var styles = [];

  for (i; i < this.elements.length; i++) {
    styles.push(window.getComputedStyle(this.elements[i]));
  }

  return styles;
};

Dom.prototype.addClass = function(className) {
  var i = 0;

  for (i; i < this.elements.length; i++) {
    this.elements[i].classList.add(className);
  }
};

Dom.prototype.removeClass = function(className) {
  var i = 0;

  for (i; i < this.elements.length; i++) {
    this.elements[i].classList.remove(className);
  }
};

Dom.prototype.hasClass = function(className) {
  var i = 0,
      hasClass = [];

  for (i; i < this.elements.length; i++) {
    hasClass.push(this.elements[i].classList.contains(className));
  }

  return hasClass;
};

Dom.prototype.first = function() {
  return new Dom(this.elements[0]);
};

Dom.prototype.last = function() {
  return new Dom(this.elements[this.elements.length - 1]);
};

Dom.prototype.firstChild = function() {
  return new Dom(this.elements[0].firstElementChild);
};

Dom.prototype.lastChild = function() {
  return new Dom(this.elements[0].lastElementChild);
};

Dom.prototype.firstSibling = function() {
  return new Dom(this.elements[0].parentNode.firstElementChild);
};

Dom.prototype.lastSibling = function() {
  return new Dom(this.elements[0].parentNode.lastElementChild);
};

Dom.prototype.isFirstSibling = function() {
  return this.elements[0] === this.elements[0].parentNode.firstElementChild;
};

Dom.prototype.isLastSibling = function() {
  return this.elements[0] === this.elements[0].parentNode.lastElementChild;
};

Dom.prototype.index = function() {
  return Array.prototype.indexOf.call(this.elements[0].parentNode.children, this.elements[0]);
};

Dom.prototype.next = function() {
  return new Dom(this.elements[0].nextElementSibling);
};

Dom.prototype.previous = function() {
  return new Dom(this.elements[0].previousElementSibling);
};

Dom.prototype.value = function() {
  var element = this.elements[0];
  if (element instanceof HTMLInputElement) {
    return this.elements[0].value;
  }
  else {
    return this.elements[0].textContent;
  }
};