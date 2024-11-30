//! Este archivo funciona de script para levantar el replica set
rs.initiate({
    _id: "replica01",
    members: [
        { _id: 0, host: "172.18.0.2:27017" },
        { _id: 1, host: "172.18.0.3:27017" },
        { _id: 2, host: "172.18.0.4:27017" },
        { _id: 3, host: "172.18.0.5:27017" },
        { _id: 4, host: "172.18.0.6:27017" }
    ]
})
