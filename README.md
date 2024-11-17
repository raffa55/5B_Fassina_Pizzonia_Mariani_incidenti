# 5B_Fassina_Pizzonia_Mariani_incidenti
Classi:
    
    Incidente
        --Attributi--
        
        indirizzo (str)
        targhe (list)(str)
        num_morti (int)
        num_feriti (int)
        data (date(ISOString))
        
        --Metodi--
        constructor(indirizzzo,targhe,num_morti,num_feriti,data)

Componenti

    Form
        --Private--
        binding_element
        input_element

        --Pubbliche--
        bind_element(new_element)
        config_input_element(new_element)
        render()

    Table
        --Private--
        binding_element
        header_element

        --Pubbliche--
        bind_element(new_element)
        config_header(new_element)
        render()

Functions

