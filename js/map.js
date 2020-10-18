//setting
var view = new ol.View({
    center: ol.proj.fromLonLat([121, 23.5]),
    // minZoom: 7.2,
    zoom: 7.5
});
var viewForMove = new ol.View({
    center: ol.proj.fromLonLat([121.555558, 25.072948]), // Taipei
    // minZoom: 7.2,
    zoom: 11.5 // Taipei
});
var raster = new ol.layer.Tile({
    source: new ol.source.XYZ({
        crossOrigin: 'anonymous',
        url: 'https://mt{0-3}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}',
    }),
});
var vector = new ol.layer.Vector({
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
                font: '16px Calibri,sans-serif',
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2
                })
            })
        });
        style.getText().setText(feature.get("COUNTYNAME"));
        return style;
    },
});
var popup = new ol.Overlay({
    element: document.getElementById('popup')
});

function getStyle (countyName) {

    if (countyName == "桃園縣")
        countyName = "桃園市";
    var percentage;
    var color;

    // percentage = +overallData[countyName]["check_ratio"];
    percentage = 1;
    switch (true) {
        case (percentage < 0.4):
            color = [23, 156, 3, 0.1]; // semi-transparent red
            break;
        case (percentage < 0.6):
            color = [23, 156, 3, 0.2]; // semi-transparent orange
            break;
        case (percentage < 0.8):
            color = [23, 156, 3, 0.4]; // semi-transparent yellow
            break;
        case (percentage < 0.9):
            color = [23, 156, 3, 0.55]; // semi-transparent green
            break;
        default:
            color = [23, 156, 3, 0.75]; // semi-transparent green
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
    var drawLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://raw.githubusercontent.com/Bourbon0212/Diana-Visualization/master/assets/twCounty.geojson',
            format: new ol.format.GeoJSON()
        }),
        style: function(feature) {
            let style = getStyle(feature.get('COUNTYNAME'));
            return style;
        }
    });

    mapDraw = new ol.Map({
        target: 'map',
        // layers: [raster, vector],
        layers: [raster, vector, drawLayer],
        // stop zooming with scroll
        view: view
    });
}
