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