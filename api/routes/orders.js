const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

//Handle incoming GET requests to /orders
router.get('/', (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request: {
                        type: 'GET',
                        url: 'http://localhost3000/orders/' + doc._id
                    }
                }
            })
           
            
        });
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        });
    })
});

//Handle incoming POST requests to /orders
router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order
    .save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Order Saved!',
            request: {
                type: 'POST'
                   }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
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