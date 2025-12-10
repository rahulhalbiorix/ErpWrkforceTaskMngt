import UsersRepository from "./users.repository.js";

class UsersService {
    static async getAllUsers() {
        const [users] = await UsersRepository.finadlAllUsers();
        return users;
    }

    static async getUserById(id) {
        const [user] = await UsersRepository.findUserById(id);
        return user;
    }

    static async registerUser( userData) {
       
        if (!userData.organization_id || !userData.role_id || !userData.name || !userData.email || !userData.password_hash || !userData.status) {
            throw new Error('Missing required user data fields');
        }

        return UsersRepository.createUser(userData);
    }

}

export default UsersService;