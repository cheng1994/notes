import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import '../startup/enzyme-config.js';

import { PrivateHeader } from './PrivateHeader';


if (Meteor.isClient) {
  describe('PrviateHeader', function () {
    it('should set button text to logout', function () {
      const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> );
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', function () {
      const title = 'Test title here';
      const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> );

      expect(wrapper.find('h1').text()).toBe(title);
    });

    it('should call handleLogout on click', function () {
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/>);

      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    })
  });
}
