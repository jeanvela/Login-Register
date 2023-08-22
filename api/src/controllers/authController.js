const User = require('../models/users.model.js')
const bcrypt = require('bcryptjs')
const { createAccessToken } = require('../libs/jwt.js')
const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../config.js')

const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const userFound = await User.findOne({email})

        if (userFound) throw new Error(['The email already exists'])

        const passwordHashs = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHashs
        })

        const userSave = await newUser.save()
        const token = await createAccessToken({id: userSave._id})
        res.cookie('token', token)
        res.status(200).json({
            id: userSave._id,
            username: userSave.username,
            email: userSave.email,
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userFound = await User.findOne({email})
        if (!userFound) throw new Error('User not found') // si anda mal probar con res.status(404).json({message: 'User not found'})
        const isMacth = await bcrypt.compare(password, userFound.password)

        if (!isMacth) throw new Error('Invalid credential')
        const token = await createAccessToken({id: userFound._id})
        res.cookie('token', token)
        res.status(200).json({
            // token: token,
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const logout = async (req, res) => {
    try {
        await res.cookie('token', "", {
        expires: new Date(0)
        })
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id)
        res.status(202).json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const verifyToken = async (req, res) => {
    const { token } = req.cookies
    try {
        if (!token) throw new Error('not found token')
        jwt.verify(token, TOKEN_SECRET, async (err, user) => {
            if (err){
                console.log(err)
                return res.status(404).json('Unauthorized')
            } 
            
            const userfound = await User.findById(user.id)
            if (!userfound) throw new Error('user not found')
            return res.status(200).json({
                username: userfound.username,
                email: userfound.email
            })
        })
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {
    register,
    login,
    logout,
    profile,
    verifyToken
}