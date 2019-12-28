import express from 'express';
import Subsriber from '../models/subscriber.js';

const router = express.Router();

// get all subs
router.get('/', async(req, res) => {
    try {
        const subscribers = await Subsriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// get single sub
router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

// create single sub
router.post('/', async(req, res) => {

    const subscriber = new Subsriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});

// update single sub
// patch over put here to only update information specified
// by the user, vs put updating the entier model.
router.patch('/:id', (req, res) => {

});

// delete single sub
router.delete('/:id', (req, res) => {

});


export default router;