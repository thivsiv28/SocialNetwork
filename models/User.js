const { Schema, model } = require("mongoose");
// const thoughtSchema = require("./Thought");

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    // thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: "thought" }],

    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;
