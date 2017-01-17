import React from 'react';
import renderer from 'react-test-renderer';
import AppDesktop from 'components/AppDesktop';

it('renders AppDesktop component correctly for empty participants', () => {
  const tree = renderer.create(
    <AppDesktop participants={{}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders AppDesktop component correctly when there are participants', () => {
  const participants = {
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
  const tree = renderer.create(
    <AppDesktop participants={participants} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
