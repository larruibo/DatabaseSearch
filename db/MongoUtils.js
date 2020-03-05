const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
    const mu = {},
        hostname = process.env.DB_HOST,
        port = process.env.DB_PORT,
        dbName = process.env.DB_NAME,
        colName = process.env.DB_COL;

    //Connection to db
    mu.connect = () => {
        const url = `mongodb://${hostname}:${port}`;
        const client = new MongoClient(url, { useUnifiedTopology: true });
        console.log("Connecting");

        return client.connect();
    };

    mu.algo = {};

    mu.algo.listDataBases = () => {
        mu.connect()
            .then(cliente =>
                cliente
                    .db()
                    .admin()
                    .listDatabases()
            )
            .then(dbs => {
                console.log("Databases", dbs);
            })
            .finally(() => client.close());
    };

    mu.algo.listCollections = () => {
        mu.connect()
            .then(cliente =>
                cliente
                    .db(dbName)
                    .listCollections()
                    .toArray()
            )
            .then(cols => {
                console.log("Collections", cols);
            })
            .finally(() => client.close());
    };

    //Find documents in DB
    mu.algo.find = query =>
        mu.connect().then(client => {
            const algoCol = client.db(dbName).collection(colName);
            return algoCol
                .find(query)
                .sort({ timestamp: -1 })
                .toArray()
                .finally(() => client.close());
        });

    //Insert documents in DB
    mu.algo.insert = algo =>
        mu.connect().then(client => {
            const algoCol = client.db(dbName).collection(colName);
            return algoCol.insertOne(algo).finally(() => client.close());
        });

    return mu;
}

module.exports = MongoUtils();
