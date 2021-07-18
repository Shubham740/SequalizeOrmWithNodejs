const {Sequelize,DataTypes} = require('sequelize');


const sequelize= new Sequelize('sample','root','root',{
    host:'localhost',
    port:3307,
    dialect:'mysql',
    pool:{max:5,min:0, idle:10000},
   
})


sequelize.authenticate().then(()=>{
    console.log('connected')
}).catch(err=>{
    console.log("error=>>>>",err)
})


const db ={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;

exports.db=db;


