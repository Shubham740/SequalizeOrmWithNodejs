var CustomerDataService = require('./CustomerData/CustomerDataService').CustomerDataService;
var UserDataService = require('./UserData/UserDataService').UserDataService


var AddServices = function(app){

    new CustomerDataService(app);
    new UserDataService(app);

}
exports.AddServices = AddServices;
