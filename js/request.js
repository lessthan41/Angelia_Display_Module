
function getAllEvent() {
    let url = 'https://angelia-develop.herokuapp.com/event';
    let sel = document.getElementById('eventSel');
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        sel.options.length = 0; // clear options
        let data = response.data.data;
        let option;
        for (i in data) {
            option = document.createElement('option');
            option.text = data[i]['event_name'];
            option.value = data[i]['event_id'];
            sel.appendChild(option);
        }
        getCountyRatio();
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        // console.log('I always Execued');
    });
    return true;
}

function getCountyRatio() {
    let select = document.getElementById('eventSel');
    let event_id = select.options[select.selectedIndex].value;
    let url = 'https://angelia-develop.herokuapp.com/county_status?event_id=' + event_id;
    document.getElementById('countySel').selectedIndex = 0; // reset county
    document.getElementById('districtSel').options.length = 1; // reset district
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        let data = response.data.data;
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

function getCountyList() {
    let url = 'https://angelia-develop.herokuapp.com/county';
    let sel = document.getElementById('countySel');
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        let data = response.data.data;
        for (c = 0; c < data.length; c++) {
            let option = document.createElement('option');
            option.text = data[c]['county_name'];
            option.value = data[c]['county_id'];
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

function getDistrictList() {
    let county = document.getElementById('countySel');
    let county_id = county.options[county.selectedIndex].value;
    let url = 'https://angelia-develop.herokuapp.com/district?county_id=' + county_id;
    let select = document.getElementById('districtSel');
    select.options.length = 1; // clear options
    document.getElementById('districtSel').options.length = 1; // reset district
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        let data = response.data.data;
        for (c = 0; c < data.length; c++) {
            let option = document.createElement('option');
            option.text = data[c]['district_name'];
            option.value = data[c]['district_id'];
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
    let url = 'https://raw.githubusercontent.com/lessthan41/Angelia_Display_Module/master/asset/TW_Dist_simplified.geojson';
    if (district_geojson == undefined) {
        axios({
            method: 'get',
            url: url,
            responseType: 'json',
        })
        .then(function (response) {
            district_geojson = response.data;
            getDistrictRatio();
        })
        .catch(function (error) {
            console.log(error);
        });
    } else {
        getDistrictRatio();
    }

    return true;
}

function getDistrictRatio() {
    let data;
    let event_select = document.getElementById('eventSel');
    let event_id = event_select.options[event_select.selectedIndex].value;
    let county_select = document.getElementById('countySel');
    let county_id = county_select.options[county_select.selectedIndex].value;
    let url = 'https://angelia-develop.herokuapp.com/district_status?event_id=' + event_id + '&county_id=' + county_id;
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        data = response.data.data;
        mapDistrict(data);
    })
    .catch(function (error) {
        console.log(error);
    });

    return true;
}

function getVillageList() {
    let select = document.getElementById('districtSel');
    let district_id = select.options[select.selectedIndex].value;
    let url = 'https://angelia-develop.herokuapp.com/village?district_id=' + district_id;
    clearTable('villTbody');
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        vill_list = response.data.data;
        let tbody = document.getElementById('villTbody');
        for (v in vill_list) {
            let content = [vill_list[v]['village_name'], 0, 0];
            addRow('villTbody', content);
            tbody.rows[tbody.rows.length - 1].onclick = function(item) { // Add Onclick Event
                let vill = item.target.closest('tr').cells[0].innerHTML;
                let vid = vill_list.find(element => element['village_name'] == vill)['village_id'];
                showModal();
                getVillageDetail(vid);
            }
        }
        showTable();
    })
    .catch(function (error) {
        console.log(error);
    });

    return true;
}

function getVillageDetail(vid) {
    let event_select = document.getElementById('eventSel');
    let event_id = event_select.options[event_select.selectedIndex].value;
    let url = 'https://angelia-develop.herokuapp.com/detail?event_id=' + event_id + '&village_id=' + vid;

    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        vill_data = response.data.data;
        knitTable(vill_data);
    })
    .catch(function (error) {
        console.log(error);
    });

    return true;
}
