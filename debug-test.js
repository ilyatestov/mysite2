const request = require('supertest');
const app = require('./src/server');

describe('Debug Tests', () => {
  let userToken;
  let userId;

  beforeAll(async () => {
    // Сначала зарегистрируем пользователя
    const registerResponse = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    
    if (registerResponse.status === 201) {
      userToken = registerResponse.body.token;
      userId = registerResponse.body.user.id;
      console.log('User registered with token:', userToken ? '***' : 'undefined');
    } else {
      console.log('Registration failed:', registerResponse.body);
    }
  });

  test('should get user profile', async () => {
    if (!userToken) {
      console.log('No token available for test');
      return;
    }
    
    const response = await request(app)
      .get('/auth/profile')
      .set('Authorization', `Bearer ${userToken}`);
    
    console.log('Profile response:', response.status, response.body);
    expect(response.status).toBe(200);
  });

  test('should get posts list', async () => {
    const response = await request(app).get('/posts');
    console.log('Posts response:', response.status, response.body);
    expect(response.status).toBe(200);
  });

  test('should get categories list', async () => {
    const response = await request(app).get('/categories');
    console.log('Categories response:', response.status, response.body);
    expect(response.status).toBe(200);
  });
});