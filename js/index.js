window.onload = function() {
    getAllEvent();
    getCountyList();
    // getTotalRatio();
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
    // enhanceDistrict(); // Todo
}
