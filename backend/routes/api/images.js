const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Image } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateImage = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a title.'),
    check('description')
      .exists({ checkFalsy: true })
        .withMessage('Please provide an image URL.'),
    check('image_url')
      .exists({ checkFalsy: true })
      .withMessage('Please provide an image URL.'),
    handleValidationErrors,
  ];

//Get all images
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll();
    return res.json(images)
}))

//Add image
router.post('/', validateImage, asyncHandler(async (req, res) => {
    const { title, description, image_url, user_id } = req.body;

    const image = await Image.create({
       title,
       description,
       image_url,
       user_id
    });

    return res.json(image)
}))

//Drop and reseed table
//Write the thunk/dispatch it and test it


module.exports = router;
