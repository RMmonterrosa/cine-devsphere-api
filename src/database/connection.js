import conne from 'mssql'

const dbConnec = 'Server=localhost,1433;Database=DevSphere;User Id=sa;Password=Sonic2002;Encrypt=false'


export const getConne = async () => {
    try {

        const pool = await conne.connect(dbConnec) 

        return pool
    } catch (error) {
        console.log(error)
    }
}

