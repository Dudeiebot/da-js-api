import { Schema } from 'mongoose';

//handles the schema in our mongodb for when our token token will expire with the required userId
interface Token extends Object {
    id: Schema.Types.ObjectId;
    expiresIn: number;
}

export default Token;
