import { CursorPos } from "./CursorPos.js";

function Magnify() {
  if (!(this instanceof Magnify)) {
    return new Magnify();
  }
  this.domElement;
  this.zoomLevel;
  this.wrapper;
}

Object.assign(Magnify.prototype, {
  init: function(imgID, zoomLevel) {
    this.zoomLevel = zoomLevel;
    this.wrapper = $(imgID)[0];
    this.renderElements();
    
  },
  renderElements: function() {
     /* Create magnifier glass: */
    let parent = $(this.wrapper).parent()[0];
    let domElement = document.createElement("div");
    
    /*set background properties for the magnifier glass:*/
    domElement.classList.add("img-magnifier-glass");
    domElement.style.backgroundImage = "url('" + this.wrapper.src + "')";
    domElement.style.backgroundRepeat = "no-repeat";
    domElement.style.backgroundSize = (domElement.width * this.zoomLevel) + "px " + (domElement.height * this.zoomLevel) + "px";
    /*execute a function when someone moves the magnifier glass over the image:*/
    domElement.addEventListener("mousemove", ()=> this.moveMagnifier());
    this.wrapper.mousemove = ()=> this.moveMagnifier();
    /*and also for touch screens:*/
    domElement.addEventListener("touchmove", () => this.moveMagnifier());
    this.wrapper.touchmove = ()=>this.moveMagnifier();
    this.domElement = domElement;
    parent.prepend(domElement);
  },
  moveMagnifier: function(){
    let w = this.domElement.offsetWidth / 2;
    let h = this.domElement.offsetHeight / 2;
    /*prevent any other actions that may occur when moving over the image*/
    event.preventDefault();
    /*get the cursor's x and y positions:*/
    let positions = new CursorPos();
    let pos = positions.getCursorPos(event, this.wrapper);
    let x = pos.x;
    let y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > this.wrapper.width - (w / this.zoomLevel)) {x = this.wrapper.width - (w / this.zoomLevel);}
    if (x < w / this.zoomLevel) {x = w / this.zoomLevel;}
    if (y > this.wrapper.height - (h / this.zoomLevel)) {y = this.wrapper.height - (h / this.zoomLevel);}
    if (y < h / this.zoomLevel) {y = h / this.zoomLevel;}
    /*set the position of the magnifier glass:*/
    this.domElement.style.left = (x - w) + "px";
    this.domElement.style.top = (y - h) + "px";
    /*display what the magnifier glass "sees":*/
    this.domElement.style.backgroundPosition = "-" + ((x * this.zoomLevel) - (w + this.zoomLevel) )/(this.zoomLevel*1.04/2) + "px -" + ((y * this.zoomLevel) - (h + this.zoomLevel) )/(this.zoomLevel*1.04/2) + "px";
  },
});

export { Magnify };
