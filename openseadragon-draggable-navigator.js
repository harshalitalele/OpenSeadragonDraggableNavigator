/*
    To Dos:
    1. Use proper icon for draggable element
    2. Show icon on hover of navigator
    3. Adjust position of icon on the basis of navigator location
    4. Check if this supports all the OSD versions
    5. Check if this works with toggle navigator functionality
    6. Check if this works with no navigator (Put an initial check or make it visible)
    7. Remove events and icon on reset of draggable feature on navigator
    8. Check for all null pointer exceptions
    9. Make it work for default 'isSet' value
    10. Add JavaScript docs
    11. Review the code and naming conventions
    12. Don't fade navigator if user is dragging it
*/
/******************************************************************************************/

(function($) {
    "use strict";

    //To Do: Test with different versions of OSD
    /*if (!$.version || $.version.major < 2) {
        throw new Error('This version of OpenSeadragonZoomLevels requires OpenSeadragon version 2.0.0+');
    }*/

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
                    //To Do: See if commented code is required
                    //var elem = event.srcElement.parentElement.parentElement;
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