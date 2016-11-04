/**
*
* TaskList
*
*/

import React from 'react';


class TaskList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        TaskList
        <ul>
          <li>
            <input type="checkbox" /> Greet Patient
          </li>
          <li>
            <input type="checkbox" /> Edit notes
          </li>
        </ul>
      </div>
    );
  }
}

TaskList.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};

export default TaskList;
