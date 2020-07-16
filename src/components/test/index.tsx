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
    This is a test of
    {' '}
    <code>react-router-dom</code>
    {' '}
    with test prop
    {' '}
    {testString}

    {/* Demo process.env */}
    {process.env.PUBLIC_URL}
    <NavLink to="/">Home</NavLink>
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
