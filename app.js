var osd = OpenSeadragon({
    id:            "contentDiv",
    tileSources:   [
        "http://openseadragon.github.io/example-images/highsmith/highsmith.dzi"
    ],
    showNavigator: true,
    navigatorAutoFade: false,
    showNavigationControl: false
});

osd.setNavigatorDraggable(true);