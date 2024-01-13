// seed.js
const { sequelize } = require('../db/index'); // Adjust the path to your Sequelize configuration file
const seedUsers = require('./seed-users'); // Adjust the path to your seed file

const seed = async () => {
    try {
        // Run the user seed
        await seedUsers.up(null, sequelize.queryInterface);

        console.log('Seed completed successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        // Close the Sequelize connection
        await sequelize.close();
    }
};

seed();
