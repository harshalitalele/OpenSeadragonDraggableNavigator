var osd = OpenSeadragon({
    id:            "contentDiv",
    tileSources:   [
        "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi"
    ],
    showNavigator: true,
    navigatorAutoFade: false,
    showNavigationControl: false
});

osd.setNavigatorDraggable(true);