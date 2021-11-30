const express = require('express');
require('dotenv').config();
require('mongoose').connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(express.json());
app.use('/parking-service', require('./routes/parking_service'));
app.use('/*', (req, res) => res.status(404).json({ message: 'Not Found' }));

app.listen(process.env.PORT, () => console.log('server started'));