import {getConne} from "../database/connection.js" 
import sql from 'mssql' 

export const getFuncion = async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request().query('select id_funcion, hora_inicio, convert(varchar, fecha, 23) as fecha, id_pelicula, id_sala from funciones')
    res.json(result.recordset) 

}

export const gidFuncion = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id) 
    .query('select id_funcion, hora_inicio, convert(varchar, fecha, 23) as fecha, id_pelicula, id_sala from funciones where id_funcion = @id')
    res.json(result.recordset)
}

export const getFuncionId = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query(`SELECT f.id_funcion, p.nombre AS pelicula, p.imagen, f.hora_inicio, convert(varchar, f.fecha, 107) as fecha , f.id_sala, s.sala FROM funciones f JOIN peliculas p ON f.id_pelicula = p.id_pelicula JOIN salas s ON f.id_sala = s.id_sala WHERE f.id_funcion = @id`)
    res.json(result.recordset)
}

export const getFuncionFiltro = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .input('idioma', sql.Int, req.params.idioma)
    .input('fecha', sql.VarChar, req.params.fecha)
    .query(`SELECT p.nombre AS pelicula, p.id_pelicula, p.imagen, p.video, p.duracion, STRING_AGG(CONCAT(f.hora_inicio, ' ', f.id_funcion), ',') WITHIN GROUP (ORDER BY f.hora_inicio) AS horarios FROM funciones f JOIN peliculas p ON f.id_pelicula = p.id_pelicula WHERE f.fecha = '2024-05-29' AND p.id_idioma = 1 GROUP BY p.nombre, p.imagen, p.video, p.duracion, p.id_pelicula order by horarios`)
    res.json(result.recordset)
}

export const getSala = async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .query(`SELECT f.id_funcion, f.hora_inicio, p.nombre AS pelicula, s.sala AS sala, b.id_butaca, b.butaca AS butaca, CASE WHEN e.estado IS NULL THEN 'Vacía' ELSE 'Reservada' END AS estado_butaca FROM funciones f JOIN peliculas p ON f.id_pelicula = p.id_pelicula JOIN salas s ON f.id_sala = s.id_sala JOIN butacas b ON b.id_sala = s.id_sala LEFT JOIN reservas r ON r.id_butaca = b.id_butaca AND r.id_funcion = f.id_funcion LEFT JOIN estados e ON r.id_estado = e.id_estado WHERE f.id_funcion = @id`)
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
    console.log(req.body)
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