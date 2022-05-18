import Image from '../entity/image.entity'

export class ImageRepository {

    private static _instance: ImageRepository;
    private constructor() {
    }

    public static get instance(): ImageRepository {
        if(!this._instance) this._instance = new ImageRepository();
        return this._instance;
    }

    async getImages(user?: string) : Promise<Image[]> {
        const img = new Image()
        img.user = "test_user"
        img.url = "test_url"
        return Promise.resolve([img])
    }


    async saveImage(url: string, user: string) : Promise<Image> {
        const newImg = new Image()
        newImg.url = url
        newImg.user = user
        return Promise.resolve(newImg)
    }
}
