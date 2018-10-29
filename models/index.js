/**
 * Created by cuckoo on 2017/5/25.
 */
const fs= require('fs');
const path= require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const db= {};

const DbConnection =require('../common/configs/DBconnection');
const sequelize= new DbConnection().sequelize;

//Load all the models
fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model; //使db.modelName 指向一个model
    });

//Export the db Object
db.sequelize = sequelize;    //提供模块链接
db.Sequelize = Sequelize;   //提供方法

module.exports = db;

