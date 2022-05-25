var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  pass: {
    type: String,
  },
  files: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
