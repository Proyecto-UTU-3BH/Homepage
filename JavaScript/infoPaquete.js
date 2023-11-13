function mostrarDatos(data) {
    let estadoTexto = `Estado: ${data.estado}`;
    
    let loteTexto = data.IDLote !== null ? `Lote: ${data.IDLote}` : "Pendiente de asignación a un lote";

    let matriculaFleteTexto = data.matricula_vehiculo_flete !== null ? data.matricula_vehiculo_flete.toUpperCase() : "Vehículo pendiente de asignación";

    let nombreChoferFlete = data.primer_nombre_chofer_flete !== null ? `${data.primer_nombre_chofer_flete} ${data.primer_apellido_chofer_flete || ''}` : "Aún no hemos asignado un chofer para transportar su paquete";

    let matriculaRepartoTexto = data.matricula_vehiculo_reparte !== null ? data.matricula_vehiculo_reparte.toUpperCase() : "Vehículo pendiente de asignación";

    let nombreChoferReparto = data.primer_nombre_chofer_reparto !== null ? `${data.primer_nombre_chofer_reparto} ${data.primer_apellido_chofer_reparto || ''}` : "Aún no hemos asignado un chofer para el reparto";

    if (data.estado.toLowerCase() === 'en domicilio') {
        estadoTexto = `<span style="color: #1A8C00  ;">${estadoTexto}</span>`;
    }

    let htmlToAppend = `
        <div class="estado">${estadoTexto}</div>
        <div class="infoPaquete">
            <p><span class="icon">&#128722;</span> ${loteTexto}</p>
            <p><span class="icon"><i class="fa-solid fa-truck"></i></span> Camión (Flete): ${matriculaFleteTexto}</p>
            <p><span class="icon"><i class="fa-regular fa-id-card"></i></span> Conductor (Flete): ${nombreChoferFlete}</p>
            <p><span class="icon"><i class="fa-solid fa-shipping-fast"></i></span> Vehiculo (Reparto): ${matriculaRepartoTexto}</p>
            <p><span class="icon"><i class="fa-solid fa-id-card"></i></span> Conductor (Reparto): ${nombreChoferReparto}</p>
        </div>`;

    document.getElementById('datos').innerHTML = htmlToAppend;
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
