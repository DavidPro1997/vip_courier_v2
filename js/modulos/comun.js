var numeroTelefono = "+593988182490"
var email = "info@mvevip.com"
var facebook = "https://www.facebook.com/share/eAaQqQzrMvU7T4MV"
var instagram = "https://www.instagram.com/marketingvipecuador"
var tiktok = "https://www.tiktok.com/@marketingvipecuador"
var youtube = "https://www.youtube.com/channel/UCTb9vJwhQcB7Ea_1va1o7bg"


function abrirSpinner(mensaje){
    $("#mensajeSpinner").html(mensaje)
    $("#centermodal").modal({
        backdrop: 'static',
        keyboard: false
    }).modal('show')
}


function cerrarSpinner(){
    $("#centermodal").modal('hide');
}


function mensajeUsuario(icono,titulo,mensaje){
    return Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        confirmButtonText: 'Entendido',
        customClass: {
            confirmButton: 'my-confirm-button'  // Aplica tu clase personalizada
        }
    });
}


function scrollTop() {
    window.scrollTo(0, 0);
}


function abrirChatWhatsApp(mensaje) {
    if(!mensaje){
        mensaje = "Hola quiero información sobre sus servicios..."
    }
    const mensajeCodificado = encodeURIComponent(mensaje);
    const url = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
    window.open(url, '_blank');
}


function obtenerNumero(){
    return numeroTelefono
}


function abrirLlamada(){
    window.location.href = `tel:${numeroTelefono}`;
}

function enviarCorreo(asunto, cuerpo) {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    window.location.href = mailtoLink;
}

function abrirFacebook(){
    window.open(facebook, '_blank');
}

function abrirInstagram(){
    window.open(instagram, '_blank');
}

function abrirTiktok(){
    window.open(tiktok, '_blank');
}

function abrirYoutube(){
    window.open(youtube, '_blank');
}

function cerrarMenu(){
    $('.main-menu').removeClass('show'); 
    $('.layer').removeClass('layer-is-visible');
}
