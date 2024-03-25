import PostModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';

//this is where we call our mongodb queries that works togethr with our interface and model
class PostService {
    private post = PostModel;

   
    //.create does put an entry to our db to create new product
    public async create(product: string, productPrice: number): Promise<Post> {
        try {
            const post = await this.post.create({  product, productPrice });
            return post;
        } catch (error) {
            throw new Error('Unable to create Product');
        }
    }

    //.find get all the entries in our db
    public async getAllProducts(): Promise<Post[]> {
        try {
            const posts = await this.post.find();
            return posts;
        } catch (error) {
            throw new Error('Unable to fetch posts');
        }
    }

    //.findOneAndUpdate helps us to find the latest one with the id nos and delete it
    public async update(id: number, product: string, productPrice: number): Promise<Post | null> {
        try {
            const updatedPost = await this.post.findOneAndUpdate({ id: id }, { product, productPrice }, { new: true });
            return updatedPost;
        } catch (error) {
            throw new Error('Unable to update post');
        }
    }

    //.findOneAndDelete works the same way post.findOneAndUpdate works, all this queries are provided by mongodb and they help to make accessing each collection easier for us
    public async delete(id: number): Promise<void> {
        try {
            await this.post.findOneAndDelete( {id: id} );
        } catch (error) {
            throw new Error('Unable to delete post');
        }
    }
}

export default PostService;
