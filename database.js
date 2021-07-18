const db = require('./connection').db;


db.users = require('./model/users')(db.sequelize,db.Sequelize);
db.customer = require('./model/customer')(db.sequelize,db.Sequelize);

db.sequelize.sync().then(result=>{
    console.log('db has been synced');
}).catch(error=>{
    console.log("error=>>>>".error)
})



exports.db=db;
