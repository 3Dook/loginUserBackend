const express = require('express')
const router = express.Router();
let Block = require('../models/block.model');


router.route('/')
    .get((req,res)=>{
        try{
            Block.find()
                .then(blocks => res.status(200).json({blocks, Message: "GOOD JOB"}))
        } catch(e){
            res.status(400).json({Error: e})
        }
    })
    .post(async (req, res)=>{
        try{
            //Error Check Here
            //
            const { message } = req.body
            const block = new Block({message})
            await block.save()
            .then((data) => res.json(data))
            .catch(e => res.status(400).json({Error: "Unable to save" + e}))
        }  catch(e){
            res.status(400).json({Error: "Unable to Post " + e})
        }
    })

router.route('/:id')
    .get((req, res) =>{
        Block.findById(req.params.id)
        .then(block => res.status(201).json(block))
        .catch(e => res.status(402).json({Error: "Unable to find -"+ e}))
    })
    .put((req,res)=>{
        Block.findById(req.params.id)
        .then(block =>{
            //Error Check here
            //
            block.message = req.body.message;

            block.save()
            .then(data => res.status(202).json(data))
            .catch(e => res.status(400).json({Error: "Unable to update" + e}))
        })
        .catch(e => res.status(400).json({Error: "Unable to update" + e}))
    })
    .patch((req,res)=>{
        Block.findById(req.params.id)
        .then(block =>{
            //Error Check here
            //
            block.message = req.body.message;

            block.save()
            .then(data => res.status(202).json(data))
            .catch(e => res.status(400).json({Error: "Unable to update" + e}))
        })
        .catch(e => res.status(400).json({Error: "Unable to update" + e}))
    })
    .delete((req,res)=>{
        Block.findByIdAndDelete(req.params.id)
        .then((data)=>{res.status(202).json({Message: "BLOCK DELETED - "+ data})})
        .catch(e => res.status(400).json({Error: "Unable to DELETE" + e}))
    })
module.exports = router;