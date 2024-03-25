import { Schema, model } from 'mongoose';
import Post from '@/resources/post/post.interface';


//our schema for the postProduct in mongodb is being defined here
//unique is from mongodb and it is being added here to avoid duplicate entry creation from users
const postSchema = new Schema<Post>({
    id: { type: Number, unique: true},
    product: { type: String, unique: true, index: true, required: true },
    productPrice: { type: Number, required: true }
}, { timestamps: true });


//so the thing about mongodb is that it creates each entry in our collection(mongodb tables)
//with a objectId (the objectId is a set of strings), this objectId can be hard to get our delete and update works
//so i implemented a id that is unique also and increments upon creation of new entry
//this does the + and - for us
postSchema.pre<Post>('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const latestPost = await this.model('Post').findOne({}, {}, { sort: { id: -1 } });
        if (latestPost) {
            this.id = latestPost.id + 1;
        } else {
            this.id = 1;
        }
        next();
    } catch (error: any) {
        next(error);
    }
});

export default model<Post>('Post', postSchema);
