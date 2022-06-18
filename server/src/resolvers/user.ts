import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Resolver  } from "type-graphql";
import argon2 from 'argon2'
import { UserMutationResponse } from "../types/UserMutationResponse";
import { RegisterInput } from "../types/RegisterInput";
import { validateRegisterInput } from "../utils/validateRegisterInput";
import { LoginInput } from "../types/LoginInput";
import { Context } from "../types/Context";
import { COOKIE_NAME } from "../constants";


@Resolver()

export class userResolver {
    @Mutation(_returns => UserMutationResponse) // co valite roi ko can nua  {nullable: true}
     //Arg la 1 decorator bieens cac fiel thanh variable input trng graphql
    async register(
        @Arg('registerInput') registerInput: RegisterInput,
        @Ctx() {req}: Context
    ): Promise<UserMutationResponse> {

        const validateRegisterInputErrors = validateRegisterInput(registerInput)
		if (validateRegisterInputErrors !== null)
			return { code: 400, success: false, ...validateRegisterInputErrors }

        try {
            const { username, email, password } = registerInput
             const existingUser = await User.findOne({ 
                where: [{ username }, { email }]
              })
    
              if (existingUser) 
              return {
                    code: 400,
                    success: false,
                    message: 'Dupplicate User or Email',
                    errors: [
                        {
                            field: existingUser.username === username ? 'username' : 'email',
                            message: `${
								existingUser.username === username ? 'Username' : 'Email'
							} already taken`
                        }
                    ]
                }
    
            const hashPassword = await argon2.hash(password)

            console.log(hashPassword);

            const newUser = User.create({
                username,
                password: hashPassword,
                email
            })

            await User.save(newUser)
            
            req.session.userId = newUser.id

            return {
                code: 200,
                success: true,
                message: 'User registration successful',
                user: newUser
            }
            
        } catch (error) {
            console.log(error)
            return {
                code: 400,
                success: false,
                message: `Internal server error ${error.message}`
            }
        }
    }


	@Mutation(_return => UserMutationResponse)
	async login(
		@Arg('loginInput') { usernameOrEmail, password }: LoginInput,
		@Ctx() { req }: Context
	): Promise<UserMutationResponse> {
		try {
            const existingUser = await User.findOne(
				usernameOrEmail.includes('@')
					? { where: [{ email: usernameOrEmail }]}
                    : { where: [{ username: usernameOrEmail }]}
			)

			if (!existingUser)
				return {
					code: 400,
					success: false,
					message: 'User not found',
					errors: [
						{ field: 'usernameOrEmail', message: 'Username or email incorrect' }
					]
				}

			const passwordValid = await argon2.verify(existingUser.password, password)

			if (!passwordValid)
				return {
					code: 400,
					success: false,
					message: 'Wrong password',
					errors: [{ field: 'password', message: 'Wrong password' }]
				}

			// Create session and return cookie
			req.session.userId = existingUser.id

			return {
				code: 200,
				success: true,
				message: 'Logged in successfully',
				user: existingUser
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

    @Mutation(_return => Boolean)
	logout(@Ctx() { req, res }: Context): Promise<boolean> {
		return new Promise((resolve, _reject) => {
			res.clearCookie(COOKIE_NAME)

			req.session.destroy(error => {
				if (error) {
					console.log('DESTROYING SESSION ERROR', error) // phai mo localhost:4000/graphql setting thay tham so credential la include thi moi thay kt qua trong console log
					resolve(false)
				}
				resolve(true)
			})
		})
	}
}