import express from 'express'
import router from './routes'
import myDataSource from "./app-data-source"
import { validateToken } from './utils/auth';


const env = process.env.ENVIRONMENT;
const PORT = env === "prod" ? 80 : process.env.PORT || 3000

export function createServer() {
    // establish database connection
    if (env === "prod" || env === "dev"){
        myDataSource
            .initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })
    }
    const app = express()
    app.use(express.json())

    app.get('/', (_req, res) => {
        res.send({message: 'Home'})
    })

    app.use('/api', router)

    app.use(validateToken)

    return app
}


export function start() {
    const app = createServer()

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

