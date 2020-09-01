const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests on /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests on /products'
    });
});

router.get('/:productName', (req, res, next) => {
    const name = req.params.productName;
    if (name === 'James') {
        res.status(200).json({
            message: 'You discoverd the special Name',
            name: name
        });
    } else res.status(200).json({
            message: 'You have not yet discovered the SPECIAL Name',
            
    });
});

router.patch('/:productName', (req, res, next) => {
    res.status(200).json({
        message: 'You have updated the products'
    });
});

router.delete('/:productName', (req, res, next) => {
    res.status(200).json({
        message: 'You have deleted the products'
    });
});


module.exports = router;