import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateNewInput {
	@Field()
	title: string

	@Field()
	text: string
}
