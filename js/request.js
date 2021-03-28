
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
        getTotalRatio();
        getCountyRatio();
    })
    .catch(function (error) {
        console.log(url);
    })
    .finally(function () {
        // console.log('I always Execued');
    });
    return true;
}

function getTotalRatio() {
    let select = document.getElementById('eventSel');
    let event_id = select.options[select.selectedIndex].value;
    let url = 'https://angelia-develop.herokuapp.com/province_status?event_id=' + event_id;
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        let data = response.data.data;
        document.getElementById('totalPreFillRatio').innerHTML = data['pre_ratio'] + ' %';
        document.getElementById('totalIntraFillRatio').innerHTML = data['intra_ratio'] + ' %';
        document.getElementById('totalImageFillRatio').innerHTML = data['img_ratio'] + ' %';
    })
    .catch(function (error) {
        console.log(url);
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
        overview(data); // update overview list
        mapCounty(data); // draw county map
    })
    .catch(function (error) {
        console.log(url);
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
        console.log(url);
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
        console.log(url);
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
            console.log(url);
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
        console.log(url);
    });

    return true;
}

function getVillageList() {
    let event_select = document.getElementById('eventSel');
    let event_id = event_select.options[event_select.selectedIndex].value;
    let select = document.getElementById('districtSel');
    let district_id = select.options[select.selectedIndex].value;
    let url = 'https://angelia-develop.herokuapp.com/village?event_id=' + event_id + '&district_id=' + district_id;
    clearTable('villTbody');
    axios({
        method: 'get',
        url: url,
        responseType: 'json',
    })
    .then(function (response) {
        vill_list = response.data.data;
        let tbody = document.getElementById('villTbody'),
            alert_A = '<i class="fas fa-exclamation-triangle" style="color: rgb(255,0,0)"></i>',
            alert_B = '<i class="fas fa-exclamation-triangle" style="color: rgb(255,153,51)"></i>',
            alert_C = '<i class="fas fa-exclamation-triangle" style="color: rgb(255,255,0)"></i>',
            check_A = '<i class="fas fa-check-square" style="font-size: large;"></i>',
            check_B = '<i class="far fa-square" style="font-size: large;"></i>';

        for (v in vill_list) {
            let alert = '', check = '';
            if (vill_list[v]['slv_none'])
                alert += '-';
            else {
                if (vill_list[v]['slv_A'])
                    alert += alert_A;
                if (vill_list[v]['slv_B'])
                    alert += ' ' + alert_B;
                if (vill_list[v]['slv_C'])
                    alert += ' ' + alert_C;
            }

            if (vill_list[v]['is_active'])
                check = check_A;
            else
                check = check_B;

            let content = [alert, vill_list[v]['village_name'], vill_list[v]['user_name'], check];
            addRow('villTbody', content);
            tbody.rows[tbody.rows.length - 1].onclick = function(item) { // Add Onclick Event
                let vill = item.target.closest('tr').cells[1].innerHTML;
                let vid = vill_list.find(element => element['village_name'] == vill)['village_id'];
                showModal();
                getVillageDetail(vid);
            }
        }
        showTable();
    })
    .catch(function (error) {
        console.log(url);
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
        console.log(url);
    });

    return true;
}
