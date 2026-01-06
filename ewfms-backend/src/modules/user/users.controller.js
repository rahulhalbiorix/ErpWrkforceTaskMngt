import UsersService from "./users.service.js";

class UsersController {
    static async getAllUsers(req, res) {
        try {
            const users = await UsersService.getAllUsers();
            res.status(200).json({status: 'success', message: 'Users fetched successfully', data: users});
        } catch (error) {
            res.status(500).json({error: error.message });
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

   static async updateUser(req, res) {
       try {
           const userId = req.params.id;
           const userData = req.body;
           const result = await UsersService.updateUser(userId, userData);
           res.status(200).json({status: 'success',message: 'User updated successfully' });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }

    }
  
   static async toggleUserStatus(req, res) {
         try {
                const userId = req.params.id;
                const user = await UsersService.getUserById(userId);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }       
                const newStatus = user.status === 'active' ? 'inactive' : 'active';
                await UsersService.updateUser(userId, { status: newStatus });
                res.status(200).json({ message: `User status updated to ${newStatus}` });
         } catch (error) {
             res.status(500).json({ error: error.message });
         }
   }

}
export default UsersController;


