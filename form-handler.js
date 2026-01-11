document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Mostrar mensaje de carga
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            try {
                // Usar FormData directamente para enviar los datos
                const formData = new FormData(contactForm);
                
                // Añadir el campo 'name' basado en 'nombre' para compatibilidad
                if (formData.has('nombre') && !formData.has('name')) {
                    formData.append('name', formData.get('nombre'));
                }
                
                // Mostrar los datos que se enviarán
                const formDataObj = {};
                formData.forEach((value, key) => formDataObj[key] = value);
                console.log('Datos del formulario a enviar:', formDataObj);
                
                // Enviar datos a Formspree
                const response = await fetch('https://formspree.io/f/xanrjggj', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const responseData = await response.json();
                console.log('Respuesta del servidor:', responseData);
                
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                    contactForm.reset();
                } else {
                    throw new Error(responseData.error || 'Error al enviar el formulario');
                }
            } catch (error) {
                console.error('Error al procesar el formulario:', error);
                alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
            } finally {
                // Restaurar el botón
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
});
