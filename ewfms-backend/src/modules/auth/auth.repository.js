import db from '../../config/db.js'

class AuthRepository {
    static async findUserByEmail(email) {
        return db.query('SELECT * FROM user WHERE email = ?', [email]);
    }
}

export default AuthRepository;

