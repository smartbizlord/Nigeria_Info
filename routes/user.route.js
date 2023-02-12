const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/verify');

const router = express.Router();

router
  .route('/')
  .post(verifyToken, auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get( validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(verifyToken, auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(verifyToken, auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(verifyToken, auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

router.route('/mumu/mumu')
  .get(userController.mumu)
  .post(verifyToken,auth('manageUsers'), userController.mumuVer);

module.exports = router;