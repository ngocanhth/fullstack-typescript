import { Arg, Mutation, Resolver } from "type-graphql";
import { Blog } from "../entities/Blog";
import { BlogMutationResponse } from "../types/BlogMutationResponse";
import { CreateBlogInput } from "../types/CreateBlogInput";

@Resolver()


export class blogResolver {
    @Mutation(_returns => BlogMutationResponse)

    async createBlog (
        @Arg('createBlogInput') { blogtitle, blogcontent}: CreateBlogInput): Promise<BlogMutationResponse> {
            try {
                const newBlog = Blog.create({
                    blogtitle,
                    blogcontent
                })
    
                await newBlog.save()
    
                return {
                    code: 200,
                    success: true,
                    message: 'Post created successfully',
                    blog: newBlog
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