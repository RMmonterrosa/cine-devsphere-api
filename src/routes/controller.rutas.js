import express from "express"
import { getPelicula, gidPelicula, postPelicula, pidPelicula, deletePelicula } from "../controllers/peliculas.controllers.js"
import { getFuncion, gidFuncion, getFuncionHoy, getFuncionFiltro, getSala, postFuncion, pidFuncion, deleteFuncion } from "../controllers/funciones.controllers.js"
import { subir, subirI } from "../config/path.js"


const router = express()

router.get('/peliculas', getPelicula)

router.get('/peliculas/:id', gidPelicula) ///peliculas/:id/:idioma Ejemplo para dos variables

router.post('/peliculas', subir.single('imagen'), subirI, postPelicula) 

router.put('/peliculas/:id', subir.single('imagen'), subirI, pidPelicula)

router.delete('/peliculas/:id', deletePelicula)

router.get('/funciones', getFuncion)

router.get('/funciones/:id', gidFuncion) ///peliculas/:id/:idioma Ejemplo para dos variables

router.get('/Cartelera', getFuncionHoy)

router.get('/Cartelera/:fecha', getFuncionFiltro)

router.get('/Cartelera/Sala/:id', getSala)

router.post('/funciones', postFuncion) 

router.put('/funciones/:id', pidFuncion)

router.delete('/funciones/:id', deleteFuncion)

export default router 