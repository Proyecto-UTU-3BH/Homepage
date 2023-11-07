function mostrarDatos(data) {

    if (data.IDLote==null) {
        data.IDLote= "Pendiente de asignación a un lote";
    }

    let matriculaTexto = "Vehículo pendiente de asignación";
    if (data.matricula !== null) {
        matriculaTexto = data.matricula.toUpperCase();
    }

    if (data.primer_nombre==null) {
        data.primer_nombre= "Aún no hemos asignado un chofer para transportar su paquete";
        data.primer_apellido="";
    }

    let htmlToAppend= `
    <div class="estado">Estado: ${data.estado}</div>
    <div class="infoPaquete">
          <p><span class="icon">&#128722;</span> Lote: ${data.IDLote}</p>
          <p>
            <span class="icon"><i class="fa-solid fa-truck"></i></span> Camión:
            ${matriculaTexto}
          </p>
          <p>
            <span class="icon"><i class="fa-regular fa-id-card"></i></span>
            Conductor: ${data.primer_nombre} ${data.primer_apellido}
          </p>
    </div>`

    document.getElementById('datos').innerHTML=htmlToAppend;
}

document.addEventListener('DOMContentLoaded', function () {

    if (!sessionStorage.getItem('idProducto')) {
        location.href = 'seguimiento.html';
    }

    document.getElementById('volver').addEventListener('click', function () {
        sessionStorage.removeItem('idProducto');
    })

    let idProducto = sessionStorage.getItem('idProducto');
    const urlSeguimientoProducto = "http://localhost:8002/api/productos/seguimiento/" + idProducto;

    fetch(urlSeguimientoProducto, {
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
                        text: 'Ha ocurrido un error'
                    });
                });
            }
        })
        .then(data => {
            mostrarDatos(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
});
