import express from 'express'
import myDataSource from './app-data-source'
import {postImg} from './controllers/fileController'
import { Image } from './entity/image.entity'
import { authCheck } from './utils/auth'
import {upload} from './utils/file_storage'
import {Request as JWTRequest} from 'express-jwt'
const router = express.Router()

router.get("/hello", (_req, res) => {
    res.send({"hello": "world"})
})

router.get("/test_db", async (_req, res) => {
    const img = new Image()
    img.url = "test_url"
    const savedImg = await myDataSource.getMongoRepository(Image).save(img)
    console.log(savedImg)
    res.send({img: savedImg})
})

router.get("/test_auth", authCheck, (_req: JWTRequest, res:express.Response) => {
    // console.log(req.auth.sub)
    res.send({msg: "authorized"})
})

router.post("/upload", authCheck, upload.single('image'), postImg)

export default router
