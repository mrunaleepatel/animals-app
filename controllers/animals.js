// import dependencies
const express = require("express")
const Animals = require('../models/animals');

// create a router
const router = express.Router()

// ROUTES

// INDEX - GET
router.get("/", (req, res) => {
    Animals.find({}).then(animals => {
        res.render("animals/index.ejs", { animals })
    })
})

// NEW - GET
router.get("/new", (req, res) => {
    res.render("animals/new.ejs")
})

// DESTROY - DELETE
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    await Animals.findByIdAndDelete(id)
    res.redirect("/animal")
})

// UPDATE - PUT
router.put("/:id", async (req, res) => {
    const id = req.params.id
    req.body.extinct = req.body.extinct === "on" ? true : false
    await Animals.findByIdAndUpdate(id, req.body)
    res.redirect("/animal")
})

// CREATE - POST
router.post("/", async (req, res) => {
    req.body.extinct = req.body.extinct === "on" ? true : false
    await Animals.create(req.body).then(() => {
        res.redirect("/animal")
    })
})

// EDIT - GET
router.get("/:id/edit", async (req, res) => {
    const id = req.params.id
    const animal = await Animals.findById(id)
    res.render("animals/edit.ejs", { animal, id })
})

// SHOW - GET
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const animal = await Animals.findById(id)
    const readyClass = animal.extinct ? "yes" : "no"
    res.render("animals/show.ejs", { animals, readyClass, id })
})

module.exports = router