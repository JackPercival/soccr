const express = require('express');
const asyncHandler = require('express-async-handler');

const { Image, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateImage = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a title.'),
    check('description')
      .exists({ checkFalsy: true })
        .withMessage('Please provide a description.'),
    check('image_url')
      .exists({ checkFalsy: true })
      .withMessage('Please provide an image URL.'),
    handleValidationErrors,
  ];

//Get all images
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll({
      include: {
        model: User
      }
    });
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

//Update Image
router.put('/', validateImage, asyncHandler(async (req, res) => {
  const { id, title, description } = req.body;

  const editedImage = await Image.findByPk(id);

  editedImage.title = title;
  editedImage.description = description;

  await editedImage.save()

  return res.json(editedImage)
}))


//Delete image
router.delete('/', asyncHandler(async (req, res) => {
  const {imageId} = req.body;

  const findImage = await Image.findByPk(imageId);

    if (findImage) {
        await findImage.destroy();
        res.status(204).end();
      } else {
        next();
      }
}))

module.exports = router;
