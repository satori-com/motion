import React from 'react';
import renderer from 'react-test-renderer';
import Coordinates from 'components/Coordinates';

it('renders Coordinates component correctly', () => {
  const participant = {
    alpha: 0,
    beta: 1,
    gamma: 2,
  };
  const tree = renderer.create(
    <Coordinates participant={participant} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
