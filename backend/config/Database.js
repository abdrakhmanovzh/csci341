import { Sequelize } from "sequelize";

const db = new Sequelize('csci341', 'root', '5212', {
    host: "localhost",
    dialect: "mysql"
});

export default db;