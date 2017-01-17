import React from 'react';
import renderer from 'react-test-renderer';
import SatoriLogoSVG from 'components/SatoriLogoSVG';

it('renders SatoriLogoSVG component correctly', () => {
  const tree = renderer.create(
    <SatoriLogoSVG />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
