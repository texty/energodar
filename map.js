var map_center = window.innerWidth > 800 ? [34.5970, 47.5089] : [34.5870, 47.5089]

mapboxgl.accessToken = 'pk.eyJ1IjoiZXZnZXNoYWRyb3pkb3ZhIiwiYSI6ImNqOWRhbnk3MDI4MGIycW9ya2hibG9pNm8ifQ.8VxS8cKEypk08xfgUgbsHw';
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/satellite-v9',
    //style: 'mapbox://styles/mapbox/light-v11',
    center: map_center,
    zoom: 12,
    pitch: 0,
    bearing: 0,
    antialias: true
});



map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl(),  'top-left');

map.on('load', function () {

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

    map.addSource('picture', { 
        'type': 'image',  
        'url': 'img/15_11 копія 2.png', 
        'coordinates': [
            [34.600294,47.504517],
            [34.624802,47.504517],
            [34.624650,47.495463],
            [34.600264,47.495433]
        ]              
    });  
            
    map.addLayer({
        id: 'tif',
        'type': 'raster',
        'source': 'picture',
        'minzoom': 12, 
        'layout': {
            // Make the layer visible by default.
            'visibility': 'none'
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
            'fill-opacity': 0.2,
             

        }
    });

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








var container = document.querySelector('#scroll');
var graphic = document.querySelector('#scroll > .scroll__graphic'); //container.select('.scroll__graphic');
var text = document.querySelector('#scroll > .scroll__text'); //container.select('.scroll__text');
var step = document.querySelector('#scroll > .scroll__text > .step'); // text.selectAll('.step');
var scroller = scrollama();
      
function handleStepEnter(r) {  
    let myarr = $(r.element).data("polygons");
    let myarr2 = $(r.element).data("points");

    map.setFilter(  'boundary-layer', ["match", ["get", "id"], myarr, true, false])
    
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


    if(r.index === 0){

        map.flyTo({
            center: [34.6070, 47.4989],
            zoom: 12.8,
            duration: 1200, 
            essential: true
        })
    }

    if(r.index === 3){
        map.flyTo({
            center: [34.6070, 47.4989],
            zoom: 12.8,
            duration: 1200, 
            essential: true
        })
    }

    if(r.index === 4){
        map.flyTo({
            center: [34.612, 47.4989],
            zoom: 14,
            duration: 1200, 
            essential: true
        });

        map.setLayoutProperty(
            'tif',
            'visibility',
            'visible'
            );
    }



    if(r.index === 5){
        map.flyTo({
            center: [34.5970, 47.5089],
            zoom: 14,
            duration: 1200, 
            essential: true
        })
    }

    if(r.index === 6 || r.index === 3){
        map.setLayoutProperty(
            'tif',
            'visibility',
            'none'
            );
    }

    if(r.index === 10){
        map.flyTo({
            center: [34.5970, 47.5089],
            zoom: 12.8,
            duration: 1200, 
            essential: true
        })
    }
    
       
     

}
      
function init() {   
    scroller.setup({
        container: '#scroll',
        graphic: '.scroll__graphic',
        text: '.scroll__text',
        step: '.scroll__text .step',
        offset: 0.5,
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







