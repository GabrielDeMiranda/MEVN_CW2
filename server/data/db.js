const mongodb = require('mongodb');

const connect = async (nameCollecion) => {
   

    const client = await mongodb.connect(
        `mongodb+srv://MyMongoDBUser:mongodb12345@gabriel-cw2.dyfen.mongodb.net/webstore?retryWrites=true&w=majority`,
        { useUnifiedTopology: true }
    );

    return client.db(database).collection(nameCollecion);
}

module.exports = ({
    connect,
});