'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumContent = sequelize.define('AlbumContents', {
    album_id: DataTypes.INTEGER,
    image_id: DataTypes.INTEGER
  }, {});
  AlbumContent.associate = function(models) {
    // associations can be defined here
  };
  return AlbumContent;
};
