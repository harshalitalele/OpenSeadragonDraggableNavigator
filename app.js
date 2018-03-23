var nWSlidesUrl = "http://172.28.42.149:8888/scn/1/";
var nwImgID = "3";

var awsUrl = "https://d36vby8f4ouiom.cloudfront.net/scn/2/1_203_BRT_16_055_TN_2017-03-0610_33_18";

function getNetworkImgUrl() {
    return nWSlidesUrl + nwImgID;
}

function getAWSUrl() {
    return awsUrl;
}

function remoteObjCallback(remoteData) {
    //console.log(JSON.stringify(remoteData));
}

var schemaUrl = awsUrl;
var osd;
function getOSDCallback(osdObj) {
    osd = osdObj;
    osd.setNavigatorDraggable(true);
    osd.startGettingRemoteObject(remoteObjCallback);
}

getOSDViewer(schemaUrl, "contentDiv", getOSDCallback);

function setNavigator(event) {
    var data = event.dataTransfer.getData("text/json");
    //alert(JSON.stringify(data));
    event.target.textContent = data;
    event.preventDefault();
}