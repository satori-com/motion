import React from 'react';
import renderer from 'react-test-renderer';
import PhoneSVG from 'components/PhoneSVG';

it('renders PhoneSVG component correctly', () => {
  const tree = renderer.create(
    <PhoneSVG />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
