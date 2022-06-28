import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Post } from "../entities/Post";
import { checkAuth } from "../middleware/checkAuth";
import { Context } from "../types/Context";
import { CreatePostInput } from "../types/CreatePostInput";
import { PostMutationResponse } from "../types/PostMutationResponse";
import { UpdatePostInput } from "../types/UpdatePostInput";

@Resolver()


export class postResolver {
    @Mutation(_returns => PostMutationResponse)
    @UseMiddleware(checkAuth)

    async createPost(
        @Arg('createPostInput') { title, text }: CreatePostInput,
        @Ctx() { req }: Context
    ): Promise<PostMutationResponse> {
        try {

            console.log("Request Sesion:", req.session)

            const newPost = Post.create({
                title,
                text,
                userId: req.session.userId
            })

            await newPost.save()

            return {
                code: 200,
                success: true,
                message: 'Post created successfully',
                post: newPost
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

    @Query(_return => [Post], { nullable: true })
    async posts(): Promise<Post[] | null> {
        try {
            return await Post.find()
        } catch (error) {
            console.log(error)
            return null
        }
    }

    @Query(_return => Post, { nullable: true })
    async post(@Arg('id', _type => ID) id: number): Promise<Post | undefined | null> {
        try {
            const post = await Post.findOne(
                { where: { id } }
            )
            return post
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    @Mutation(_return => PostMutationResponse)
    @UseMiddleware(checkAuth)

    async updatePost(
        @Arg('UpdatePostInput') UpdatePostInput: UpdatePostInput
    ): Promise<PostMutationResponse> {
        try {
            const { id, title, text } = UpdatePostInput

            const existingPost = await Post.findOne(
                { where: { id } }
            )

            if (!existingPost) {
                return {
                    code: 400,
                    success: false,
                    message: "Post not found"
                }
            }

            existingPost.title = title
            existingPost.text = text

            // const updatePost = {
            //     ...UpdatePostInput
            // }

            // await Post.save(updatePost)

            await existingPost.save()

            return {
                code: 200,
                success: true,
                message: 'Post updated successfully',
                post: existingPost
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

    @Mutation(_return => PostMutationResponse)
    @UseMiddleware(checkAuth)
    async deletePost(
        @Arg('id', _type => ID) id: number,
        // @Ctx() { req }: Context
    ): Promise<PostMutationResponse> {
        // Thoi gian song cua cookie da het thi se ko con thay userId trong req.session dc gui tu user len server nua
        // console.log("Request Sesion", req.session)
        // if (!req.session.userId) {
        //    throw new AuthenticationError(
        //        'Not Authenticated to perform GraphQL operation'
        //    )
        // }

        const existingPost = await Post.findOne(
            { where: { id } }
        )

        if (!existingPost) {
            return {
                code: 400,
                success: false,
                message: "Post not existing Or Deleted"
            }
        }

        Post.delete({ id })

        return {
            code: 200,
            success: true,
            message: 'Post deleted successfully',
            post: existingPost
        }
    }
}