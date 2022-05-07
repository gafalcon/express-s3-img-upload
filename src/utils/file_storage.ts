import AWS from 'aws-sdk'
import fs from "fs"
import multer from 'multer'
import multerS3 from 'multer-s3'

const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

let BUCKET = process.env.AWS_BUCKET_NAME || ""


// Uploads file from filesystem to S3
export const uploadFile = (filepath: string, filename: string): Promise<AWS.S3.ManagedUpload.SendData> => {
    const fileStream = fs.createReadStream(filepath);
    const uploadParams = {
        Bucket: BUCKET,
        Body: fileStream,
        Key: filename,
    }
    return s3.upload(uploadParams).promise()
}

// Middleware to upload file to S3 from form request
export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (_req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (_req, file, cb) {
            cb(null, `${Date.now().toString()}_${file.originalname}`)
        }
    }),

    fileFilter: (req, file, cb) => {
        const isImage = file.mimetype.startsWith("image")
        req.body.isImage = isImage
        cb(null, isImage)
    }
})
