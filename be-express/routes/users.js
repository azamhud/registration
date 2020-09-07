
var dotenv = require('dotenv');
var express = require('express');
var router = express.Router();

var cors = require('cors');

dotenv.config();

const Sequelize = require('sequelize')
const username = process.env.username_db
const name_db = process.env.name_db
const sequelize = new Sequelize(`postgres://${username}@localhost:5432/${name_db}`)

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
      },
  firstName: {
  type: Sequelize.STRING,
  allowNull: false
  },
  lastName: {
  type: Sequelize.STRING,
  allowNull: false
  },
  date: {
    type: Sequelize.STRING
    },
    month: {
      type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
        }
  }, {
  });

  User.sync({ force: true }) 

sequelize

.authenticate()

.then(() => {

console.log('Connection has been established successfully.');

})

.catch(err => {

console.error('Unable to connect to the database:', err);

});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new',cors(), async (req, res, next) => {
  try {
  console.log("asd")
  const newUser = new User(req.body)
  await newUser.save()
  res.json({ user: newUser }) // Returns the new user that is created in the database
  
  } catch(error) {
    console.log(error.errors);
    let message = "";
    error.errors.forEach(element => {
      message = message + element.message + "\n"
    });
    if(message.includes("email")){
      return res.status(556).send('Email already registered!')
    }else if(message.includes("phoneNumber")) return res.status(555).send('Phone Number already registered!')
  }
  
  })

module.exports = router;
