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
    res.data = usuariosFormatted;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//* Crear o actualizar un usuario y sus subdocumentos correspondientes
const crearActualizar = async (req, res) => {
  const {
    id_usuario,
    nombre,
    email,
    contraseña,
    direccionEnvio,
    telefono,
    carrito,
    pedidos,
    comentarios,
  } = req.body;
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
      res.json({ message: "Usuario actualizado con éxito", usuario });
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
        comentarios,
      });
      await usuario.save();
      res.json({ message: "Usuario creado con éxito", usuario });
      res.data = usuario;
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
      return res.status(404).json({ message: "No se encontró el usuario" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
    res.data = producto;
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Usuario" });
  }
};

//! Rutas para resolvar el laboratorio

//* Q4. Listar los productos que ha agregado un cliente en específico a su carrito de compras.
const Q4 = async (req, res) => {
  try {
    const { id_usuario } = req.body;
    const carrito = await UCPC.findOne(
      { id_usuario: id_usuario },
      { _id: 0, "carrito.productos": 1 }
    );
    if (!carrito) {
      return res
        .status(404)
        .json({
          message: "No se encontró el carrito para el usuario especificado",
        });
    }
    res.json(carrito.carrito.productos);
    res.data = carrito.carrito.productos;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Q5. Listar los productos con mejores valoraciones.
const Q5 = async (req, res) => {
  try {
    const productosValorados = await UCPC.aggregate([
      // Descomponer el array "comentarios"
      { $unwind: "$comentarios" },
      // Agrupar por producto_id y calcular promedio de valoraciones y total de comentarios
      {
        $group: {
          _id: "$comentarios.producto_id",
          promedio_valoracion: {
            $avg: { $toDouble: "$comentarios.valoracion" },
          },
          total_comentarios: { $sum: 1 },
        },
      },
      // Ordenar por promedio de valoración descendente
      { $sort: { promedio_valoracion: -1 } },
      // Proyección para mostrar campos relevantes
      {
        $project: {
          _id: 0,
          producto_id: "$_id",
          promedio_valoracion: 1,
          total_comentarios: 1,
        },
      },
    ]);
    res.json(productosValorados);
    res.data = productosValorados;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Q6. Listar los productos más agregados a los carritos de compra.
const Q6 = async (req, res) => {
  try {
    const productosAgregados = await UCPC.aggregate([
      { $unwind: "$carrito.productos" },
      // Agrupar por producto_id y calcular promedio de valoraciones y total de comentarios
      {
        $group: {
          _id: "$carrito.productos.producto_id",
          total_agregado: { $sum: "$carrito.productos.cantidad" },
        },
      },
      // Ordenar por promedio de valoración descendente
      { $sort: { total_agregado: -1 } },
      // Proyección para mostrar campos relevantes
      {
        $project: {
          _id: 0, // Excluimos el _id
          producto_id: "$_id", // Renombramos el campo _id a producto_id
          total_agregado: 1, // Incluimos el total agregado
        },
      },
    ]);
    res.json(productosAgregados);
    res.data = productosAgregados;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Q7. Listar todos los pedidos (incluyendo los productos) de un cliente en específico.
const Q7 = async (req, res) => {
  try {
    const { id_usuario } = req.body;
    const pedidos = await UCPC.aggregate([
      { $match: { id_usuario: id_usuario } },
      { $unwind: "$pedidos" }, // Descomponer pedidos
      { $unwind: "$pedidos.productos" }, // Descomponer productos
      {
        $lookup: {
          from: "productos",
          localField: "pedidos.productos.producto_id",
          foreignField: "id_producto",
          as: "detalle_producto",
        },
      },
      { $match: { "detalle_producto.0": { $exists: true } } }, // Filtrar productos encontrados
      {
        $group: {
          _id: "$pedidos.idPedido",
          fecha: { $first: "$pedidos.fecha_pedido" },
          estado: { $first: "$pedidos.estado" },
          precio_total: { $first: "$pedidos.precioTotal" },
          metodo_pago: { $first: "$pedidos.metodoPago" },
          productos: {
            $push: {
              id_producto: "$pedidos.productos.producto_id",
              cantidad: "$pedidos.productos.cantidad",
              detalle: { $arrayElemAt: ["$detalle_producto", 0] },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          id_pedido: "$_id",
          fecha: 1,
          estado: 1,
          precio_total: 1,
          metodo_pago: 1,
          productos: 1,
        },
      },
    ]);
    res.json(pedidos);
    res.data = pedidos;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Q8. Listar todos los productos que ha adquirido un cliente en específico.
const Q8 = async (req, res) => {
  try {
    const { id_usuario } = req.body;
    const productosAdquiridos = await UCPC.aggregate([
      {
        $match: { id_usuario: id_usuario},
      },
      // Descomponer los pedidos
      { $unwind: "$pedidos" },
      // Descomponer los productos dentro de cada pedido
      { $unwind: "$pedidos.productos" },
      {
        $lookup: {
          from: "productos",
          localField: "pedidos.productos.producto_id",
          foreignField: "id_producto",
          as: "detalle_producto",
        },
      },
      {
        $project: {
          _id: 0,
          id_producto: "$pedidos.productos.producto_id",
          cantidad: "$pedidos.productos.cantidad",
          detalle_producto: {
            id: { $arrayElemAt: ["$detalle_producto.id", 0] },
            nombre: { $arrayElemAt: ["$detalle_producto.modelo", 0] },
            categoria: { $arrayElemAt: ["$detalle_producto.categoria", 0] },
            precio: { $arrayElemAt: ["$detalle_producto.precio", 0] },
          },
        },
      },
    ]);
    res.json(productosAdquiridos);
    res.data = productosAdquiridos;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//* Q9. Listar todos los Clientes que han comprado un producto en específico.
const Q9 = async (req, res) => {
  try {
    const { producto_id } = req.body;
    const clientes = await UCPC.aggregate([
      {
        $match: {
          "pedidos.productos.producto_id": producto_id, // ID del producto que buscamos
        },
      },
      // Descomponer los pedidos
      { $unwind: "$pedidos" },
      // Descomponer los productos dentro de cada pedido
      { $unwind: "$pedidos.productos" },
      // Filtrar únicamente los productos específicos
      {
        $match: {
          "pedidos.productos.producto_id": producto_id, // Asegurarse de mantener solo los productos deseados
        },
      },
      // Proyección de datos relevantes
      {
        $project: {
          _id: 0,
          id_usuario: "$id",
          nombre_usuario: "$nombre",
          email_usuario: "$email",
          id_producto: "$pedidos.productos.producto_id",
          cantidad_comprada: "$pedidos.productos.cantidad",
        },
      },
    ]);
    res.json(clientes);
    res.data = clientes;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  obtenerUCPC,
  crearActualizar,
  eliminarUsuario,
  Q4,
  Q5,
  Q6,
  Q7,
  Q8,
  Q9,
};
