import {getConne} from "../database/connection.js" 
import sql from 'mssql' 

export const getFuncion = async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request().query('select * from funciones')
    res.json(result.recordset) 

}

export const gidFuncion = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id) 
    .query('select * from funciones where id_funcion = @id')
    res.json(result.recordset)
}

export const getFuncionHoy = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .query(`SELECT f.id_funcion, p.nombre AS pelicula, f.hora_inicio, f.fecha , f.id_sala FROM funciones f JOIN peliculas p ON f.id_pelicula = p.id_pelicula WHERE f.fecha = CAST(GETDATE() AS DATE) ORDER BY f.hora_inicio`)
    res.json(result.recordset)
}

export const getFuncionFiltro = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .input('fecha', sql.VarChar, req.params.fecha)
    .query(`SELECT f.id_funcion, p.nombre AS pelicula, f.hora_inicio, f.fecha FROM funciones f JOIN peliculas p ON f.id_pelicula = p.id_pelicula WHERE f.fecha = @fecha ORDER BY f.hora_inicio`)
    res.json(result.recordset)
}

export const getSala = async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query(`SELECT f.id_funcion, f.hora_inicio, p.nombre AS pelicula, s.sala AS sala, b.butaca AS butaca, CASE WHEN e.estado IS NULL THEN 'Vacía' ELSE 'Reservada' END AS estado_butaca FROM funciones f JOIN peliculas p ON f.id_pelicula = p.id_pelicula JOIN salas s ON f.id_sala = s.id_sala JOIN butacas b ON b.id_sala = s.id_sala LEFT JOIN reservas r ON r.id_butaca = b.id_butaca AND r.id_funcion = f.id_funcion LEFT JOIN estados e ON r.id_estado = e.id_estado WHERE f.id_funcion = @id`)
    res.json(result.recordset) 

}

export const postFuncion = async (req, res) => {

    const pool = await getConne()
    
    const result = await pool.request()
    .input('hora_inicio', sql.VarChar, req.body.hora_inicio)
    .input('fecha', sql.DateTime, req.body.fecha)
    .input('id_pelicula', sql.Int, req.body.id_pelicula)
    .input('id_sala', sql.Int, req.body.id_sala)
    .query('insert into funciones (hora_inicio, fecha, id_pelicula, id_sala) values (@hora_inicio, @fecha, @id_pelicula, @id_sala)') 

    res.send('Se hizo el post')

}



export const pidFuncion = async (req, res) => {

    const pool = await getConne()

    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .input('hora_inicio', sql.VarChar, req.body.hora_inicio)
    .input('fecha', sql.DateTime, req.body.fecha)
    .input('id_pelicula', sql.Int, req.body.id_pelicula)
    .input('id_sala', sql.Int, req.body.id_sala)
    .query('update funciones set hora_inicio = @hora_inicio, fecha = @fecha, id_pelicula = @id_pelicula, id_sala = @id_sala where id_funcion = @id')
    res.send('Se hizo el put')
}

export const deleteFuncion = async (req, res) => {

    const pool = await getConne()

    const result = await pool.request()
    .input('id', sql.Int, req.params.id) 
    .query('delete from funciones where id_funcion = @id')
    
    res.send('Se hizo el delete')
}