import express from 'express';
import Subsriber from '../models/subscriber.js';

const router = express.Router();

// get all subs
router.get('/', async(req, res) => {
    await Subsriber.find()
        .then((subscribers) => {
            if (subscribers) res.json(subscribers);
        })
        .catch(err => res.status(500).json({ message: err.message }));
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
    await subscriber.save()
        .then((newSubscriber) => {
            if (newSubscriber) res.status(201).json(newSubscriber);
        })
        .catch((err) => res.status(400).json({ message: err.message }));
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

    await res.subscriber.save()
        .then((updatedSubscriber) => {
            if (updatedSubscriber) res.json(updatedSubscriber);
        })
        .catch(err => res.status(400).json({ message: err.message }));

});

// delete single sub
router.delete('/:id', getSubscriber, async(req, res) => {

    await res.subscriber.remove()
        .then(() => res.json({ message: "Deleted subscriber" }))
        .catch(err => res.status(500).json({ message: err.message }));
});

// middleware function
async function getSubscriber(req, res, callback) {
    let subscriber;

    await Subsriber.findById(req.params.id)
        .then((subscriber) => {
            if (!subscriber) return res.status(404).json({
                message: 'Cannot find subscriber'
            });
            res.subscriber = subscriber;
            callback();
        })
        .catch(err => res.status(500).json({ message: err.message }));
}


export default router;