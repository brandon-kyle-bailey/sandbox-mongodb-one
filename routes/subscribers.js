import express from 'express';
import SubsriberModel from '../models/subscriber.js';

const router = express.Router();

// get all subs
router.get('/', async(req, res) => {
    try {
        const subscribers = SubsriberModel.find();
    } catch {

    }
});
// get single sub
router.get('/:id', (req, res) => {
    res.send(req.params.id);
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