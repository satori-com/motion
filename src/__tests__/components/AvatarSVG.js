import React from 'react';
import renderer from 'react-test-renderer';
import AvatarSVG from 'components/AvatarSVG';

it('renders AvatarSVG component correctly', () => {
  const tree = renderer.create(
    <AvatarSVG avatar="avatar1" color="#000000" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
