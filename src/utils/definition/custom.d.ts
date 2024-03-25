import User from '@/resources/user/user.interface';

//this make the user Request global
declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}
