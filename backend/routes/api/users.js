const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
);

//Get all users
router.get('/', asyncHandler(async (req, res) => {
  const users = await User.findAll();

  return res.json(users)
}))

//Update profile pic
router.put('/profilepic', asyncHandler(async (req, res) => {
  const { id, profile_pic } = req.body;

  const editedUser = await User.findByPk(id);

  editedUser.profile_pic = profile_pic;

  await editedUser.save()

  return res.json(editedUser)
}))

//Update banner pic
router.put('/banner', asyncHandler(async (req, res) => {
  const { id, banner_pic } = req.body;

  const editedUser = await User.findByPk(id);

  editedUser.banner_pic = banner_pic;

  await editedUser.save()

  return res.json(editedUser)
}))

module.exports = router;
