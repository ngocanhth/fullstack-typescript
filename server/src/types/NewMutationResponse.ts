import { Field, ObjectType } from "type-graphql";
import { New } from "../entities/New";
import { FieldError } from "./FieldError";
import { IMutationResponse } from "./MutationResponse";

@ObjectType({ implements: IMutationResponse })

export class NewMutationResponse implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({ nullable: true })
    new?: New

    // mang trong typegrapql, voi nhung dang dac biet thi @Field khong the tu convert sang type cua graphql dc ma phai chi dinh ro cho no tra ve loai gi
    @Field(_type => [FieldError], { nullable: true }) 
    errors?: FieldError[]
    // mang trong typescript
}
