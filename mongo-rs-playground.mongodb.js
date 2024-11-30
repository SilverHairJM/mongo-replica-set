use("tienda_ropa");

//! Crear las colecciones
db.createCollection("usuarios_pedidos_carrito_comentarios");
db.createCollection("productos");

//! Inserta los documentos de la colección Usuarios-pedidos-carrito
db.getCollection("usuarios_pedidos_carrito_comentarios").insertMany([
  {
    id_usuario: 1,
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    contraseña: "password123",
    direccionEnvio: "Calle del sol 123, Guadalajara, México",
    telefono: "1234567890",
    carrito: {
      idCarrito: 1,
      productos: [
        { producto_id: 1, cantidad: 2, talla: "M"},
        { producto_id: 2, cantidad: 1, talla: "7"},
      ],
    },
    pedidos: [
      {
        idPedido: 1001,
        fecha_pedido: "17-01-2024",
        estado: "pendiente",
        productos: [
          { producto_id: 1, cantidad: 2, precioNeto: 1598, talla: "M"},
          { producto_id: 2, cantidad: 1, precioNeto: 2899, talla: "7"},
        ],
        precioTotal: 4497,
        metodoPago: "tarjeta",
      },
    ],
    comentarios: [
      {
        idComentario: 1,
        producto_id: 1,
        valoracion: "10",
        comentario: "Muy buena camiseta",
      },
    ],
  },
  {
    id_usuario: 2,
    nombre: "María López",
    email: "maria.lopez@example.com",
    contraseña: "securepass456",
    direccionEnvio: "Av. Insurgentes 567, CDMX, México",
    telefono: "9876543210",
    carrito: {
      idCarrito: 2,
      productos: [
        { producto_id: 3, cantidad: 1, talla: "M"},
        { producto_id: 5, cantidad: 1, talla: "M"},
      ],
    },
    pedidos: [
      {
        idPedido: 1002,
        fecha_pedido: "18-11-2024",
        estado: "enviado",
        productos: [
          { producto_id: 3, cantidad: 1, precioNeto: 1299, talla: "32"},
          { producto_id: 5, cantidad: 1, precioNeto: 2499, talla: "L"},
        ],
        precioTotal: 3798,
        metodoPago: "PayPal",
      },
    ],
    comentarios: [
      {
        idComentario: 2,
        producto_id: 3,
        valoracion: "9",
        comentario: "Muy buen pantalón, cómodo y ajusta bien.",
      },
    ],
  },
  {
    id_usuario: 3,
    nombre: "Carlos García",
    email: "carlos.garcia@example.com",
    contraseña: "mypassword789",
    direccionEnvio: "Calle 20 de Noviembre 345, Monterrey, México",
    telefono: "1122334455",
    carrito: {
      idCarrito: 3,
      productos: [
        { producto_id: 7, cantidad: 2, talla: "9"},
        { producto_id: 2, cantidad: 1, talla: "7"},
      ],
    },
    pedidos: [
      {
        idPedido: 1003,
        fecha_pedido: "19-11-2024",
        estado: "entregado",
        productos: [
          { producto_id: 7, cantidad: 2, precioNeto: 7198, talla: "9"},
          { producto_id: 2, cantidad: 1, precioNeto: 2899, talla: "7"},
        ],
        precioTotal: 10097,
        metodoPago: "tarjeta",
      },
    ],
    comentarios: [
      {
        idComentario: 3,
        producto_id: 7,
        valoracion: "10",
        comentario: "Las botas son perfectas para terrenos difíciles.",
      },
    ],
  },
  {
    id_usuario: 4,
    nombre: "Lucía Fernández",
    email: "lucia.fernandez@example.com",
    contraseña: "123lucia321",
    direccionEnvio: "Paseo de la Reforma 789, CDMX, México",
    telefono: "5566778899",
    carrito: {
      idCarrito: 4,
      productos: [
        { producto_id: 4, cantidad: 1, talla: "S"},
        { producto_id: 8, cantidad: 2, talla: "L"},
      ],
    },
    pedidos: [
      {
        idPedido: 1004,
        fecha_pedido: "20-11-2024",
        estado: "pendiente",
        productos: [
          { producto_id: 4, cantidad: 1, precioNeto: 899, talla: "S"},
          { producto_id: 8, cantidad: 2, precioNeto: 1398, talla: "L"},
        ],
        precioTotal: 2297,
        metodoPago: "efectivo",
      },
    ],
    comentarios: [
      {
        idComentario: 4,
        producto_id: 4,
        valoracion: "8",
        comentario: "El vestido está bien, pero esperaba un mejor estampado.",
      },
    ],
  },
  {
    id_usuario: 5,
    nombre: "Roberto Martínez",
    email: "roberto.martinez@example.com",
    contraseña: "roberto2024",
    direccionEnvio: "Av. Juárez 101, Puebla, México",
    telefono: "9988776655",
    carrito: {
      idCarrito: 5,
      productos: [
        { producto_id: 9, cantidad: 1, talla: "XL"},
        { producto_id: 10, cantidad: 3, talla: "XL"},
      ],
    },
    pedidos: [
      {
        idPedido: 1005,
        fecha_pedido: "21-11-2024",
        estado: "en proceso",
        productos: [
          { producto_id: 9, cantidad: 1, precioNeto: 2199, talla: "XL"},
          { producto_id: 10, cantidad: 3, precioNeto: 1497, talla: "XL"},
        ],
        precioTotal: 3696,
        metodoPago: "transferencia",
      },
    ],
    comentarios: [
      {
        idComentario: 5,
        producto_id: 9,
        valoracion: "10",
        comentario: "La chamarra es increíble, ideal para invierno.",
      },
    ],
  },
  {
    id_usuario: 6,
    nombre: "Ana Torres",
    email: "ana.torres@example.com",
    contraseña: "torres2024",
    direccionEnvio: "Calle Morelos 567, Mérida, México",
    telefono: "6677889900",
    carrito: {
      idCarrito: 6,
      productos: [
        { producto_id: 12, cantidad: 2, talla: "L"},
        { producto_id: 6, cantidad: 1, talla: "Única"},
      ],
    },
    pedidos: [
      {
        idPedido: 1006,
        fecha_pedido: "22-11-2024",
        estado: "entregado",
        productos: [
          { producto_id: 12, cantidad: 2, precioNeto: 1598, talla: "L"},
          { producto_id: 6, cantidad: 1, precioNeto: 299, talla: "Única"},
        ],
        precioTotal: 1897,
        metodoPago: "tarjeta",
      },
    ],
    comentarios: [
      {
        idComentario: 6,
        producto_id: 12,
        valoracion: "9",
        comentario: "Buena playera, ideal para entrenamientos intensos.",
      },
    ],
  },
]);

