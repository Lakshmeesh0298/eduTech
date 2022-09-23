const {JWT_COOKIE_EXPIRE} = require("../config")
const UserSchema = require ('../Model/UserModel')
const errorResponse = require("../utils/errorResponse");
exports.profileController = async (req,res,next)=>{
    try {
        console.log(req.user)
        let {profile_picture} = req.body;
        let {id}=req.user
        console.log(id)
        let profile = await UserSchema.updateOne({_id:id},{profile_picture:profile_picture})
        res.send(profile)
        
    } catch (error) {
        console.log(error);
        next(new errorResponse("profile not updated",500))
    }
}