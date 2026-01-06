import db from '../../config/db.js'
import { v4 as UUID } from 'uuid';

class UsersRepository {
    static async finadlAllUsers() {
        return db.query('SELECT u.* , r.name AS role_name FROM  user u LEFT JOIN roles  r ON u.role_id = r.role_id;');
    }

   static async findUserById(id) {
    return db.query(
        `SELECT 
            u.*, 
            r.name AS role_name
         FROM user u
         LEFT JOIN roles r ON u.role_id = r.role_id
         WHERE u.user_id = ?`,
        [id]
    );
}


    static async createUser(userData) {
        const { organization_id, role_id, name , email, password_hash , status } = userData;
        return db.query('INSERT INTO user (user_id, organization_id, role_id, name, email, password_hash, status ) VALUES (? , ? , ? , ? , ? , ? , ?)', [UUID() , organization_id, role_id, name , email, password_hash , status ]);
    }

   static async updateUser(userId, userData) {
       const fields = [];
       const values = [];
         for (const [key, value] of Object.entries(userData)) {
            if (value !== undefined) {
                fields.push(`${key} = ?`);
                values.push(value);
            }
         }
         values.push(userId);
         const query = `UPDATE user SET ${fields.join(', ')} WHERE user_id = ?`;
         return db.query(query, values);
   }


}

export default UsersRepository;