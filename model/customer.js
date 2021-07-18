module.exports=(sequelize, DataTypes)=>{

const Customer =sequelize.define("Customer",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
  
},{
    timestamps:false
})
    return Customer;

}
