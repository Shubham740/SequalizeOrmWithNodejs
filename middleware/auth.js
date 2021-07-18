const auth = async(req,res,next)=>{
    console.log('auth middlle ware');
    next();

}
exports.auth= auth;
