import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Phone from 'components/Phone';

jest.mock('lib/utils');
const buildTransform = require('lib/utils').buildTransform;

const participant = {
  alpha: -5,
  avatar: 'avatar5',
  beta: 2,
  color: '#88c440',
  deviceId: 'abc',
  gamma: 0,
  received_at: 1497911046581,
  roomId: '80ba136',
};

let wrapper;

afterEach(() => {
  buildTransform.mockClear();
})

it('renders Phone component correctly when isDefault=true', () => {
  const Component = <Phone isDefault participant={participant} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();

  wrapper = shallow(Component);
  expect(wrapper.find('SatoriLogoSVG').length).toEqual(1);
  expect(wrapper.find('AvatarSVG').length).toEqual(0);
  expect(wrapper.find('.arrow').length).toEqual(2);
  expect(wrapper.find('PhoneSVG').length).toEqual(1);
});

it('renders Phone component correctly when isDefault=false', () => {
  const Component = <Phone isDefault={false} participant={participant} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();

  wrapper = shallow(Component);
  expect(wrapper.find('SatoriLogoSVG').length).toEqual(0);
  expect(wrapper.find('AvatarSVG').length).toEqual(1);
  expect(wrapper.find('.arrow').length).toEqual(0);
  expect(wrapper.find('PhoneSVG').length).toEqual(1);
});

it('renders Phone component correctly when showCoords=true', () => {
  const Component = <Phone isDefault={false} participant={participant} showCoords={true} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();

  wrapper = shallow(Component);
  expect(wrapper.find('Coordinates').length).toEqual(1);
});

it('renders Phone component correctly when showCoords=false', () => {
  const Component = <Phone isDefault={false} participant={participant} showCoords={false} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();

  wrapper = shallow(Component);
  expect(wrapper.find('Coordinates').length).toEqual(0);
});

it('renders Phone component correctly when showRotation=true', () => {
  const Component = <Phone isDefault={false} participant={participant} showRotation={true} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();

  wrapper = shallow(Component);
  expect(buildTransform).toBeCalledWith(participant);
});

it('renders Phone component correctly when showRotation=false', () => {
  const Component = <Phone isDefault={false} participant={participant} showRotation={false} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();

  wrapper = shallow(Component);
  expect(buildTransform).not.toBeCalled();
});
