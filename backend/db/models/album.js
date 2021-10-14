'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.belongsTo(models.User, {foreignKey: 'user_id'})

    const columnMapping = {
			through: "AlbumContent",
			foreignKey: "album_id",
			otherKey: "image_id"
		}
		Album.belongsToMany(models.Image, columnMapping)
    Album.hasMany(models.AlbumContent, {foreignKey: "album_id", onDelete: "CASCADE", hooks: true})
  };
  return Album;
};
