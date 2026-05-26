const express = require('express')
const router = express.Router()
const controller = require("../controllers/productosController")

router.get("/", controller.obtenerTodos)

router.get("/:id", controller.obtenerPorId)

router.post("/", controller.crear)

// toDo:
//router.put("/:id", controller.)

module.exports = router