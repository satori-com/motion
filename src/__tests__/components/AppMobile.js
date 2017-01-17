jest.mock('clipboard');
jest.mock('lib/rtm');

import React from 'react';
import _ from 'lodash';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { EventEmitter } from 'events';
import AppMobile from 'components/AppMobile';
import { publish } from 'lib/rtm';

const mockParticipants = {
  'abc': {
    alpha: -5,
    avatar: 'avatar5',
    beta: 2,
    color: '#88c440',
    deviceId: 'abc',
    gamma: 0,
    received_at: 1497911046581,
    roomId: '80ba136',
  },
  'def': {
    alpha: -15,
    avatar: 'avatar2',
    beta: 20,
    color: '#88c440',
    deviceId: 'def',
    gamma: 30,
    received_at: 1497911046581,
    roomId: '80ba136',
  },
};
const mockUser = {
  id: 'abc',
  avatar: {
    avatar: 'avatar1',
    color: '#88c440',
  },
};

function getComponent(participants, user) {
  return (
    <StaticRouter context={{}}>
      <AppMobile
        participants={participants}
        roomId="abc"
        user={user}
      />
    </StaticRouter>
  );
}

it('renders a AppMobile smoketest', () => {
  const wrapper = mount(getComponent(mockParticipants, mockUser));

  expect(wrapper.find('Phones').length).toEqual(1);
  expect(wrapper.find('FloatingNav').length).toEqual(1);
  expect(wrapper.find('MobileWelcome').length).toEqual(1);
});

it('get a list of participants', () => {
  const wrapper = mount(getComponent(mockParticipants, mockUser));
  const phone = wrapper.find('Phones');
  const toggleConnection = wrapper.find('#toggleConnection');
  window.addEventListener = jest.fn();
  window.removeEventListener = jest.fn();

  expect(phone.props().participants).toEqual({});

  toggleConnection.props().onClick({ preventDefault: jest.fn() });
  expect(window.addEventListener.mock.calls[0][0]).toEqual('deviceorientation');
  expect(phone.props().participants).toEqual(_.pick(mockParticipants, 'abc'));

  // end connection
  toggleConnection.props().onClick({ preventDefault: jest.fn() });
  expect(window.removeEventListener).toHaveBeenCalled();
  expect(phone.props().participants).toEqual({});
});

it('publishes device orientation data', () => {
  const ee = new EventEmitter()
  const wrapper = mount(getComponent(mockParticipants, mockUser));
  const phone = wrapper.find('Phones');
  const toggleConnection = wrapper.find('#toggleConnection');
  window.addEventListener = jest.fn((ev, cb) => {
    ee.on(ev, cb);
  });
  window.removeEventListener = jest.fn();

  toggleConnection.props().onClick({ preventDefault: jest.fn() });
  ee.emit('deviceorientation', { alpha: 1, beta: 2, gamma: 3 });

  // the very first data point is used as offset
  expect(publish).not.toHaveBeenCalled();

  ee.emit('deviceorientation', { alpha: 1, beta: 2, gamma: 3 });
  expect(publish).toHaveBeenCalled();
  // the second event's alpha is offset by initial event's alpha
  expect(publish.mock.calls[0][0].alpha).toEqual(0);
});
