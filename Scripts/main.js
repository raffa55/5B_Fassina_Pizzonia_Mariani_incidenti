import { create_form,create_table } from "./components.js";
import {Incidente} from "./classes.js";
import {getCoordinates,hide, show } from "./function.js";
import {download, upload} from "./cache.js";

fetch("conf.json").then(r => r.json()).then((conf_data) => {

   //upload([]).then(console.log);

   const clearMap = () => {
      markers.forEach((marker) => {
         marker.remove();
      })
   }

   const renderMap = (places) => {
      clearMap();
      places.forEach((place) => {
          const marker = L.marker(place.coords).addTo(map);
          marker.bindPopup(`<b>${place.name}</b>`);
          markers.push(marker)
      });
   }

   let incidenti = [];
   let places = []

   let zoom = 12;
   let maxZoom = 19;
   let markers = [];
   let map = L.map('map').setView([45.4639102, 9.1906426], zoom);
   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: maxZoom,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
   }).addTo(map);
   renderMap(places)

   incidenti.push(conf_data.table_header)
   const form = create_form();
   form.bind_element(document.getElementById("div_form"));
   form.config_input_element(conf_data.config_input);
   form.render();
   
   const table = create_table();
   table.bind_element(document.getElementById("div_table"));
   
   download().then((new_data) => {
      new_data.forEach((nuovo_incidente) => {
         incidenti.push(nuovo_incidente);
         getCoordinates(nuovo_incidente.indirizzo).then((luogo_incidente)=>{
            places.push(luogo_incidente);
            console.log(luogo_incidente);
         renderMap(places);
         table.config_header(incidenti);
         table.render();
         })
      });
   })
  
   

   document.getElementById("button_invia").onclick=()=>{

      hide(document.getElementById("div_form"));

      let dati_input = conf_data.config_input.map((element)=>{
         let dato_input=document.getElementById(element[0]).value;
         document.getElementById(element[0]).value = "";
         return dato_input
      })

      let nuovo_incidente = new Incidente(dati_input[0],dati_input[1],dati_input[2],dati_input[3],dati_input[4]);
      download().then( (new_data) => {
         getCoordinates(nuovo_incidente.indirizzo).then((luogo_incidente)=>{
            places.push(luogo_incidente);
            incidenti = new_data
            console.log(new_data);
            incidenti.push(nuovo_incidente);
            upload(incidenti).then((result) => {
               incidenti.unshift(conf_data.table_header);
               renderMap(places);
               table.config_header(incidenti);
               table.render();
            });
         });
      });
  

   }

   document.getElementById("button_cancella").onclick = () => {
      hide(document.getElementById("div_form"));

         conf_data.config_input.forEach((element)=>{
         document.getElementById(element[0]).value = "";
      })
   }

   document.getElementById("bottone_mostra").onclick = () => {
      show(document.getElementById("div_form"));
   }

   document.getElementById("bottone_filtra").onclick = () => {
      const filtro = document.getElementById("input_filtro").value
      download().then((new_data) => {
         incidenti = new_data;
         let incidenti_filtrati = [];
         for(let i = 0;i < incidenti.length;i++){
            console.log(incidenti[i].indirizzo.includes(filtro) || incidenti[i].targhe.includes(filtro) || incidenti[i].data.includes(filtro));
            if (incidenti[i].indirizzo.includes(filtro) || incidenti[i].targhe.includes(filtro) || incidenti[i].data.includes(filtro)){
               incidenti_filtrati.push(incidenti[i])
            } 
         }

         let filtered_places = [];
         incidenti_filtrati.forEach((nuovo_incidente) => {
            getCoordinates(nuovo_incidente.indirizzo).then((luogo_incidente) => {
               console.log(luogo_incidente)
               filtered_places.push(luogo_incidente);
               
               incidenti_filtrati.unshift(conf_data.table_header);
               console.log(filtered_places[0])
               places = filtered_places;
               incidenti = incidenti_filtrati;
               renderMap(places);
               table.config_header(incidenti);
               table.render();
            });
            
         }); 
      });
   }

   document.getElementById("bottone_cancella_filtro").onclick = () => {
      incidenti = [conf_data.table_header];
      places = [];
      download().then((new_data) => {
         new_data.forEach((nuovo_incidente) => {
            incidenti.push(nuovo_incidente);
            getCoordinates(nuovo_incidente.indirizzo).then((luogo_incidente)=>{
               places.push(luogo_incidente);
               console.log(luogo_incidente);
            renderMap(places);
            table.config_header(incidenti);
            table.render();
            })
         });
      })
   }
})
