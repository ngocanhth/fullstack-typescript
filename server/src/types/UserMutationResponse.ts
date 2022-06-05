import { User } from "../entities/User";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({ implements: IMutationResponse })

export class UserMutationResponse implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    user?: User

    // mang trong typegrapql, voi nhung dang dac biet thi @Field khong the tu convert sang type cua graphql dc ma phai chi dinh ro cho no tra ve loai gi
    @Field(_type => [FieldError], { nullable: true }) 
    errors?: FieldError[]
    // mang trong typescript
}
