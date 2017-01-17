import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Phones from 'components/Phones';
import Phone from 'components/Phone';

it('renders Phones component correctly when there are no participants', () => {
  const Component = <Phones participants={{}} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();

  const wrapper = shallow(Component);
  expect(wrapper.find('Phone').equals(<Phone isDefault/>)).toBe(true);
});

it('renders Phones component correctly when there are participants', () => {
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
  };
  const Component = <Phones participants={participants} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();

  const wrapper = shallow(Component);
  expect(wrapper.find('Phone').length).toBe(1);
});
