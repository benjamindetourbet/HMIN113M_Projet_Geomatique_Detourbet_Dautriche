var map = new ol.Map({
    target: 'map',
    layers: [new ol.layer.Tile({source: new ol.source.OSM()})],
    view: new ol.View({
          center: ol.proj.fromLonLat([3.876716,43.61]),
          zoom: 12
    })
});

let marker = document.getElementById('marker');
map.addOverlay(new ol.Overlay({
    position: ol.proj.fromLonLat([3.8766716,43.6141]),
    positioning: 'center-center',

}));

let popup = document.getElementById('popup');
map.addOverlay(new ol.Overlay({
    positioning: 'center-center',
    offset : [20, -25],
    position: ol.proj.fromLonLat([3.8766716,43.6141]),
    element: popup
}));

marker.addEventListener('click', function(evt) {
    console.log('click');
    (popup.style.display == "none" ? popup.style.display = "block" :
                                     popup.style.display = "none")
});