db.getCollection("productos").insertMany([
  {
    id_producto: 1,
    categoria: "Ropa",
    subcategoria: "Camisetas",
    marca: "Nike",
    modelo: "AirMax 2024",
    descripcion: "Camiseta deportiva de alto rendimiento",
    precio: 799,
    tallasDisponibles: ["S", "M", "L", "XL"],
  },
  {
    id_producto: 2,
    categoria: "Deportes",
    subcategoria: "Zapatos",
    marca: "Adidas",
    modelo: "UltraBoost 22",
    descripcion: "Zapatos de running con tecnología Boost",
    precio: 2899,
    tallasDisponibles: ["6", "7", "8", "9", "10"],
  },
  {
    id_producto: 3,
    categoria: "Ropa",
    subcategoria: "Pantalones",
    marca: "Levi's",
    modelo: "501 Original Fit",
    descripcion: "Pantalón de mezclilla clásico con ajuste cómodo",
    precio: 1299,
    tallasDisponibles: ["28", "30", "32", "34", "36", "38"],
  },
  {
    id_producto: 4,
    categoria: "Ropa",
    subcategoria: "Vestidos",
    marca: "Zara",
    modelo: "Summer Breeze",
    descripcion: "Vestido ligero de verano con estampado floral",
    precio: 899,
    tallasDisponibles: ["XS", "S", "M", "L", "XL"],
  },
  {
    id_producto: 5,
    categoria: "Ropa",
    subcategoria: "Abrigos",
    marca: "The North Face",
    modelo: "ThermoBall Eco",
    descripcion: "Abrigo acolchado ideal para clima frío",
    precio: 2499,
    tallasDisponibles: ["S", "M", "L", "XL"],
  },
  {
    id_producto: 6,
    categoria: "Accesorios",
    subcategoria: "Sombreros",
    marca: "Adidas",
    modelo: "Classic Cap",
    descripcion: "Gorra deportiva de algodón ajustable",
    precio: 299,
    tallasDisponibles: ["Única"],
  },
  {
    id_producto: 7,
    categoria: "Calzado",
    subcategoria: "Botas",
    marca: "Timberland",
    modelo: "6-Inch Premium",
    descripcion: "Botas resistentes de cuero impermeable",
    precio: 3599,
    tallasDisponibles: ["7", "8", "9", "10", "11"],
  },
  {
    id_producto: 8,
    categoria: "Ropa",
    subcategoria: "Faldas",
    marca: "H&M",
    modelo: "Pleated Midi",
    descripcion: "Falda plisada de largo medio para uso casual",
    precio: 699,
    tallasDisponibles: ["S", "M", "L", "XL"],
  },
  {
    id_producto: 9,
    categoria: "Ropa",
    subcategoria: "Chamarras",
    marca: "Columbia",
    modelo: "Powder Lite",
    descripcion: "Chamarra aislante con resistencia al agua",
    precio: 2199,
    tallasDisponibles: ["S", "M", "L", "XL"],
  },
  {
    id_producto: 10,
    categoria: "Ropa",
    subcategoria: "Shorts",
    marca: "Puma",
    modelo: "Active Training",
    descripcion: "Shorts deportivos ligeros y cómodos",
    precio: 499,
    tallasDisponibles: ["S", "M", "L", "XL"],
  },
  {
    id_producto: 11,
    categoria: "Accesorios",
    subcategoria: "Bufandas",
    marca: "Gucci",
    modelo: "Wool Scarf",
    descripcion: "Bufanda de lana suave con diseño elegante",
    precio: 4999,
    tallasDisponibles: ["Única"],
  },
  {
    id_producto: 12,
    categoria: "Ropa",
    subcategoria: "Playeras",
    marca: "Under Armour",
    modelo: "Tech 2.0",
    descripcion: "Playera de entrenamiento de secado rápido",
    precio: 799,
    tallasDisponibles: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id_producto: 13,
    categoria: "Ropa",
    subcategoria: "Sudaderas",
    marca: "Nike",
    modelo: "Dri-FIT Pullover",
    descripcion: "Sudadera deportiva con tecnología de absorción de sudor",
    precio: 1099,
    tallasDisponibles: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id_producto: 14,
    categoria: "Calzado",
    subcategoria: "Tenis",
    marca: "Adidas",
    modelo: "Stan Smith",
    descripcion: "Tenis casuales icónicos con diseño clásico",
    precio: 2499,
    tallasDisponibles: ["6", "7", "8", "9", "10"],
  },
  {
    id_producto: 15,
    categoria: "Ropa",
    subcategoria: "Chamarras",
    marca: "Levi's",
    modelo: "Trucker Jacket",
    descripcion: "Chamarra de mezclilla con ajuste clásico",
    precio: 1899,
    tallasDisponibles: ["S", "M", "L", "XL"],
  },
  {
    id_producto: 16,
    categoria: "Ropa",
    subcategoria: "Vestidos",
    marca: "Zara",
    modelo: "Elegant Nights",
    descripcion: "Vestido largo con diseño sofisticado y detalles en encaje",
    precio: 1599,
    tallasDisponibles: ["XS", "S", "M", "L", "XL"],
  },
  {
    id_producto: 17,
    categoria: "Calzado",
    subcategoria: "Botas",
    marca: "Timberland",
    modelo: "Courma Guy",
    descripcion: "Botas casuales con diseño robusto y duradero",
    precio: 3799,
    tallasDisponibles: ["7", "8", "9", "10", "11"],
  },
  {
    id_producto: 18,
    categoria: "Accesorios",
    subcategoria: "Sombreros",
    marca: "Adidas",
    modelo: "Bucket Hat",
    descripcion: "Sombrero estilo pescador para uso casual o deportivo",
    precio: 399,
    tallasDisponibles: ["Única"],
  },
  {
    id_producto: 19,
    categoria: "Ropa",
    subcategoria: "Playeras",
    marca: "Under Armour",
    modelo: "Performance Polo",
    descripcion: "Playera tipo polo para actividades deportivas",
    precio: 999,
    tallasDisponibles: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id_producto: 20,
    categoria: "Accesorios",
    subcategoria: "Bufandas",
    marca: "Gucci",
    modelo: "Silk Elegance",
    descripcion: "Bufanda de seda con estampado elegante y diseño premium",
    precio: 5999,
    tallasDisponibles: ["Única"],
  },
]);

