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

//Update album
router.put('/', validateAlbum, asyncHandler(async (req, res) => {
  const { id, title } = req.body;

  const editedAlbum = await Album.findByPk(id);

  editedAlbum.title = title;

  await editedAlbum.save()

  return res.json(editedAlbum)
}))

//Delete an album
router.delete('/', asyncHandler(async (req, res) => {
  const {albumId} = req.body;

  const findAlbum = await Album.findByPk(albumId);

    if (findAlbum) {
        await findAlbum.destroy();
        res.status(204).end();
      } else {
        next();
      }
}))

module.exports = router;
