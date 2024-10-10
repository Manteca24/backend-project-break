const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        // para conectar a la base de datos correspondiente según el entorno
        await mongoose.connect(process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI);
        console.log('Base de datos conectada con éxito');
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};


module.exports = {
    dbConnection
};