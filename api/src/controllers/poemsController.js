const Poem = require('../models/poems.model.js')

const allgetPoems = async (req, res) => {
    try {
        const allPoems = await Poem.find().populate('user')
        res.status(200).json(allPoems)
    } catch (error) {
        res.status(404).json(error.message)
    }
}

const getPoems = async (req, res) => {
    try {
        const allPoems = await Poem.find({
            user: req.user.id
        }).populate('user')
        if (!allPoems) return res.status(200).json([])
        res.status(200).json(allPoems)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const createPoems = async (req, res) => {
    const { title, text } = req.body
    try {
        const newPoem = new Poem({
            title,
            text,
            user: req.user.id
        })

        await newPoem.save()

        res.status(200).json(newPoem)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const poemById = async (req, res) => {
    try {
        const poem = await Poem.findById(req.params.id).populate('user')

        if (!poem) throw new Error('Poem not found')
        
        res.status(200).json()
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const deletePoem = async (req, res) => {
    try {
        const delePoem = await Poem.findByIdAndDelete(req.params.id)

        if (!delePoem) throw new Error('Poem not found')

        res.sendStatus(204) //  todo salio bien pero no te devuelvo nada
    } catch (error) {
        res.status(404).json({message: error.mesage})
    }
}

const editPoems = async (req, res) => {
    const { title, text } = req.body
    try {
        const updatePoem = await Poem.findByIdAndUpdate(req.params.id, {title, text}, {
            new: true
        })
        
        if (!updatePoem) throw new Error('Poem not found')

        res.status(200).json()
    } catch (error) {
        res.status(404).json({mesage: error.mesage})
    }
}

module.exports = {
    getPoems,
    poemById,
    createPoems,
    deletePoem,
    editPoems,
    allgetPoems
}