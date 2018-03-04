import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import moment from 'moment';
import '../startup/enzyme-config.js';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function() {

    it('should render title and timestamp', function () {
      const title = 'Note Title';
      const updatedAt = new Date().getTime();
      const properTimestamp = moment(updatedAt).format('M/DD/YY')
      const wrapper = mount( <NoteListItem note={{ title, updatedAt }}/>);

      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe(properTimestamp);
    });

    it('should set default title if no title set', function () {
      const title = 'Untitled Note';
      const wrapper = mount( <NoteListItem note={{}}/>);

      expect(wrapper.find('h5').text()).toBe(title);
    });

  });
}
