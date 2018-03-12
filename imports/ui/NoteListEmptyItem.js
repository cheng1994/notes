import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

const NoteListEmptyItem = () => {
  return (
    <div>
      <h3>You have no notes</h3>
      <p>Empty Note</p>
    </div>
  );
};

export default NoteListEmptyItem;
