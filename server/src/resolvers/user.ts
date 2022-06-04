import { User } from "../entities/User";
import { Arg, Mutation, Query, Resolver  } from "type-graphql";
import argon2 from 'argon2'


@Resolver()

export class userResolver {
    @Mutation(_returns => User, {nullable: true})
     //Arg la 1 decorator bieens cac fiel thanh variable input trng graphql
 async register(
        @Arg('email') email: string,
        @Arg('username') username: string,
        @Arg('password')  password: string
    ) {

        try {
             const existingUser = await User.findOne({ 
                where: [{ username }, { email }]
              })
    
              if (existingUser) return
    
            const hashPassword = await argon2.hash(password)

            console.log(hashPassword);

            const newUser = User.create({
                username,
                password: hashPassword,
                email
            })

            return await User.save(newUser)
            
        } catch (error) {
            console.log(error)
            return null
        }


    }
}