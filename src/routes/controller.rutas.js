import express from "express"
import { getPelicula, gidPelicula, postPelicula, pidPelicula, deletePelicula } from "../controllers/peliculas.controllers.js"
import { getFuncion, gidFuncion, getFuncionId, getFuncionFiltro, getSala, postFuncion, pidFuncion, deleteFuncion } from "../controllers/funciones.controllers.js"
import { getReserva, gidReserva, postReserva, pidReserva, deleteReserva } from "../controllers/reserva.controllers.js"
import { getIdioma } from "../controllers/idiomas.controllers.js"
import { getEstado } from "../controllers/estados.controllers.js"
import { getSalas } from "../controllers/salas.controllers.js"
import { getButaca, getButacaSala } from "../controllers/butacas.controllers.js"
import { subir, subirI } from "../config/path.js"


const router = express()

router.get('/peliculas', getPelicula)

router.get('/peliculas/:id', gidPelicula) 

router.post('/peliculas', subir.single('imagen'), subirI, postPelicula) 

router.put('/peliculas/:id', subir.single('imagen'), subirI, pidPelicula)

router.delete('/peliculas/:id', deletePelicula)

router.get('/funciones', getFuncion)

router.get('/funciones/:id', gidFuncion) 

router.post('/funciones', postFuncion) 

router.put('/funciones/:id', pidFuncion)

router.delete('/funciones/:id', deleteFuncion)

router.get('/Cartelera/:id', getFuncionId)

router.get('/Cartelera/:idioma/:fecha', getFuncionFiltro)

router.get('/Sala/:id', getSala)

router.get('/reservas', getReserva)

router.get('/reservas/:id', gidReserva) 

router.post('/reservas', postReserva) 

router.put('/reservas/:id', pidReserva)

router.delete('/reservas/:id', deleteReserva)

router.get('/idiomas', getIdioma)

router.get('/estados', getEstado)

router.get('/salas', getSalas)

router.get('/butacas', getButaca)

router.get('/butacas/:sala', getButacaSala)


export default router 