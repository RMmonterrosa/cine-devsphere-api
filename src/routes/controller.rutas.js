import express from "express"
import { getPelicula, gidPelicula, postPelicula, pidPelicula, deletePelicula } from "../controllers/peliculas.controllers.js"
import { getFuncion, gidFuncion, getFuncionHoy, getFuncionFiltro, getSala, postFuncion, pidFuncion, deleteFuncion } from "../controllers/funciones.controllers.js"
import { getReserva, gidReserva, postReserva, pidReserva, deleteReserva } from "../controllers/reserva.controllers.js"
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

router.get('/Cartelera/:idioma', getFuncionHoy)

router.get('/Cartelera/:idioma/:fecha', getFuncionFiltro)

router.get('/Sala/:id', getSala)

router.get('/reservas', getReserva)

router.get('/reservas/:id', gidReserva) 

router.post('/reservas', postReserva) 

router.put('/reservas/:id', pidReserva)

router.delete('/reservas/:id', deleteReserva)


export default router 