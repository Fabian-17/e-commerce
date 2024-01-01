import { Sequelize } from 'sequelize';
import { environments } from './environments.js';

export const sequelize = new Sequelize(
    environments.DB.DB_NAME,
    environments.DB.DB_USER,
    environments.DB.DB_PASSWORD,
    {
        host: environments.DB.DB_HOST,
        dialect: environments.DB.DB_DIALECT,
        port: environments.DB.DB_PORT,
    }
);

// Función para establecer la conexión a la base de datos

export const connectDb = async () => {
    try {
        await sequelize.sync    ();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    };
};