//! Q1. Listar los productos de una categoría específica.
const Q1 = db.getCollection("Productos").find({ categoria: "Ropa" });

Q1.forEach((doc) => {
  printjson(doc);
});

//! Q2. Listar los productos de una marca específica.
const Q2 = db.getCollection("Productos").find({ marca: "Nike" });

Q2.forEach((doc) => {
  printjson(doc);
});

//! Q3. Listar los productos de una marca específica y los clientes que los han agregado a su carrito.
const Q3 = db.getCollection("Productos").aggregate([
  // Filtrar por la marca específica
  {
    $match: { marca: "Nike" },
  },
  // Hacer un lookup para buscar en la colección de usuarios
  {
    $lookup: {
      from: "Usuarios_pedidos_carrito_comentarios",
      localField: "id",
      foreignField: "carrito.productos.producto_id",
      as: "usuarios_que_lo_agregaron",
    },
  },
  // Transformar los datos para incluir solo la información relevante
  {
    $project: {
      _id: 0,
      id_producto: "$id",
      marca: 1,
      modelo: 1,
      descripcion: 1,
      usuarios: {
        $map: {
          input: "$usuarios_que_lo_agregaron",
          as: "usuario",
          in: {
            id_usuario: "$$usuario.id",
            nombre: "$$usuario.nombre",
            email: "$$usuario.email",
          },
        },
      },
    },
  },
]);

