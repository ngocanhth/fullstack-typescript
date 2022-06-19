import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";
import { Blog } from "../entities/Blog";

@ObjectType({ implements: IMutationResponse })

export class BlogMutationResponse implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    blog?: Blog

    // mang trong typegrapql, voi nhung dang dac biet thi @Field khong the tu convert sang type cua graphql dc ma phai chi dinh ro cho no tra ve loai gi
    @Field(_type => [FieldError], { nullable: true }) 
    errors?: FieldError[]
    // mang trong typescript
}
