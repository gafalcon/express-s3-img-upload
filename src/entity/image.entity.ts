import { Entity, Column, ObjectIdColumn } from "typeorm"

@Entity()
export class Image {
    @ObjectIdColumn()
    id: number

    @Column()
    url: string

}
