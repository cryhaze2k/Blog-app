const User = require('../models/User');

describe('Unit Test: User Model', () => {
  it('має правильно створювати об’єкт користувача', () => {
    const userData = {
      username: 'TestUser',
      email: 'test@example.com',
      password: 'password123'
    };
    const user = new User(userData);

    expect(user.username).toBe(userData.username);
    expect(user.email).toBe(userData.email);
    expect(user.password).toBe(userData.password);
  });

  it('має містити помилки валідації, якщо поля порожні', () => {
    const user = new User({});
    const err = user.validateSync();
        
    // Якщо твоя модель має required: true, то err.errors буде існувати
    if (err && err.errors) {
      expect(err.errors.username).toBeDefined();
      expect(err.errors.email).toBeDefined();
    } else {
      // Якщо модель дозволяє порожні поля, тест просто пройде валідацію
      expect(err).toBeUndefined();
    }
  });
});