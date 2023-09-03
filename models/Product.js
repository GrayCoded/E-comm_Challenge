// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
const { Model, DataTypes, DECIMAL } = require("sequelize");

class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Product_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    Inventory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
