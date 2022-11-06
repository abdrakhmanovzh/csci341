import jwt from "jsonwebtoken";
 
export const verifyAdmin = (req, res, next) => {
    const authHeader =  req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token){
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err);
                return res.status(401).json({message: "Not Authorized"});
            } else {
                next();
            }
        });
    } else {
        return res.status(401).json({msg: "No token"});
    }
}