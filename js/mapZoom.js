//for zoom_change
var counties = {
    '臺北市': ['Taipei', [121.555558, 25.072948]],
    '基隆市': ['Keelung', [121.723801, 25.130247]],
    '新北市': ['Newtaipei', [121.596121, 25.010076]],
    '宜蘭縣': ['Yeeelan', [121.645922, 24.600284]],
    '桃園市': ['Taoyuan', [121.280965, 24.884941]],
    '新竹市': ['Xinchu_city', [120.942488, 24.787515]],
    '新竹縣': ['Xinchu', [121.166126, 24.670291]],
    '苗栗縣': ['Miaoli', [120.905051, 24.498282]],
    '臺中市': ['Taizhong', [120.937755, 24.225453]],
    '彰化縣': ['Zhanghua', [120.484475, 23.965178]],
    '南投縣': ['Nantou', [120.981433, 23.811067]],
    '嘉義市': ['Jiayi_city', [120.444489, 23.483047]],
    '嘉義縣': ['Jiayi', [120.508871, 23.474318]],
    '雲林縣': ['Yunlin', [120.395599, 23.727391]],
    '臺南市': ['Tainan', [120.328989, 23.152469]],
    '高雄市': ['Kaoshong', [120.605279, 22.971507]],
    '澎湖縣': ['Ponghu', [119.618139, 23.566545]],
    '金門縣': ['Jingman', [118.380078, 24.440651]],
    '屏東縣': ['Pingdon', [120.625981, 22.370858]],
    '臺東縣': ['Taidong', [121.052658, 22.845853]],
    '花蓮縣': ['Hualian', [121.411609, 23.815980]],
    '連江縣': ['LianJian', [119.953364, 26.180745]],
}

function doPan(location) {
    view.animate({
        center: ol.proj.fromLonLat(location),
        duration: 1500
    });
}

function doZoom(location) {
    var zoom;
    if (location == 'Xinchu_city' || location == 'Jiayi_city') {
        zoom = 12.4;
    } else if (location == 'Taipei' || location == 'Keelung' || location == 'Jingman') {
        zoom = 11.5;
    } else if (location == 'Zhanghua') {
        zoom = 11;
    } else if (location == 'Nantou' || location == 'Jiayi') {
        zoom = 9.9;
    } else if (location == 'Kaoshong' || location == 'Pingdon' || location == 'Taidong') {
        zoom = 9.7;
    } else if (location == 'Hualian') {
        zoom = 9.3;
    } else if (location == 'point') {
        zoom = 16.8
    } else if (location == 'pointToPoint') {
        zoom = 13.8
    } else {
        zoom = 10.2;
    }
    view.animate({
        zoom: zoom,
        duration: 1500
    });
}

function moveCounty(county) {
    doZoom(county[0]);
    doPan(county[1]);
}

function changeCounty(select) {
    let countyName = select.options[select.selectedIndex].innerHTML;
    moveCounty(counties[countyName]);
}