Q3.forEach((doc) => {
  printjson(doc);
});
//! Q4. Listar los productos que ha agregado un cliente en específico a su carrito de compras.
const Q4 = db.getCollection("usuarios_pedidos_carrito_comentarios").find(
  { id_usuario: 1 }, // Encuentra al usuario específico
  {
    _id: 0,
    "carrito.productos": 1, // Solo trae los productos del carrito
  }
);

Q4.forEach((doc) => {
  printjson(doc);
});

//! Q5. Listar los productos con mejores valoraciones.
const Q5 = db.getCollection("Usuarios_pedidos_carrito_comentarios").aggregate([
  // Descomponer el array "comentarios"
  { $unwind: "$comentarios" },
  // Agrupar por producto_id y calcular promedio de valoraciones y total de comentarios
  {
    $group: {
      _id: "$comentarios.producto_id",
      promedio_valoracion: { $avg: { $toDouble: "$comentarios.valoracion" } },
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

Q5.forEach((doc) => {
  printjson(doc);
});

//! Q6. Listar los productos más agregados a los carritos de compra.
const Q6 = db.getCollection("Usuarios_pedidos_carrito_comentarios").aggregate([
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

Q6.forEach((doc) => {
  printjson(doc);
});

//! Q7. Listar todos los pedidos (incluyendo los productos) de un cliente en específico.
const Q7 = db.getCollection("usuarios_pedidos_carrito_comentarios").aggregate([
  { $match: { id: 1 } }, // Filtrar cliente específico
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

Q7.forEach((doc) => {
  printjson(doc);
});

//! Q8. Listar todos los productos que ha adquirido un cliente en específico.
const Q8 = db.getCollection("Usuarios_pedidos_carrito_comentarios").aggregate([
  {
    $match: { id: 1 },
  },
  // Descomponer los pedidos
  { $unwind: "$pedidos" },
  // Descomponer los productos dentro de cada pedido
  { $unwind: "$pedidos.productos" },
  {
    $lookup: {
      from: "Productos",
      localField: "pedidos.productos.producto_id",
      foreignField: "id",
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
Q8.forEach((doc) => {
  printjson(doc);
});

//! Q9. Listar todos los Clientes que han comprado un producto en específico.
const Q9 = db.getCollection("Usuarios_pedidos_carrito_comentarios").aggregate([
  // Filtrar clientes que tengan el producto específico en sus pedidos
  {
    $match: {
      "pedidos.productos.producto_id": 1, // ID del producto que buscamos
    },
  },
  // Descomponer los pedidos
  { $unwind: "$pedidos" },
  // Descomponer los productos dentro de cada pedido
  { $unwind: "$pedidos.productos" },
  // Filtrar únicamente los productos específicos
  {
    $match: {
      "pedidos.productos.producto_id": 1, // Asegurarse de mantener solo los productos deseados
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
Q9.forEach((doc) => {
  printjson(doc);
});
