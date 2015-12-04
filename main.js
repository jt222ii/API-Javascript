"use strict";
var mailMap = {
    main: function(){
        //checkAuth();
        mailMap.map.initMap();
    }
};

mailMap.map = {
    map: {},
    initMap: function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    },
    asd: function() {
        alert("test");
    }
}


//window.onload(mailMap.main());