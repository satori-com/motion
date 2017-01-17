import React from 'react';
import { shallow, mount } from 'enzyme';
import App from 'App';

jest.mock('lib/rtm');

const Component = (
  <App match={{ params: { roomId: 'room1' } }} location={{ search: '' }} />
);

test('it is a smoke test', () => {
  const wrapper = mount(Component);

  expect(wrapper.find('.App').length).toBe(1);
});

test('it should render app', () => {
  const wrapper = shallow(Component);

  expect(wrapper.find('.App').length).toBe(1);
});

test('it should correctly detect desktop', () => {
  const wrapper = shallow(Component);

  expect(wrapper.find('AppDesktop').length).toBe(1);
});

test('it should correctly detect mobile', () => {
  Object.defineProperty(window.navigator, 'userAgent', {
    writable: true,
    value: 'iPhone',
  });

  const wrapper = shallow(Component);

  expect(wrapper.find('AppMobile').length).toBe(1);
});

test('it should generate user', () => {
  const wrapper = shallow(Component);
  const user = wrapper.state('user');

  expect(user.id).toBeDefined();
  expect(user.avatar.avatar).toBeDefined();
  expect(user.avatar.color).toBeDefined();
});
