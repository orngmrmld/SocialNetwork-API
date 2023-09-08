const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction') ;

// Schema to create a course model
const thoughtSchema = new Schema(
  {
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
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema]
    
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function(){
  return this.friends.length; 

})


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
