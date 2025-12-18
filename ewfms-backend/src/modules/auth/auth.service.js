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
                role: user.role_name
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
          
       return {
          success: true,
          message: 'Login successful',
          data:{
            token,
            user:{
                userId: user.user_id,
                userName: user.user_name,
                email: user.email,
                roleName: user.role_name,
                organizationId: user.organization_id,
                status:user.status
            }
          }       
       }
    }
}

export default AuthService;