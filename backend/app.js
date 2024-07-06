const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const cors = require('cors');
const app = express();
const port = 3000;

// app.use(cors());
// Configuración de la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'icomallas',
    password: 12345678,
    port: 5432,
});

const corsOptions = {
    origin: '*', // Puedes usar un array de orígenes específicos en lugar de '*'
    credentials: true,
  };

app.use(cors(corsOptions));

app.use(bodyParser.json());

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Gestión de Clientes',
            version: '1.0.0',
            description: 'API para gestionar clientes y usuarios',
            contact: {
                name: 'Christian Porras',
                email: 'cristian062094@hotmail.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./app.js'], // Rutas a los archivos de la API
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
* @swagger
* /register:
*   post:
*     summary: Registra un nuevo usuario
*     tags: [Usuarios]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - username
*               - password
*               - email
*             properties:
*               username:
*                 type: string
*               password:
*                 type: string
*               email:
*                 type: string
*     responses:
*       201:
*         description: Usuario registrado exitosamente
*       500:
*         description: Error registrando usuario
*/
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        await pool.query('SELECT register_user($1, $2, $3)', [username, password, email]);
        res.status(201).send('Usuario registrado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registrando usuario');
    }
});
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error autenticando usuario
 */
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT authenticate_user($1, $2)', [username, password]);
        if (result.rows[0].authenticate_user) {
            res.status(200).send('Autenticación exitosa');
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error autenticando usuario');
    }
});

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nit
 *               - business_name
 *               - email
 *               - phone
 *               - created_by
 *             properties:
 *               nit:
 *                 type: string
 *               business_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               created_by:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       500:
 *         description: Error creando cliente
 */
app.post('/clients', async (req, res) => {
    const { nit, business_name, email, phone, created_by } = req.body;
    try {
        await pool.query('SELECT create_client($1, $2, $3, $4, $5)', [nit, business_name, email, phone, created_by]);
        res.status(201).send('Cliente creado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creando cliente');
    }
});

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Obtiene todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   client_id:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   nit:
 *                     type: string
 *                   business_name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   created_by:
 *                     type: integer
 *                   status:
 *                     type: string
 *       500:
 *         description: Error obteniendo clientes
 */
app.get('/clients', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM get_clients()');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error obteniendo clientes');
    }
});

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nit
 *               - business_name
 *               - email
 *               - phone
 *               - status
 *             properties:
 *               nit:
 *                 type: string
 *               business_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       500:
 *         description: Error actualizando cliente
 */
app.put('/clients/:id', async (req, res) => {
    const clientId = req.params.id;
    const { nit, business_name, email, phone, status } = req.body;
    try {
        await pool.query('SELECT update_client($1, $2, $3, $4, $5, $6)', [clientId, nit, business_name, email, phone, status]);
        res.status(200).send('Cliente actualizado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error actualizando cliente');
    }
});

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Borra un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente borrado exitosamente
 *       500:
 *         description: Error borrando cliente
 */
app.delete('/clients/:id', async (req, res) => {
    const clientId = req.params.id;
    try {
        await pool.query('SELECT delete_client($1)', [clientId]);
        res.status(200).send('Cliente borrado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error borrando cliente');
    }
});

/**
 * @swagger
 * /clients/id/{id}:
 *   get:
 *     summary: Obtiene un cliente por id
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: id del cliente
 *     responses:
 *       200:
 *         description: Información del cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client_id:
 *                   type: integer
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 nit:
 *                   type: string
 *                 business_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 created_by:
 *                   type: integer
 *                 status:
 *                   type: string
 *       500:
 *         description: Error obteniendo cliente
 */
app.get('/clients/id/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM clients WHERE client_id = ($1)', [id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error obteniendo cliente');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
