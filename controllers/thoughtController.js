const { Thought, User } = require('../models');


module.exports = {

  // Get all Thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a course

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // Create a thought
//   async createThought(req, res) {
//     console.log("create thought");
//     try {
//       const newThought = await Thought.create(req.body);
//       if (newThought) {
//         await User.findOneAndUpdate( 
//           { _id: req.body.userId },
//           { $addToSet: { thoughts: newThought,_id } },
//           { new: true }
//         );
//       }
//       res.json("Thought created")
//     } catch(err){
//       res.status(500).json(err);
//     }
// },  
  

// createThought(req, res) {
//   Thought.create(req.body)
//     .then(({ _id }) => {
//       return User.findOneAndUpdate(
//         { _id: req.body.userId },
//         { $push: { thoughts: _id } },
//         { new: true }
//       );
//     })
//     .then((thought) =>
//       !thought
//         ? res.status(404).json({ message: "No User found with this ID" })
//         : res.json(thought)
//     )
//     .catch((err) => res.status(500).json(err));
// },

async createThought(req,res){
  console.log("create thought")
  try{
    const newThought = await Thought.create(req.body);
    if(newThought){
      await User.findOneAndUpdate(
        {_id: req.body.userId},
        { $addToSet: { thoughts: req.params.thoughtId }},
      );
    }

    res.json("Thought created")
  } catch(err) {
    res.status(500).json(err);
  }
},


// Delete a thought
deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) => 
      !thought
        ? res.status(404).json({ message: "No thought with this id"})
        : User.findOneAndUpdate(
          {thoughts: req.params.thoughtId},
          {$pull: { thoughts: req.params.thoughtId }},
          { new: true}
        )
    )
    .then((user) =>
    !user
            ? res.status(404).json({ message: 'Thought deleted, but no user found'})
            : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => res.status(500).json(err));
    },
// Update a thought
updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No course with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

createReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought found with this ID" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},

// Delete a Reaction
deleteReaction(req, res) {
  Course.findOneAndUpdate(
    { _id: req.params.courseId },
    {$pull: {reactions: {reactionId: req.params.reactionId}}},
    {runValidators: true, new: true}
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
};
