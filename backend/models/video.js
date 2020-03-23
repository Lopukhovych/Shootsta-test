'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    location: DataTypes.STRING,
    preview: DataTypes.STRING,
    directory: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {});
  Video.associate = function(models) {
    // associations can be defined here
  };
  return Video;
};