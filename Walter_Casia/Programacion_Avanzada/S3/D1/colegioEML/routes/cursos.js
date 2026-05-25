const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    try{
        res.status(200).json(
            {
                mensaje: "Lista de cursos del colegio",
                id: 101,
                curso: "Computacion",
                profesor: "Mario de Leon"
            })
    }
    catch(error){
        res.status(500).json({error: error.mensaje})
    }
})

router.post('/crear', (req, res) =>{
    try{
        const nuevoCurso = req.body
        res.status(201).json({mensaje: "Informacion del curso agregado con exito", curso: nuevoCurso})
        

    }catch(error){
        res.status(500).json({error: error.mensaje})
    }
})

router.put('/:id', (req, res) =>{
    try{
        const idCurso = parseInt(req.params.id)
        const correccionCurso = req.body
        res.status(201).json({mensaje: `El curso con el id: ${idCurso}, se ha corregis con exito`, curso: correccionCurso})
    }catch(error){
        res.status(500).json({error: error.mensaje})
    }
})

module.exports = router