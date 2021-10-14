const express = require('express');
const asyncHandler = require('express-async-handler');

const { Album, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateAlbum = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a title.'),
    handleValidationErrors,
  ];

//Get all albums
router.get('/', asyncHandler(async (req, res) => {
    const albums = await Album.findAll();

    return res.json(albums)
}))

module.exports = router;
