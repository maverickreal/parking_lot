const router = require('express').Router(),
    { v4: uuid } = require('uuid'),
    Car = require('../models/car');

router.post('/car', async (req, res) => {
    let count = await Car.countDocuments({});
    if (count >= process.env.CAPACITY)
        return res.status(400).send({ error: 'Parking is full' });

    const { brand, number } = req.body;

    if (!(brand && number) || typeof number !== 'number')
        return res.status(400).json({
            error: 'Missing or wrong parameters.'
        });

    try {

        if (await Car.findOne({ number, brand }))
            return res.status(403).json({ error: 'Car already exists' });

        const parkingId = uuid();

        const car = new Car({
            brand,
            number,
            parkingId
        });

        await car.save();
        return res.status(201).json({ message: 'Your new car successfully added to parking lot.', parkingId });
    }

    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete('/car', async (req, res) => {
    const { parkingId } = req.body;

    if (!parkingId)
        return res.status(400).json({
            error: 'Missing parameters!'
        });

    try {
        const car = await Car.findOne({ parkingId });

        if (!car)
            return res.status(404).json({ error: 'Car not found!' });

        await car.remove();
        return res.status(200).json({ message: 'Car successfully removed', parkingId });
    }

    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/car', async (req, res) => {
    const cars = await Car.find();

    if (cars.length === 0)
        return res.status(404).json({ message: 'Parking lot empty!' });

    for (let car in cars) {
        cars[car] = {
            brand: cars[car].brand,
            number: cars[car].number,
            parkingId: cars[car].parkingId
        };
    }

    return res.status(200).json({ message: 'Cars fetched successfully.', cars });
});

module.exports = router;