import {getConne} from "../database/connection.js" 
import sql from 'mssql' 

export const getPelicula = async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request().query('select * from peliculas')
    res.json(result.recordset) 

}

export const gidPelicula = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id) 
    .query('select * from peliculas where id_pelicula = @id')
    res.json(result.recordset)
}

export const postPelicula = async (req, res) => {

    const pool = await getConne()
    


    const result = await pool.request()
    .input('nombre', sql.VarChar, req.body.nombre) 
    .input('descripcion', sql.VarChar, req.body.descripcion)
    .input('director', sql.VarChar, req.body.director)
    .input('duracion', sql.Int, req.body.duracion)
    .input('imagen', sql.VarChar, req.imageUrl)
    .input('video', sql.VarChar, req.body.video)
    .input('id_idioma', sql.Int, req.body.id_idioma)
    .input('id_estado', sql.Int, req.body.id_estado)
    .query('insert into peliculas (nombre, descripcion, director, duracion, imagen, video, id_idioma, id_estado) values (@nombre, @descripcion, @director, @duracion, @imagen, @video, @id_idioma, @id_estado)') 

    res.send('Se hizo el post')

}



export const pidPelicula = async (req, res) => {

    const pool = await getConne()   

    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .input('nombre', sql.VarChar, req.body.nombre) 
    .input('descripcion', sql.VarChar, req.body.descripcion)
    .input('director', sql.VarChar, req.body.director)
    .input('duracion', sql.Int, req.body.duracion)
    .input('imagen', sql.VarChar, req.imageUrl)
    .input('video', sql.VarChar, req.body.video)
    .input('id_idioma', sql.Int, req.body.id_idioma)
    .input('id_estado', sql.Int, req.body.id_estado)
    .query('update peliculas set nombre = @nombre, descripcion = @descripcion, director = @director, duracion = @duracion, imagen = @imagen, video = @video, id_idioma = @id_idioma, id_estado = @id_estado where id_pelicula = @id')
    res.send('Se hizo el put')
}

export const deletePelicula = async (req, res) => {

    const pool = await getConne()

    const result = await pool.request()
    .input('id', sql.Int, req.params.id) 
    .query('delete from peliculas where id_pelicula = @id')
    
    res.send('Se hizo el delete')
}