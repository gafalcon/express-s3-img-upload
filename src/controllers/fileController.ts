import Express from 'express'
import {Request as JWTRequest} from 'express-jwt'
import ImageRepository from '../repositories/image_repository'

export const postImg = async (req: JWTRequest, res: Express.Response) => {
    if (!req.file) {
        if (req.body.isImage === false){
            res.status(400).send({response: "Invalid file type"})
        }else{
            res.status(400).send({response: "No image attached"})
        }
        return
    }

    try {
        const imgRepo = ImageRepository.instance
        const savedImg = await imgRepo.saveImage(req.file.location, req.auth.sub)
        res.status(200).send({response: savedImg})
    } catch (err) {
        //TODO I should probably remove from s3 as well
        // or create cronjob to delete all unlinked imgs
        console.error(err);
        res.status(500).send({response: 'Error uploading'})
    }
}

export const getImgs = async(req: JWTRequest, res:Express.Response) => {
    let user;
    if (typeof req.query.user === "string")
        user = req.query.user

    const imgRepo = ImageRepository.instance
    const imgs = await imgRepo.getImages(user)
    res.status(200).send({images: imgs})
}
