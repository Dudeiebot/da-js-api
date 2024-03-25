import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';

//this is where we call our mongodb queries that works togethr with our interface and model
class UserService {
    private user = UserModel;

    //.create does put an entry to our db to register new user
    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            console.log('Registering new user:', { name, email, role });

            const user = await this.user.create({
                name,
                email,
                password,
                role,
            });

            console.log('User created:', user);

            const accessToken = token.createToken(user);

            console.log('Access token generated:', accessToken);

            return accessToken;
        } catch (error: any) {
            console.error('Error while registering user:', error.message);
            throw new Error(error.message);
        }
    }

    //so here we are performing some check in and validity
    //we are cheking if the user email is registered with us (using .findOne)
    //remember the validity password checking in user.model, we check for it also here
    //and most especially we are handling the errors well cause we want to know what is the main issue when we encounter one
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            console.log('Logging in user with email:', email);

            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            console.log('User found:', user);

            if (await user.isValidPassword(password)) {
                console.log('Password is valid');
                return token.createToken(user);
            } else {
                console.log('Wrong credentials given');
                throw new Error('Wrong credentials given');
            }
        } catch (error: any) {
            console.error('Error while logging in user:', error.message);
            throw new Error('Unable to create user');
        }
    }
}

export default UserService;
