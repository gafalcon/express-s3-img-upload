import Express from 'express'

export const postImg = async (req: Express.Request, res: Express.Response) => {
    if (!req.file) {
        if (req.body.isImage === false){
            res.status(400).send({response: "Invalid file type"})
        }else{
            res.status(400).send({response: "No image attached"})
        }
        return
    }
    //TODO save file name and location to db
    res.status(200).send({response: 'Uploaded'})
}
