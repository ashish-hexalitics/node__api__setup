const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = function (userSchema, ex_params) {
    userSchema.methods.generateRefreshToken = async function () {
        const refreshToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRE
        });
        return refreshToken;
    }
    userSchema.methods.generateAuthToken = async function () {
        return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
    }
    userSchema.methods.comparePassword=async function(enteredpassword){
        return await bcrypt.compare(enteredpassword,this.password);
    }
}