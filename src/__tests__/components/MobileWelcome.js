import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import MobileWelcome from 'components/MobileWelcome';

function getComponent(show=false, start=jest.fn()) {
  return (
    <MemoryRouter context={{}}>
      <MobileWelcome
        roomId="abc"
        show={show}
        start={start}
      />
    </MemoryRouter>
  );
}

it('renders a link to promo video', () => {
  const wrapper = mount(getComponent(true));
  expect(document.querySelector('.welcome-videoLink')).not.toBe(null);
  wrapper.unmount();
});

it('renders a link to promo video', () => {
  const mockStart = jest.fn();
  const wrapper = mount(getComponent(true, mockStart));

  expect(document.querySelector('#jumpIn')).not.toBe(null);
  document.querySelector('#jumpIn').click();
  expect(mockStart.mock.calls.length).toEqual(1);
  wrapper.unmount();
});
