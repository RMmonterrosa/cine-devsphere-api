import {getConne} from "../database/connection.js" 
import sql from 'mssql' 




export const getEjemplo = async (req, res) => { // Funcion asincrona

    const pool = await getConne()
    const result = await pool.request().query(`SELECT f.id_funcion, p.nombre AS pelicula, f.hora_inicio, f.fecha FROM funciones f JOIN peliculas p ON f.id_pelicula = p.id_pelicula WHERE f.fecha = '2024-05-23' ORDER BY f.hora_inicio`)
    //console.log('Hola', result.recordset)
    res.json(result.recordset) // Recordset es para mostrar el json

}

export const gidEjemplo = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id) // Recordar para que se usaba param   id, tipo de dato con modulo, req.params
    .query('select * from ejemplos where id = @id')

    res.json(result.recordset)
}

export const postEjemplo = async (req, res) => {

    
    console.log('Desde post:     ',req.imageUrl)
    const pool = await getConne()
    
    const result = await pool.request()
    .input('nombre', sql.VarChar, req.body.nombre) // Agregar inputs para la cantidad de columnas existentes y el tipo de var que es 
    .input('apellido', sql.VarChar, req.body.apellido)
    .input('edad', sql.Int, req.body.edad)
    .input('estatura', sql.Decimal(18,2), req.body.estatura)
    .input('imagen', sql.VarChar, req.imageUrl)
    .input('video', sql.VarChar, req.body.video)
    .query('insert into ejemplos (nombre, apellido, edad, estatura, imagen, video) values (@nombre, @apellido, @edad, @estatura, @imagen, @video)') // La @ Significa que esos valores seran reemplazados

    
    res.send('Para mientras post')

}



export const pidEjemplo = async (req, res) => {

    
    console.log('Desde pID:     ',req.imageUrl)
    console.log('Desde pIDFile:     ',req.file)
    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .input('nombre', sql.VarChar, req.body.nombre) // Agregar inputs para la cantidad de columnas existentes y el tipo de var que es 
    .input('apellido', sql.VarChar, req.body.apellido)
    .input('edad', sql.Int, req.body.edad)
    .input('estatura', sql.Decimal(18,2), req.body.estatura)
    .input('imagen', sql.VarChar, req.imageUrl)
    .input('video', sql.VarChar, req.body.video)
    .query('update ejemplos set nombre = @nombre, apellido = @apellido, edad = @edad, estatura = @estatura, imagen = @imagen, video = @video where id = @id') // La @ Significa que esos valores seran reemplazados
    
    
    res.send('Para mientras post especifico')

}

export const deleteEjemplo = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id) // Recordar para que se usaba param 
    .query('delete from ejemplos where id = @id')
    res.send('Para mientras delete especifico')

}