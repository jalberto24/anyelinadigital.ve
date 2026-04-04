document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.message');
    let currentIdx = 0;

    // Función para cambiar mensajes
    function rotateMessages() {
        // Quitamos la clase al actual
        messages[currentIdx].classList.remove('active');

        // Pasamos al siguiente
        currentIdx = (currentIdx + 1) % messages.length;

        // Añadimos la clase al nuevo
        messages[currentIdx].classList.add('active');
    }

    // Iniciamos el intervalo (cada 5 segundos para que de tiempo a leer)
    setInterval(rotateMessages, 5000);
});

// Manejo del formulario (evita que la página se refresque)
const quoteForm = document.getElementById('quote-form');
if(quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Gracias por tu solicitud. Nos pondremos en contacto contigo pronto.');
        this.reset();
    });
}