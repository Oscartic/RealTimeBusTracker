
  mapboxgl.accessToken = 'pk.eyJ1Ijoib3NjYXJ0aWMiLCJhIjoiY2tyMWRpMGt4MjFqcDJ1bW5qbXRiMDAxeCJ9.E-rwj3FOuTi-0IT7AjENnw';

  const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-71.104081, 42.365554], // starting position [lng, lat]
      zoom: 12// starting zoom
  });

  var marker = new mapboxgl.Marker()
    .setLngLat([-71.092761, 42.357575])
    .addTo(map);


  async function move() {
    const locations = await getBusLocations();
    console.log(new Date());
    const coordinates = [locations[0].attributes.longitude, locations[0].attributes.latitude];
    marker.setLngLat(coordinates);
    setTimeout(move, 15000);
    console.log(locations[0].id)
  }


// Request bus data from MBTA
async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json     = await response.json();
  return json.data;
}