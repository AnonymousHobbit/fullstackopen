const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  const users = await User.find({}).populate("blogs", {_id: 1, title: 1, author: 1, url: 1})
  res.json(users.map(u => u.toJSON()))
})

router.post('/', async (req, res) => {

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
    if (req.body.password.length < 3) {
      return res.status(400).json({error: 'Password must be minimum of 3 characters long'});
    }
    const foundUser = await User.find({username: req.body.username})
    if (foundUser.length > 0) {
      return res.status(400).json({error: 'Username must be unique'});
    }
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)

})

module.exports = router
