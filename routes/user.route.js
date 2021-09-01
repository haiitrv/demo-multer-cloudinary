const router = require('express').Router()
const cloudinary = require('../utils/cloudinary.config')
const upload = require('../utils/multer.config')
const User = require('../models/user.model')

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        
        let user = new User({
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        })

        await user.save()
        res.json(user)


    } catch (err) {
        console.log(err)
    }
})

router.get('/user', async (req, res) => {
    try {
        const user = await User.find()

        res.render('user', { user })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router