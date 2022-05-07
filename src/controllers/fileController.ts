// import {uploadFile} from '../utils/file_storage'
import Express from 'express'

export const postImg = async (req: Express.Request, res: Express.Response) => {
    // const response = await uploadFile("s3.png", "s3.png")
    if (!req.file && !req.body.isImage){
        res.status(400).send({response: "Invalid file type"})
        return
    }
    //TODO save file name and location to db
    res.status(200).send({response: 'Uploaded'})
}
