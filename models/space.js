"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class space extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      space.belongsTo(models.user, { foreignKey: "userId" });
      space.hasMany(models.story, { foreignKey: "spaceId" });
      //relations between models
    }
  }
  space.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT,
      backgroundColor: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "space",
    }
  );
  return space;
};
