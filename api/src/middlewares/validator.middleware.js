const validateMiddleware = (schema) => (req, res, next) => {
    try {
        schema.parse()
        next()
    } catch (error) {
        res.status(404).json({error: error.errors.map((error) => error.messag)})
    }
}

module.exports = {
    validateMiddleware
}