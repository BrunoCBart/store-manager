const express = require('express');

const router = express.Router();

const salesController = require('../controllers/salesController');

router.get('/', salesController.getAll);

router.get('/:id', salesController.getById);

router.post('/', salesController.sell);

router.put('/:id', salesController.update);

router.delete('/:id', salesController.exclude);

module.exports = router;