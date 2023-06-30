// import dependencies
const express = require("express")
const Animals = require('../models/animals');

// create a router
const router = express.Router()

// ROUTES

// INDEX - GET
router.get("/", async (req, res) => {
    const allAnimals = await Animals.find({})
    res.render(
        'animals/index.ejs', { animals: allAnimals }
    )
})
// NEW - GET
router.get("/new", (req, res) => {
    res.render("animals/new.ejs")
})

// CREATE - POST
router.post('/', async (req, res) => {
    console.log(req.body)
    if(req.body.extinct === 'on'){
        req.body.extinct = true;
    } else {
        req.body.extinct = false;
    }
    await Animals.create(req.body);
    res.redirect('/animal');
})

// SHOW - GET
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const animal = await Animals.findById(id)
    const extinctClass = animal.extinct ? "yes" : "no"
    res.render("animals/show.ejs", { animal, extinctClass, id })
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
    console.log(req.body)
    await Animals.findByIdAndUpdate(id, req.body)
    res.redirect("/animal")
})



// EDIT - GET
router.get("/:id/edit", async (req, res) => {
    const id = req.params.id
    const animal = await Animals.findById(id)
    res.render("animals/edit.ejs", { animal, id })
    
})



module.exports = router