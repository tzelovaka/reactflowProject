const sequelize = require('../db')
const storylin = require('./link')
const {DataTypes} = require('sequelize');

const storybl = sequelize.define ('storybl', {
    id: {type: DataTypes.BIGINT, primaryKey: true, unique: true, autoIncrement: true},
    linid: {type: DataTypes.INTEGER},
    bl: {type: DataTypes.TEXT},
    pic: {type: DataTypes.TEXT, allowNull: true, defaultValue: null},
    authId: {type: DataTypes.BIGINT, unique: false},
    release: {type: DataTypes.BOOLEAN, defaultValue: false}
})

module.exports = storybl;