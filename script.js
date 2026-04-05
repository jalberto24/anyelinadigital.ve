document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ROTACIÓN DE MENSAJES (SLOGANS) ---
    const messages = document.querySelectorAll('.message');
    let currentIdx = 0;

    if (messages.length > 0) {
        function rotateMessages() {
            // Quitamos la clase al actual
            messages[currentIdx].classList.remove('active');

            // Pasamos al siguiente
            currentIdx = (currentIdx + 1) % messages.length;

            // Añadimos la clase al nuevo
            messages[currentIdx].classList.add('active');
        }

        // Iniciamos el intervalo (cada 5 segundos)
        setInterval(rotateMessages, 5000);
    }

    // --- 2. MANEJO DEL FORMULARIO (ENVÍO DIRECTO) ---
    const form = document.getElementById("quote-form");
    const status = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // Evita que la página se refresque o abra apps
            
            const data = new FormData(form);
            
            // Cambiamos el texto del botón para dar feedback al usuario
            const submitBtn = form.querySelector('button');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Enviando...";
            submitBtn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    status.innerHTML = "¡Gracias! Tu solicitud ha sido enviada con éxito.";
                    status.style.color = "green";
                    form.reset(); // Limpia los campos y el combobox
                } else {
                    status.innerHTML = "Ups! Hubo un problema. Por favor, intenta de nuevo.";
                    status.style.color = "red";
                }
            } catch (error) {
                status.innerHTML = "Error de conexión. Revisa tu internet.";
                status.style.color = "red";
            } finally {
                // Restauramos el botón después del envío
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});