
# Contenido

- [Contenido](#contenido)
  - [Introducción](#introducción)
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
  - [Cómo Ejecutar la API](#cómo-ejecutar-la-api)
  - [Cómo Ejecutar Desde un Docker Compose](#cómo-ejecutar-desde-un-docker-compose)

## Introducción

Este proyecto usa MongoDB como base de datos transaccional, integra un escenario de varios contenedores de mongo usando Docker para generar un escenario de réplica set, por último, utiliza Redis como base de datos para guardar un Logger

las siglas **UCPC**, son usadas para hacer referencia a la coleccion usuarios_pedidos_carrito_comentarios,
donde usuarios es el documento principal, y pedididos, carrito y comentarios son los documentos secundarios.

La api estara corriendo sobre <http://localhost:3001/>

## Endpoints

En este apartado se localizan las rutas a meter en postman para acceder a los Endpoints

### Consultas

#### Consulta-Q1

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

#### Consulta-Q2

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

#### Consulta-Q3

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

#### Consulta-Q4

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

#### Consulta-Q5

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

#### Consulta-Q6

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

#### Consulta-Q7

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

#### Consulta-Q8

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

#### Consulta-Q9

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

## Cómo Ejecutar la API

1. Instala las dependencias:

```bash
    npm install
```

1. Ejecuta el servidor:

```bash
    npm run start
```

## Cómo Ejecutar Desde un Docker Compose

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
