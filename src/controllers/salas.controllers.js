import {getConne} from "../database/connection.js" 
import sql from 'mssql' 

export const getSalas= async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request().query('select * from salas')
    res.json(result.recordset) 

}