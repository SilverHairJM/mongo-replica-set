//! Importamos el modelo de productos

const productos = require("../models/Productos");

//!rutas
//* Obtener toda la coleccion para ver si funciona correctamente
const obtenerProductos = async (req, res) => {
    try {
        const resultado = await productos.find();

        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//* Crear o actualizar un producto
const crearActualizarProducto = async (req, res) => {
    const {
        id_producto,
        categoria,
        subcategoria,
        marca,
        modelo,
        descripcion,
        precio,
        tallasDisponibles,
    } = req.body;
    try {
        let producto = await productos.findOne({ id_producto });

        if (producto) {
            // Actualizar
            producto.categoria = categoria,
                producto.subcategoria = subcategoria,
                producto.marca = marca,
                producto.modelo = modelo,
                producto.descripcion = descripcion,
                producto.precio = precio,
                producto.tallasDisponibles = tallasDisponibles;
            await producto.save();

            res.json({ message: "Producto actualizado con éxito", producto });
        } else {
            // Crear
            producto = new productos({
                categoria,
                subcategoria,
                marca,
                modelo,
                descripcion,
                precio,
                tallasDisponibles,
            });
            await producto.save();

            res.json({ message: "Producto creado con éxito", producto });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//* Eliminar un producto
const eliminarProducto = async (req, res) => {
    const { id_producto } = req.body;
    try {
        const producto = await productos.findOneAndDelete({ id_producto });
        if (producto == null) {
            // Si el alumno no se encuentra, enviar un mensaje de error
            return res.status(404).json({ message: 'No se encontró el producto' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
}

//! Rutas para resolvar el laboratorio

//* Q1. Listar los productos de una categoría específica.

//* Q2. Listar los productos de una marca específica.

//* Q3. Listar los productos de una marca específica y los clientes que los han agregado a su carrito.
module.exports = { obtenerProductos, 
    crearActualizarProducto, 
    eliminarProducto};
