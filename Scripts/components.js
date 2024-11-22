const create_form = () => {
    let binding_element;
    let input_element;

    return {
        bind_element: (new_element) => {
            binding_element = new_element;
        },
        config_input_element : (new_element) => {
            input_element = new_element;
        },
        render: () => {
            const todayDate = new Date().toISOString().split("T")[0];
            console.log(todayDate);
            let line = input_element.map((element) => {return `<div>${element[0]} <input id="${element[0]}" type="${element[1] == "date" ? element[1] + '" max="' + todayDate: element[1]}"></div>`}).join("");
            line += `<div><button type="button" id="button_invia">Invia</button></div>`;
            line += `<div><button type="button" id="button_cancella">Cancella</button></div>`;
            document.getElementById("div_form").innerHTML = line;       
        }
    }
} 

const create_table = () => {
    let binding_element;
    let table_data; //[incidente, incidente, ...]
    // indirizzo, targhe, num_morti, num_feriti, data
    return{
        bind_element: (new_element) => {
            binding_element = new_element;
        },
        config_header: (new_element) => {
            table_data = new_element;
        },
        render: () => {
            let line = "<table class=table>";
            line += table_data.map( (incidente) => {
                return `<tr><td>${incidente.indirizzo}</td><td>${incidente.targhe}</td><td>${incidente.num_morti}</td><td>${incidente.num_feriti}</td><td>${incidente.data}</td></tr>`;
            }).join("");
            line += "</table>";
            binding_element.innerHTML = line; 
        
        }
    }
}

const create_filter = () => {
    let configuration_data;
    let binding_element;
    return {
        set_configuration: (new_configuration) => {
            configuration_data = new_configuration
        },
        bind_element: (new_element) => {
            binding_element = new_element;
        },
        render: () => {
            let line = "";
            line += configuration_data.map((element) => { return (element[0] + `<input id="${element[0]}" type="${element[1]}">`)}).join("");
            line += `<button id="bottone_filtra" type="button"> Filtra </button>`;
            line += `<button id="bottone_cancella_filtro" type="button"> Cancella filtro </button>`;
            binding_element.innerHTML = line;
        }
    }
}

export{create_form,create_table,create_filter};
