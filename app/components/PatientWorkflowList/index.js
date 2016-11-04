/**
*
* PatientWorkflowList
*
*/

import React from 'react';
import { Link } from 'react-router';


class PatientWorkflowList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let workflows;
    if (this.props.workflows) {
      console.log(`patient workflow list ${this.props.workflows}`)
      workflows = this.props.workflows.map((workflow, index) => {
        return (
          <li key={index}>
            <Link to={`/workflows/${workflow.get('id')}`}>Workflow {workflow.get('id')}</Link>
          </li>
        );
      });
    }
    return (
      <div>
        <h1>Patient Workflows</h1>
        <ul>
          {workflows}
        </ul>
      </div>
    );
  }
}

PatientWorkflowList.propTypes = {
  workflows: React.PropTypes.array,
};

export default PatientWorkflowList;
