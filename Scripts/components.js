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
            let line = input_element.map((element) => {return `<div>${element[0]} <input id="${element[0]}" type="element[1"></div>`}).join("");
            line += `<div><button type="button" id="button_invia"></div>`
            document.getElementById("div_form").innerHTML = line;       
        }
    }
} 

const create_table = () => {
    let binding_element;
    let header_element;
    return{
        bind_element: (new_element) => {
            binding_element = new_element;
        },
        config_header: (new_element) => {
            header_element = new_element;
        },
        render: () => {
            
        }
    }
}

export{create_form,create_table};
