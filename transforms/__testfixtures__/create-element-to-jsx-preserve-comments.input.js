var React = require('react');

const render2 = () => {
  return React.createElement(
    'div', {
      className: 'foo',  // Prop comment.
    },
    'hello' // Child string comment.
  );
};

const render3 = () => {
  return React.createElement(
    'div',
    null,
    React.createElement('span') // Child element comment.
  );
};

const render4 = () => {
  return React.createElement(Foo, {/* No props to see here! */});
};
