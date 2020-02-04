function CursorPos() {}
  
Object.assign(CursorPos.prototype, {
    _getCursorPos: function(element, imageDimensions) {
        let xPos = 0, yPos = 0;
        /*calculate the cursor's xPos and yPos coordinates, relative to the image:*/
        xPos = element.pageX - imageDimensions.left;
        yPos = element.pageY - imageDimensions.top;
        /*consider any page scrolling:*/
        xPos = xPos - window.pageXOffset;
        yPos = yPos - window.pageYOffset;
        return {x : xPos, y : yPos};
    }
})


export { CursorPos };
