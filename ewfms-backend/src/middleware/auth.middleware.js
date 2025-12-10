import jwt from "jsonwebtoken";
import UsersRepository from "../modules/user/users.repository.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ error: "Token missing" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const [rows] = await UsersRepository.findUserById(decoded.user_id);
        const user = rows[0];

        if (!user) return res.status(401).json({ error: "User not found" });

        req.user = user; // user now includes role_name

        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};

