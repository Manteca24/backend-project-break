#  Tienda de Ropa
Este proyecto es una tienda de ropa online con un catálogo de productos y un dashboard
para que el administrador pueda gestionar los productos. Los productos están almacenados en una bse de datos de MongoDB en Atlas.

## Índice 
- 
---

## Instalación

### Inicializar el proyecto Node.js

> npm init -y

Para crear el archivo package.json donde se guardarán las dependencias

### Instalar las dependencias

> npm install express mongoose dotenv -E
> npm install nodemon -dev 

### .gitignore y .env

Creamos un archivo .env en la raíz del proyecto con las variables de entorno MONGO_URI y PORT. 

### Para iniciar el servidor usamos el script "start" configuirado en package.json

> npm start


## Creamos la estructura de archivos 
```
.
├── config
│   ├── db.js 
│   └── firebase.js (BONUS)
├── controllers
│   ├── productController.js
│   └── authController.js (BONUS)
├── models
│   └── Product.js
├── routes
│   └── productRoutes.js
│   └── authRoutes.js (BONUS)
├── middlewares (BONUS)
│   └── authMiddleware.js
└── index.js
├── test (BONUS)
│   └── productController.test.js
├── public
│   ├── styles.css
│   └── images (OPCIONAL)
├── .env
└── package.json

```

Dentro de config:
db.js → Aquí irá la configuración para conectar a MongoDB Atlas.
(BONUS) firebase.js 

Dentro de controllers:
productController.js → Aquí controlaremos las operaciones CRUD para productos.
(BONUS) authController.js → Para autenticación con Firebase 

Dentro de models:
Product.js → Aquí definiremos el esquema del producto usando Mongoose.

Dentro de routes:
productRoutes.js → Definiremos las rutas de los productos aquí.
(BONUS) authRoutes.js → autenticación.

Dentro de middlewares (bonus de autenticación):
authMiddleware.js → Para manejar la autenticación.

En la raíz del proyecto:
index.js → Este será el archivo principal donde configuraremos Express.
.env → Para las variables de entorno, como la URI de MongoDB.
package.json → Contendrá las dependencias del proyecto.

Dentro de public:
styles.css → Para los estilos.
(OPCIONAL) Carpeta images para las imágenes de productos.

Dentro de test (bonus de testing):
productController.test.js → Para escribir los tests de Jest.

## Base de datos
El proyecto utiliza MongoDB como base de datos. Los productos se almacenan en una colección de MongoDB Atlas, con el siguiente [modelo]

### Configuración de la base de datos

Creamos la base de datos en MongoDB Atlas, creando un usuario, un cluster y una colección. Requerimos mongoose.

### Configurar el servidor Express

Conectamos con la base de datos requiriendo express, dotenv y connectDB en index.js

### Middlewares

· express.urlencoded: Se usa para manejar los datos enviados desde formularios HTML, permitiendo que el servidor pueda leer el contenido del body de las peticiones.
· express.static: Sirve archivos estáticos, como imágenes, CSS, y otros recursos desde la carpeta public, haciendo que estén disponibles directamente al cliente.

### Crear el modelo de Product en models/Product.js 
Campos del Modelo:
- name (String, requerido): El nombre del producto.
description (String, requerido): Una breve descripción del producto.
- image (String, requerido): La URL de la imagen del producto.
- category (String, requerido): La categoría del producto. Solo puede tener uno de los siguientes valores: Camisetas, Pantalones, Zapatos, Accesorios.
- size (String, requerido): La talla del producto. Solo puede tener uno de los siguientes valores: XS, S, M, L, XL, 2XL, 3XL, 4XL.
- price (Number, requerido): El precio del producto.


## Rutas
GET /products: Muestra todos los productos disponibles en la tienda.
GET /products/
: Muestra los detalles de un producto específico según su ID.
GET /products/new: Muestra el formulario para agregar un nuevo producto.
POST /products: Crea un nuevo producto utilizando los datos proporcionados en el formulario.
GET /products/
/edit: Muestra el formulario para editar un producto existente.
PUT /products/
: Actualiza un producto existente según su ID con los nuevos datos.
DELETE /products/
/delete: Elimina un producto existente según su ID.

### Controladores
Para realizar operaciones CRUS con MongoDB.
Los controladores para los productos están definidos en controllers/productController.js

## Despliegue
El proyecto se puede desplegar fácilmente en Render:

1. Crea una cuenta en Render.
2. Conecta tu repositorio de GitHub con Render.
3. Añade las variables de entorno necesarias:
MONGO_URI, PORT. 
4. Despliega la aplicación.

## Documentación 
Este proyecto utiliza la metodología SSR (Server-Side Rendering) con Express para generar el HTML dinámicamente. A continuación, una breve descripción de las tecnologías utilizadas:

· Express: Framework de Node.js para crear el servidor y manejar las rutas.
· Mongoose: ODM para manejar la base de datos MongoDB.
· MongoDB Atlas: Servicio de base de datos en la nube.
· dotenv: Para cargar las variables de entorno.
· Firebase (BONUS): Para la autenticación y protección de rutas del dashboard.


## Testing con JEST
He implementado tests con Jest para verificar el correcto funcionamiento del controlador de productos.
Para instalar jest como dependencia de desarrollo:
> npm install jest -dev -E

Los tests están en la carpeta test/productController.test.js.

Pruebas:
- Crear un producto: Verifica que al crear un producto, la respuesta tenga un estado 201.
- Mostrar todos los productos: Comprueba que se pueda obtener la lista de productos.
- Mostrar un producto por ID: Verifica que al buscar un producto por su ID, se devuelva el producto correcto.
- 404 para producto no encontrado: Asegura que se maneje correctamente el caso donde se busca un producto que no existe.
- Actualizar un producto: Verifica que se pueda actualizar un producto.
- Eliminar un producto: Comprueba que al eliminar un producto, se devuelva un mensaje de éxito.
- 404 al eliminar un producto no encontrado: Asegura que se maneje correctamente el caso donde se intenta eliminar un producto que no existe.

## Autenticación con Firebase
El administrador puede autenticarse utilizando Firebase. Las rutas del dashboard están protegidas por un middleware que verifica si el usuario está autenticado.

## API y documentación con Swagger
Hemos creado una API REST que devuelve los datos en formato JSON para ser utilizada con un frontend en React. La API está documentada con Swagger para facilitar su uso. Para acceder a la documentación, dirígete a la siguiente URL en tu navegador: http://localhost:<PORT>/api-docs.
La documentación de la API la tenemos en la carpeta docs.