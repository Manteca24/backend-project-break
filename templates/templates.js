const getProductsCards = (products, user) => {
    let html='';
    for(let product of products){
        html += `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>${product.price}€</p>
             <a href="${user ? `/dashboard/${product._id}` : `/products/${product._id}`}">Ver detalle</a>
        </div>
        
        `
    } return html;
}

const baseHTML = (content, user) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/styles.css">
        <title>Tienda de Ropa</title>
        <script type="module" src="/templates.js"></script>
    </head>
    <body>
        <header>
            <nav>
                <ul>
                    ${user ? '<li><a href="/dashboard">Inicio</a></li>' : '<li><a href="/products">Inicio</a></li>'}
                    ${user ? '<li><a href="/dashboard/?category=Camisetas">Camisetas</a></li>': '<li><a href="/products/?category=Camisetas">Camisetas</a></li>'}
                    ${user ? '<li><a href="/dashboard/?category=Sudaderas">Sudaderas</a></li>': '<li><a href="/products/?category=Sudaderas">Sudaderass</a></li>'}
                    ${user ? '<li><a href="/dashboard/?category=Pantalones">Pantalones</a></li>': '<li><a href="/products/?category=Pantalones">Pantalones</a></li>'}
                    ${user ? '<li><a href="/dashboard/?category=Zapatos">Zapatos</a></li>': '<li><a href="/products/?category=Zapatos">Zapatos</a></li>'}
                    ${user ? '<li><a href="/dashboard/?category=Accesorios">Accesorios</a></li>': '<li><a href="/products/?category=Accesorios">Accesorios</a></li>'}
                    ${user ? '<li><a href="/dashboard/new">Añadir producto nuevo</a></li>' : ''}
                    ${user ? '<li><a href="/logout">Cerrar sesión</a></li>' : '<li><a href="/login">Iniciar sesión como administrador</a></li>'}
                </ul>
            </nav>
        <h1>La tienda de Agos</h1>
        ${user ? `<p class="session-message">Sesión iniciada como ${user.email}</p>` : ''}
        <div id="notification" style="display: none;"></div>
        </header>
        <main>
            ${content}
        </main>
        <footer>
            <p>&copy; 2024 Tienda de Ropa de Agos</p>
        </footer>
        <script>
            const removeProduct = async (productId) => {
                try {
                    const response = await fetch(\`/dashboard/\${productId}/delete\`, {
                        method: 'DELETE',
                    });
            const notification = document.getElementById('notification');

            if (response.ok) {
                // Muestra el mensaje de éxito
                notification.innerText = 'Producto eliminado con éxito. Redirigiendo a la página principal...';
                notification.style.display = 'block'; // Muestra el mensaje

                // Redirige al dashboard después de 2 segundos
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);
            } else {
                // Maneja el caso en el que no se pueda eliminar
                const errorMessage = await response.text();
                notification.innerText = 'Error al eliminar el producto: ' + errorMessage;
                notification.style.display = 'block'; // Muestra el mensaje
            }
                } catch (error) {
                    console.error('Error en la solicitud', error);
                    alert('Hubo un error en la solicitud.');
                }
            }
        </script> 
    </body>
    </html>
    `
}


const registerForm = () => {
    const form = `
    <h2>Registro</h2>
    <form method="POST" action="/register">
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
     <input class="button" type="submit" value="Aceptar""/>
    </form>
    `
    return form;
  }
  
  const loginForm = () => {
    const form = `
    <h2>Login</h2>
    <form>
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button class="button" id="loginButton">Aceptar</button>
     <div id="mensaje"></div>
    </form>
    <script type="module" src="./utils/configLogin.js"></script>
    `
    return form;
  }
  


module.exports = {
    getProductsCards,
    baseHTML, 
    loginForm,
    registerForm,
}