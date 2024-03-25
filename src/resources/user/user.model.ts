import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';

//our schema for the User in mongodb is being defined here
//unique is from mongodb and it is being added here to avoid duplicate entry creation from users
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

UserSchema.pre<User>('save', async function (next) {
    // console.log('Before saving user:', this);
    
    if (!this.isModified('password')) {
        // console.log('Password not modified, skipping hash generation');
        return next();
    }

    //we are using bcrypt to hash our password and we are telling bcrypt to hash the password in 10 rounds
    const hashed = await bcrypt.hash(this.password, 10);

    //we save our newly hashed password
    this.password = hashed;

    // console.log('After hash generation:', this);
    next();
});

//check for validity of the password, when next the user login
UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    // console.log('Validating password:', password);
    // console.log('Stored hash:', this.password);
    
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
