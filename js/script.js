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
};

let myObj1 = new DomElement('.block', '150px', '200px', 'green', '20px');
myObj1.addElem();

let myBlock = document.querySelector('.block');
myBlock.style.cssText = `
height: ${myObj1.height};
width: ${myObj1.width};
background-color: ${myObj1.bg};
font-size: ${myObj1.fontSize};`;

let myObj2 = new DomElement('#best', '200px', '250px', 'yellow', '20px');
myObj2.addElem();

let myPar = document.querySelector('#best');
myPar.style.cssText = `
height: ${myObj2.height};
width: ${myObj2.width};
background-color: ${myObj2.bg};
font-size: ${myObj2.fontSize};`;

