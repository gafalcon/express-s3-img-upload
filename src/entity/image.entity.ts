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

    @CreateDateColumn()
    date_created: Date

    @UpdateDateColumn()
    date_last_updated: Date

    constructor(url?: string, user?: string) {
        if (url) this.url = url
        if (user) this.user = user
    }
}
