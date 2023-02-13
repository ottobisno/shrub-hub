const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant extends Model {}

// Initializing the Plant model
Plant.init(
    {
       id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
       },
       name: {
        type: DataTypes.STRING,
        allowNull: false
       },
       description: {
        type: DataTypes.TEXT,
        allowNull: false
       },
       date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
       },
       user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
       }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'plant',
    }
);

module.exports = Plant;