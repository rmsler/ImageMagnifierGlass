import { CursorPos } from "./CursorPos.js";

function Magnify() {
  if (!(this instanceof Magnify)) {
    return new Magnify();
  }
  this.domElement;
  this.zoomLevel;
  this.wrapper;
}

Magnify.prototype = Object.create(CursorPos.prototype);
Object.assign(Magnify.prototype, {
  constructor: Magnify,
  init: function(imgID, zoomLevel) {
    this.zoomLevel = zoomLevel;
    this.wrapper = $(imgID)[0];
    this.renderElements();
    
  },
  renderElements: function() {
     /* Create magnifier glass: */
    let parent = $(this.wrapper).parent()[0];
    let domElement = document.createElement("div");
    this.domElement = domElement;
    this.addStyle();
    this.addEventListeners();
    parent.prepend(domElement);
  },
  addStyle: function(){
    /*set background properties for the magnifier glass:*/
    this.domElement.classList.add("img-magnifier-glass");
    this.domElement.style.backgroundImage = "url('" + this.wrapper.src + "')";
    this.domElement.style.backgroundRepeat = "no-repeat";
    this.domElement.style.backgroundSize = (this.domElement.width * this.zoomLevel) + "px " + (this.domElement.height * this.zoomLevel) + "px";
  },
  addEventListeners: function(){
    /*execute a function when someone moves the magnifier glass over the image:*/
    this.domElement.addEventListener("mousemove", ()=> this.moveMagnifier());
    this.wrapper.mousemove = ()=> this.moveMagnifier();
    /*and also for touch screens:*/
    this.domElement.addEventListener("touchmove", () => this.moveMagnifier());
    this.wrapper.touchmove = ()=>this.moveMagnifier();
  },
  moveMagnifier: function(){
    let w = this.domElement.offsetWidth / 2;
    let h = this.domElement.offsetHeight / 2;
    /*prevent any other actions that may occur when moving over the image*/
    event.preventDefault();
    /*get the cursor's x and y positions:*/
    let pos = this._getCursorPos(event, this.wrapper.getBoundingClientRect());
    let recalibration = this.recalibratePositions(pos.x, pos.y, w, h);
    let x = recalibration.x;
    let y = recalibration.y;
    this.updateMagnifier(x, y, w, h);
  },
  recalibratePositions: function(x, y, w, h){
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > this.wrapper.width - (w / this.zoomLevel)) {x = this.wrapper.width - (w / this.zoomLevel);}
    if (x < w / this.zoomLevel) {x = w / this.zoomLevel;}
    if (y > this.wrapper.height - (h / this.zoomLevel)) {y = this.wrapper.height - (h / this.zoomLevel);}
    if (y < h / this.zoomLevel) {y = h / this.zoomLevel;}
    return {x : x, y : y}
  },
  updateMagnifier: function(x, y, w, h){
    /*set the position of the magnifier glass:*/
    this.domElement.style.left = (x - w) + "px";
    this.domElement.style.top = (y - h) + "px";
    /*display what the magnifier glass "sees":*/
    this.domElement.style.backgroundPosition = "-" + ((x * this.zoomLevel) - (w + this.zoomLevel) )/(this.zoomLevel*1.04/2) + "px -" + ((y * this.zoomLevel) - (h + this.zoomLevel) )/(this.zoomLevel*1.04/2) + "px";
  }
});

export { Magnify };
