"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("spaces", [
      {
        title: "Apples Space",
        description: "The apple space is about apples",
        backgroundColor: "#ffffff",
        color: "#000000",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: "Bananas Space",
        description: "The banana space is about bananas",
        backgroundColor: "#ffffff",
        color: "#000000",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        title: "Cocos Space",
        description: "The Coco space is about coconuts",
        backgroundColor: "#ffffff",
        color: "#000000",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};
