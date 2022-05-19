import { Entity, Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"

@Entity()
export default class Image {
    @ObjectIdColumn()
    id: number

    @Column()
    url: string

    @Index()
    @Column()
    user: string

    @Column()
    s3Key: string

    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_last_updated: Date

    constructor(url?: string, user?: string, s3Key?: string) {
        if (url) this.url = url
        if (user) this.user = user
        if (s3Key) this.s3Key = s3Key
    }
}
