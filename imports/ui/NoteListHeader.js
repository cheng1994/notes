import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export const NoteListHeader = (props) => {

  const createNote = () => {
    props.meteorCall('notes.insert');
  };

  return (
    <div>
      <button onClick={createNote}>Create Note</button>
    </div>
  );
};

export default withTracker(() => {
  return {
    meteorCall: Meteor.call
  };
})(NoteListHeader);
