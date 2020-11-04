window.onload = function() {
    getAllEvent();
    getCountyList();
    document.body.style.visibility = 'visible';
};

function changeEventSel() {
    getCountyRatio();
    globalScope();
    hideTable();
}

function changeCountySel() {
    changeCounty();
    getDistrictList();
    getDistrictGeojson();
    hideTable();
}

function changeDistrictSel() {
    getVillageList();
}
