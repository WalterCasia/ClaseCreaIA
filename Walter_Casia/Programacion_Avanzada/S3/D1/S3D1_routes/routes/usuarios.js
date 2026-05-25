const express = require('express')

const router = express.Router()

router.get('/', async(req, res) =>{
    try{
        res.status(200).json({mensaje: "lista de todos los usuarios"})
    }
    catch (error){
        res.status(500).json({error: error.mensaje})
    }
})

// localhost:3000/usuarios/:2
router.get('/:id', (req, res) =>{
    const {id} = req.params;

    res.status(200).json({mensaje: `Detalles del usuario con ID: ${id}`})
})

module.exports = router