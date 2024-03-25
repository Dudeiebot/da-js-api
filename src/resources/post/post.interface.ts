import { Document, Schema, Types } from 'mongoose';

 //defines the structure of documents that will be stored in the MongoDB collection associated with the Post model in the Mongoose schema and also do the type checking for us
export default interface Post extends Document {
  id: Number;
  product: string;
  productPrice: Number;
}
