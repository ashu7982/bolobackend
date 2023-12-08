

const express = require('express');
const router = express.Router();
const Form = require('../Models/FormsModel');

router.get('/', async (req, res) => {
    try {
        const forms = await Form.find();
        res.send(forms);
    } catch (error) {
        res.send(error.message);
    }
});

router.get('/get/:id', async (req, res) => {
    const params = req.params;
    try {
        const forms = await Form.find({ _id: params.id });
        res.send(forms);
    } catch (error) {
        res.send(error.message);
    }
});

router.post('/', async (req, res) => {
    const data = req.body;
    if (!data) {
        res.status(404).send({ message: "body" });
    }
    try {
        const form = await Form.create(data);
        res.send({ message: 'created successfully', data: form });
    } catch (error) {
        res.send(error.message);
    }
});

// Delete form
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        if (!id) {
            res.status(404).send({ message: 'not clear' });
        }
        const form = await Form.findByIdAndDelete(id);
        res.send({ message: 'deleted successfully', data: form });
    } catch (error) {
        res.send(error.message);
    }
});

// Edit form
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        if (!id) {
            res.status(404).send({ message: 'not clear' });
        }

        const form = await Form.findByIdAndUpdate(id, { data });
        res.send({ message: 'updated successfully', data: form });
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;
