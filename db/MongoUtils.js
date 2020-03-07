const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
    const mu = {},
        hostname = process.env.DB_HOST,
        port = process.env.DB_PORT,
        dbName = process.env.DB_NAME,
        colName = process.env.DB_COL;

    //Connection to db
    mu.connect = () => {
        const uri = process.env.MONGO_DB_ATLAS;
        const url = `mongodb://${hostname}:${port}`;
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        console.log("Connecting");
        return client.connect();
    };

    mu.algo = {};

    //List all databases
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

    //List all collections
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

    //Find one document in db
    mu.algo.findOne = (_dbName, _colName, query) =>
        mu.connect().then(client => {
            const algoCol = client.db(_dbName).collection(_colName);
            return algoCol.findOne(query).finally(() => client.close());
        });
    //Insert documents in DB
    mu.algo.insert = (_dbName, _colName, algo) =>
        mu.connect().then(client => {
            const algoCol = client.db(_dbName).collection(_colName);
            return algoCol.insertOne(algo).finally(() => client.close());
        });

    //Remove a document from DB
    mu.algo.remove = (_dbName, _colName, algo) =>
        mu.connect().then(client => {
            const algoCol = client.db(_dbName).collection(_colName);
            return algoCol.deleteOne(algo).finally(() => client.close());
        });

    //Update a document
    mu.algo.updateOne = (_dbName, _colName, algo, nuevo) =>
        mu.connect().then(client => {
            const algoCol = client.db(_dbName).collection(_colName);
            return algoCol.updateOne(algo, nuevo).finally(() => client.close());
        });

    return mu;
}

module.exports = MongoUtils();
