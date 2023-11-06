document.addEventListener("DOMContentLoaded", function(){

    document.getElementById('rastrearForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const codRastreo = document.getElementById('codRastreo').value;
        const urlRastrearProducto = "http://localhost:8001/api/productos/rastreo/"+codRastreo;

        fetch(urlRastrearProducto, {
            method: "GET",
        })
        .then(async response => {
            if (response.ok) {
                return response.json();
            } else {
                response.json().then(data => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message
                    });
                });
            }
        }) 
        .then(data => {
            sessionStorage.setItem('idProducto',data.id);
            window.location.href='infoPaquetes.html';
        })
        .catch(error => {
          console.error("Error:", error);
        });
    });

})