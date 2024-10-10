// docs/components.js
module.exports = {
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: "ID del producto",
              example: "6201064b0028de7866e2b2c4"
            },
            name: {
              type: 'string',
              description: "Nombre del producto",
              example: "Camisa de algodón"
            },
            price: {
              type: 'number',
              description: "Precio del producto",
              example: 29.99
            },
            description: {
              type: 'string',
              description: "Descripción del producto",
              example: "Una camisa cómoda y elegante"
            },
            imageUrl: {
              type: 'string',
              description: "URL de la imagen del producto",
              example: "https://example.com/camisa.jpg"
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: "Fecha de creación del producto",
              example: "2024-09-30T08:14:00.665Z"
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: "Fecha de actualización del producto",
              example: "2024-10-01T19:03:26.148Z"
            },
          }
        },
        ProductBody: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: "Nombre del producto",
              example: "Camisa de algodón"
            },
            price: {
              type: 'number',
              description: "Precio del producto",
              example: 29.99
            },
            description: {
              type: 'string',
              description: "Descripción del producto",
              example: "Una camisa cómoda y elegante"
            },
            imageUrl: {
              type: 'string',
              description: "URL de la imagen del producto",
              example: "https://example.com/camisa.jpg"
            },
          }
        },
        ProductId: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: "ID del producto",
              example: "6201064b0028de7866e2b2c4"
            }
          }
        }
      }
    }
  };
  