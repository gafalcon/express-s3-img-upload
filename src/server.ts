import express from 'express'

const PORT = process.env.ENVIRONMENT === "prod" ? 80 : process.env.PORT || 3000

export function createServer() {
    const app = express()
    app.use(express.json())

    app.get('/api', (_req, res) => {
        console.log('someone pinged here!!')
        res.send({message: 'Home'})
    })
    return app
}


export function start() {
    const app = createServer()

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

