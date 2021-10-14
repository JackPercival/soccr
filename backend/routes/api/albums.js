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

//Add an album
router.post('/', validateAlbum, asyncHandler(async (req, res) => {
  const { title, user_id } = req.body;

  const album = await Album.create({
     title,
     user_id
  });

  return res.json(album)
}))

//Delete an album
router.delete('/', asyncHandler(async (req, res) => {
  const {albumId} = req.body;

  const findAlbum = await Comment.Album(commentId);albumId

    if (findAlbum) {
        await findAlbum.destroy();
        res.status(204).end();
      } else {
        next();
      }
}))

module.exports = router;
