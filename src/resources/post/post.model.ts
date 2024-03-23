import { Schema, model } from 'mongoose';
import Post from '@/resources/post/post.interface';

const postSchema = new Schema<Post>({
    id: { type: Number, unique: true},
    product: { type: String, unique: true, index: true, required: true },
    productPrice: { type: Number, required: true }
}, { timestamps: true });

// Pre-save middleware to auto-increment id
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
