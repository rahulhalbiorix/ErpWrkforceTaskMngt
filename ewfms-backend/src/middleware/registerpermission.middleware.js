export const allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role_name)) {
            return res.status(403).json({ error: "Access denied" });
        }
        next();
    };
};
