# Proyecto de Tienda de Ropa

Este proyecto es una tienda de ropa en línea que incluye funcionalidades de autenticación y gestión de productos. Está construido utilizando Node.js, Express y MongoDB. Puedes verlo desplegado en el siguiente enlace: https://backend-project-break-0n1c.onrender.com/products

## Tabla de Contenidos

- [Descripción del Proyecto](#descripción-del-proyecto)
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Configuración del Proyecto](#configuración-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API](#api)
- [Base de datos](#base-de-datos)
- [Servidor](#servidor)
- [Rutas](#rutas)
- [Controladores](#controladores)
- [Despliegue](#despliegue)
- [Autenticación con Firebase](#autenticación-con-Firebase)

## Descripción del Proyecto

Este proyecto permite a los usuarios registrarse, iniciar sesión y navegar a través de un catálogo de productos. 
Los administradores pueden agregar, editar y eliminar productos.

## Características

- **Autenticación de Usuarios**: Permite a los usuarios registrarse e iniciar sesión utilizando email y contraseña.
- **Gestión de Productos**: Los administradores pueden agregar, editar y eliminar productos en el catálogo.
- **Catálogo de Productos**: Los usuarios pueden explorar y filtrar productos.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework para aplicaciones web en Node.js.
- **MongoDB**: Base de datos NoSQL.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB.
- **Firebase**: Para la autenticación de usuarios.

## Configuración del Proyecto

1. Clona el repositorio:
   `git clone <URL del repositorio>`
2. Navega al directorio del proyecto:
   `cd <nombre del directorio>`
3. Instala las dependencias
   `npm install `

Esto instalará las siguientes dependencias:

- Express: Framework para Node.js.
- dotenv: Para manejar variables de entorno.
- mongoose: ODM para MongoDB.
- cookie-parser: Para manejar cookies.
- swagger-jsdoc y swagger-ui-express: Para la documentación de la API.

Además, necesitarás configurar las variables de entorno creando un archivo .env en la raíz del proyecto con las siguientes variables:
MONGO_URI=<tu_uri_a_mongodb>
PORT=5000
FIREBASE_API_KEY=<tu_api_key>
FIREBASE_AUTH_DOMAIN=<tu_auth_domain>
FIREBASE_PROJECT_ID=<tu_project_id>

4. Una vez configuradas las variables de entorno, inicia el servidor 
    `npm start`

Podrás acceder a la aplicación desde tu navegador en `http://localhost:${PORT}`

## Estructura del proyecto
```
.
├── config
│   ├── db.js                   # Configuración de la conexión a MongoDB
│   └── firebase.js             # Configuración de Firebase
├── controllers
│   ├── productController.js    # Controlador para manejar productos
│   └── authController.js       # Controlador para autenticación
├── docs
│   └── basicInfo.js  
|    └── components.js 
|    └── index.js 
|    └── products.js            # Para la documentación de la API en swagger
├── middlewares
│   └── authMiddleware.js       # Middleware de autenticación
├── models
│   └── Product.js              # Modelo de producto
├── routes
│   ├── productRoutes.js        # Rutas de productos
│   └── authRoutes.js           # Rutas de autenticación
├── public
│   ├── utils  
|   |  └── configLogin          # Archivo para inicializar Firebase
│   ├── styles.css              # Estilos CSS
│   └── images                  # Imágenes de productos
├── .env                        # Variables de entorno
├── index.js                    # Archivo principal del servidor
└── package.json                # Archivo con las dependencias del proyecto
```

## API 
La API del proyecto está documentada con Swagger. Puedes acceder a la documentación en: `http://localhost:${PORT}/api-docs`.

## Base de datos 
El proyecto utiliza MongoDB como base de datos. Los productos se almacenan en una colección siguiendo el siguiente esquema:

· Modelo de Producto (models/Product.js)
· name (String, requerido): Nombre del producto.
· description (String, requerido): Descripción del producto.
· image (String, requerido): URL de la imagen del producto.
· category (String, requerido): Categoría del producto (Camisetas, Pantalones, Sudaderas y Accesorios).
· size (String, requerido): Talla del producto, permite cualquier valor. 
· price (Number, requerido): Precio del producto.

## Servidor 
El archivo index.js es el punto de entrada de la aplicación, donde se configura el servidor y se registran las rutas. Utiliza middleware como express.urlencoded para manejar datos de formularios y express.static para servir archivos estáticos.

## Rutas

Las rutas están organizadas en archivos separados para una mejor gestión:

# Rutas de Productos (productRoutes.js):

· Rutas no protegidas 
- **GET** `/products`  # Muestra todos los productos disponibles.
- **GET** `/products/:productId`  # Muestra los detalles de un producto específico mediante su ID.

· Rutas protegidas (necesitan autenticación) 
- **GET** `/dashboard`  # Muestra todos los productos en el dashboard solo si el usuario está autenticado.
- **GET** `/dashboard/new`  # Muestra el formulario para crear un nuevo producto en el dashboard, requiere autenticación.
- **POST** `/dashboard`  # Crea un nuevo producto en el dashboard, solo accesible para usuarios autenticados.
- **GET** `/dashboard/:productId`  # Muestra los detalles de un producto específico en el dashboard si el usuario está autenticado.
- **GET** `/dashboard/:productId/edit`  # Muestra el formulario para editar un producto específico en el dashboard, requiere autenticación.
- **POST** `/dashboard/:productId`  # Actualiza un producto específico en el dashboard, solo accesible para usuarios autenticados.
- **DELETE** `/dashboard/:productId/delete`  # Elimina un producto específico del dashboard, requiere que el usuario esté autenticado.

# Rutas de Autenticación (authRoutes.js)
- **GET** `/login`  # Muestra la página de inicio de sesión.
- **POST** `/login`  # Procesa el inicio de sesión y autentica al usuario.
- **GET** `/logout`  # Cierra la sesión del usuario autenticado.
- **GET** `/register`  # Muestra la página de registro de nuevos usuarios.
- **POST** `/register`  # Procesa el registro de un nuevo usuario y lo crea en el sistema

## Controladores 
Los controladores definen la lógica de las operaciones CRUD. Los productos se gestionan en controllers/productController.js, mientras que la autenticación se maneja en controllers/authController.js

## Despliegue
Para desplegar la aplicación, puedes usar Render o cualquier otro servicio similar. 
Recuerda añadir las variables de entorno necesarias en la configuración del servicio.
Este proyecto ya se encuentra desplegado en Render y se puede acceder a través de este enlace: https://backend-project-break-0n1c.onrender.com/

## Autenticación con Firebase
La aplicación incluye un sistema de registro e inicio de sesión que utiliza Firebase para la autenticación. Después de que un usuario administrador se registre a través de `register`, podrá iniciar sesión en `/login` para acceder al panel de control y gestionar los productos. Las rutas están aseguradas con <authMiddleware>, lo que garantiza que solo los usuarios autenticados puedan acceder a estas funciones, permitiéndoles ver, actualizar, eliminar o crear productos.

La información del <serviceAccount> está protegida en el archivo `.env`, y la lógica de inicio de sesión se encuentra en `configLogin.js`.