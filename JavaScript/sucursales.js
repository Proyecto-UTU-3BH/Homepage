function mostrarAlmacenes(almacenes){
    let htmlToAppend="";

    almacenes.sort((a, b) => a.departamento.localeCompare(b.departamento));

    for (let i = 0; i < almacenes.length; i++){ 
        let almacen = almacenes[i];

        htmlToAppend+= `
        <div class="sucursal">
            <h3>${almacen.departamento}</h3>
            <span><span class="negrita">Calle:</span> ${almacen.calle}</span>
            <span><span class="negrita">Nº Puerta:</span> ${almacen.numero_puerta}</span>
            <span><span class="negrita">Teléfono:</span> ${almacen.telefono}</span>
        </div>` 

    }
    document.getElementById('container').innerHTML=htmlToAppend;   
}


document.addEventListener('DOMContentLoaded', function () {

    const urlAlmacenes = "http://localhost:8001/api/almacenes";

    fetch(urlAlmacenes, {
        method: "GET",
    })
    .then(async response => {
        if (response.ok) {
            return response.json();
        } 
    })
    .then(data => {
        mostrarAlmacenes(data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
});



        