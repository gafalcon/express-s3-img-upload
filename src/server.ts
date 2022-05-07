import express from 'express'
import router from './routes'

const PORT = process.env.ENVIRONMENT === "prod" ? 80 : process.env.PORT || 3000

export function createServer() {
    const app = express()
    app.use(express.json())

    app.get('/', (_req, res) => {
        res.send({message: 'Home'})
    })

    app.use('/api', router)

    return app
}


export function start() {
    const app = createServer()

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

