import { Arg, Mutation, Resolver } from "type-graphql";
import { New } from "../entities/New";
import { CreateNewInput } from "../types/CreateNewInput";
import { NewMutationResponse } from "../types/NewMutationResponse";

@Resolver()


export class newResolver {
    @Mutation(_returns => NewMutationResponse)

    async createNew (
        @Arg('createNewInput') {title , text}: CreateNewInput): Promise<NewMutationResponse> {
            try {
                const newNew = New.create({
                    title,
                    text
                })
    
                await newNew.save()
    
                return {
                    code: 200,
                    success: true,
                    message: 'New created successfully',
                    new: newNew
                }
            } catch (error) {
                console.log(error)
                return {
                    code: 500,
                    success: false,
                    message: `Internal server error ${error.message}`
                }
            }
    }
}