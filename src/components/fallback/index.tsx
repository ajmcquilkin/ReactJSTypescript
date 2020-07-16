import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * A demo 404 component with a <NavLink /> back to home
 */
const Fallback = () => (
  <div>
    Page not found
    <NavLink to="/">Home</NavLink>
  </div>
);

export default Fallback;
