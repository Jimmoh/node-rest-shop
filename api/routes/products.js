const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const mongoose = require('mongoose');

//Handle incoming GET requests to /products
router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    });


//Handle incoming POST requests to /products
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "I createa a product",
                createdProduct: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });

    
});

//Handle incoming GET requests to /products
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log('This data is from Database', doc);
        if (doc){
            res.status(200).json(doc);
        } else res.status(404).json({message: "NOT FOUND"});
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});


router.patch('/:productName', (req, res, next) => {
    res.status(200).json({
        message: 'You have updated the products'
    });
});


//Handle incoming DELETE requests to /products
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});



module.exports = router;