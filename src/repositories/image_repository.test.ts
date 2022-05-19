import ImageRepository from "./image_repository"
import myDataSource, {initDB} from '../app-data-source'
import Image from '../entity/image.entity'

const img_repo = ImageRepository.instance

beforeAll(async () => {
    await initDB()
})

beforeEach(async() => {
    await myDataSource.manager.delete(Image, {})
})

afterAll(async () => {
    await myDataSource.manager.delete(Image, {})
    await myDataSource.destroy()
})


describe("ImageRepository", () => {
    it("should save an image", async () => {
        const savedImage = await img_repo.saveImage("test_url", "test_user")
        expect(savedImage.url).toBe("test_url")
        expect(savedImage.user).toBe("test_user")


        const mongoImage = await myDataSource.getMongoRepository(Image).findOneBy({_id: savedImage.id})
        expect(mongoImage).not.toBeNull()
        if (mongoImage){
            expect(mongoImage.url).toBe(savedImage.url)
            expect(mongoImage.user).toBe(savedImage.user)
        }

    })

    it("should fetch all images from db", async () => {
        //Save imgs
        const repo = myDataSource.getMongoRepository(Image)
        const imgs = await repo.save([
            new Image(),
            new Image()
        ])

        const images = await img_repo.getImages()
        expect(images.length).toEqual(imgs.length)
        expect(images[0].id).toEqual(imgs[0].id)
        expect(images[1].id).toEqual(imgs[1].id)
    })

    it("should fetch all images by user", async () => {
        const img1User1 = new Image("test_url1", "user1")
        const img2User1 = new Image("test_url2", "user1")
        const img1User2 = new Image("test_url", "user2")

        const repo = myDataSource.getMongoRepository(Image)
        await repo.save([
            img1User1, img2User1, img1User2
        ])

        const fetchedImgs = await img_repo.getImages("user1")

        expect(fetchedImgs.length).toBe(2)
        fetchedImgs.forEach((img) => {
            expect(img.user).toBe("user1")
        })
    })

    it("should not delete if image does not exist", async () => {
        const result = await img_repo.deleteImage("62788e3e6066a2a54a7194c2")
        expect(result.deletedCount).toBe(0)
    })

    it("should delete image by imageId", async () => {
        const repo = myDataSource.getMongoRepository(Image)
        const savedImgs = await repo.save([
            new Image("test_url1", "user1"), new Image("test_url2", "user1")
        ])

        const result = await img_repo.deleteImage(savedImgs[0].id.toString())
        expect(result.deletedCount).toBe(1)

        const mongoImage = await myDataSource.getMongoRepository(Image).findOneBy({_id: savedImgs[0].id})
        expect(mongoImage).toBeNull()

    })
})


