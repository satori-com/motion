import React from 'react';
import renderer from 'react-test-renderer';
import Instruction from 'components/Instruction';

it('renders instruction component correctly', () => {
  const tree = renderer.create(
    <Instruction />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
