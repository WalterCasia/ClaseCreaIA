const express = require('express')
const router = express.Router()

router.get('/', async(req, res) =>{
    try{
        res.status(200).json({mensaje: "lista de los productos"})
    }
    catch (error){
        res.status(500).json({error: error.mensaje})
    }
})

router.post('/agregar', (req, res) =>{
    try{
        const nuevoProducto = req.body

        res.status(201).json({   
            mensaje: "Producto agregado",
            producto: nuevoProducto
        });

    }catch(error){
        res.status(500).json({error: error.mensaje})
    }
})

router.get('/:id', (req, res) =>{
    const {id} = req.params;

    res.status(200).json ({mensaje: `Detalles del producto con ID:${id} son: -> consulta con sql `})
})




module.exports = router