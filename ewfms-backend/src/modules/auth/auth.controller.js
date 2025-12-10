import AuthService from "./auth.service.js";

class AuthController {

    static async loginUser(req, res) {
        try {
            const payload = req.body;
            const result = await AuthService.loginUser(payload);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default AuthController;
