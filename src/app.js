import mExpress from 'express'
import routes from './routes/controller.rutas.js'
import cors from 'cors'


const app = mExpress()


app.use(cors())
app.use(mExpress.json())
app.use(routes) 


export default app