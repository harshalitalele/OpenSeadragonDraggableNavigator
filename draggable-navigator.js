//To Do: Test with different POCs
//To Do: Handle against all the navigator options like disable, toggle, outside viewer, etc.

(function($) {
    "use strict";
    
    //To Do: Test with different versions of OSD
    /*if (!$.version || $.version.major < 2) {
        throw new Error('This version of OpenSeadragonZoomLevels requires OpenSeadragon version 2.0.0+');
    }*/
    
    $.Viewer.prototype.setNavigatorDraggable = function(isSet) {
        var droppableElem = this.element;
        var navigatorParent = this.navigator.container.parentElement.parentElement;
        if(isSet) {
            if(this.navigator._draggable) {
               return; 
            } else {
                var draggableDiv = document.createElement( "div" );
                //To Do: Styling of draggable element
                draggableDiv.style.width = "50px";
                draggableDiv.style.height = "50px";
                draggableDiv.style.backgroundColor = "blue";
                draggableDiv.style.zIndex = 99999;
                draggableDiv.style.color = "yellow";
                draggableDiv.textContent = "+";
                draggableDiv.addEventListener("drag", function(event) {
                    //To Do: See if commented code is required
                    //var elem = event.srcElement.parentElement.parentElement;
                    var elem = navigatorParent.parentElement;
                    elem.style.top = event.y;
                    elem.style.left = event.x;
                    elem.style.zIndex = 99999;
                });
                draggableDiv.setAttribute("draggable", "true");
                navigatorParent.append(draggableDiv);
                droppableElem.addEventListener("dragover", function(event) {
                    event.preventDefault();
                });
            }
            this.navigator._draggable = true;
        } else {
            //To Do: detach drag and drop events
            this.navigator._draggable = false;
        }
    };
}(OpenSeadragon));