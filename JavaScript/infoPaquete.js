document.addEventListener('DOMContentLoaded', function(){

    if(!sessionStorage.getItem('idProducto')){
        location.href='seguimiento.html';
    }

    document.getElementById('volver').addEventListener('click',function(){
        sessionStorage.removeItem('idProducto');
    })

})