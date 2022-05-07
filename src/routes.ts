import express from 'express'
import myDataSource from './app-data-source'
import {postImg} from './controllers/fileController'
import { Image } from './entity/image.entity'
import {upload} from './utils/file_storage'

const router = express.Router()

router.get("/hello", (_req, res) => {
    res.send({"hello": "world"})
})

router.get("/test", async (_req, res) => {
    const img = new Image()
    img.url = "test_url"
    const savedImg = await myDataSource.getMongoRepository(Image).save(img)
    console.log(savedImg)
    res.send({img: savedImg})
})

router.post("/upload", upload.single('image'), postImg)

export default router
