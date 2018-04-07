var osd = OpenSeadragon({
    id:            "contentDiv",
    tileSources:   [
        "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi"
    ],
    showNavigator: true,
    navigatorAutoFade: false,
    showNavigationControl: false
}), isNavDraggable = true;

function toggleNavDrag() {
	isNavDraggable = !isNavDraggable;
	osd.setNavigatorDraggable(isNavDraggable);
}

osd.setNavigatorDraggable(isNavDraggable);
