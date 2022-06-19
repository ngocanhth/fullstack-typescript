import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateBlogInput {
	@Field()
	blogtitle: string

	@Field()
	blogcontent: string
}
