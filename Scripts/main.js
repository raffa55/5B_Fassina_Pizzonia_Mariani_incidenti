import { create_form,create_table,create_filter,create_login} from "./components.js";
import {Incidente} from "./classes.js";
import {getCoordinates,hide, show } from "./function.js";
import {download, upload, login} from "./cache.js";

fetch("conf.json").then(r => r.json()).then((conf_data) => {

   let isLoggedIn = false;

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

   const filter = create_filter();
   filter.bind_element(document.getElementById("div_filtro"));
   filter.set_configuration(conf_data.config_filter);
   filter.render()

   const form_login = create_login();
   form_login.bind_element(document.getElementById("form_login"));
   form_login.set_configuration(conf_data.config_login);
   form_login.render()
   
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
  
   document.getElementById("bottone_login").onclick=()=>{
      show(document.getElementById("form_login"));
   }

   document.getElementById("bottone_login_invia").onclick=()=>{
      let datiLogin = conf_data.config_login.map((element) => {
         return document.getElementById(element[0]).value;
      })
      login(datiLogin[0],datiLogin[1]).then((response) => {
         isLoggedIn = response
         if (isLoggedIn) {
            hide(document.getElementById("div_login"));
            show(document.getElementById("full_div_form"));
         } else {
            alert("Username o password errati")
            hide(document.getElementById("form_login"))
            conf_data.config_login.forEach((element) => {
               return document.getElementById(element[0]).value = "";
            })
         }
      })

      
   }

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
      let datiFiltro = conf_data.config_filter.map((element) => {
         return document.getElementById(element[0]).value;
      })

      download().then((new_data) => {
         incidenti = new_data;
         let incidenti_filtrati = [];
         for(let i = 0;i < incidenti.length;i++){
            console.log(incidenti[i].indirizzo.includes(datiFiltro[0]) || incidenti[i].targhe.includes(datiFiltro[0]) || incidenti[i].data.includes(datiFiltro[0]));
            if (incidenti[i].indirizzo.includes(datiFiltro[0]) || incidenti[i].targhe.includes(datiFiltro[0]) || incidenti[i].data.includes(datiFiltro[0])){
               incidenti_filtrati.push(incidenti[i]);
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
