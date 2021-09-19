const router = require('express').Router();

let Exercise = require('../models/exercise.model');

//root URL / exercises/, the get request then run mongoose command, find exercises files and return as JSON
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration); //converting duration to number
  const date = Date.parse(req.body.date); //converting date to date data type

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

///:id is like a variable -> a object ID created automatically by MongoDB
//ID is the object ID from database that was assigned
//req.params.id is getting the ID directly from the URL, finding by the ID
//the 'get', or 'read' request from CRUD
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete request
//find by ID and delete, get from URL and delete from database
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update, post request
//find the current exercise and update it
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      //req.body.username b/c this route needs to receive a JSON object that's going to contain username, descrip etc
      //taking all the information and assigning it to the fields of exercise that already exists
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      //save with new information
      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;