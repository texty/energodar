

mapboxgl.accessToken = 'pk.eyJ1IjoiZXZnZXNoYWRyb3pkb3ZhIiwiYSI6ImNqOWRhbnk3MDI4MGIycW9ya2hibG9pNm8ifQ.8VxS8cKEypk08xfgUgbsHw';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [34.5980, 47.5089],
    zoom: 12.8,
    pitch: 50,
    bearing: 0,
    antialias: true
});

// map.on('style.load', () => {
//     map.addSource('mapbox-dem', {
//     'type': 'raster-dem',
//     'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
//     'tileSize': 512,
//     'maxzoom': 14
//     });
//     // add the DEM source as a terrain layer with exaggerated height
//     map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
//     });

map.scrollZoom.disable();

map.on('load', function () {

    map.addSource("polygon", {
        "type": "geojson",
        'data': "polygons.geojson"
    });

    map.addSource("points", {
        "type": "geojson",
        'data': "points.geojson"
    });

    map.addLayer({
        "id": "boundary-layer",
        'type': 'fill',
        "source": "polygon",
        'paint': {
            'fill-color': "red",
            'fill-opacity': 0.1
        }
    });

    map.addLayer({
        "id": "points-layer",
        'type': 'circle',
        "source": "points",
        'paint': {
            'circle-radius': 4,
            'circle-color': 'black'

        }
    });

});

map.on("click", function (e) {
    map.setPaintProperty(
        'points-layer', 
        'circle-color', 
        ['match', ['get', 'id'], 'p6', "green" , "red"]
      );
});

var container = document.querySelector('#scroll');
var graphic = document.querySelector('#scroll > .scroll__graphic'); //container.select('.scroll__graphic');
var text = document.querySelector('#scroll > .scroll__text'); //container.select('.scroll__text');
var step = document.querySelector('#scroll > .scroll__text > .step'); // text.selectAll('.step');
var scroller = scrollama();

    function handleStepEnter(r) {  
        if(r.index === 1){

        }
    
    }

    function init() {   
        scroller.setup({
            container: '#scroll',
            graphic: '.scroll__graphic',
            text: '.scroll__text',
            step: '.scroll__text .step',
            offset: 0.5,
            debug: true
        })
            .onStepEnter(handleStepEnter);
    
    }
    init();
