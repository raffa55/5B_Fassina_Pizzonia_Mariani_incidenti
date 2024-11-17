import{ create_form,create_table } from "./components.js";


fetch("conf.json").then(r => r.json()).then((conf_data) => {

   const form = create_form();
   form.bind_element(document.getElementById("div_form"));
   console.log(conf_data.config_input)
   form.config_input_element(conf_data.config_input);
   form.render();
   
   const table = create_table();
   table.bind_element(document.getElementById("div_table"));
   
   
   let places = [{name: "Piazza del Duomo",coords: [45.4639102, 9.1906426]}]
  
   let zoom = 12;
   let maxZoom = 19;
   let map = L.map('map').setView(places[0].coords, zoom);
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: maxZoom,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   }).addTo(map);
   places.forEach((place) => {
      const marker = L.marker(place.coords).addTo(map);
      marker.bindPopup(`<b>${place.name}</b>`);
   });
})