const request = require('supertest');
const app = require('./test-server');

describe('Auth API Tests', () => {
  test('should register a new user', async () => {
    const newUser = {
      username: 'testuser' + Date.now(),
      email: 'test' + Date.now() + '@example.com',
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
    const email = 'test' + Date.now() + '@example.com';
    const password = 'password123';
    
    // Сначала зарегистрируем пользователя
    const registerResponse = await request(app)
      .post('/auth/register')
      .send({
        username: 'loginuser' + Date.now(),
        email,
        password
      });
      
    // Теперь залогинимся
    const response = await request(app)
      .post('/auth/login')
      .send({
        email,
        password
      })
      .expect(200);
      
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(email);
  });

  test('should get user profile', async () => {
    // Сначала зарегистрируем пользователя
    const newUser = {
      username: 'profileuser' + Date.now(),
      email: 'profile' + Date.now() + '@example.com',
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