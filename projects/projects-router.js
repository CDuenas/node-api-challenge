const express = require("express")
const projects = require("../data/helpers/projectModel")
const actions = require("../data/helpers/actionModel")

const router = express.Router()

router.get("/", (req, res) => {
    projects.get(req.params.id)
        .then((project) => {
            res.status(200).json(project)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the project"
            })
        })
})

router.get("/:id", (req, res) => {
    projects.get(req.params.id)
        .then((project) => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "Project not found"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error retrieving the project"
            })
        })
})


router.post("/", (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({
            message: "Please provide a name and a description for your project"
        })
    }

    projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error adding project"
            })
        })
})

router.put("/:id", (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({
            message: "Please provide a name and a description for your project"
        })
    }

    projects.update(req.params.id, req.body)
        .then((project) => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "The project could not be found"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error adding project"
            })
        })
})

router.delete("/:id", (req, res) => {
    projects.remove(req.params.id)
        .then((project) => {
            if (project) {
                res.status(200).json({
                    message: "The project has been deleted"
                })
            } else {
                res.status(404).json({
                    message: "The project could not be found"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "Error removing the project"
            })
        })
})

router.get("/:id/actions", (req, res) => {
    if (!req.params.id) {
        return res.status(404).json({
            message: "Project with that ID could not be found"
        })
    }


    actions.get(req.params.id)
        .then((action) => {
            console.log(action.project_id)
            projects.getProjectActions(action.project_id)
                .then((project) => {
                    if (project) {
                        res.status(200).json(project)
                    } else {
                        res.status(404).json({
                            message: "The action could not be found"
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).json({
                        message: "Error retrieving action"
                    })
                })
        })
})


module.exports = router
