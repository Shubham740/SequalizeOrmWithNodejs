const Strings = require('../../utils/Strings').Strings
const getErrorModel = require('../../utils/Utils').getErrorModel
const getSuccessModel = require('../../utils/Utils').getSuccessModel
const getErrorResponse = require('../../utils/Utils').getErrorResponse

var db = require('../../database').db;



var CustomerDataProvider = function(){
    const Customer = db.customer;


    this.addCustomer=function(callback,body){        
    
        console.log('body =>>>>',body)
        // callback(null, getSuccessModel())
        
        Customer.create({name:body.customerName,email:body.email})
        .then(data=>{
            let successModel = getSuccessModel();
            successModel.message= Strings.RECORD_INSERTED_SUCCESSFULLY;
            successModel.data=data;
            console.log('successModel =>>>',"record inserted")
            callback(null,successModel)
        }).catch(err=>{
            callback(getErrorResponse(err,Strings.PLEASE_TRY_AGAIN), null)
        })
    }

    this.updateCustomer = function(callback, body){
        Customer.update({name:body.customerName,email:body.email},{where:{id:body.id}}).then(data=>{
          
            Customer.findByPk(body.id).then(finalResponse=>{
                let successModel = getSuccessModel();
                successModel.data=finalResponse;
                successModel.message=Strings.RECORD_UPDATED_SUCCESSFULLY;
                callback(null, successModel);
            },
                reject=>{
            callback(getErrorResponse(reject,Strings.PLEASE_TRY_AGAIN), null)
                }
            ).catch(error=>{
            callback(getErrorResponse(error,Strings.PLEASE_TRY_AGAIN), null)
            })

        },reject=>{
        callback(getErrorResponse(reject,Strings.PLEASE_TRY_AGAIN), null)

        }).catch(error=>{
        callback(getErrorResponse(error,Strings.PLEASE_TRY_AGAIN), null)

        })
        
    }
    this.getCustomer = function(callback, queryParam){
            console.log('query param =>>>>>', queryParam)
            Customer.findByPk(queryParam.id).then(data=>{
              let successModel = getSuccessModel();
              successModel.data= data;
              successModel.message=Strings.RECORD_FETCH_SUCCESSFULLY;
              callback(null,successModel)
            }).catch(error=>{
                callback(getErrorResponse(error,Strings.PLEASE_TRY_AGAIN), null)
            })
       
    }
    this.getAllCustomer = function(callback){
       
        Customer.findAll().then(data=>{
            let successModel = getSuccessModel();
            successModel.message= Strings.RECORD_FETCH_SUCCESSFULLY;
            successModel.data= data;
            callback(null,successModel)
        }).catch(error=>{
            callback(getErrorResponse(error,Strings.PLEASE_TRY_AGAIN), null)
        })

    }

    this.deleteAllCustomer = function(callback){
       
        Customer.destroy({where:{}}).then(data=>{
            let successModel = getSuccessModel();
            successModel.message= Strings.ALL_RECORD_DELETED_SUCCESSFULLY;
            successModel.data= null;
            callback(null,successModel)
        }).catch(error=>{
            callback(getErrorResponse(error,Strings.PLEASE_TRY_AGAIN), null)
        })

    }



    this.deleteCustomer= function(callback, queryParam){
        console.log('query param =>>>>>',queryParam.id)
    

        Customer.destroy({
            where: { id: queryParam.id }
          })
            .then(num => {
              if (num == 1) {
                  let successModel = getSuccessModel();
                  successModel.message=Strings.RECORD_DELETED_SUCCESSFULLY;
                  callback(null, successModel)
              } else {
                  let errorModel = getErrorModel();
                  errorModel.message= Strings.RECORD_DOES_NOT_EXIST
                callback(null,errorModel)
              }
            })
            .catch(err => {
                callback(getErrorResponse(err,Strings.RECORD_DOES_NOT_EXIST), null)
         
            });
        };


}


exports.CustomerDataProvider=CustomerDataProvider;