// docs/products.js
module.exports = {
    paths: {
      "/products": {
        get: {
          tags: {
            Products: ": Obtener todos los productos",
          },
          description: "Obtener todos los productos de la tienda",
          operationId: "getProducts",
          parameters: [],
          responses: {
            200: {
              description: "Lista de productos",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
            404: {
              description: "Productos no encontrados",
            },
            500: {
              description: "Error del servidor",
            },
          },
        },
        post: {
          tags: {
            Products: ": Crear un nuevo producto",
          },
          description: "Crear un nuevo producto en la tienda",
          operationId: "createProduct",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProductBody",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Producto creado exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
            400: {
              description: "Error de validación",
            },
            500: {
              description: "Error del servidor",
            },
          },
        },
      },
      "/products/{_id}": {
        put: {
          tags: {
            Products: ": Actualizar un producto",
          },
          description: "Actualizar un producto existente en la tienda",
          operationId: "updateProduct",
          parameters: [
            {
              name: "_id",
              in: "path",
              required: true,
              description: "ID del producto a actualizar",
            }
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ProductBody",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Producto actualizado exitosamente",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
            404: {
              description: "Producto no encontrado",
            },
            500: {
              description: "Error del servidor",
            },
          },
        },
        delete: {
          tags: {
            Products: ": Eliminar un producto",
          },
          description: "Eliminar un producto de la tienda",
          operationId: "deleteProduct",
          parameters: [
            {
              name: "_id",
              in: "path",
              required: true,
              description: "ID del producto a eliminar",
            }
          ],
          responses: {
            200: {
              description: "Producto eliminado exitosamente",
            },
            404: {
              description: "Producto no encontrado",
            },
            500: {
              description: "Error del servidor",
            },
          },
        },
      },
    },
  };
  