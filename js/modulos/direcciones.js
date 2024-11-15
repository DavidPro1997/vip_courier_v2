function abrirModalUbicaciones(){
    $("#scrollable-modal").modal('show')
}

function cerrarModalUbicaciones(){
    $("#scrollable-modal").modal('hide')
}


function consultarDirecciones(){
    API_GET(null, '/obtenerDirecciones', datos => {
        if (datos.estado) {
            armarDirecciones(datos.datos)
        } else {
            mensajeUsuario('info', 'Oooops', datos.mensaje);
            const aux = []
            armarDirecciones(aux)
        }
    });
}



function armarDirecciones(direcciones){
    let aux = 0
    direcciones.forEach(element => {
        if(element.principal>0){
            aux = aux+1
        }
    });
    let lista = ""
    lista += `
        <tr>
            <th>
                Oficinas Vip Courier 
                <img class="card-title" src="img/banderas/eduador.jpg" alt="" height="12" width="25" style="margin-left: 10px;">
            </th>
            <td>Pichincha</td>
            <td>Quito</td>
            <td>Iñaquito</td>
            <td>Andrade Marin E6-24 y Eloy Alfaro</td>
            <td>Edificio Carolina Milenium</td>
            
            `
                if(aux == 0){
                    lista += `<td><span class="badge label-table" style="background-color: #99c21c;">Principal</span></td>`
                }
                else{
                    lista += `<td><span class="badge label-table" style="background-color: rgb(129, 130, 131);;">Secundaria</span></td>`
                }
                lista += `
            
            <td>
                <a href="#" class="tooltip-1" data-bs-placement="top" title="Establecer como principal" onclick="establecerPrincipal(20); return false;" style="color: rgb(26, 25, 25);"><i class="icon-ok" style="font-size: 18px;"></i></a>
            </td>
        </tr>
    `
    direcciones.forEach((element) => {
        lista += `
            <tr>
                <th>
                    `+(element.alias)+` 
                    <img class="card-title" src="img/banderas/eduador.jpg" alt="" height="12" width="25" style="margin-left: 10px;">
                </th>
                <td>`+element.provincia+`</td>
                <td>`+element.ciudad+`</td>
                <td>`+element.sector+`</td>
                <td>`+element.calle_principal+` `+element.numeracion+` y `+element.calle_secundaria+`</td>
                <td>`+element.referencia+`</td>`
                if(element.principal == 1){
                    lista += `<td><span class="badge label-table" style="background-color: #99c21c;">Principal</span></td>`
                }
                else if(element.principal == 0){
                    lista += `<td><span class="badge label-table" style="background-color: rgb(129, 130, 131);;">Secundaria</span></td>`
                }
                lista += `
                <td>
                    <a href="#" class="tooltip-1" data-bs-placement="top" title="Establecer como principal" onclick="establecerPrincipal(`+element.id+`); return false;" style="color: rgb(26, 25, 25);"><i class="icon-ok" style="font-size: 18px;"></i></a>
                    <a href="#" class="tooltip-1" data-bs-placement="top" title="Editar dirección" onclick="editarDireccion(`+element.id+`); return false;" style="color: rgb(26, 25, 25);"><i class="icon-pencil" style="font-size: 18px;"></i></a>
                    <a href="#" class="tooltip-1" data-bs-placement="top" title="Eliminar dirección" onclick="eliminarDireccion(`+element.id+`); return false;" style="color: rgb(26, 25, 25);"><i class="icon-trash" style="font-size: 18px;"></i></a>
                </td>
            </tr>
        `
    });
    $("#listaDirecciones").append(lista)
}


function establecerPrincipal(id){
    API_GET(null, '/principalDireccion/'+id, datos => {
        if (datos.estado) {
            mensajeUsuario('success', 'Bien', datos.mensaje).then(() => {
                window.location.href = "/direcciones";
            });
        } else {
            mensajeUsuario('info', 'Oooops', datos.mensaje);
        }
    });
}


function editarDireccion(id){
    API_GET(null, '/obtenerDireccion/'+id, datos => {
        if (datos.estado) {
            contruirModalEditar(datos.datos[0])
        } else {
            mensajeUsuario('info', 'Oooops', datos.mensaje);
        }
    });
}


function contruirModalEditar(direccion){
    document.getElementById("provincia").value = direccion.provincia
    document.getElementById("ciudad").value = direccion.ciudad
    document.getElementById("sector").value = direccion.sector
    document.getElementById("c_principal").value = direccion.calle_principal
    document.getElementById("c_secundaria").value = direccion.calle_secundaria
    document.getElementById("numeracion").value = direccion.numeracion
    document.getElementById("referencia").value = direccion.referencia
    document.getElementById("alias").value = direccion.alias
    const lista = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn" style="background-color: #99c21c; color: white;" onclick="editarDireccion_enviar(`+direccion.id+`)">Editar</button>
    `
    $("#botonesModal").html(lista)
    abrirModalUbicaciones()
}


function editarDireccion_enviar(id){
    const info = armarArray()
    if(info){
        API_POST(JSON.stringify(info), '/editarDireccion/'+id, datos => {
            if (datos.estado) {
                mensajeUsuario('success', 'Bien', datos.mensaje).then(() => {
                    window.location.href = "/direcciones";
                });
            } else {
                mensajeUsuario('info', 'Oops...', datos.mensaje);
            }
        });
    }
    else{
        mensajeUsuario('info', 'Oops...', 'Debe llenar todos los datos');
    }
}


function eliminarDireccion(id){
    Swal.fire({
        title: "¡Precaución!",
        text: "¿Está seguro que desea eliminar esta dirección?",
        icon: "warning",
        showCancelButton: true,  // Muestra el botón de cancelar
        confirmButtonText: 'Continuar',  // Texto del botón "Continuar"
        cancelButtonText: 'Cancelar',  // Texto del botón "Cancelar"
        customClass: {
            confirmButton: 'my-confirm-button'  // Aplica tu clase personalizada
        },
    }).then((result) => {
        if (result.isConfirmed) {
            API_DELETE(null, '/eliminarDirecciones/'+id, datos => {
                if (datos.estado) {
                    mensajeUsuario('success', 'Bien', datos.mensaje).then(() => {
                        window.location.href = "/direcciones";
                    });
                } else {
                    mensajeUsuario('info', 'Oooops', datos.mensaje);
                }
            });
        } else if (result.isDismissed) {
            console.log('Usuario ha cancelado');
        }
    });


}


function guardarDireccion(){
    const info = armarArray()
    if(info){
        API_POST(JSON.stringify(info), '/agregarDireccion', datos => {
            if (datos.estado) {
                mensajeUsuario('success', 'Bien', datos.mensaje).then(() => {
                    window.location.href = "/direcciones";
                });
            } else {
                mensajeUsuario('info', 'Oops...', datos.mensaje);
            }
        });
    }
    else{
        mensajeUsuario('info', 'Oops...', 'Debe llenar todos los datos');
    }
}


function armarArray(){
    const info = {
        provincia: document.getElementById("provincia").value,
        ciudad: document.getElementById("ciudad").value,
        sector: document.getElementById("sector").value,
        calle_principal: document.getElementById("c_principal").value,
        calle_secundaria: document.getElementById("c_secundaria").value,
        numeracion: document.getElementById("numeracion").value,
        referencia: document.getElementById("referencia").value,
        alias: document.getElementById("alias").value
    }
    
    if(info.provincia && info.ciudad && info.sector && info.calle_principal && info.calle_secundaria && info.numeracion && info.referencia && info.alias){
        return info
    }
    return false
}

