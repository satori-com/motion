import React from 'react';
import renderer from 'react-test-renderer';
import { StaticRouter } from 'react-router-dom';
import PromoVideo from 'components/PromoVideo';

it('renders PromoVideo component correctly with roomId', () => {
  const tree = renderer.create(
    <StaticRouter context={{}}><PromoVideo location={{ search: '?roomId=abc' }} /></StaticRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders PromoVideo component correctly without roomId', () => {
  const tree = renderer.create(
    <StaticRouter context={{}}><PromoVideo location={{ search: '' }} /></StaticRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
