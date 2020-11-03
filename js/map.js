// setting
var view = new ol.View({
    center: ol.proj.fromLonLat([121, 23.5]),
    minZoom: 7.2,
    zoom: 7.5
});
var rasterLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    }),
});
var nameLayer = new ol.layer.Vector({
    renderMode: 'image',
    source: new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/lessthan41/Angelia_Display_Module/master/asset/TW_County.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: function(feature) {
        let style = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#c7daf3',
                width: 1
            }),
            text: new ol.style.Text({
                font: '550 15px 微軟正黑體',
                fill: new ol.style.Fill({
                    color: 'white'
                }),
            })
        });
        style.getText().setText(feature.get('COUNTYNAME'));
        return style;
    },
});
var drawLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/lessthan41/Angelia_Display_Module/master/asset/TW_County.geojson',
        // url: 'https://raw.githubusercontent.com/lessthan41/Angelia_Display_Module/master/asset/TW_Vill_simplified.geojson',
        format: new ol.format.GeoJSON()
    }),
});
var highlightStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(149, 196, 187,0.7)',
    }),
});
var map = new ol.Map({
    target: 'map',
    layers: [rasterLayer, drawLayer, nameLayer],
    view: view
});

var selected = null;
map.on('pointermove', function(e) {
    if (selected !== null) {
        selected.setStyle(undefined);
        selected = null;
    }
    map.forEachFeatureAtPixel(e.pixel, function(f) {
        selected = f;
        f.setStyle(highlightStyle);
        return true;
    });
    if (selected) {
        var x = event.clientX,
            y = event.clientY;
        hoverDiv.style.marginLeft = x;
        hoverDiv.style.marginTop = y;
        hoverDiv.style.opacity = 1;
    } else {
        hoverDiv.style.opacity = 0;
    }
});

document.getElementById('map').data = map; // store info in #map

function getStyle(data, countyId) {
    var percentage;
    var color;
    for (i in data) {
        if (countyId.startsWith(i))
            percentage = data[i]['img_ratio']; // TO BE CONTINUED
    }
    switch (true) {
        case (percentage < 0.4):
            color = [23, 156, 3, 0.1];
            break;
        case (percentage < 0.6):
            color = [23, 156, 3, 0.2];
            break;
        case (percentage < 0.8):
            color = [23, 156, 3, 0.4];
            break;
        case (percentage < 0.9):
            color = [23, 156, 3, 0.55];
            break;
        default:
            color = [23, 156, 3, 0.75];
            break;
    }

    return (
        new ol.style.Style({
            fill: new ol.style.Fill({
                color: color
            }),
            stroke: new ol.style.Stroke({
                color: '#C4E1FF',
                width: 1
            }),
            text: new ol.style.Text({
                font: '12px Calibri,sans-serif',
                stroke: new ol.style.Stroke({
                    color: '#FFF',
                    width: 2
                })
            })
        })
    );
}

function mySource(vill_geojson, county_name) {
    var feature, vectorSource;
    var item = vill_geojson;
    var new_item = {
        'type': 'FeatureCollection',
        'features': []
    };

    for (i in item['features']) {
        if (item['features'][i]['properties']['COUNTYNAME'] == county_name) {
            if (item['features'][i]['geometry']['type'] == 'Polygon') {
                let polygon = [];
                let _coor;
                for (j in item['features'][i]['geometry']['coordinates'][0]) {
                    _coor = ol.proj.fromLonLat(item['features'][i]['geometry']['coordinates'][0][j]);
                    polygon.push(_coor);
                }
                new_item['features'].push(item['features'][i]);
                let len = new_item['features'].length - 1;
                for (j in new_item['features'][len]['geometry']['coordinates'][0]) {
                    new_item['features'][len]['geometry']['coordinates'][0][j] = polygon[j];
                }
            }
            else { // multi-polygon

                let polygon_collection = [];
                for (j in item['features'][i]['geometry']['coordinates']) {
                    let polygon = [];
                    let _coor;
                    for (k in item['features'][i]['geometry']['coordinates'][j][0]) {
                        _coor = ol.proj.fromLonLat(item['features'][i]['geometry']['coordinates'][j][0][k]);
                        polygon.push(_coor);
                    }
                    polygon_collection.push([polygon]);
                }
                new_item['features'].push(item['features'][i]);
                new_item['features'][new_item['features'].length - 1]['geometry']['coordinates'] = polygon_collection;
            }
        }
    }

    new_item['features'] = Object.values(new_item['features']);
    feature = (new ol.format.GeoJSON()).readFeatures(new_item);
    vectorSource = new ol.source.Vector({
        features: feature
    });

    return vectorSource;
}

function mapCounty(data) {
    var hoverDiv = document.getElementById('hoverDiv');
    var name = document.getElementById('cityName');
    var style = function(feature) { // color
        let style = getStyle(data, feature.get('COUNTYSN'));
        return style;
    };

    map.getLayers().getArray()[1].setStyle(style);
    map.on('pointermove', function(e) {
        map.forEachFeatureAtPixel(e.pixel, function(f) {
            name.innerHTML = '縣市： ' + f.get('COUNTYNAME');
            return true;
        });
    });
}

function mapDistrict(vill_geojson) {
    let select = document.getElementById('countySel');
    var county_name = select.options[select.selectedIndex].innerHTML;
    var map = document.getElementById('map').data;
    var nameStyle = new ol.style.Style({}); // don't label name
    var source = mySource(vill_geojson, county_name); // filter county
    var style = function(feature, data) { // color
        let style = getStyle(data, feature.get('TOWNID'));
        return style;
    };

    map.getLayers().getArray()[1].setSource(source);
    map.getLayers().getArray()[1].setStyle(style);
    map.getLayers().getArray()[2].setStyle(nameStyle);

    var name = document.getElementById('cityName');
    map.on('pointermove', function(e) {
        map.forEachFeatureAtPixel(e.pixel, function(f) {
            name.innerHTML = '地區： ' + f.get('TOWNNAME');
            return true;
        });
    });
}
