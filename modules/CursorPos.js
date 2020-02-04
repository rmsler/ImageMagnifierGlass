function CursorPos() {
    if (!(this instanceof CursorPos)) {
      return new CursorPos();
    }
    this.dimensions;
  }
  
Object.assign(CursorPos.prototype, {
    getCursorPos: function(element, imageDimensions) {
        let xPos = 0, yPos = 0;
        /*calculate the cursor's xPos and yPos coordinates, relative to the image:*/
        xPos = element.pageX - imageDimensions.left;
        yPos = element.pageY - imageDimensions.top;
        /*consider any page scrolling:*/
        xPos = xPos - window.pageXOffset;
        yPos = yPos - window.pageYOffset;
        this.dimensions = {x : xPos, y : yPos};
        return this.dimensions;
    }
})


export { CursorPos };
