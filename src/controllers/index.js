const userController = require("./userController");
const adminController = require("./adminController");


// Create an object to hold references to userController and adminController
const controller = {
  userController: userController,
  adminController: adminController
};

module.exports = controller;
