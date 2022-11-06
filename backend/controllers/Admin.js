import { Users} from "../models/UserModel.js";

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id', 'password', 'role','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const addUser = async(req, res) => {
    try{
        const newUser = await Users.create({email: req.body.email, password: req.body.password, role: req.body.role});
        res.json(newUser);
    } catch (error) {
        res.status(404).json({msg: "Cannot create user"});
    }
}

export const updateUser = async(req,res) => {
    try{
        await Users.update({email: req.body.email, password: req.body.password, role: req.body.role}, {
            where: {
                id: req.body.id
            }
        });
    } catch (error) {
        res.status(404).json({msg: "Cannot udpate user"});
    }
}

export const deleteUser = async(req,res) => {
    try{
        await Users.destroy({
            where: {
                id: req.params.id
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({msg: "Cannot delete user"});
    }
}