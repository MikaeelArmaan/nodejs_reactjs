// In your seed-users.js file
const { bcryptPassword } = require('../bcripted/password');
const { userTypes } = require('../constants/userType');
const { User } = require('./models'); // Import your Sequelize User model

const seedUsers = async () => {
  try {
    // Array of user data
    const userData = [
      {
        name: 'arman',
        lastname: 'khan',
        email: 'arman@gmail.com',
        password: bcryptPassword('Password1'),
        account_type: userTypes.ADMIN,
        provider : "seeds"
      },
      // Add more users as needed
      {
        name: 'arman',
        lastname: 'User',
        email: 'user@gmail.com',
        password: bcryptPassword('User1'),
        account_type: userTypes.USER,
        provider: "seeds"
      },
    ];

    // Use Sequelize bulkCreate to insert data into the User model
    await User.bulkCreate(userData);

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Call the seedUsers function
seedUsers();
