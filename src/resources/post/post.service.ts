import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

class PostService {
    private post = PostModel;

    /**
     * Create a new post
     */
    public async create(product: string, productPrice: number): Promise<Post> {
        try {
            const post = await this.post.create({  product, productPrice });
            return post;
        } catch (error) {
            throw new Error('Unable to create Product');
        }
    }

    /**
     * Get all posts
     */
    public async getAllProducts(): Promise<Post[]> {
        try {
            const posts = await this.post.find();
            return posts;
        } catch (error) {
            throw new Error('Unable to fetch posts');
        }
    }

    /**
     * Update a post by its ID
     */
    public async update(id: number, product: string, productPrice: number): Promise<Post | null> {
        try {
            const updatedPost = await this.post.findOneAndUpdate({ id: id }, { product, productPrice }, { new: true });
            return updatedPost;
        } catch (error) {
            throw new Error('Unable to update post');
        }
    }

    /**
     * Delete a post by its ID
     */
    public async delete(id: number): Promise<void> {
        try {
            await this.post.findOneAndDelete( {id: id} );
        } catch (error) {
            throw new Error('Unable to delete post');
        }
    }
}

export default PostService;
