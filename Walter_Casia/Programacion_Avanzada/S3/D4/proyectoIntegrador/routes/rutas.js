const express = require('express')
const router = express.Router()

router.get('/resultado', (req, res) =>{
    function obtenerTexto (){
        try {
            const res = await fecth("https://bored-api.appbrewery.com/random")
            const html = await res.text()
            console.log(html)
        }
        catch (error) {
            console.error("Hubo un problema con la obtencion del texto: ", error.message)
        }
    }
 
    function obtenerImagen(){
        const res = await fetch("https://dog.ceo/api/breeds/image/random")

        const blob = await res.blob();
        document.getElementById("imagen").src = URL.createObjectURL(blob)

    }
    
})


module.exports = router