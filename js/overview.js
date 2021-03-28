
var OVERVIEW_TABLE_ID = 'overviewTbody';

function overview(data) {
    clearTable(OVERVIEW_TABLE_ID);
    let county, pre, intra, img;
    for (i in data) {
        county = data[i]['county_name'];
        pre = data[i]['pre_ratio'] * 100 + '%';
        intra = data[i]['intra_ratio'] * 100 + '%';
        img = data[i]['img_ratio'] * 100 + '%';
        addRow(OVERVIEW_TABLE_ID, [county, pre, intra, img]);
    }
}
