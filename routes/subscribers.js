import express from 'express';
import Subsriber from '../models/subscriber.js';

const router = express.Router();

// get all subs
router.get('/', async(req, res) => {
    const subscribers = await Subsriber.find()
        .catch(err => res.status(500).json({ message: err.message }));
    if (subscribers) res.json(subscribers);
});

// get single sub
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber);
});

// create single sub
router.post('/', async(req, res) => {

    const subscriber = new Subsriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });

    const newSubscriber = await subscriber.save()
        .catch((er) => res.status(400).json({ message: err.message }));
    if (newSubscriber) res.status(201).json(newSubscriber);
});

// update single sub
// patch over put here to only update information specified
// by the user, vs put updating the entier model.
router.patch('/:id', getSubscriber, async(req, res) => {

    if (req.body.name != null) {
        res.subscriber.name = req.body.name;
    }

    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }

    const updatedSubscriber = await res.subscriber.save()
        .catch(err => res.status(400).json({ message: err.message }));
    if (updatedSubscriber) res.json(updatedSubscriber);
});

// delete single sub
router.delete('/:id', getSubscriber, async(req, res) => {

    await res.subscriber.remove()
        .catch(err => res.status(500).json({ message: err.message }));
    res.json({ message: "Deleted subscriber" })

});

// middleware function
async function getSubscriber(req, res, callback) {
    let subscriber;

    subscriber = await Subsriber.findById(req.params.id)
        .catch(err => res.status(500).json({ message: err.message }));
    if (!subscriber) return res.status(404).json({
        message: 'Cannot find subscriber'
    });
    res.subscriber = subscriber;
    callback();
}


export default router;