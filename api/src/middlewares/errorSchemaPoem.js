
const errorSchemaPoem = (req, res, next) => {
    const {title, text} = req.body

    if (!title || !text) return res.status(404).json({message: 'title or text cannot be empty'})

    if (title.length > 20) return res.status(404).json({message: 'title cannot be longer than 20 characters'})

    if (text.length < 50) return res.status(404).json({message: 'text cannot be less than 50 characters'})

    next()
}

module.exports = {
    errorSchemaPoem
}
