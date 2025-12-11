export const allowOrg = () => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        // Only Super Admin can access organization CRUD routes
        if (req.user.role_name !== "Super-Admin") {
            return res.status(403).json({
                message: "Forbidden: Only Super Admin can access Organization operations"
            });
        }

        next(); // Allow request to continue
    };
};
