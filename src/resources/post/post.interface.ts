import { Document, Schema, Types } from 'mongoose';

export default interface Post extends Document {
  id: Number;
  product: string;
  productPrice: Number;
}
