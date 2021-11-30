const router = require('express').Router(),
    jwt = require('jsonwebtoken'),
    Car = require('../models/car');

router.post('/car', async (req, res) => {
    const { brand, number } = req.body;

    if (!(brand && number))
        return res.status(400).json({
            message: 'Missing parameters'
        });

    try {

        if (await Car.findOne({ number, brand }))
            return res.status(403).json({ message: 'Car already exists' });

        let car = new Car({
            brand,
            number
        });
        car.id= jwt.sign({ id: car._id }, process.env.JWT_SECRET).toString();

        await car.save();
        return res.status(201).json({ message: 'Your new car successfully added to parking lot', parking_id: car.id });
    }

    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;