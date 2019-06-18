const express = require("express");
const router = express.Router();
const subSchema = require("../models/subSchema");

//get all
router.get("/", async (req,res) => {
    try {
        const subscribers = await subSchema.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
})
//get one
router.get("/:id",getSub, (req,res) => {
    res.json(res.subscriber)
})
//create one
router.post("/", async (req,res) => {
    const subscriber = new subSchema({
        name:req.body.name,
        sub:req.body.sub
    })
    try {
        const newsub = await subscriber.save()
        res.status(201).json(newsub)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})
//edit one
router.patch("/:id",getSub,async (req,res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.sub != null) {
        res.subscriber.sub = req.body.sub
    }
    try {
        const updated = await res.subscriber.save()
        res.json(updated)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })     
    }
})
//delete one
router.delete("/:id",getSub,async (req,res) => {
    try {
        await res.subscriber.remove()
        res.json({message:"User Deleted"})
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})


async function getSub(req,res,next) {
    let subscriber
    try {
        subscriber = await subSchema.findById(req.params.id)
        if (subscriber == null) return res.status(404).json({message:"User not found"})
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router
