//3 public APIs

//getOSDViewer method
var getOSDViewer = (function() {
    function setRemoteConsultingMethods($) {
        $.startGettingRemoteObject = function(callback) {
            var stImageSpecifics = {};
            //add viewport-change handler
            $.addHandler("viewport-change", function() {
                stImageSpecifics.center = $.viewport.getCenter(true);
                //stImageSpecifics.zoom = $.viewport.viewportToImageZoom($.viewport.getZoom(true));
                stImageSpecifics.zoom = $.viewport.getZoom(true);
                stImageSpecifics.containerWd = $.viewport._containerInnerSize.x;
                //do basic process
                callback(stImageSpecifics);
            });
        }

        $.stopGettingRemoteObject = function(callback) {
            //remove viewport-change handler
            //clean data and detach callback method
        }
    }
    
    var levelFolderMap = {};
    var prevLevel = -1;
    var slideURI = "";
    
    function getSlideURI() {
        return slideURI;
    }
    
    function getTileUrls(level, x, y) {
        document.title = level;
        var ifdNum = levelFolderMap[level];
        if(ifdNum != undefined) {
            if(prevLevel != level) {
                prevLevel = level;
            }      
            return getSlideURI() + "/" + ifdNum + "/" + y + "_" + x + ".webp";
        }
        return '';
    }
    
    //Set some default settings
    var osdSettings = {
        id:                     "",
        useCanvas:              false,
        showNavigationControl:  false,
        tileSources:            {
            height: "512",
            width:  "512",
            tileSize: "512",
            getTileUrl: getTileUrls
        },
        showNavigator:          true,
        maxZoomLevel:           64,
        navigatorAutoFade: false,
        minZoomImageRatio: 1,
        maxZoomImageRatio: 1/*,
        defaultZoomLevel: 1*/
    };
    var osd;
    
    //ToDo: Update this method
    //validate schema URL
    function isUrlValid() {
        return true;
    }
    
    function makeAjaxRequest(url, requestType, successCallback, getOSDCallback, failureCallback) {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xmlhttp = new XMLHttpRequest();
         } else {
            // code for old IE browsers
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if(this.status == 200 || this.status == 300) {
                    //Typical action to be performed when the document is ready:
                    //console.log(this.responseText);
                    var schema = JSON.parse(this.responseText);
                    var levelFolderMap = successCallback(schema);
                    updateOsdSettings(schema);
                    var osd = displaySlideImage(levelFolderMap);
                    setRemoteConsultingMethods(osd);
                    getOSDCallback(osd);
                } else {
                    console.log("Error in AJAX call");
                    alert("Error in AJAX call");
                    //throw an error
                    failureCallback();
                }
            }
        };
        xmlhttp.open(requestType, url, true);
        xmlhttp.send();
    }
    
    var defScale = 0.0009765625;
    var originalCenter = [];
    
    function getOriginalCenter(w, h, defW, defH) {
        return [w/defW/0.25, h/defH/0.25];
    }
    
    function getLevelFolderMap(schema) {
        var slideDetails = schema.slideImage;
        var numOfROIs = slideDetails.numOfROIs;
        levelFolderMap = {};
        //No Of ROIs = length(imageProfiles.imageProfile)
        //ToDo: Handle for all the ROIs
        //As of now, this is working only for ROI -> 1
        var imageProfile = slideDetails.imageProfiles.imageProfile[1];
        var ht = imageProfile.imageBounds.bottom;
        var wd = imageProfile.imageBounds.right;
        var imageLayers = imageProfile.layers.layer;
        //ToDo: Make this more generic
        for(var lIndex in imageLayers) {
            var layer = imageLayers[lIndex];
            var defaultLevel = 12;
            if(layer.scale == defScale) {
                console.log("Image Wd and Ht: " + layer.width + " and " + layer.height);
                var h = getDefaultLevelWdHt(layer.height);
                var w = getDefaultLevelWdHt(layer.width);
                console.log("Absolute Wd and Ht: " + w + " and " + h);
                osdSettings.tileSources.height = h/defScale;
                osdSettings.tileSources.width = w/defScale;
                originalCenter = getOriginalCenter(layer.width,layer.height, w, h);
                console.log("New Wd and Ht: " + osdSettings.tileSources.width + " and " + osdSettings.tileSources.height);
            }
            var osdLevel = defaultLevel + 4 - 2*(layer.layerResolution);
            levelFolderMap[osdLevel] = layer.ifdNum;
        }
        console.log(levelFolderMap);
        return levelFolderMap;
    }
    
    function getAbsoluteWdHt(wh) {
        return (Math.ceil(wh/512))*512;
    }
    
    function getDefaultLevelWdHt(wh) {
        var shrinkedToDefaultSize = wh;
        return (Math.ceil(shrinkedToDefaultSize/512))*512;
    }
    
    function updateOsdSettings(schema) {
        osdSettings.tileSources.tileSize = schema.slideImage.tileWidth;
    }
    
    function displaySlideImage(levelFolderMap) {
        osd = OpenSeadragon(osdSettings);
        slideImageSettings();
        return osd;
    }
    
    function getImageInCenter() {
         setTimeout(function() {
            osd.viewport.panTo({x: originalCenter[0], y: originalCenter[1]}, true);
            osd.viewport.update();
        }, 150);
    }
    
    function updateZoomLevel() {
        
    }
    
    function slideImageSettings() {
        //Do something with osd
        getImageInCenter();
        updateZoomLevel();
    }
        
    function getSchemaJSON() {
        //make a REST call
        //onSuccess
            //getLevelFolderMap
            //getTileUrls
            //displaySlideImage - Call OpenSeadragon method to draw image
            //slideImageSettings - Do other image position related and canvas width/height settings
            //return OSD object
        //onFailure - throw error
    }
    
    return function(schemaURI, canvasId, getOSDCallback) {
        slideURI = schemaURI;
        schemaUrl = schemaURI + "/schema.json";
        osdSettings.id = canvasId;
        if(isUrlValid(schemaUrl)) {
            //get OSDViewer
            makeAjaxRequest(schemaUrl, "GET", getLevelFolderMap, getOSDCallback);
        } else {
            console.log("The provided Schema URL is invalid.");
            alert("Please provide valid Schema URL.");
            //throw error
        }
    };
}());



/***************************************  Backup Comments ************************************************/
//get levelFolderMap from schema.json
//getImgUrl method
//Set OSD settings
//on viewport-change event pass a object handler -> socket handler callback method
/*********************************************************************************************************/