function Dom(selectorOrElements) {
  if (typeof selectorOrElements == 'string') {
    this.selector = selectorOrElements;
    this.elements = document.querySelectorAll(selectorOrElements);
  }
  else {
    this.elements = selectorOrElements;
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

  return this;
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