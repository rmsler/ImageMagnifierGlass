import { CursorPos } from "./CursorPos.js";

function Magnify(imagesArray) {
  if (!(this instanceof Magnify)) {
    return new Magnify(imagesArray);
  }
  this.domElement;
  this.zoomLevel;
  this.width;
  this.height;
  this.bw = 3;
  this.wrapper;
}

Object.assign(Magnify.prototype, {
  init: function(imgID, zoomLevel) {
    this.zoomLevel = zoomLevel;
    this.wrapper = $(imgID)[0];
    console.log(this.wrapper);
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
    domElement.addEventListener("mousemove", ()=>this.moveMagnifier);
    this.wrapper.mousemove = (e)=> this.moveMagnifier(e, this.wrapper);
    /*and also for touch screens:*/
    domElement.addEventListener("touchmove", () => this.moveMagnifier);
    this.wrapper.mousemove = (e)=>this.moveMagnifier(e, this.wrapper);
    this.domElement = domElement;
    parent.prepend(domElement);
  },
  moveMagnifier: function(e, wrapper){
    e = e || window.event;
    e = e.target || e.srcElement;
    let pos, x, y;
    this.width = e.offsetWidth / 2;
    this.height = e.offsetHeight / 2;
    /*prevent any other actions that may occur when moving over the image*/
    event.preventDefault();
    /*get the cursor's x and y positions:*/
    console.log(wrapper);
    let positions = new CursorPos(e, wrapper);
    pos = positions.getCursorPos();
    //pos = e.addEventListener("mousemove",()=>this.getCursorPos);
    x = pos.x;
    y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > wrapper.width - (this.width / this.zoomLevel)) {x = wrapper.width - (this.width / this.zoomLevel);}
    if (x < this.width / this.zoomLevel) {x = this.width / this.zoomLevel;}
    if (y > wrapper.height - (this.height / this.zoomLevel)) {y = wrapper.height - (this.height / this.zoomLevel);}
    if (y < this.height / this.zoomLevel) {y = this.height / this.zoomLevel;}
    /*set the position of the magnifier glass:*/
    e.style.left = (x - this.width) + "px";
    e.style.top = (y - this.height) + "px";
    /*display what the magnifier glass "sees":*/
    e.style.backgroundPosition = "-" + ((x * this.zoomLevel) - this.width + this.bw) + "px -" + ((y * this.zoomLevel) - this.height + this.bw) + "px";
  },
  // getCursorPos: function(element) {
  //   let a, x = 0, y = 0;
  //   /*get the x and y positions of the image:*/
  //   a = this.img.getBoundingClientRect();
  //   /*calculate the cursor's x and y coordinates, relative to the image:*/
  //   x = element.pageX - a.left;
  //   y = element.pageY - a.top;
  //   /*consider any page scrolling:*/
  //   x = x - window.pageXOffset;
  //   y = y - window.pageYOffset;
  //   console.log(x);
  //   let dimensions = {x : x, y : y};
  //   return dimensions;
  // }
});

export { Magnify };
