const sequelize = require('../db')
//const storylin = require('./link')
const {DataTypes} = require('sequelize');

const storybl = sequelize.define ('storybl', {
    id: {type: DataTypes.BIGINT, primaryKey: true, unique: true, autoIncrement: true},
    img: {type: DataTypes.TEXT, allowNull: true, defaultValue: null},
    text: {type: DataTypes.TEXT},
    storyId: {type: DataTypes.BIGINT, unique: false},
    authId: {type: DataTypes.BIGINT, unique: false},
    release: {type: DataTypes.BOOLEAN, defaultValue: false}
})

module.exports = storybl;