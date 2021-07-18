module.exports=(sequelize, DataTypes)=>{

    const Users=sequelize.define('Users',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
        
        },
        email:{
            type:DataTypes.STRING,
        },
        
    },{
        timestamps:false
    })
    return Users;

}
