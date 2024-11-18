const hide = (element) => {
    element.classList.remove("visible");
    element.classList.add("hidden");
}

const show = (element) => {
    element.classList.remove("hidden");
    element.classList.add("visible");
}