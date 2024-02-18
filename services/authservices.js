const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config()
const SECRET_KEY=process.env.SECRET_KEY


module.exports.generateAuthToken = (userexist) => {
    let tokenSession = Math.floor((Date.now() + 1 * 6 * 60 * 60 * 1000)/ 1000)
    let tokenPlayload = {
        user_id: userexist.id,
        role_id: userexist.role_id,
        expiry: tokenSession
    }

    return jwt.sign(tokenPlayload, process.env.SECRET_KEY);
}


const decoded = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Authentication token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        req.decodedToken = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports.validateToken = async (req, res, next) => {
    try {
        const decodedToken = await decoded(req, res, next);

        if (decodedToken) {
            const expiry = decodedToken.exp * 1000; // Convert seconds to milliseconds

            if (Date.now() > expiry) {
                return res.status(401).json({ message: "Token expired" });
            } else {
                req.decodedToken = decodedToken;
                next();
                return res.status(200).json({ message: "Token valid", decodedToken: decodedToken });
            }
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (err) {
        console.error("Error decoding token:", err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};