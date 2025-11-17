import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

    // Public routes
    const publicRoutes = [
        "/users/login",
        "/users/register"
    ];

    if (publicRoutes.includes(req.path)) {
        return next();
    }

    // Get Authorization header
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    // Extract token
    const token = authHeader.replace("Bearer ", "");

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach user data to request
        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default auth;