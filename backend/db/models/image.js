'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.User, {foreignKey: 'user_id'})
    Image.hasMany(models.Comment, {foreignKey: 'image_id', onDelete: "CASCADE", hooks: true})

    const columnMapping = {
			through: "AlbumContent",
			foreignKey: "image_id",
			otherKey: "album_id"
		}
		Image.belongsToMany(models.Album, columnMapping)
    Image.hasMany(models.AlbumContent, {foreignKey: 'image_id', onDelete: "CASCADE", hooks: true})
  };
  return Image;
};
