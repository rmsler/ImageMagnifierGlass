function CursorPos(element, image) {
    if (!(this instanceof CursorPos)) {
      return new CursorPos(imagesArray);
    }
    this.element = element;
    this.image = image;
    this.dimensions;
  }
  
Object.assign(CursorPos.prototype, {
    getCursorPos: function() {
        let a, xPos = 0, yPos = 0;
        /*get the xPos and yPos positions of the image:*/
        a = this.image.getBoundingClientRect();
        /*calculate the cursor's xPos and yPos coordinates, relative to the image:*/
        xPos = this.element.pageX - a.left;
        yPos = this.element.pageY - a.top;
        /*consider any page scrolling:*/
        xPos = xPos - window.pageXOffset;
        yPos = yPos - window.pageYOffset;
        console.log(xPos);
        this.dimensions = {x : xPos, y : yPos};
        return this.dimensions;
    }
})


export { CursorPos };
