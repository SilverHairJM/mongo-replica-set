# Contenido

- [Contenido](#contenido)
  - [Introducción](#introducción)
    - [Escenario de Datos](#escenario-de-datos)
    - [Postman](#postman)
      - [Endpoints](#endpoints)
        - [Consultas](#consultas)
        - [Consulta-Q1](#consulta-q1)
        - [Consulta-Q2](#consulta-q2)
        - [Consulta-Q3](#consulta-q3)
        - [Consulta-Q4](#consulta-q4)
        - [Consulta-Q5](#consulta-q5)
        - [Consulta-Q6](#consulta-q6)
        - [Consulta-Q7](#consulta-q7)
        - [Consulta-Q8](#consulta-q8)
        - [Consulta-Q9](#consulta-q9)
    - [Json de la colección de datos](#json-de-la-colección-de-datos)
    - [Backend](#backend)
      - [Carpeta config](#carpeta-config)
        - [Archivo db.js](#archivo-dbjs)
      - [Carpeta controllers](#carpeta-controllers)
        - [Archivo Productos.js](#archivo-productosjs)
        - [Archivo Usuarios-carrito-pedidos-producto](#archivo-usuarios-carrito-pedidos-producto)
      - [Carpeta middlewares](#carpeta-middlewares)
        - [Archivo logger.js](#archivo-loggerjs)
      - [Carpeta models](#carpeta-models)
        - [Archivo Productos.js](#archivo-productosjs-1)
        - [Archivo Usuarios-carrito-pedidos-producto](#archivo-usuarios-carrito-pedidos-producto-1)
      - [Carpeta routes](#carpeta-routes)
        - [Archivo de las rutas UCPC](#archivo-de-las-rutas-ucpc)
        - [Archivo de las rutas Productos](#archivo-de-las-rutas-productos)
      - [Archivo server y .env](#archivo-server-y-env)
        - [server.js](#serverjs)
        - [.env](#env)
    - [Cómo Ejecutar la API](#cómo-ejecutar-la-api)
    - [Cómo Ejecutar Desde un Docker Compose](#cómo-ejecutar-desde-un-docker-compose)

## Introducción

Este archivo contiene la documentación de este proyecto.

Nomenclatura
las siglas **UCPC**, son usadas para hacer referencia a la coleccion usuarios_pedidos_carrito_comentarios,
donde usuarios es el documento principal, y pedididos, carrito y comentarios son los documentos secundarios.

### Escenario de Datos

Este escenario de datos se monto previamente en mongo playground, asi que anexare todo el playground, este archivo tambien contiene las Querys resueltas del escenario asignado

```js
//! Crear o usar la bd existente
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
const Q1 = db.getCollection("productos").find({ categoria: "Ropa" });

Q1.forEach((doc) => {
  printjson(doc);
});

//! Q2. Listar los productos de una marca específica.
const Q2 = db.getCollection("productos").find({ marca: "Nike" });

Q2.forEach((doc) => {
  printjson(doc);
});

//! Q3. Listar los productos de una marca específica y los clientes que los han agregado a su carrito.
const Q3 = db.getCollection("productos").aggregate([
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
const Q5 = db.getCollection("usuarios_pedidos_carrito_comentarios").aggregate([
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
const Q6 = db.getCollection("usuarios_pedidos_carrito_comentarios").aggregate([
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
const Q8 = db.getCollection("usuarios_pedidos_carrito_comentarios").aggregate([
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
const Q9 = db.getCollection("usuarios_pedidos_carrito_comentarios").aggregate([
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

```

### Postman

#### Endpoints

En este apartado se localizan las rutas a meter en postman para acceder a los Endpoints

##### Consultas

##### Consulta-Q1

- **GET api/productos/Q1**
- **Descripción:** Listar los productos de una categoría específica.
  Aqui las categorias que podemos buscar son las siguientes:

  1. Ropa
  2. Deportes
  3. Accesorios
  4. Calzado

- **Cuerpo de la solicitud:**
  
  ```json
    {
    "categoria": "Deportes"
    }
  ```

- **Respuesta:**
  
  ```json
    [
    {
        "_id": "674d21f633bb4a8ee1fe6918",
        "id_producto": 2,
        "categoria": "Deportes",
        "subcategoria": "Zapatos",
        "marca": "Adidas",
        "modelo": "UltraBoost 22",
        "descripcion": "Zapatos de running con tecnología Boost",
        "precio": 2899,
        "tallasDisponibles": [
            "6",
            "7",
            "8",
            "9",
            "10"
        ]
    }
    ]
  ```

##### Consulta-Q2

- **GET /api/productos/Q2**
- **Descripción:** Listar los productos de una marca específica.
Las marcas que podemos buscar son:

1. Adidas
2. Nike
3. Levi's
4. Zara
5. The North Face
6. Timberland
7. H&M
8. Columbia
9. Puma
10. Gucci
11. Under Armour

- **Cuerpo de la solicitud:**
  
  ```json
    {
    "marca": "Zara"
    }
  ```

- **Respuesta:**

```json
    [
        {
            "_id": "674d21f633bb4a8ee1fe691a",
            "id_producto": 4,
            "categoria": "Ropa",
            "subcategoria": "Vestidos",
            "marca": "Zara",
            "modelo": "Summer Breeze",
            "descripcion": "Vestido ligero de verano con estampado floral",
            "precio": 899,
            "tallasDisponibles": [
                "XS",
                "S",
                "M",
                "L",
                "XL"
            ]
        },
        {
            "_id": "674d21f633bb4a8ee1fe6926",
            "id_producto": 16,
            "categoria": "Ropa",
            "subcategoria": "Vestidos",
            "marca": "Zara",
            "modelo": "Elegant Nights",
            "descripcion": "Vestido largo con diseño sofisticado y detalles en encaje",
            "precio": 1599,
            "tallasDisponibles": [
                "XS",
                "S",
                "M",
                "L",
                "XL"
            ]
        }
    ]
```

##### Consulta-Q3

- **GET /api/productos/Q3**
- **Descripción:** Listar los productos de una marca específica y los clientes que los han agregado a su carrito.
Las marcas que podemos listar son las mimas que la Q2

- **Cuerpo de la solicitud:**
  
  ```json
    {
        "marca": "Adidas"
    }
  ```
  
- **Respuesta:**

```json
    [
        {
            "marca": "Adidas",
            "modelo": "UltraBoost 22",
            "descripcion": "Zapatos de running con tecnología Boost",
            "usuarios": [
                {
                    "nombre": "Juan Pérez",
                    "email": "juan.perez@example.com"
                },
                {
                    "nombre": "Carlos García",
                    "email": "carlos.garcia@example.com"
                }
            ]
        },
        {
            "marca": "Adidas",
            "modelo": "Classic Cap",
            "descripcion": "Gorra deportiva de algodón ajustable",
            "usuarios": [
                {
                    "nombre": "Ana Torres",
                    "email": "ana.torres@example.com"
                }
            ]
        },
        {
            "marca": "Adidas",
            "modelo": "Stan Smith",
            "descripcion": "Tenis casuales icónicos con diseño clásico",
            "usuarios": []
        },
        {
            "marca": "Adidas",
            "modelo": "Bucket Hat",
            "descripcion": "Sombrero estilo pescador para uso casual o deportivo",
            "usuarios": []
        }
    ]
```

##### Consulta-Q4

- **GET /api/UCPC/Q4**
- **Descripción:** Listar los productos que ha agregado un cliente en específico a su carrito de compras.
- **Cuerpo de la solicitud**

  ```json
    {
        "id_usuario" : 1
    }
  ```

- **Respuesta:**

  ```json
    [
        {
            "_id": "674d23f5e8f02be9ee42002d",
            "producto_id": 1,
            "cantidad": 2,
            "talla": "M"
        },
        {
            "_id": "674d23f5e8f02be9ee42002e",
            "producto_id": 2,
            "cantidad": 1,
            "talla": "7"
        }
    ]
  ```

##### Consulta-Q5

- **GET /api/UCPC/Q5**
- **Descripción:** Listar los productos con mejores valoraciones.
- **Respuesta:**

```json
[
    {
        "promedio_valoracion": 10,
        "total_comentarios": 1,
        "producto_id": 7
    },
    {
        "promedio_valoracion": 10,
        "total_comentarios": 1,
        "producto_id": 1
    },
    {
        "promedio_valoracion": 10,
        "total_comentarios": 1,
        "producto_id": 9
    },
    {
        "promedio_valoracion": 9,
        "total_comentarios": 1,
        "producto_id": 12
    },
    {
        "promedio_valoracion": 9,
        "total_comentarios": 1,
        "producto_id": 3
    },
    {
        "promedio_valoracion": 8,
        "total_comentarios": 1,
        "producto_id": 4
    }
]
```

##### Consulta-Q6

- **GET /api/UCPC/Q6**
- **Descripción:** Listar los productos más agregados a los carritos de compra.
- **Respuesta:**

```json
[
    {
        "total_agregado": 3,
        "producto_id": 10
    },
    {
        "total_agregado": 2,
        "producto_id": 7
    },
    {
        "total_agregado": 2,
        "producto_id": 8
    },
    {
        "total_agregado": 2,
        "producto_id": 12
    },
    {
        "total_agregado": 2,
        "producto_id": 1
    },
    {
        "total_agregado": 2,
        "producto_id": 2
    },
    {
        "total_agregado": 1,
        "producto_id": 4
    },
    {
        "total_agregado": 1,
        "producto_id": 9
    },
    {
        "total_agregado": 1,
        "producto_id": 6
    },
    {
        "total_agregado": 1,
        "producto_id": 5
    },
    {
        "total_agregado": 1,
        "producto_id": 3
    }
]
```

##### Consulta-Q7

- **GET /api/UCPC/Q7**
- **Descripción:** Listar todos los pedidos (incluyendo los productos) de un cliente en específico.
- **Cuerpo de la solicitud**

  ```json
    {
        "id_usuario": 4
    }
  ```

- **Respuesta:**

  ```json
    [
        {
            "fecha": "20-11-2024",
            "estado": "pendiente",
            "precio_total": 2297,
            "metodo_pago": "efectivo",
            "productos": [
                {
                    "id_producto": 4,
                    "cantidad": 1,
                    "detalle": {
                        "_id": "674d21f633bb4a8ee1fe691a",
                        "id_producto": 4,
                        "categoria": "Ropa",
                        "subcategoria": "Vestidos",
                        "marca": "Zara",
                        "modelo": "Summer Breeze",
                        "descripcion": "Vestido ligero de verano con estampado floral",
                        "precio": 899,
                        "tallasDisponibles": [
                            "XS",
                            "S",
                            "M",
                            "L",
                            "XL"
                        ]
                    }
                },
                {
                    "id_producto": 8,
                    "cantidad": 2,
                    "detalle": {
                        "_id": "674d21f633bb4a8ee1fe691e",
                        "id_producto": 8,
                        "categoria": "Ropa",
                        "subcategoria": "Faldas",
                        "marca": "H&M",
                        "modelo": "Pleated Midi",
                        "descripcion": "Falda plisada de largo medio para uso casual",
                        "precio": 699,
                        "tallasDisponibles": [
                            "S",
                            "M",
                            "L",
                            "XL"
                        ]
                    }
                }
            ],
            "id_pedido": 1004
        }
    ]
  ```

##### Consulta-Q8

- **GET /api/UCPC/Q8**
- **Descripción:** Listar todos los productos que ha adquirido un cliente en específico.
- **Cuerpo de la solicitud**

  ```json
    {
        "id_usuario": 2
    }
  ```

- **Respuesta:**

  ```json
    [
        {
            "detalle_producto": [
                {
                    "nombre": "501 Original Fit",
                    "categoria": "Ropa",
                    "precio": 1299
                }
            ],
            "id_producto": 3,
            "cantidad": 1
        },
        {
            "detalle_producto": [
                {
                    "nombre": "ThermoBall Eco",
                    "categoria": "Ropa",
                    "precio": 2499
                }
            ],
            "id_producto": 5,
            "cantidad": 1
        }
    ]
  ```

##### Consulta-Q9

- **GET /api/UCPC/Q9**
- **Descripción:** Listar todos los Clientes que han comprado un producto en específico.
- **Cuerpo de la solicitud**

  ```json
    {
        "producto_id": 2
    }
  ```

- **Respuesta:**

  ```json
    [
        {
            "nombre_usuario": "Juan Pérez",
            "email_usuario": "juan.perez@example.com",
            "id_producto": 2,
            "cantidad_comprada": 1
        },
        {
            "nombre_usuario": "Carlos García",
            "email_usuario": "carlos.garcia@example.com",
            "id_producto": 2,
            "cantidad_comprada": 1
        }
    ]
  ```

### Json de la colección de datos

Este es un archivo JSON que contiene la colección de datos que se exporto directamente de postman

```json
{
 "info": {
  "_postman_id": "9c8349b2-9e76-4e5c-9412-8ff92ff2a26c",
  "name": "Mongo",
  "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  "_exporter_id": "29523940"
 },
 "item": [
  {
   "name": "Usuarios-Carrito-Pedidos-Comentarios",
   "item": [
    {
     "name": "ObtenerTodo",
     "request": {
      "method": "GET",
      "header": [],
      "url": {
       "raw": "http://localhost:3001/api/UCPC",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "UCPC"
       ]
      }
     },
     "response": []
    },
    {
     "name": "CrearUActualizar",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "{\n    \"id_usuario\": 2,\n    \"nombre\": \"María López\",\n    \"email\": \"maria.lopez@example.com\",\n    \"contraseña\": \"securepass456\",\n    \"direccionEnvio\": \"Av. Insurgentes 567, CDMX, México\",\n    \"telefono\": \"9876543210\",\n    \"carrito\": {\n        \"idCarrito\": 2,\n        \"productos\": [{\n            \"producto_id\": 3,\n            \"cantidad\": 1\n        }, {\n            \"producto_id\": 5,\n            \"cantidad\": 1\n        }]\n    },\n    \"pedidos\": [{\n        \"idPedido\": 1002,\n        \"fecha_pedido\": \"2024-11-18\",\n        \"estado\": \"enviado\",\n        \"productos\": [{\n            \"producto_id\": 3,\n            \"cantidad\": 1,\n            \"precioNeto\": 1299\n        }, {\n            \"producto_id\": 5,\n            \"cantidad\": 1,\n            \"precioNeto\": 2499\n        }],\n        \"precioTotal\": 3798,\n        \"metodoPago\": \"PayPal\"\n    }],\n    \"comentarios\": [{\n        \"idComentario\": 2,\n        \"producto_id\": 3,\n        \"valoracion\": \"9\",\n        \"comentario\": \"Muy buen pantalón, cómodo y ajusta bien.\"\n    }]\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/UCPC/crearActualizarUCPC",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "UCPC",
        "crearActualizarUCPC"
       ]
      }
     },
     "response": []
    },
    {
     "name": "EliminarUCPC",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "{\n    \"id_usuario\": 6\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/UCPC/eliminarUCPC",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "UCPC",
        "eliminarUCPC"
       ]
      }
     },
     "response": []
    },
    {
     "name": "Q4",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "{\n    \"id_usuario\" : 1\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/UCPC/Q4",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "UCPC",
        "Q4"
       ]
      }
     },
     "response": []
    },
    {
     "name": "Q5",
     "request": {
      "method": "POST",
      "header": [],
      "url": {
       "raw": "http://localhost:3001/api/UCPC/Q5",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "UCPC",
        "Q5"
       ]
      }
     },
     "response": []
    },
    {
     "name": "Q6",
     "request": {
      "method": "POST",
      "header": [],
      "url": {
       "raw": "http://localhost:3001/api/UCPC/Q6",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "UCPC",
        "Q6"
       ]
      }
     },
     "response": []
    },
    {
     "name": "Q7",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "{\n    \"id_usuario\": 4\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/UCPC/Q7",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "UCPC",
        "Q7"
       ]
      }
     },
     "response": []
    },
    {
     "name": "Q8",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "{\n    \"id_usuario\": 2\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/UCPC/Q8",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "UCPC",
        "Q8"
       ]
      }
     },
     "response": []
    },
    {
     "name": "Q9",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "{\n    \"producto_id\": 2\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/UCPC/Q9",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "UCPC",
        "Q9"
       ]
      }
     },
     "response": []
    }
   ],
   "description": "Esta carpeta contiene las consultas hacia la coleccion de usuarios, carrito, comentarios, donde los usuarios es el documento principal y los demas son documentos secundarios"
  },
  {
   "name": "Productos",
   "item": [
    {
     "name": "obtenerProductos",
     "request": {
      "method": "GET",
      "header": [],
      "url": {
       "raw": "http://localhost:3001/api/productos",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "productos"
       ]
      }
     },
     "response": []
    },
    {
     "name": "CrearUActualizar",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "/** \n* Paste one or more documents here\n*/\n{\n    \"id_producto\": 1,\n    \"categoria\": \"Ropa\",\n    \"subcategoria\": \"Camisetas\",\n    \"marca\": \"Nike\",\n    \"modelo\": \"AirMax 2024\",\n    \"descripcion\": \"Camiseta deportiva de alto rendimiento\",\n    \"precio\": 799,\n    \"tallasDisponibles\": [\"S\", \"M\", \"L\"]\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/productos/crearActualizarProducto",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "productos",
        "crearActualizarProducto"
       ]
      }
     },
     "response": []
    },
    {
     "name": "EliminarProducto",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "{\n    \"id_producto\": 20\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/productos/eliminarProducto",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "productos",
        "eliminarProducto"
       ]
      }
     },
     "response": []
    },
    {
     "name": "Q1",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "{\n    \"categoria\": \"Deportes\"\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/productos/Q1",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "productos",
        "Q1"
       ]
      }
     },
     "response": []
    },
    {
     "name": "Q2",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "{\n    \"marca\": \"Zara\"\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/productos/Q2",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "productos",
        "Q2"
       ]
      }
     },
     "response": []
    },
    {
     "name": "Q3",
     "request": {
      "method": "POST",
      "header": [],
      "body": {
       "mode": "raw",
       "raw": "{\n    \"marca\": \"Adidas\"\n}",
       "options": {
        "raw": {
         "language": "json"
        }
       }
      },
      "url": {
       "raw": "http://localhost:3001/api/productos/Q3",
       "protocol": "http",
       "host": [
        "localhost"
       ],
       "port": "3001",
       "path": [
        "api",
        "productos",
        "Q3"
       ]
      }
     },
     "response": []
    }
   ],
   "description": "Esta carpeta contiene las consultas a la coleccion de productos"
  }
 ]
}
```

### Backend

En este apartado se encontraran lo archivos correspondientes al BackEnd de la aplicación.

#### Carpeta config

##### Archivo db.js

```js
const mongoose = require("mongoose"); // Módulo para interactuar con MongoDB
const redis = require("redis"); // Módulo para interactuar con Redis
require("dotenv").config(); // Cargar variables de entorno desde un archivo .env
// Conexión a MongoDB

mongoose
    .connect(process.env.MONGO_URI
    )
    .then(() => {
        console.log("Conectado a MongoDB"); // Mensaje de éxito en la conexión
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error); // Mensaje de error en la conexión;
    });
// Configuración de Redis
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
redisClient.on("error", (err) => {
    console.error("Error en la conexión a Redis:", err); // Mensaje de error en la conexión a Redis
});
redisClient
    .connect()
    .then(() => {
        console.log("Conectado a Redis");
    })
    .catch((err) => {
        console.error("No se pudo conectar a Redis:", err);
    });

// Exportamos las instancias de mongoose y redisClient para usarlas en otras partes de la aplicación
module.exports = { mongoose, redisClient };

```

#### Carpeta controllers

##### Archivo Productos.js

```js
//! Importamos el modelo de productos

const productos = require("../models/Productos");

//!rutas
//* Obtener toda la coleccion para ver si funciona correctamente
const obtenerProductos = async (req, res) => {
    try {
        const resultado = await productos.find();

        res.status(200).json(resultado);
        res.data = resultado;
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
            res.data = producto;
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
        res.data = producto;
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
}

//! Rutas para resolvar el laboratorio

//* Q1. Listar los productos de una categoría específica.
const Q1 = async (req, res) => {
    const { categoria } = req.body;
    try {
        const resultado = await productos.find({ categoria: categoria })
        res.status(200).json(resultado);
        res.data = resultado;
    } catch (error) {
        res.status(500).json({ error: "Error no se encontro la Categoria" });
    }
}
//* Q2. Listar los productos de una marca específica.
const Q2 = async (req, res) => {
    const { marca } = req.body;
    try {
        const resultado = await productos.find({ marca: marca })
        res.status(200).json(resultado);
        res.data = resultado;
    } catch (error) {
        res.status(500).json({ error: "Error no se encontro la Categoria" });
    }
}
//* Q3. Listar los productos de una marca específica y los clientes que los han agregado a su carrito.
const Q3 = async (req, res) => {
    try {
        const { marca } = req.body;
        const producto = await productos.aggregate([
            {
                $match: { marca: marca },
            },
            {
                $lookup: {
                    from: "usuarios_pedidos_carrito_comentarios",
                    localField: "id_producto",
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
        res.json(producto);
        res.data = producto;
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    obtenerProductos,
    crearActualizarProducto,
    eliminarProducto,
    Q1, Q2, Q3
};

```

##### Archivo Usuarios-carrito-pedidos-producto

```js
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

```

#### Carpeta middlewares

##### Archivo logger.js

```js
const redis = require('redis');

const client = redis.createClient({
    socket: {
        port: process.env.REDIS_PORT || 6379,
        host: process.env.REDIS_HOST || "127.0.0.1"
    },
});
console.log('REDIS_HOST:', process.env.REDIS_HOST); // Esto debería ser 172.18.0.7
console.log('REDIS_PORT:', process.env.REDIS_PORT); // Esto debería ser 6379

client.on('error', (err) => {
    console.error('Redis error en LOGGER de conexion:', err);
});

client.connect().then(() => {
    console.log('Conectado-->> Redis');
}).catch((err) => {
    console.error('Error En LOGGER conexion a Redis:', err);
});

//Exportar una función middleware que se ejecutará en cada solicitud
module.exports = (req, res, next) => {
    res.on('finish', async () => {
        let fecha = new Date();
        const key = `${req.method}:${fecha.toLocaleDateString() + ":" + fecha.getHours() + "-" + fecha.getMinutes() +
            "-" + fecha.getSeconds()}:${"URL:" + req.originalUrl}`;
        const valor = JSON.stringify({
            clave: key,
            time: new Date(),
            req: {
                method: req.method,
                url: req.originalUrl,
                headers: req.headers,
                query: req.queryLog || 'N/A',
                body: req.body,
            },
            res: {
                statusCode: res.statusCode,
                statusMessage: res.statusMessage,
                response: res.data
            }
        }, null, 2);
        //console.log(valor);

        client.set(key, valor);
    });
    next();
};
```

#### Carpeta models

##### Archivo Productos.js

```js
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

```

##### Archivo Usuarios-carrito-pedidos-producto

```js
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

```

#### Carpeta routes

##### Archivo de las rutas UCPC

```js

const express = require('express');

const router = express.Router();

const { obtenerProductos, crearActualizarProducto, eliminarProducto, Q1,Q2,Q3} = require('../controllers/Productos');

//* Rutas

router.get('/', obtenerProductos);
router.post('/crearActualizarProducto', crearActualizarProducto)
router.post('/eliminarProducto', eliminarProducto);
router.post('/Q1', Q1);
router.post('/Q2', Q2);
router.post('/Q3', Q3);

module.exports = router;
```

##### Archivo de las rutas Productos

```js

const express = require('express');

const router = express.Router();

const { obtenerUCPC, crearActualizar, 
    eliminarUsuario, Q4, Q5, Q6, Q7, Q8, Q9} = require('../controllers/Usuarios-carritos-pedidos-comentarios');

router.get('/', obtenerUCPC);
router.post('/crearActualizarUCPC', crearActualizar)
router.post('/eliminarUCPC', eliminarUsuario)
router.post('/Q4', Q4)
router.post('/Q5', Q5)
router.post('/Q6', Q6)
router.post('/Q7', Q7)
router.post('/Q8', Q8)
router.post('/Q9', Q9)


module.exports = router;
```

#### Archivo server y .env

##### server.js

```js
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

```

##### .env

```bash
# URI de conexión a la base de datos MongoDB
# Formato: mongodb://[usuario:contraseña@]host:puerto/baseDeDatos
MONGO_URI=mongodb://172.18.0.2:27017,172.18.0.3:27017,172.18.0.4:27017,172.18.0.5:27017,172.18.0.6:27017/tienda_ropa?replicaSet=replica01
# Host del servidor Redis
# Generalmente es el nombre del servicio definido en docker-compose o la dirección IP
# del servidor Redis
REDIS_HOST=redis-lab-cache
# Puerto en el que Redis está escuchando
REDIS_PORT=6379
# Puerto en el que nuestra aplicaci'on Node.js escuchará
PORT=4000
```

### Cómo Ejecutar la API

1. Instala las dependencias:

```bash
    npm install
```

1. Ejecuta el servidor:

```bash
    npm run start
```

### Cómo Ejecutar Desde un Docker Compose

Para ejecutar esta api desde un Docker Compose, copia el siguiente código en un archivo **.yml** con el dombre "docker-compose", en tu terminal navega hasta la ruta donde tienes guardado el archivo y ejecuta el siguiente comando "docker compose up -d".

```bash
version: '3.8'

services:
  app:
    image: silverhair/mongo-replica-set
    container_name: replica-apis
    ports:
      - "3001:4000"
    environment:
      - MONGO_URI=mongodb://mongo-primary:27017,mongo-secondary1:27017,mongo-secondary2:27017,mongo-secondary3:27017,mongo-secondary4:27017/tienda_ropa?replicaSet=replica01
      - REDIS_HOST=redis
      - REDIS_PORT=6379
    depends_on:
      - mongo-primary
      - redis
    networks:
      backend:
        ipv4_address: 172.18.0.10
    command: npm start

  mongo-primary:
    image: mongo:latest
    container_name: mongo-primary
    command: mongod --replSet replica01 --bind_ip_all
    ports:
      - "27017:27017"
    networks:
      backend:
        ipv4_address: 172.18.0.2

  mongo-secondary1:
    image: mongo:latest
    container_name: mongo-secondary1
    command: mongod --replSet replica01 --bind_ip_all
    ports:
      - "27018:27017"
    networks:
      backend:
        ipv4_address: 172.18.0.3
  
  mongo-secondary2:
    image: mongo:latest
    container_name: mongo-secondary2
    command: mongod --replSet replica01 --bind_ip_all
    ports:
      - "27019:27017"
    networks:
      backend:
        ipv4_address: 172.18.0.4
  
  mongo-secondary3:
    image: mongo:latest
    container_name: mongo-secondary3
    command: mongod --replSet replica01 --bind_ip_all
    ports:
      - "27020:27017"
    networks:
      backend:
        ipv4_address: 172.18.0.5
  
  mongo-secondary4:
    image: mongo:latest
    container_name: mongo-secondary4
    command: mongod --replSet replica01 --bind_ip_all
    ports:
      - "27021:27017"
    networks:
      backend:
        ipv4_address: 172.18.0.6
        
  redis:
    image: redis:latest
    container_name: redis-lab-cache
    ports:
      - "6379:6379"
    networks:
      backend:
        ipv4_address: 172.18.0.7

  redis-insight:
    image: redislabs/redisinsight:latest
    container_name: redis-insight
    ports:
      - "8001:8001"
    networks:
      backend:
        ipv4_address: 172.18.0.8

networks:
  backend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.18.0.0/24

```
