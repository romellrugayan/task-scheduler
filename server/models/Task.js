const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const TaskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    default: "High"
  },
  duedate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "Open"
  }
  // dependency: [
  //   {
  //     user: {
  //       type: Schema.Types.ObjectId,
  //       ref: "users"
  //     },
  //     discipline: {
  //       type: String
  //     },
  //     text: {
  //       type: String
  //     }
  //   }
  // ]
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
