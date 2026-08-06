import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './config/database';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'API InnovaTube funcionando'
    })
});

//Probando conexión a MySQL
// async function testDatabaseConnection() {
//     try {
//         const connection = await pool.getConnection();
//         console.log('Conectado a MySQL');
//         connection.release();
//     } catch (error) {
//         console.error('Error al conectar con MySQL:', error);
//     }
// }
// testDatabaseConnection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en puerto ${PORT}`)
});