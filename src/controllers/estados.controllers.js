import {getConne} from "../database/connection.js" 
import sql from 'mssql' 

export const getEstado= async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request().query('select * from estados')
    res.json(result.recordset) 

}