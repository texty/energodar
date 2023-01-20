var iW = window.innerWidth;
var main_zoom = iW > 800 ? 14.5 : 14;

var map_center = [34.586999, 47.511116]

mapboxgl.accessToken = 'pk.eyJ1IjoiZXZnZXNoYWRyb3pkb3ZhIiwiYSI6ImNqOWRhbnk3MDI4MGIycW9ya2hibG9pNm8ifQ.8VxS8cKEypk08xfgUgbsHw';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-v9',
    //style: 'mapbox://styles/mapbox/light-v11',
    center: map_center,
    zoom: main_zoom,
    pitch: 0,
    bearing: 0,
    antialias: true
});




map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl(),  'top-left');

map.on('load', function () {

    if(window.innerWidth > 800){
        d3.select(".scroll__graphic").style("z-index", 0)}

//     map.addSource('bla.tile',{
//         'type': 'raster',
//         'tiles': ['https://thallium.texty.org.ua/maps/energodar/tiles_webp/{z}/{x}/{y}.webp'],
//         'tileSize': 150
//     })

// map.addLayer({
//         'id': 'bla',
//         'type': 'raster',
//         'source': 'bla.tile'
//     })

    map.addSource('picture1', { 
        'type': 'image',  
        'url': 'img/15_11 копія 2.png', 
        'coordinates': [
            [34.600294,47.504517],
            [34.624802,47.504517],
            [34.624650,47.495463],
            [34.600264,47.495433]
        ]              
    });  

    map.addSource('picture2', { 
        'type': 'image',  
        'url': 'img/15_10 копія.png', 
        'coordinates': [
            [34.5354264,47.5306849],
            [34.5426339,47.5306849],
            [34.5426002,47.5279939],
            [34.5354376,47.5280015]
        ]              
    });  
            
    map.addLayer({
        id: 'tif',
        'type': 'raster',
        'source': 'picture1',
        'minzoom': 12, 
        'layout': {
            // Make the layer visible by default.
            //'visibility': 'none'
            },
        'paint': {
            'raster-fade-duration': 0,
            
        }
        });

        map.addLayer({
            id: 'tif2',
            'type': 'raster',
            'source': 'picture2',
            'minzoom': 12, 
            'layout': {
                // Make the layer visible by default.
                //'visibility': 'none'
                },
            'paint': {
                'raster-fade-duration': 0,
                
            }
            });

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
        
        "layout": {
            "fill-sort-key": ["to-number", ["get", "area"]],
           
        },
        'paint': {
            'fill-color': "#FF00FF",
            'fill-opacity': 0.2
        }
    });

    map.setFilter(  'boundary-layer', ["match", ["get", "id"], [""], true, false])


    map.addLayer({
        "id": "points-layer",
        'type': 'circle',
        "source": "points",
        'paint': {
            'circle-radius': 4,
            'circle-color': '#01FFFF',
            "circle-opacity": 0,
            // "circle-stroke-width": 1,
            // "circle-stroke-color": "black"

        }
    });

const index_locations = {
    0: {"coords": [34.586999, 47.511116], "zoom": main_zoom }, 
    1: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    2: {"coords":[34.587287,47.506251], "zoom": main_zoom },
    3: {"coords":[34.586999, 47.511116], "zoom": iW > 800 ? 14 : 13.5 },
    4: {"coords":[34.612, 47.4989], "zoom": main_zoom },
    5: {"coords":[34.591758,47.510318], "zoom": main_zoom },
    6: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    7: {"coords":[34.586577,47.508072], "zoom": main_zoom },
    8: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    9: {"coords": [34.590475,47.514544], "zoom": main_zoom },
    10: {"coords":[34.585205,47.500703], "zoom": main_zoom },
    11: {"coords":[34.594374,47.514739], "zoom": main_zoom },
    12: {"coords":[34.584205,47.507104], "zoom": main_zoom },
    13: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    14: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    15: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    16: {"coords":[34.594231,47.513551], "zoom": main_zoom },
    17: {"coords":[34.586999, 47.511116], "zoom": main_zoom - 0.5 },
    18: {"coords":[34.586999, 47.511116], "zoom": main_zoom - 0.5 },
    19: {"coords":[34.586999, 47.511116], "zoom": main_zoom - 0.5 },
    20: {"coords":[34.55026,47.51112], "zoom": 12 },
    21: {"coords":[34.586999, 47.511116], "zoom": main_zoom - 0.5 },
    22: {"coords":[34.590182,47.514252], "zoom": main_zoom },
    23: {"coords":[34.590182,47.514252], "zoom": main_zoom },
    24: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    25: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    26: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    27: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    28: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
    29: {"coords":[34.586999, 47.511116], "zoom": main_zoom },
}





var container = document.querySelector('#scroll');
var graphic = document.querySelector('#scroll > .scroll__graphic'); //container.select('.scroll__graphic');
var text = document.querySelector('#scroll > .scroll__text'); //container.select('.scroll__text');
var step = document.querySelector('#scroll > .scroll__text > .step'); // text.selectAll('.step');
var scroller = scrollama();
      
function handleStepEnter(r) {  
    let myarr = $(r.element).data("polygons");
    let myarr2 = $(r.element).data("points");

    map.setFilter('boundary-layer', ["match", ["get", "id"], myarr, true, false]);

    // d3.selectAll("show-popup").on("mouseover", function(d){
        
    //     let clickCoords = d3.select(this).attr("data-click");

    //     console.log()
    //     map.fireEvent('mouseenter', {latlng: L.latLng(clickCoords[0],clickCoords[1])});

    // });


    
    // map.setPaintProperty(
    //     'boundary-layer', 
        
    //     'fill-opacity', 
    //         ['case',['in', ['get','id'], ['literal', myarr]], 0.5, 0]
    //     ),

    map.setPaintProperty(
        'points-layer', 
        'circle-opacity', 
            ['case',['in', ['get','id'], ['literal', myarr2]], 1, 0]
        );

        map.flyTo({
            center: index_locations[r.index].coords,
            zoom: index_locations[r.index].zoom,
            duration: 1200, 
            essential: true
        })

}
      
function init() {   
    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step',
        offset: iW > 800 ? 0.5 : 0.6,
        debug: false
    })
        .onStepEnter(handleStepEnter);

}
init();


});

var popup = new mapboxgl.Popup({
    closeOnClick: false,
    offset: [0, -15]
  })


map.on('mouseenter', 'boundary-layer', (e) => {
    
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates[0].slice();
    const description = e.features[0].properties.title;
    
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup
    .setLngLat([e.lngLat.lng, e.lngLat.lat])
    .setHTML(description)
    .addTo(map);
});


map.on('mouseenter', 'points-layer', (e) => {
    console.log(e.features[0].geometry.coordinates)
    
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.name;

    
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    popup
    .setLngLat([e.features[0].geometry.coordinates[0], e.features[0].geometry.coordinates[1]])
    .setHTML(description)
    .addTo(map);
});

    // map.on('mouseenter', 'boundary-layer', () => {
    //     map.getCanvas().style.cursor = 'pointer';
    // });
     
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'boundary-layer', () => {
        popup.remove();
    });

    map.on('mouseleave', 'points-layer', () => {
        popup.remove();
    });







