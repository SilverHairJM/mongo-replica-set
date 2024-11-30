//! Importar los modelos a usar

const UCPC = require("../models/Usuarios-carrito-pedidos-comentarios");
const productos = require("../models/Productos");

//* Rutas

//* Obtener toda la coleccion para ver si funciona correctamente
const obtenerUCPC = async (req, res) => {
  try {
    const usuarios = await UCPC.find().lean();
    const usuariosFormatted = usuarios.map((user) => ({
      _id: user._id,
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      email: user.email,
      contraseña: user.contraseña,
      direccionEnvio: user.direccionEnvio,
      telefono: user.telefono,
      carrito: user.carrito,
      pedidos: user.pedidos,
      comentarios: user.comentarios,
    }));
    res.json(usuariosFormatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* Crear o actualizar un usuario y sus subdocumentos correspondientes
const crearActualizar = async (req, res) => {
    const { id_usuario, nombre, email, contraseña, direccionEnvio, 
        telefono, carrito, pedidos, comentarios } = req.body;
    try {
        let usuario = await UCPC.findOne({ id_usuario }); 
        if (usuario) { 
            // Actualizar
            usuario.nombre = nombre; 
            usuario.email = email; 
            usuario.contraseña = contraseña; 
            usuario.direccionEnvio = direccionEnvio; 
            usuario.telefono = telefono; 
            usuario.carrito = carrito; 
            usuario.pedidos = pedidos; 
            usuario.comentarios = comentarios; 
            await usuario.save(); 
            res.json({ message: 'Usuario actualizado con éxito', usuario }); 
        } else { 
            // Crear un nuevo usuario 
            usuario = new UCPC({ 
                id_usuario, 
                nombre, 
                email, 
                contraseña,
                direccionEnvio, 
                telefono, 
                carrito, 
                pedidos, 
                comentarios 
            });
            await usuario.save(); 
            res.json({ message: 'Usuario creado con éxito', usuario }); 
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

//* Eliminar un Usuario y sus subdocumentos correspondientes
const eliminarUsuario = async (req, res) => {
    const { id_usuario } = req.body;
    try {
        const producto = await UCPC.findOneAndDelete({ id_usuario });
        if (producto == null) {
            // Si el alumno no se encuentra, enviar un mensaje de error
            return res.status(404).json({ message: 'No se encontró el usuario' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el Usuario" });
    }
}

//! Rutas para resolvar el laboratorio

//* Q4. Listar los productos que ha agregado un cliente en específico a su carrito de compras.
//* Q5. Listar los productos con mejores valoraciones.
//* Q6. Listar los productos más agregados a los carritos de compra.
//* Q7. Listar todos los pedidos (incluyendo los productos) de un cliente en específico.
//* Q8. Listar todos los productos que ha adquirido un cliente en específico.
//* Q9. Listar todos los Clientes que han comprado un producto en específico.

module.exports = { obtenerUCPC, 
    crearActualizar, 
    eliminarUsuario};
