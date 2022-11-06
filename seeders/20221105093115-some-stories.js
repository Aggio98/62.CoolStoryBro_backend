"use strict";
//seeders for stories have at least 4
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("stories", [
      {
        name: "Testing the stories",
        content: "Apple fell off a tree and Isaac Newton figured out gravity",
        imageUrl:
          "https://media.istockphoto.com/id/1030629314/vector/colored-falling-apple-icon-element-of-science-and-laboratory-for-mobile-concept-and-web-apps.jpg?s=612x612&w=0&k=20&c=VJ1zqPpNaEI2MVUbiqgTxUtSomKylKV20v7fTtH1yiE=",
        createdAt: new Date(),
        updatedAt: new Date(),
        spaceId: 1,
      },
      {
        name: "Apple crazy",
        content: "Apple took some coke and went partying, the end",
        imageUrl:
          "https://www.theimpulsivebuy.com/wordpress/wp-content/uploads/2019/10/Coca-Cola-Apple-Japan.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
        spaceId: 1,
      },
      {
        name: "Bananas Love",
        content: "A kid loved a banana so much he became one",
        imageUrl:
          "http://cdn.shopify.com/s/files/1/0304/3013/4331/articles/banana_1200x1200.png?v=1641860841",
        createdAt: new Date(),
        updatedAt: new Date(),
        spaceId: 2,
      },
      {
        name: "Bananas have seeds",
        content:
          "Bananas are actually genetically manipulated, they used to have seeds in them",
        imageUrl: "https://pbs.twimg.com/media/ElIDyzzVcAAd4Wu.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        spaceId: 2,
      },
      {
        name: "Coco Man",
        content:
          "Man sells coconuts on the beach and makes a living, check it out",
        imageUrl: "https://doanie.files.wordpress.com/2009/11/coconut.jpg",
        createdAt: new Date("2022-11-6 13:05:49.587+00"),
        updatedAt: new Date(),
        spaceId: 3,
      },
      {
        name: "Coco falling on peoples head",
        content:
          "If you are traveling to a place that has a lot of coconuts be careful they might fall on you",
        imageUrl:
          "https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/8/2019/11/GettyImages-200368872-001-e1573140181689-920x783.jpg",
        createdAt: new Date("2022-11-6 13:06:47.587+00"),
        updatedAt: new Date(),
        spaceId: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
