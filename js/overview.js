
var OVERVIEW_TABLE_ID = 'overviewTbody';

function overview(data) {
    clearTable(OVERVIEW_TABLE_ID);
    let county, pre, intra, img;
    for (i in data) {
        county = data[i]['county_name'];
        pre = data[i]['pre_ratio'] + '%';
        intra = data[i]['intra_ratio'] + '%';
        img = data[i]['img_ratio'] + '%';
        addRow(OVERVIEW_TABLE_ID, [county, pre, intra, img]);
    }
}
