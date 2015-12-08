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
  
  setMarker:function(label, message){
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
                gmaps.infowindow.setContent
                (
                  "<div id=\"infobox\"><h1>Location:"+
                  locationname+
                  "</h1><h2>Subject:"+
                  message.subject+
                  "</h2><h2>Snippet:</h2>"+
                  message.snippet+
                  "<h2>Message:</h2>"+ 
                  message.messageText+
                  "</div>"
                ); 
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