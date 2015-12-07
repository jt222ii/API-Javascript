var gmaps = {
  map:{},
  initMap:function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 2
    });
  },
  setMarkersOnMap:function(labels){
    var geocoder = new google.maps.Geocoder();
    for (var i = 0; i < labels.length; i++) {
        gmaps.setMarker(labels[i], geocoder);
      }
  },
  
  setMarker:function(label, geocoder){
        var locationname = label.name.replace("location/", "");
        geocoder.geocode({'address': locationname}, 
        function(results, status) 
        {
            if (status === google.maps.GeocoderStatus.OK)
            {
                var loc = results[0].geometry.location;
                var marker = new google.maps.Marker({
                position: loc,
                map: map,
                title: 'Hello World!'
              });
            }
            else
            {
              setTimeout(function(){
                  gmaps.setMarker(label, geocoder);
              }, 300)
            }
        });
  },
  
}