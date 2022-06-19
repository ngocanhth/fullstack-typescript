import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";
import { Post } from "../entities/Post";

@ObjectType({ implements: IMutationResponse })

export class PostMutationResponse implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    post?: Post

    // mang trong typegrapql, voi nhung dang dac biet thi @Field khong the tu convert sang type cua graphql dc ma phai chi dinh ro cho no tra ve loai gi
    @Field(_type => [FieldError], { nullable: true }) 
    errors?: FieldError[]
    // mang trong typescript
}
