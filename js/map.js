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
        url: 'https://raw.githubusercontent.com/Bourbon0212/Diana-Visualization/master/assets/twCounty.geojson',
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
        style.getText().setText(feature.get("COUNTYNAME"));
        return style;
    },
});
var drawLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/Bourbon0212/Diana-Visualization/master/assets/twCounty.geojson',
        // url: 'https://raw.githubusercontent.com/lessthan41/Angelia_Display_Module/master/asset/TW_Vill_simplified.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: function(feature) {
        let style = getStyle(feature.get('COUNTYNAME'));
        return style;
    }
});
var highlightStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(149, 196, 187,0.7)',
  }),
});

function getStyle (countyName) {
    var percentage;
    var color;

    // percentage = +overallData[countyName]["check_ratio"];
    percentage = 1;
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

function mapInit() {
    var selected = null;
    var hoverDiv = document.getElementById('hoverDiv');
    var city = document.getElementById('cityName');

    var map = new ol.Map({
        target: 'map',
        layers: [rasterLayer, drawLayer, nameLayer],
        view: view
    });

    map.on('pointermove', function (e) {
        if (selected !== null) {
            selected.setStyle(undefined);
            selected = null;
        }
        map.forEachFeatureAtPixel(e.pixel, function (f) {
            selected = f;
            f.setStyle(highlightStyle);
            return true;
        });
        if (selected) {
            var x = event.clientX, y = event.clientY;
            hoverDiv.style.marginLeft = x;
            hoverDiv.style.marginTop = y;
            hoverDiv.style.opacity = 1;
            city.innerHTML = '縣市： ' + selected.get('COUNTYNAME');
        } else {
            hoverDiv.style.opacity = 0;
            city.innerHTML = '縣市： ';
        }
    });

    document.getElementById("map").data = map; // store info in #map
}

function mapDistrict(select) {
    var county_name = select.options[select.selectedIndex].innerHTML;
    var map = document.getElementById('map').data;
    var nameStyle = new ol.style.Style({});
    var source = new ol.source.Vector({
        url: 'https://raw.githubusercontent.com/lessthan41/Angelia_Display_Module/master/asset/TW_Dist_simplified.geojson',
        format: new ol.format.GeoJSON()
    });
    var style = function(feature) {
        let style = getStyle(feature.get('TOWNNAME'));
        return style;
    }
    map.getLayers().getArray()[1].setSource(source);
    map.getLayers().getArray()[1].setStyle(style);
    map.getLayers().getArray()[2].setStyle(nameStyle);

    var town = document.getElementById('cityName');
    map.on('pointermove', function (e) {
        map.forEachFeatureAtPixel(e.pixel, function (f) {
            town.innerHTML = '地區： ' + f.get('TOWNNAME');
            return true;
        });
    });

}
