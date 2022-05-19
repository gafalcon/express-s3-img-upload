import Express from 'express'
import {Request as JWTRequest} from 'express-jwt'
import ImageRepository from '../repositories/image_repository'
import { deleteFile } from '../utils/file_storage'

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
        const savedImg = await imgRepo.saveImage(req.file.location, req.auth.sub, req.file.key)
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

export const deleteImage = async(req: JWTRequest, res: Express.Response) => {
    const imageId = req.params["imageId"]
    const imgRepo = ImageRepository.instance
    const image = await imgRepo.getImage(imageId)
    if (!image) {return res.status(404).send({response: "Image not Found"})}
    if (image.user !== req.auth.sub) {return res.status(403).send({response: "Unauthorized to delete this image"})}

    await imgRepo.deleteImage(imageId)
    await deleteFile(image.s3Key)

    res.status(200).send({response: "Deleted!"})
}
