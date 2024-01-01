import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const ProductModel = sequelize.define('products', {
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
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }, 
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }, 
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 

{ timestamps: true }

);