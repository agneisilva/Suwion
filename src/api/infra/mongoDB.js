const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.SUWION_MONGO_CONN_STR || "mongodb://suwiondb:xshvT75Y4cMf2RfOiu6bJ36R2VEZAim3K0qplrv0rxlZL8GrR8K9aU2uvB6xbR7VLK6o2BN68AFWskfqQRpV5g==@suwiondb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@suwiondb@";
const uri = "mongodb://suwion:Mongo123!@localhost:27017/?authSource=admin";

var mongodb = () => {
    var connection;
    const property = "db";

    return (req, res, next) => {
        if (!connection)
            connection = MongoClient.connect(uri, { useUnifiedTopology: true });

        connection
            .then(client => {
                console.log('Mongo connected');
                req[property] = client.db(process.env.SUWION_MONGO_DB_NAME || 'suwion');
                next();
            })
            .catch(err => {
                console.log('Error to connect on MongoDB. ', err);
                connection = undefined;
                next();//bypass the request, not throwing error, just log it. 
            });
    }
};

module.exports = mongodb;
