import { Document } from 'mongoose';


 //defines the structure of documents that will be stored in the MongoDB collection associated with the Post model in the Mongoose schema and also do the type checking for us
export default interface User extends Document {
    email: string;
    name: string;
    password: string;
    role: string;

    isValidPassword(password: string): Promise<Error | boolean>;
}
