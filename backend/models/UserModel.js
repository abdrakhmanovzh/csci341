import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;

export const Users = db.define('users', {
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false
    },
    refresh_token: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName:true
});

export const Doctors = db.define('doctors',{
    full_name:{
        type: DataTypes.STRING
    },
    birth_date:{
        type: DataTypes.DATEONLY
    },
    iin:{
        type: DataTypes.INTEGER
    },
    contact_number:{
        type: DataTypes.INTEGER
    },
    dep_id:{
        type: DataTypes.INTEGER
    },
    spec_id:{
        type: DataTypes.INTEGER
    },
    exp:{
        type: DataTypes.INTEGER
    },
    img:{
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.INTEGER
    },
    degree:{
        type: DataTypes.STRING
    },
    rating:{
        type: DataTypes.INTEGER
    },
    address:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});

export const Patients = db.define('patients',{
    full_name:{
        type: DataTypes.STRING
    },
    birth_date:{
        type: DataTypes.DATEONLY
    },
    iin:{
        type: DataTypes.INTEGER
    },
    contact_number:{
        type: DataTypes.INTEGER
    },
    emer_contact_number:{
        type: DataTypes.INTEGER
    },
    blood_group:{
        type: DataTypes.STRING
    },
    marital_status:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 