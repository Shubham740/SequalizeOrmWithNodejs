const Strings = require('../../utils/Strings').Strings
const getErrorModel = require('../../utils/Utils').getErrorModel
const getSuccessModel = require('../../utils/Utils').getSuccessModel
const getErrorResponse = require('../../utils/Utils').getErrorResponse

var db = require('../../database').db;


var UserDataProvider = function(){
    
    this.addUser=function addUser(callback,body){
        console.log("body=>>>>", body)

        let query ="insert into users(name,email) VALUES(?,?)";

        db.sequelize.query(query,{
            type:db.sequelize.QueryTypes.INSERT,
            replacements:[body.name, body.email]

        }).then(data=>{
            let finalQuery = "select * from users where id="+data[0];
                db.sequelize.query(finalQuery).then(finalData=>{
                    let successModel = getSuccessModel();
                    successModel.message=Strings.RECORD_INSERTED_SUCCESSFULLY;
                    successModel.data=finalData[0][0];
                    callback(null,successModel)  
                },
                reject=>{
                callback(getErrorResponse(reject,Strings.PLEASE_TRY_AGAIN), null)
                }
                ).catch(error=>{
            callback(getErrorResponse(error,Strings.PLEASE_TRY_AGAIN), null)
                })

        },
        reject=>{
            callback(getErrorResponse(reject,Strings.PLEASE_TRY_AGAIN), null)
        }
        ).catch(error=>{
            callback(getErrorResponse(error,Strings.PLEASE_TRY_AGAIN), null)

        })

    }
    this.getAllUsers=function(callback){

        let query = "select * from users";
        db.sequelize.query(query).then(data=>{
                let successModel= getSuccessModel();
                successModel.data= data[0];
                callback(null,successModel)
        },reject=>{
            callback(getErrorResponse(reject,Strings.PLEASE_TRY_AGAIN), null)

        }).catch(error=>{
            callback(getErrorResponse(error,Strings.PLEASE_TRY_AGAIN), null)

        })

    }

}


exports.UserDataProvider=UserDataProvider;

