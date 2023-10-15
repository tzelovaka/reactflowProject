const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const storylin = sequelize.define ('storylin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    fId: {type: DataTypes.BIGINT},
    smile: {type: DataTypes.STRING(1), defaultValue: '👆'},
    text: {type: DataTypes.STRING},
    storyId: {type: DataTypes.BIGINT, unique: false},
    source: {type: DataTypes.INTEGER, unique: false},
    target: {type: DataTypes.INTEGER, unique: false},
    authId: {type: DataTypes.BIGINT, unique: false},
    release: {type: DataTypes.BOOLEAN, defaultValue: false}
})

module.exports = storylin;