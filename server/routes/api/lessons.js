module.exports = (express, db) => {
    const router = express.Router();
    return router
        .get('/', async (req, res) => {
            const collection = await db.connect("lessons");
            res.send(await collection.find({}).toArray());
        })
        .get('/:id', async (req, res) => {
            try {
                const collection = await db.connect("lessons");
                const result = await collection.findOne({
                    "id": parseInt(req.params.id)
                });
                res.json(result);                
            } catch (error) {
                res.status(500).send(JSON.stringify(error));         
            }
        })
        .post('/', async (req, res) => {
            const collection = await db.connect("lessons");
            const result = await collection.insertOne({
                ...req.body,
                updatedAt: null,
                createdAt: new Date()
            });
            res.status(201).json(result);
        })
        .put('/:id', async (req, res) => {
            const id = parseInt(req.params.id);
            const where = { id };

            const collection = await db.connect("lessons");
            const lesson = await collection.findOne(where);

            if (!lesson) res.status(404);
            
            const total = parseInt(req.body.total); 
            const availableInventory = 
                (lesson.availableInventory - total) > 0 
                    ? lesson.availableInventory - total 
                    : 0;

            const values = { $set: {
                availableInventory,
                updatedAt: new Date()
            } };
            
            const result = await collection.updateOne(where, values);
            
            res.status(202).json(result);
        })
        .delete('/:id', async (req, res) => {
            const collection = await db.connect("lessons");
            const result = await collection.deleteOne({
                "id": parseInt(req.params.id)
            });
            res.status(200).json(result);
        });
};
