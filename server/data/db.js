const mongodb = require('mongodb');

const connect = async (nameCollecion) => {
    const clusterName = process.env.CLUSTER;
    const password = process.env.PASSWORD;
    const database = process.env.DATABASE;
    const root = process.env.ROOT;

    const client = await mongodb.connect(
        `mongodb+srv://MyMongoDBUser:mongodb12345@gabriel-cw2.dyfen.mongodb.net/webstore?retryWrites=true&w=majority`,
        { useUnifiedTopology: true }
    );
/////dont use 3.6.4 - bugged
    return client.db(database).collection(nameCollecion);
}

module.exports = ({
    connect,
});