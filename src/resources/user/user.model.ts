import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';

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

// Debugging console statement in the pre-save hook
UserSchema.pre<User>('save', async function (next) {
    console.log('Before saving user:', this);
    
    if (!this.isModified('password')) {
        console.log('Password not modified, skipping hash generation');
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    console.log('After hash generation:', this);
    next();
});

// Debugging console statement in the isValidPassword method
UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    console.log('Validating password:', password);
    console.log('Stored hash:', this.password);
    
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
