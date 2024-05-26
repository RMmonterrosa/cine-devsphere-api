import {getConne} from "../database/connection.js" 
import sql from 'mssql' 




export const getReserva = async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request().query('select * from reservas')
    res.json(result.recordset)

}

export const gidReserva = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id) 
    .query('select * from reservas where id_reserva = @id')

    res.json(result.recordset)
}

export const postReserva = async (req, res) => {

    const pool = await getConne()
    
    const result = await pool.request()
    .input('nombre', sql.VarChar, req.body.nombre) 
    .input('apellido', sql.VarChar, req.body.apellido)
    .input('telefono', sql.Int, req.body.telefono)
    .input('correo', sql.VarChar, req.body.correo)
    .input('id_funcion', sql.Int, req.body.id_funcion)
    .input('id_butaca', sql.Int, req.body.id_butaca)
    .input('id_estado', sql.Int, req.body.id_estado)
    .query('insert into reservas (nombre, apellido, telefono, correo, id_funcion, id_butaca, id_estado) values (@nombre, @apellido, @telefono, @correo, @id_funcion, @id_butaca, @id_estado)') 

    
    res.send('Para mientras post')

}



export const pidReserva = async (req, res) => {

    
    console.log('Desde pID:     ',req.imageUrl)
    console.log('Desde pIDFile:     ',req.file)
    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)
    .input('nombre', sql.VarChar, req.body.nombre) 
    .input('apellido', sql.VarChar, req.body.apellido)
    .input('telefono', sql.Int, req.body.telefono)
    .input('correo', sql.VarChar, req.body.correo)
    .input('id_funcion', sql.Int, req.body.id_funcion)
    .input('id_butaca', sql.Int, req.body.id_butaca)
    .input('id_estado', sql.Int, req.body.id_estado)
    .query('update reservas set nombre = @nombre, apellido = @apellido, telefono = @telefono, correo = @correo, id_funcion = @id_funcion, id_butaca = @id_butaca, id_estado = @id_estado where id_reserva = @id') 
    
    
    res.send('Para mientras post especifico')

}

export const deleteReserva = async (req, res) => {

    const pool = await getConne()
    const result = await pool.request()
    .input('id', sql.Int, req.params.id) 
    .query('delete from reservas where id_reserva = @id')
    res.send('Para mientras delete especifico')

}