import {getConne} from "../database/connection.js" 
import sql from 'mssql' 

export const getButaca= async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request().query('select b.id_butaca, b.butaca, b.id_sala, s.sala from butacas b join salas s on b.id_sala = s.id_sala')
    res.json(result.recordset) 

}

export const getButacaSala= async (req, res) => { 

    const pool = await getConne()
    const result = await pool.request()
    .input('sala', sql.Int, req.params.sala)
    .query('select b.id_butaca, b.butaca, b.id_sala, s.sala from butacas b join salas s on b.id_sala = s.id_sala where s.sala = @sala')
    res.json(result.recordset) 

}