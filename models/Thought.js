const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      manlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,

    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model("thought", thoughtSchema);

module.exports = Thought;
