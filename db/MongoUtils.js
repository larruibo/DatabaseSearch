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
                return cliente
                    .db()
                    .admin()
                    .listDatabases()
                    .finally(() => cliente.close());
            })
            .then(dbs => {
                return dbs.databases;
            });
    };

    mu.algo.listCollections = _dbName => {
        console.log("Listing Collections");
        return mu
            .connect()
            .then(cliente => {
                return cliente
                    .db(_dbName)
                    .listCollections()
                    .toArray()
                    .finally(() => cliente.close());
            })
            .then(cols => {
                return cols;
            });
    };

    //Find documents in DB
    mu.algo.find = (_dbName, _colName, query) =>
        mu.connect().then(client => {
            const algoCol = client.db(_dbName).collection(_colName);
            return algoCol
                .find(query)
                .limit(20)
                .sort({ _id: -1 })
                .toArray()
                .finally(() => client.close());
        });

    //Insert documents in DB
    mu.algo.insert = (_dbName, _colName, algo) =>
        mu.connect().then(client => {
            const algoCol = client.db(_dbName).collection(_colName);
            return algoCol.insertOne(algo).finally(() => client.close());
        });

    return mu;
}

module.exports = MongoUtils();
