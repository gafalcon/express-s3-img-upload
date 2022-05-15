import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"
import myDataSource from "../app-data-source"

@Entity()
export class Image {
    @ObjectIdColumn()
    id: number

    @Column()
    url: string

    @Index()
    @Column()
    user: string

    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_last_updated: Date
}

export const saveImg = async (url: string, user: string) : Promise<Image> => {
    const newImg = new Image()
    newImg.url = url
    newImg.user = user
    const savedImg = await myDataSource.getMongoRepository(Image).save(newImg)
    return savedImg
}
