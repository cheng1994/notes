import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import '../startup/enzyme-config.js';

import { Signup } from './Signup';

if (Meteor.isClient) {
  describe('Signup', function () {
    it('should show error messages', function () {
      const error = 'This is not working';
      const wrapper = shallow( <Signup createUser={() => {}} onEnter={() => {}}/> );

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });
      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', function () {
      const email = 'test@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} intiialIndex={0}>
          <Signup createUser={spy} onEnter={() => {}}/>
        </MemoryRouter>
      );

      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });

    });

    it('should set error if short password', function () {
      const email = 'test@test.com';
      const password = '123';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} intiialIndex={0}>
          <Signup createUser={spy} onEnter={() => {}}/>
        </MemoryRouter>
      );

      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      const component = wrapper.find('Signup').instance();
      expect(component.state.error.length).toNotBe(0);

    });

    it('should set createUser callback errors', function () {
      const password = 'password123!';
      const reason = 'This is why it failed';
      const spy = expect.createSpy();
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} intiialIndex={0}>
          <Signup createUser={spy} onEnter={() => {}}/>
        </MemoryRouter>
      );

      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({ reason });
      const component = wrapper.find('Signup').instance();
      expect(component.state.error).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(component.state.error.length).toBe(0);
    });

  });
}
