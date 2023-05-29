var locations = [
    ['Anfiteatro Villa Maria, Cordoba',-32.415786631222964, -63.260447812067085 , 4],
    ['Estadio Cubierto Aconcagua Arena, Mendoza',-32.88385482301539, -68.88137246931555 , 5],
    ['Antel Arena, Montevideo',-34.86230551870473, -56.15318813863111 , 3],
    ['Estadio José Amalfitani, Buenos Aires', -34.63478807069984, -58.52078263068445, 2],
    ['Autódromo Municipal de Rosario, Rosario',-32.907238854364394, -60.74700617671316 , 1]
  ];
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(-34.63478807069984, -58.52078263068445),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  
  var infowindow = new google.maps.InfoWindow();

  var marker, i;
  
  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });
    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }