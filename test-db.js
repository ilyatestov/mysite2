const models = require('./src/models');

async function test() {
  try {
    console.log('Testing database access...');
    const user = await models.User.findByPk(1);
    console.log('User found:', user ? 'yes' : 'no');
    if (user) {
      console.log('User data:', user.toJSON());
    }
  } catch (error) {
    console.error('Database error:', error);
  }
}

test();