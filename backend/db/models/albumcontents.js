'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumContent = sequelize.define('AlbumContent', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    album_id: DataTypes.INTEGER,
    image_id: DataTypes.INTEGER
  }, {});
  AlbumContent.associate = function(models) {
    // associations can be defined here
    AlbumContent.belongsTo(models.Image, {foreignKey: 'image_id'})

  };
  return AlbumContent;
};
