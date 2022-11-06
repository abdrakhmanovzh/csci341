import express from "express";
import { Login, Logout } from "../controllers/Users.js";
import { getUsers, addUser, updateUser, deleteUser } from "../controllers/Admin.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyAdmin } from "../middleware/VerifyAdmin.js";
 
const router = express.Router();

//auth routes
router.post('/login', Login);
router.delete('/logout', Logout);
router.get('/token', refreshToken);

//admin routes
router.get('/users', verifyAdmin, getUsers);
router.post('/users', addUser);
router.put('/users', updateUser);
router.delete('/users/:id', deleteUser);



export default router;