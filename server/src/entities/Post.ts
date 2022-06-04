import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class Post extends BaseEntity {
    @PrimaryColumn()
    id!: number

    @Column()
    title!: string


    @Column()
    text!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}