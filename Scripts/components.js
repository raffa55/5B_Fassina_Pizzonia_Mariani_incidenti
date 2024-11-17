const createObject = () => {
    let binding_element;
    let input_element;

    return {
        bind_element: (new_element) => {
            binding_element = new_element
        },
        config_input_element : (new_element) => {
            config_input_element = new_element
        },
        render: () => {
            let line = list.map((element) => {return `<div>${element[0]} <input id="${element[0]}" type="element[1"></div>`}).join("");
            document.getElementById("div_form").innerHTML = line;
        }
    }
       

} 