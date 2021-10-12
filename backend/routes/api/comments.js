const express = require('express');
const asyncHandler = require('express-async-handler');
const { Comment, Image, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateComment = [
    check('comment')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a comment.'),
    check('comment')
      .isLength({ max: 500 })
      .withMessage('Comments must be less than or equal to 500 characters.'),
    handleValidationErrors,
  ];

//Get all comments
router.get('/', asyncHandler(async (req, res) => {
    const comments = await Comment.findAll({
        include: {
            model: User
        }
    });

    return res.json(comments)
}))

module.exports = router;
