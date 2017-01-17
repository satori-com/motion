jest.mock('js-cookie');

import * as user from 'lib/user';

const Cookies = require('js-cookie');
const mockUser = {
  id: 'abc',
  avatar: {
    avatar: 'avatar1',
    color: '#88c440',
  },
};

it('should return null if user is not defined', () => {
  expect(user.getUser()).toBeNull();

  Cookies.mockImplementationOnce(() => mockUser);
  expect(user.getUser()).toBeNull();
});

it('should generate a new user', () => {
  const newUser = user.generateUser();
  expect(newUser.id).toBeDefined();
  expect(newUser.avatar.avatar).toBeDefined();
  expect(newUser.avatar.color).toBeDefined();
});

it('should return the user for saveUser', () => {
  expect(user.saveUser(mockUser)).toEqual(mockUser);
});
