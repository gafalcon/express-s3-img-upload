import { DataSource } from "typeorm"


let myDataSource: DataSource

if (process.env.ENVIRONMENT === "test") {
    myDataSource = new DataSource({
        type: "mongodb",
        url: process.env.MONGODB_URL,
        database: "s3-img-test",
        entities: [__dirname + "/entity/*.{js,ts}"],
        logging: true,
        synchronize: true,
    })
}else{
    myDataSource = new DataSource({
        type: "mongodb",
        url: process.env.MONGODB_URL,
        database: "s3-img-uploading",
        entities: [__dirname + "/entity/*.{js,ts}"],
        logging: true,
        synchronize: true,
    })
}

export const initDB = async () => {
    return myDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err)
        })
}


export default myDataSource
