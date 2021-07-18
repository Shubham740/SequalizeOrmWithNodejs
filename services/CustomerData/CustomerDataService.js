const {body,validationResult, query} =  require('express-validator')
const {Routes}  = require('../../api-routes/Routes');
const {auth} = require('../../middleware/auth')
const Strings = require('../../utils/Strings').Strings
const getErrorModel = require('../../utils/Utils').getErrorModel
const getSuccessModel = require('../../utils/Utils').getSuccessModel

var CustomerDataProvider =require('./CustomerDataProvider').CustomerDataProvider;

var customerDataProvider = new CustomerDataProvider();


var CustomerDataService= function(app){

    app.get(Routes.GET_CUSTOMER_BY_ID,auth,
        query(['id']).exists(),
        (req,res)=>{
            const errors= validationResult(req);

            if(!errors.isEmpty()){
                    return res.status(400).json(getErrorModel(errors.array()))
            }else{
               customerDataProvider.getCustomer(function(error,customerModel){
                    if(error!=null){
                        res.send(error);
                    }else{
                        res.send(customerModel);
                    }
               },req.query)
            }
        
    })
    app.get(Routes.GET_ALL_CUSTOMER,auth,
   
        (req,res)=>{
          
               customerDataProvider.getAllCustomer(function(error,customerModel){
                if(error!=null){
                    res.send(error)
                }else{
                    res.send(customerModel)
                }
               })
        
    })



    app.delete(Routes.DELETE_CUSTOMER,auth,
        query(['id']).exists(),
        (req,res)=>{
            const errors= validationResult(req); 
            if(!errors.isEmpty()){
                return res.status(400).json(getErrorModel(errors.array()))
        }else{
           customerDataProvider.deleteCustomer(function(error,customerModel){
                if(error!=null){
                    console.log(error)
                    res.send(error)
                }else{
                        res.send(customerModel);
                }
           },req.query)
        }
        
    })

    app.delete(Routes.DELETE_ALL_CUSTOMER,auth,
   
        (req,res)=>{
          
               customerDataProvider.deleteAllCustomer(function(error,customerModel){
                if(error!=null){
                    res.send(error)
                }else{
                    res.send(customerModel)
                }
               })
        
    })


    app.post(Routes.ADD_CUSTOMER,auth,
        body(['customerName','email'],Strings.PLEASE_SEND_THE_DATA_IN_CORRECT_FORMAT).exists(),
        (req,res)=>{
            const errors= validationResult(req);

            if(!errors.isEmpty()){
                    return res.status(400).json(getErrorModel(errors.array()))
            }else{

                customerDataProvider.addCustomer(function(error,customerModel){
                        if(error!=null){
                            res.send(error);
                        }
                        else{
                            res.send(customerModel);
                        }
                }, req.body)

            }
        
        
    })

    


    app.put(Routes.UPDATE_CUSTOMER,auth,
        body(['customerName','email','id'],Strings.PLEASE_SEND_THE_DATA_IN_CORRECT_FORMAT).exists(),
        (req,res)=>{
            const errors= validationResult(req);

            if(!errors.isEmpty()){
                    return res.status(400).json(getErrorModel(errors.array()))
            }else{

                customerDataProvider.updateCustomer(function(error,customerModel){
                        if(error!=null){
                            res.send(error);
                        }
                        else{
                            res.send(customerModel);
                        }
                }, req.body)

            }
        
        
    })

    

    
}

exports.CustomerDataService= CustomerDataService