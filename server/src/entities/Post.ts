import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()

 export class Post extends BaseEntity {

        @Field(_type => ID)
        @PrimaryGeneratedColumn()
        id!: number

        @Field()
        @Column()
        title!: string

        @Field()
	@Column()
	userId!: number


        @Field()
        @Column()
        text!: string

        @Field()
        @CreateDateColumn({ type: 'timestamptz' })
        createdAt: Date

        @Field()
        @UpdateDateColumn({ type: 'timestamptz' })
        updatedAt: Date
}