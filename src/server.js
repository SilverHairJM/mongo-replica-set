require("dotenv").config(); // Carga las variables de entorno desde el archivo .env

const express = require("express"); // Framework para construir aplicaciones web y APIs

const cors = require("cors"); // Middleware para permitir solicitudes de recursos cruzados;

const morgan = require("morgan"); // Middleware para el registro de solicitudes HTTP

const logger = require("./middleware/logger"); // Middleware personalizado para registrar solicitudes en Redis

const { mongoose, redisClient } = require("./config/db"); // Importamos las configuraciones de MongoDB y Redis

//! Importamos las rutas
//* Rutas relacionadas con la entidad productos
const routesProductos = require('./routes/Productos'); 
//* Rutas relacionadas con la entidad Usuarios-carrito-pedidos-comentarios
const routesUCPC = require('./routes/Usuarios-carrito-pedidos-comentarios'); 

//! Creamos una instancia de la aplicación Express
const app = express();
//! Middleware para parsear solicitudes JSON
app.use(express.json());
//! Middleware para permitir solicitudes de recursos cruzados
app.use(cors());
//!Middleware para registrar solicitudes HTTP
app.use(morgan("dev"));
//!Middleware personalizado para registrar solicitudes en Redis
app.use(logger);


//! ruta principal
app.get('/', (req, res) => {
    res.send('<h1>Laboratorio Mongo - Backend</h1><p>Esta es la página de inicio.</p>');
});

//! Usamos las rutas importadas


app.use("/api/UCPC", routesUCPC);
app.use("/api/productos", routesProductos);

app.use(logger);
//! Definimos el puerto en el que la aplicación escuchará las solicitudes
const PORT = process.env.PORT || 4000;

//! Iniciamos el servidor y lo ponemos a escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
