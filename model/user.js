const {DataTypes,Model}=require('sequelize')
const {sequelize}=require('../connection/connection')

class Users extends Model{};

Users.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    first_name:{
        type:DataTypes.STRING(30),
        defaultValue:""
    },
    last_name:{
        type:DataTypes.STRING(30),
        defaultValue:""
        
    },
    email:{
        type:DataTypes.STRING(40)
    },
    password:{
        type:DataTypes.STRING
    },
    // role_id:{
    //     type:DataTypes.INTEGER
    // }
    // otp:{
    //     type:DataTypes.INTEGER
    // }
},
{
    sequelize,
    modelName: 'Users'
})

module.exports.Users=sequelize.models.Users;