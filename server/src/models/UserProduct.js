import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./users.js";
import { ProductModel } from "./products.js";

export const UserProductModel = sequelize.define('user_products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: ProductModel,
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, { timestamps: true });


  UserModel.belongsToMany(ProductModel, { through: UserProductModel });
  ProductModel.belongsToMany(UserModel, { through: UserProductModel });