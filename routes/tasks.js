const express = require("express");
const router = express.Router();
const verifyToken = require("../auth/verifyToken");

// Load user input validation
const validateTask = require("../auth/validateTask");

// Load Task model
const Task = require("../models/Task");

// @route   GET api/tasks/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Task works" }));

// @route   GET api/tasks
// @desc    Get tasks created by specific user
// @access  Private
router.get("/", verifyToken, (req, res, next) => {
  Task.find({ user: req.userId })
    .sort({ date: -1 })
    .then(tasks => res.json(tasks))
    .catch(err => res.status(404).json({ nopostsfound: "No tasks found" }));
});

// @route   GET api/tasks/:id
// @desc    Get task by id
// @access  Public
router.get("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(404).json({ nopostsfound: "No tasks found" }));
});

// @route   POST api/tasks
// @desc    Create task
// @access  Private
router.post("/", verifyToken, (req, res, next) => {
  const { errors, isValid } = validateTask(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newTask = new Task({
    text: req.body.text,
    priority: req.body.priority,
    duedate: req.body.duedate,
    status: req.body.status,
    user: req.userId
  });

  newTask.save().then(task => res.json(task));
});

// @route   PUT api/tasks
// @desc    Update task
// @access  Private
router.put("/:id", verifyToken, (req, res, next) => {
  Task.findByIdAndUpdate(req.params.id)
    .then(task => {
      // Check for task owner
      if (task.user.toString() !== req.userId) {
        return res
          .status(401)
          .json({ isAuth: false, msg: "User not authorized" });
      }
      task.status = req.body.status;
      task.priority = req.body.priority;
      task.duedate = req.body.duedate;
      task.save().then(() => res.json(task));
    })
    .catch(err =>
      res.status(500).json({ msg: "There was a problem in updating a task" })
    );
});

// @route   DELETE api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete("/:id", verifyToken, (req, res, next) => {
  Task.findById(req.params.id)
    .then(task => {
      // Check for task owner
      if (task.user.toString() !== req.userId) {
        return res
          .status(401)
          .json({ isAuth: false, msg: "User not authorized" });
      }
      // Delete
      task.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ postnotfound: "No task found" }));
});

module.exports = router;
