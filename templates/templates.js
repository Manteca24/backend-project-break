const getProductsCards = (products, user) => {
    let html='';
    for(let product of products){
        html += `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Precio: ${product.price}€</p>
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
    </head>
    <body>
        <header>
            <nav>
                <ul>
                    ${user ? '<li><a href="/dashboard">Inicio</a></li>' : '<li><a href="/products">Inicio</a></li>'}
                    <li><a href="/products/?category=Camisetas">Camisetas</a></li>
                    <li><a href="/products/?category=Sudaderas">Sudaderass</a></li>
                    <li><a href="/products/?category=Pantalones">Pantalones</a></li>
                    <li><a href="/products/?category=Zapatos">Zapatos</a></li>
                    <li><a href="/products/?category=Accesorios">Accesorios</a></li>
                    ${user ? '<li><a href="/dashboard/new">Añadir producto nuevo</a></li>' : ''}
                </ul>
            </nav>
        </header>
        <main>
            ${content}
        </main>
        <footer>
            <p>&copy; 2024 Tienda de Ropa de Agos</p>
        </footer>
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