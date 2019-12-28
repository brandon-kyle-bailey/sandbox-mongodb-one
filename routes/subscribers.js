import express from 'express';

const router = express.Router();


// get all subs
router.get('/', (req, res) => {
    res.send('Hello world!');
});
// get single sub
router.get('/:id', (req, res) => {

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