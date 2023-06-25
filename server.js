// IMPORT DEPEDENCIES & SETUP
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT
const app = express();
const methodOverride = require("method-override");
const animalsRouter = require("./controllers/animals");

// MIDDLEWARE
app.use(morgan("dev"));
app.use(express.static("public"))
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use("/animal", animalsRouter);


// LISTENER
app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`)
})