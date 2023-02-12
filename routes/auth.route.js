const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');
const { verifyToken } = require('../middlewares/verify');
const upload = require('../middlewares/upload')

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/send-verification-email', verifyToken, auth(), authController.sendVerificationEmail);
router.post('/send-email', authController.sendTestEmail); //remove auth
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
router.post('/verify-email-app', verifyToken, auth(), validate(authValidation.verifyEmail), authController.verifyEmail);

router.post('/upload', upload.uploadPicture.any(), authController.uploadFile)

module.exports = router;