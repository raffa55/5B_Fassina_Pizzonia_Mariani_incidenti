const createTable = () => {
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




