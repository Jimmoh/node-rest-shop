const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders have been fetched'
    });
});


router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Order has been created'
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Your order has been deleted',
        orderId: req.params.orderId
    });
});



module.exports = router;