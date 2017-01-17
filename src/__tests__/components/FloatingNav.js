import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import FloatingNav from 'components/FloatingNav';

it('renders FloatingNav component correctly when showParticipants is false', () => {
  const Component = <FloatingNav showConsole={false} showParticipants={false} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();

  const wrapper = shallow(Component);
  expect(wrapper.find('.floatingNav-devices').length).toBe(0);
  expect(wrapper.find('.floatingNav-share').length).toBe(1);
});

it('renders FloatingNav component correctly when showParticipants is true', () => {
  const Component = <FloatingNav showConsole={false} showParticipants={true} participantsCount={5} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();

  const wrapper = shallow(Component);
  expect(wrapper.find('.floatingNav-devices').length).toBe(1);
  expect(wrapper.find('.participantsCount').text()).toBe('5');
  expect(wrapper.find('.floatingNav-share').length).toBe(1);
});

it('should respond to clicking on the share button', () => {
  const Component = <FloatingNav showConsole={false} showParticipants={true} participantsCount={5} />;
  const wrapper = mount(Component);
  const shareTrigger = wrapper.find('.shareWidget-container');

  expect(document.querySelector('.shareWidget')).toBeNull();

  shareTrigger.simulate('click');
  expect(document.querySelector('.shareWidget')).not.toBeNull();

  shareTrigger.simulate('click');
  expect(document.querySelector('.shareWidget')).toBeNull();
});
