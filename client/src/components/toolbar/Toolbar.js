// client/src/components/toolbar/Toolbar.js
import React from 'react';

const Toolbar = ({ handleClear, handleUndo }) => {
  return (
    <div>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
};

export default Toolbar;
