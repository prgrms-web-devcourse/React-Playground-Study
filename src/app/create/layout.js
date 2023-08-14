import React from 'react';

const layout = (props) => {
  return (
    <form>
      <h2>Create</h2>
      {props.children}
    </form>
  );
};

export default layout;
