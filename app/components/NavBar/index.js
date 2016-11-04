/**
*
* NavBar
*
*/

import React from 'react';
import { Link } from 'react-router';

class NavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        Workflow
        <Link to={'/workflows/1'}>Ticket</Link>
        <Link to={'/charts/1'}>Charts</Link>
      </div>
    );
  }
}

export default NavBar;
