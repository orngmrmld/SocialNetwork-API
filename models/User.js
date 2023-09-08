const { Schema, model } = require('mongoose');
// const assignmentSchema = require('./Assignment');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      unique: true;
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\w+@\w+.\w{2,3}+/,"Invalid Email Address"],
     },
  thougths:[
    {
      type: Schema.Types.ObjectId,
      ref: "thought"
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ]
  },
  {
    toJSON: {
      virtual: true,
    },
  }
);

userSchema.virtual("friendCount").get(function(){
  return this.friends.length; 

})


const User = model('user', userSchema);

module.exports = User;
