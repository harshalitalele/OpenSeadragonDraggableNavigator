## OpenSeadragon Draggable Navigator

This is a plugin for [OpenSeadragon](http://openseadragon.github.io/) library, which lets user drag navigator over the viewer area.

### How to Use:

To make navigator provided with OpenSeadragon library draggable, first include ```'/openseadragon-draggable-navigator.js'``` file into the project after including OpenSeadragon library.

```markdown

<script src="openseadragon-draggable-navigator.js"></script>

```

Then it can be used like this:

```markdown

var viewer = new OpenSeadragon.Viewer(...);
viewer.setNavigatorDraggable(true);

```

### Demo:

[Demo](https://harshalitalele.github.io/OpenSeadragonDraggableNavigator/)

### To Do:

1. <s>Use proper icon for draggable element</s>
2. Show icon on hover of navigator
3. Adjust position of icon on the basis of navigator location
4. Check if this supports all the OSD versions
5. <s>Remove events and icon on reset of draggable feature on navigator</s>
6. <s>Make it work for default 'isSet' value</s>
7. Don't fade navigator if user is dragging it