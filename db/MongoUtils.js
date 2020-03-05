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
        console.log("Listing DataBases");
        return mu
            .connect()
            .then(cliente => {
                console.log("cliente", cliente);
                return cliente
                    .db()
                    .admin()
                    .listDatabases()
                    .finally(() => cliente.close());
            })
            .then(dbs => {
                console.log("dbs", dbs);
                return dbs.databases;
            });
    };

    mu.algo.listCollections = () => {
        console.log("Listing Collections");
        return mu
            .connect()
            .then(cliente => {
                console.log("cliente", cliente);
                return cliente
                    .db(dbName)
                    .listCollections()
                    .toArray()
                    .finally(() => cliente.close());
            })
            .then(cols => {
                console.log("Cols", cols);
                return cols;
            });
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
