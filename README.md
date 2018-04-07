## OpenSeadragon Draggable Navigator

This is a plugin for [OpenSeadragon](http://openseadragon.github.io/) library, which lets user drag navigator over the viewer area.

### How to Use:

To make navigator provided with OpenSeadragon library draggable, first include 'draggable-navigator.js' file into the project after including OpenSeadragon library.

```markdown

<script src="draggable-navigator.js"></script>

```

Then it can be used like this:

```markdown

var viewer = new OpenSeadragon.Viewer(...);
viewer.setNavigatorDraggable(true);

```

### Demo:

[Demo](https://harshalitalele.github.io/OpenSeadragonDraggableNavigator/)

### To Do:

1. Use proper icon for draggable element
2. Show icon on hover of navigator
3. Adjust position of icon on the basis of navigator location
4. Check if this supports all the OSD versions
5. Remove events and icon on reset of draggable feature on navigator
6. Make it work for default 'isSet' value
7. Don't fade navigator if user is dragging it