/**
 *
 * @author Harshali Talele <https://github.com/harshalitalele/OpenSeadragonDraggableNavigator>
 */
(function($) {
    "use strict";

    //To Do: Test with different versions of OSD
    if (!$.version || $.version.major < 2) {
        throw new Error('This version of OpenSeadragonDraggableNavigator requires OpenSeadragon version 2.0.0+');
    }

    $.Viewer.prototype.setNavigatorDraggable = function(isSet) {
        var droppableElem = this.element;
        var navigatorParent = this.navigator.container.parentElement.parentElement;
        var draggableDivSize = 25;
        if(isSet) {
            if(this.navigator._draggable) {
                return;
            } else {
                var draggableDiv = document.createElement( "div" );
                //To Do: Styling of draggable element
                //To Do: Add a proper icon for draggable element
                draggableDiv.style.width = draggableDivSize + "px";
                draggableDiv.style.height = draggableDivSize + "px";
                draggableDiv.style.backgroundColor = "black";
                draggableDiv.style.zIndex = 99999;
                draggableDiv.style.color = "white";
                draggableDiv.style.textAlign = "center";
                draggableDiv.style.fontWeight = "bolder";
                draggableDiv.textContent = "+";

                draggableDiv.addEventListener("drag", function(event) {
                    var elem = navigatorParent.parentElement;
                    var osdy = droppableElem.getBoundingClientRect().y;
                    var osdx = droppableElem.getBoundingClientRect().x;
                    elem.style.top = event.y - osdy - navigatorParent.scrollHeight + "px";
                    elem.style.left = event.x - osdx + "px";
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