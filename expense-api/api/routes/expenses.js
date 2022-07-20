const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const expense = require('../models/expense');

const Expense = require('../models/expense');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) =>{
    Expense.find()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).jsone({
            error: err
        });
    });
});

router.post('/', checkAuth, (req, res, next) =>{
    const expense = new Expense({
        _id: new mongoose.Types.ObjectId(),
        date: req.body.date,
        name: req.body.name,
        desc: req.body.desc,
        amount: req.body.amount,
        btn: req.body.btn,
        userId: req.body.userId
    })

    expense.save()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:expenseId', checkAuth, (req, res, next) => {
    const id = req.params.expenseId;

    Expense.updateOne(
        {_id: id},
        {
        $set: {
            date: req.body.date,
            name: req.body.name,
            desc: req.body.desc,
            amount: req.body.amount,
            btn: req.body.btn,
            userId: req.body.userId
        }
        })
        .then(result =>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:expenseId', checkAuth, (req, res, next)=> {
    const id = req.params.expenseId;

    Expense.remove({_id: id})
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

module.exports = router;

