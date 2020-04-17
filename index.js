const express = require("express")
const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")

const server = express()
const port = 8080

server.use(express.json())
server.use("/actions", actionsRouter)
server.use("/projects", projectsRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}.`)
})
