document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formulario-contacto");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;
        const mensaje = document.getElementById("mensaje").value;

        if (!nombre || !email || !mensaje) {
            alert("Por favor, complete todos los campos.");
        } else {
            alert("Mensaje enviado correctamente.");
            form.reset();
        }
    });
    
});
