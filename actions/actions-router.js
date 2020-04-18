const express = require("express")
const actions = require("../data/helpers/actionModel")

const router = express.Router()

router.get("/", (req, res) => {
    actions.get(req.params.id)
        .then((action) => {
            res.status(200).json(action)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the action"
            })
        })
})

router.get("/:id", (req, res) => {
    actions.get(req.params.id)
        .then((action) => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: "Action not found"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the action"
            })
        })
})


router.post("/", (req, res) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        return res.status(400).json({
            message: "Please provide an ID, a description and notes"
        })
    }

    actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error adding action"
            })
        })
})

router.put("/:id", (req, res) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        return res.status(400).json({
            message: "Please provide an ID, a description and notes"
        })
    }

    actions.update(req.params.id, req.body)
        .then((action) => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: "The action could not be found"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error adding action"
            })
        })
})

router.delete("/:id", (req, res) => {
    actions.remove(req.params.id)
        .then((action) => {
            if (action) {
                res.status(200).json({
                    message: "The action has been deleted"
                })
            } else {
                res.status(404).json({
                    message: "The action could not be found"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error removing the action"
            })
        })
})




module.exports = router