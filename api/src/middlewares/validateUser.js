
const validateUser = (req, res, next) => {
    const {username, email, password} = req.body

    if (username.length < 3 ) return res.status(404).json({message: 'username must be greater than 3 characters'})
    if (password.length < 5) return res.status(404).json({message: 'password must be greater than 4 characters'})
    next()
}

module.exports = {
    validateUser
}