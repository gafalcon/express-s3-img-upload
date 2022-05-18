import { MongoRepository } from 'typeorm';
import myDataSource from '../app-data-source'
import Image from '../entity/image.entity'

export default class ImageRepository {

    private static _instance: ImageRepository;
    private repository: MongoRepository<Image>;
    private constructor() {
        this.repository = myDataSource.getMongoRepository(Image)
    }

    public static get instance(): ImageRepository {
        if(!this._instance) this._instance = new ImageRepository();

        return this._instance;
    }

    async getImages(user?: string) : Promise<Image[]> {
        const options : any= {}
        if (user) options["where"]= {user}
        return this.repository.find(options)
    }


    async saveImage(url: string, user: string) : Promise<Image> {
        const newImg = new Image()
        newImg.url = url
        newImg.user = user
        const savedImg = await this.repository.save(newImg)
        return savedImg
    }
}
