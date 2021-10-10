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
  };
  return Image;
};
