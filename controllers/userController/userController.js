const User = require('../../models/Users')
const jwt = require('jsonwebtoken')
const Leave = require('../../models/LeaveModel')
const nodemailer = require('nodemailer');


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  console.log(req.body)
  const {email, password} = req.body
  

  try {
    
    const user = await User.login(email, password)
  
    // create a token
    const token = createToken(user._id)
    
    res.status(200).json({user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, name, contactnum} = req.body

  try {
    const user = await User.signup(email, password, name, contactnum)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const userBasicDetails = async (req, res) => {
    
    const {_id} = req.query
  
    try {
      user = await User.findOne({ _id });
  
      res.status(200).json({user})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

const userApplication = async (req, res) => {
  const leaveDeatils = req.body
  //console.log(leaveDeatils.appliedOn)

  try {
    const leaveForm = new Leave({
      //userID: leaveDeatils.userID,
      name: leaveDeatils.name,
      leaveType: leaveDeatils.leaveType,
      dayType: leaveDeatils.dayType,
      startDate: new Date(leaveDeatils.startDate),
      endDate: new Date(leaveDeatils.endDate),
      reason: leaveDeatils.reason,
      appliedOn: new Date(leaveDeatils.appliedOn)
    })

    const abc = await leaveForm.save();
  
    res.status(200).json({message: "application saved"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getLeaveDetails = async (req, res) => {
    
  const userName = req.query.name

  try {
    const leaves = await Leave.find({ name:userName }).sort({ appliedOn: -1 });;

    res.status(200).json({leaves})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getAllUsers = async (req, res) => {
  try {
      const users = await User.find().sort({ appliedOn: 1 });

      res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const updateUserType = async (req, res) => {
  try {

      // Find the user by ID
      const user = await User.findById(req.body.params._id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Update the userType
      user.userType = req.body.params.userType;

      // Save the updated user
      await user.save();

      // Return the updated user data
      res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser, userBasicDetails, userApplication, getLeaveDetails, getAllUsers, updateUserType }