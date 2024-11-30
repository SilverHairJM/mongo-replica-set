//! Hacer la importacion de mongoose
const mongoose = require("mongoose");

//! Desestructurar el esquema desde mongoose
const { Schema, model } = mongoose;
const Productos = require("./Productos");

//! Definir los Schemas de los subdocumentos

//! Schema del carrito
const productoCarritoSchema = new Schema({
  producto_id: {
    type: Number,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
});

//! Schema del pedidos
const pedidoProductoSchema = new mongoose.Schema({
  producto_id: {
    type: Number,
    required: true,
  },
  cantidad: { type: Number, required: true },
  precioNeto: { type: Number, required: true },
});
const pedidoSchema = new mongoose.Schema({
  idPedido: { type: Number, required: true },
  fecha_pedido: { type: Date, required: true },
  estado: { type: String, required: true },
  productos: [pedidoProductoSchema],
  precioTotal: { type: Number, required: true },
  metodoPago: { type: String, required: true },
});

//! Schema del comentarios
const comentarioSchema = new mongoose.Schema({
  idComentario: { type: Number, required: true },
  producto_id: {
    type: Number,
    required: true,
  },
  valoracion: { type: String, required: true },
  comentario: { type: String, required: true },
});

//! Definir el esquema de Usuarios_pedidos_carrito_comentarios
const Usuarios_pedidos_carrito_comentariosSchema = new Schema({
  id_usuario: {
    type: Number,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: true,
  },
  direccionEnvio: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
  },
  carrito: {
    idCarrito: {
      type: Number,
      required: true,
    },
    productos: [productoCarritoSchema],
  },
  pedidos: [pedidoSchema],
  comentarios: [comentarioSchema],
});

//! Crear el modelo de Usuarios_pedidos_carrito_comentarios
const Usuarios_pedidos_carrito_comentarios = model(
  "Usuarios_pedidos_carrito_comentarios",
  Usuarios_pedidos_carrito_comentariosSchema
);

module.exports = Usuarios_pedidos_carrito_comentarios; // Exportar el modelo
