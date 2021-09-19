//need express router bc this is route created
const router = require('express').Router();

//require the model (mongoose model we created)
let User = require('../models/user.model');

//first route; handles incoming http get requests on the /users URL path
//root URL, localhost 5000
router.route('/').get((req, res) => {
  User.find() //mongoose method, get a list of all the users from the MongoDB Atlas database, find method returns a promise in JSON format
    .then(users => res.json(users)) //after it finds, it will get all the users; res.json = return sth in JSON format
    .catch(err => res.status(400).json('Error: ' + err));
});

//handles http POST requests (as seen in /add in the end)
router.route('/add').post((req, res) => {
  const username = req.body.username; //assigned to this username variable

  const newUser = new User({username}); //create new instance of a user using the username

  //new user is saved to the database with the save method .save()
  //after user is saved to MongoDB database, it'll return user added in JSON, or return error msg 
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//standard command for all router files
//exporting the router
module.exports = router;
