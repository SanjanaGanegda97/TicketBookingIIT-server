const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    name: {
        type: String,
    },
    contactnum: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: "Basic User" // Default value for medical leaves
    }
})

// Static sign up method

UserSchema.statics.signup = async function(email, password, name, contactnum){

    //Validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, name, contactnum})

    return user;
}

//static login method
UserSchema.statics.login = async function(email, password){

    //Validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user;
}

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel;