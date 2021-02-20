'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.addElem = function() {
  if (this.selector[0] === '.') {
    document.body.insertAdjacentHTML('beforeend', `<div class="${this.selector.slice(1)}">Это div</div>`); 

  } else if (this.selector[0] === '#') {
    document.body.insertAdjacentHTML('beforeend', `<p id="${this.selector.slice(1)}">Это параграф</p>`);  
  }

  for (let elem of document.body.children) {
    if(elem.matches(this.selector)) {
      elem.style.cssText = `
      height: ${this.height};
      width: ${this.width};
      background-color: ${this.bg};
      font-size: ${this.fontSize};`;
    } 
  }  
};

let myObj1 = new DomElement('.block', '150px', '200px', 'green', '25px');
myObj1.addElem();
let myObj2 = new DomElement('#best', '200px', '250px', 'yellow', '30px');
myObj2.addElem();


