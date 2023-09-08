const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


module.exports = {
  // Get all Users
  getAllUsers(req, res) {
    User.find()
      .then((users) => {
         res.json(users);
      }) 
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) => {
        res.json(user);
     }) 
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId},{$set: req.body},{new: true})
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a student and remove them from the Thought
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
    .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Add an assignment to a student
  addFriend(req, res) {
    console.log('You are adding a Friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
},
  // Remove assignment from a student
  removeFriend(req, res) {
    console.log('You have removed a friend')
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
},
};
