const uuid = require('uuid');

module.exports = (express, db) => {
    const router = express.Router();
    return router
        .get('/', async (req, res) => {
            const collection = await db.connect("orders");
            res.send(await collection.find({}).toArray());
        })
        .get('/:id', async (req, res) => {
            try {
                const collection = await db.connect("orders");
                const result = await collection.findOne({
                    "id": parseInt(req.params.id)
                });
                res.json(result);
            } catch (error) {
                res.status(500).send(JSON.stringify(error));
            }
        })
        .post('/', async (req, res) => {
            const orderCreate = {
                id: uuid.v4(),
                ...req.body,
                updatedAt: null,
                createdAt: new Date(),
            };
            
            const collection = await db.connect("orders");
            const result = await collection.insertOne({ ...orderCreate });
            res.status(201).json(result);
        })
        .put('/:id', async (req, res) => {
            const collection = await db.connect("orders");
            delete req.body["_id"];
            var where = { "id": parseInt(req.params.id) };
            var values = {
                $set: {
                    ...req.body,
                    updatedAt: new Date()
                }
            };
            const result = await collection.updateOne(where, values);
            res.status(202).json(result);
        })
        .delete('/:id', async (req, res) => {
            const collection = await db.connect("orders");
            const result = await collection.deleteOne({
                "id": parseInt(req.params.id)
            });
            res.status(200).json(result);
        });
};
