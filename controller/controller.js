const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const { GuestModel } = require('../db/Model/User')

exports.getHello = catchAsync(async (req, res, next) => {
  try {
    const user = GuestModel(req.body)
    const data = await user.save()
    res.status(200).json({ status: "true", data: data });

  } catch (error) {

    res.status(404).json({ status: "false", data: err });
  }

  // 1. Get Data Data from collection
  // 2. Build template
  // 3. Render that template
});

// Create and Save a new Tutorial
exports.create = async (req, res) => {

  res.status(200).json({ status: "sucess", data: data });
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {

  res.status(200).json({ status: "sucess", data: data });
};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {

  res.status(200).json({ status: "sucess", data: data });
};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {

  res.status(200).json({ status: "sucess", data: data });
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {

  res.status(200).json({ status: "sucess", data: data });
};

// Delete all Tutorials from the database.
exports.deleteAll = async (req, res) => {

  res.status(200).json({ status: "sucess", data: data });
};

// Find all published Tutorials
exports.findAllPublished = async (req, res) => {

  res.status(200).json({ status: "sucess", data: data });
};
