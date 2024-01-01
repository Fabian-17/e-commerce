import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    type_user: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 

{ timestamps: true }

);