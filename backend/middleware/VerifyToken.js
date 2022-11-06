import jwt from "jsonwebtoken";
 
export const verifyToken = (req, res, next) => {
    const token = req.cookies.refreshToken;
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}