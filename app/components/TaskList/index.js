/**
*
* TaskList
*
*/

import React from 'react';
import lodash from 'lodash';


class TaskList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(`these are the tasks ${this.props.tasks}`)
    let tasks;
    if (this.props.tasks) {
      tasks = this.props.tasks.map((task, index) => {
        return (
          <li key={index}>
            <input type="checkbox" /> {task.get('description')} - @{task.get('owner_name')}
          </li>
        )
      });
    }
    return (
      <div>
        TaskList
        <ul>
          {tasks}
        </ul>
      </div>
    );
  }
}

TaskList.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  tasks: React.PropTypes.object,
};

export default TaskList;
