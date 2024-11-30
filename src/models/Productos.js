//! Hacer la importacion de mongoose
const mongoose = require("mongoose");

//! Desestructurar el esquema desde mongoose
const { Schema, model } = mongoose;

//! Definir el esquema de los productos

const productoSchema = new Schema({
    id_producto: {
        type: Number,
        required: true,
        unique: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    subcategoria: {
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
    },
    tallasDisponibles: {
        type: [String],
        required: true,
    },
});

const productos = model('Productos', productoSchema);
module.exports = productos; //! Exportar el modelo de productos
