const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config()

const db = require('./data/db');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

const lessonsRouter = require('./routes/api/lessons')(express, db);
const ordersRouter = require('./routes/api/orders')(express, db);

app.use('/api/lessons', lessonsRouter);
app.use('/api/orders', ordersRouter);

if (process.env.NODE_ENV !== 'development') {
    app.use(express.static(__dirname + '/public/'));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port: ${port}...'));

//git is bugging, sorry about this