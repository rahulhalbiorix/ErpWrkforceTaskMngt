import UsersService from "./users.service.js";

class UsersController {
    static async getAllUsers(req, res) {
        try {
            const users = await UsersService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUserById(req, res) {

     try {
          const userId = req.params.id;
          const user = await UsersService.getUserById(userId);
            res.status(200).json(user);   
     } catch (error) {
         res.status(500).json({ error: error.message });   
     }

    }    


    static async registerUser(req, res) {
        try {
            const userData = req.body;
            const result = await UsersService.registerUser(userData);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UsersController;


