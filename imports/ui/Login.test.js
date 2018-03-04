import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import '../startup/enzyme-config.js';

import { Login } from './Login';

if (Meteor.isClient) {
  describe('Login', function () {
    it('should show error messages', function () {
      const error = 'This is not working';
      const wrapper = shallow( <Login loginWithPassword={() => {}} onEnter={() => {}}/> );

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', function () {
      const email = 'test@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} intiialIndex={0}>
          <Login loginWithPassword={spy} onEnter={() => {}}/>
        </MemoryRouter>
      );

      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toEqual(password);

    });

    it('should set loginWithPassword callback errors', function () {
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} intiialIndex={0}>
          <Login loginWithPassword={spy} onEnter={() => {}}/>
        </MemoryRouter>
      );

      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[2]({});
      const component = wrapper.find('Login').instance();
      expect(component.state.error.length).toNotBe(0);

      spy.calls[0].arguments[2]();
      expect(component.state.error.length).toBe(0);
    });

  });
}
