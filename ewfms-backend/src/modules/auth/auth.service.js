import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AuthRepository from './auth.repository.js';

class AuthService {

    static async loginUser(payload) {
        const { email, password } = payload;

        const [users] = await AuthRepository.findUserByEmail(email);

        if (users.length === 0) {
            throw new Error('Invalid email or password');
        }

        const user = users[0];

        if (password !== user.password_hash) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                role_id: user.role_id
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
          
       return {
         message: "Login successful",
        token,
        user: {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            role_id: user.role_id
        }
       }
    }
}

export default AuthService;