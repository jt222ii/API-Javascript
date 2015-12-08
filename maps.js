var gmaps = {
  map:{},
  infowindow:null,
  geocoder:null,
  initMap:function() {
    gmaps.geocoder = new google.maps.Geocoder();
    gmaps.infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 2
    });
  },
  setMarkersOnMap:function(labels, messages){
    
    for (var i = 0; i < labels.length; i++) {
        gmaps.setMarker(labels[i], messages[i]);
      }
  },
  
  setMarker:function(label, message){
        console.log(message);
        var locationname = label.name.replace("location/", "");
        gmaps.geocoder.geocode({'address': locationname}, 
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
              marker.addListener('click', function(){
                //"<h1>Location:"+locationname+"</h1><h2>Subject:"+message.subject+"</h2><h2>Snippet:</h2>"+message.snippet
                gmaps.infowindow.setContent("<h1>Location:"+locationname+"</h1><h2>Subject:"+message.subject+"</h2><h2>Snippet:</h2>"+message.snippet); 
                gmaps.infowindow.open(map, marker);
              });
            }
            else
            {
              setTimeout(function(){
                  gmaps.setMarker(label, message);
              }, 300)
            }
        });
  },
  
}