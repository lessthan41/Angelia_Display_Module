
function getCounty() {
    let url = 'http://angelia-develop.herokuapp.com/county';
    let sel = document.getElementById('countySel');
    axios.get(url)
        .then(function (response) {
            let data = response.data;
            let counties = Object.keys(data);
            for (c = 0; c < counties.length; c++) {
                let option = document.createElement("option");
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
}

function getDistrict(select) {
    county_id = select.options[select.selectedIndex].value;
    let url = 'http://angelia-develop.herokuapp.com/district?county_id=' + county_id;
    let sel = document.getElementById('districtSel');
    sel.options.length = 1 // clear options
    axios.get(url)
        .then(function (response) {
            let data = response.data;
            let district = Object.keys(data);
            for (c = 0; c < district.length; c++) {
                let option = document.createElement("option");
                option.text = district[c];
                option.value = data[district[c]];
                sel.appendChild(option);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // console.log('I always Execued');
        });
}
