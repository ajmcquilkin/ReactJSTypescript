import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * A component that tests passing in props from a <Route /> component
 */
interface TestProps {
  testString: string;
}

const Test: React.FC<TestProps> = ({ testString }) => (
  <div>
    <div id="test-content">
      This is a test of
      {' '}
      <code>react-router-dom</code>
      {' '}
      with test prop
      {' '}
      {testString}
    </div>

    <NavLink to="/" role="navigation">Home</NavLink>
  </div>
);

// Equivalent code to above
// function Test({ testString }: TestProps) {
//   return (
//     <div>
//       This is a test of
//       {' '}
//       <code>react-router-dom</code>
//       {' '}
//       with test prop
//       {' '}
//       {testString}
//       <NavLink to="/">Home</NavLink>
//     </div>
//   );
// }

Test.defaultProps = {
  testString: 'Hello, world',
};

export default Test;
