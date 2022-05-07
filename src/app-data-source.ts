import { DataSource } from "typeorm"

const myDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGODB_URL,
    // host: process.env.MONGODB_HOST,
    // port: parseInt(process.env.MONGODB_PORT || "27017"),
    database: "s3-img-uploading",
    entities: [__dirname + "/entity/*.{js,ts}"],
    logging: true,
    synchronize: true,
})

export default myDataSource
