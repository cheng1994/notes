import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {

  const renderLinksListItem = () => {
    if(props.notes.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Notes Found</p>
        </div>
      );
    };

    return props.notes.map((note) => {
      return (
        <NoteListItem key={note._id} note={note}/>
      );
    });
  };

  return (
    <div>
      <NoteListHeader/>
      { renderLinksListItem() }
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default withTracker(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}).fetch()
  };
})(NoteList);
