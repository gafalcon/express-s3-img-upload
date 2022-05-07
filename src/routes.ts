import express from 'express'
import {postImg} from './controllers/fileController'
import {upload} from './utils/file_storage'

const router = express.Router()

router.get("/hello", (req, res) => {
    console.log(req.query)
    res.send({"hello": "world"})
})

router.post("/upload", upload.single('image'), postImg)

export default router
