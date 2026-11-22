const request = require('supertest');
const app = require('../src/server');

describe('Auth API Tests', () => {
  test('should register a new user', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };
    
    const response = await request(app)
      .post('/auth/register')
      .send(newUser)
      .expect(201);
      
    expect(response.body.token).toBeDefined();
    expect(response.body.user.username).toBe(newUser.username);
  });

  test('should login existing user', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const response = await request(app)
      .post('/auth/login')
      .send(loginData)
      .expect(200);
      
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(loginData.email);
  });

  test('should get user profile', async () => {
    // Сначала зарегистрируем пользователя
    const newUser = {
      username: 'profileuser',
      email: 'profile@example.com',
      password: 'password123'
    };
    
    const registerResponse = await request(app)
      .post('/auth/register')
      .send(newUser);
      
    const token = registerResponse.body.token;
    
    // Теперь получим профиль
    const response = await request(app)
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
      
    expect(response.body.email).toBe(newUser.email);
  });
});