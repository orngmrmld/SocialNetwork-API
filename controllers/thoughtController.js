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
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));

    console.log(" created a thought ? ")

  },
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

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateThought(req, res) {
    Course.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Course.create(req.body)
      .then((course) => res.json(course))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteReaction(req, res) {
    Course.findOneAndDelete({ _id: req.params.courseId })
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No course with that ID' })
          : Student.deleteMany({ _id: { $in: course.students } })
      )
      .then(() => res.json({ message: 'Course and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};
