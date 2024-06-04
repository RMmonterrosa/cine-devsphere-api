import {getConne} from "../database/connection.js" 
import sql from 'mssql' 

export const getIdioma= async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request().query('select * from idiomas')
    res.json(result.recordset) 

}