
function getAllEvent() {
    let url = 'http://angelia-develop.herokuapp.com/event';
    let sel = document.getElementById('eventSel');
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        sel.options.length = 0; // clear options
        let data = response.data;
        let option;
        for (i in data) {
            option = document.createElement('option');
            option.text = data[i]['event_name'];
            option.value = data[i]['event_id'];
            sel.appendChild(option);
        }
        getEvent();
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        // console.log('I always Execued');
    });
    return true;
}

function getEvent() {
    let select = document.getElementById('eventSel');
    let event_idx = select.options[select.selectedIndex].value;
    let url = 'http://angelia-develop.herokuapp.com/county_status?event_id=' + event_idx;
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        let data = response.data;
        mapCounty(data); // draw county map
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        // console.log('I always Execued');
    });
    return true;
}

function getCounty() {
    let url = 'http://angelia-develop.herokuapp.com/county';
    let sel = document.getElementById('countySel');
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        let data = response.data;
        let counties = Object.keys(data);
        for (c = 0; c < counties.length; c++) {
            let option = document.createElement('option');
            option.text = counties[c];
            option.value = data[counties[c]];
            sel.appendChild(option);
        }
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        // console.log('I always Execued');
    });
    return true;
}

function getDistrict() {
    let county = document.getElementById('countySel');
    let county_id = county.options[county.selectedIndex].value;
    let url = 'http://angelia-develop.herokuapp.com/district?county_id=' + county_id;
    let select = document.getElementById('districtSel');
    select.options.length = 1; // clear options
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        let data = response.data;
        let district = Object.keys(data);
        for (c = 0; c < district.length; c++) {
            let option = document.createElement('option');
            option.text = district[c];
            option.value = data[district[c]];
            select.appendChild(option);
        }
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        // console.log('I always Execued');
    });
    return true;
}

function getDistrictGeojson() {
    var url = 'https://raw.githubusercontent.com/lessthan41/Angelia_Display_Module/master/asset/TW_Dist_simplified.geojson'
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        let data = response.data;
        mapDistrict(data);
    })
    .catch(function (error) {
        console.log(error);
    });
    return true;
}
