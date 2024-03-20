var React = require('react');

const render2 = () => {
  return (
    <div
      // Prop comment.
      className="foo">
      {// Child string comment.
      'hello'}
    </div>
  );
};

const render3 = () => {
  return (
    <div>
      {// Child element comment.
      <span />}
    </div>
  );
};

const render4 = () => {
  return <Foo />/* No props to see here! */;
};
