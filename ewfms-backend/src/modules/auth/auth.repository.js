import db from '../../config/db.js'

class AuthRepository {
    static async findUserByEmail(email) {
        return db.query('SELECT  * , u.name as user_name , r.name as role_name FROM user u INNER JOIN roles r on u.role_id = r.role_id  WHERE email = ?', [email]);
    }
}

export default AuthRepository;

