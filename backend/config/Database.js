import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize('csci341', 'root', process.env.DBPASS, {
    host: "localhost",
    dialect: "mysql"
});

export default db;