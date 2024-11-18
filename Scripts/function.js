
export const getCoordinates = (luogo) => {
    console.log(luogo)
    return new Promise((resolve)=>{
        fetch("conf.json").then(r => r.json()).then(confData => {
            fetch(confData.geoUrl.replace("$LUOGO", luogo + " Milano")).then(r => r.json()).then(data => {
                let object = {name:luogo,coords:[data[0].lat,data[0].lon]};
                resolve(object);
            })
        })
    })
}

export const hide = (element) => {
    element.classList.remove("visible");
    element.classList.add("hidden");
}

export const show = (element) => {
    element.classList.remove("hidden");
    element.classList.add("visible");
}