import React from 'react';
import { mount } from 'enzyme';
import { Registration } from '../pages/Registration';

it('renders email', () => {
  // Render new instance in every test to prevent leaking state
  const wrapper = mount(<Registration name="Fundo458^&*" />);

  expect(wrapper.text()).toMatch(/hello Satoshi/i);
});