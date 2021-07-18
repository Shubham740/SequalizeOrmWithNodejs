const {body,validationResult, query} =  require('express-validator')
const {Routes}  = require('../../api-routes/Routes');
const {auth} = require('../../middleware/auth')
const Strings = require('../../utils/Strings').Strings
const getErrorModel = require('../../utils/Utils').getErrorModel
const getSuccessModel = require('../../utils/Utils').getSuccessModel
const UserDataProvider =require('./UserDataProvider').UserDataProvider;



var UserDataService= function(app){
    var userDataProvider = new UserDataProvider();


    app.post(Routes.ADD_USER, auth,
        body(['name','email']).exists(),
        (req,res)=>{
            const errors= validationResult(req);

            if(!errors.isEmpty()){
                    return res.status(400).json(getErrorModel(errors.array()))
            }else{
                 userDataProvider.addUser(function(error,userModel){
                    if(error!=null){
                        res.send(error)
                    }else{
                        res.send(userModel)
                    }
                 },req.body)   
            }
    })

    app.get(Routes.GET_ALL_USER,auth, (req,res)=>{
            userDataProvider.getAllUsers(function(error,customerModel){
                    if(error!=null){
                        res.send(error)
                    }
                    else{
                        res.send(customerModel);
                    }
            })
    })

}

exports.UserDataService=UserDataService;
