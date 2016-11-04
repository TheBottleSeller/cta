/*
 *
 * Workflow
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectWorkflow from './selectors';
import { getWorkflow } from './selectors';
import TaskList from '../../components/TaskList/index';
import Timeline from '../../components/Timeline/index';
import PatientBaseballCard from '../PatientBaseballCard/index';
import AppConstants from '../../constants/AppConstants';
import {
  LIST_WORKFLOWS_REQUESTED,
  CHECKOUT_REQUESTED,
} from '../App/constants';

export class Workflow extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    console.log('mounted workflow, doing full data refresh');
    setTimeout(() => {
      this.props.dispatch({ type: LIST_WORKFLOWS_REQUESTED })
    }, 0);
    // This gives us the current state of the patient profile.
    setTimeout(() => {
      this.props.dispatch({ type: CHECKOUT_REQUESTED, repoId: AppConstants.PATIENT_ID })
    }, 0);
  }

  render() {
    if (!this.props.loaded) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div>
        <Helmet
          title="Workflow"
          meta={[
            { name: 'description', content: 'Description of Workflow' },
          ]}
        />
        <PatientBaseballCard dispatch={this.props.dispatch} patientId={this.props.workflow.get('patient_id')} />
        <TaskList dispatch={this.props.dispatch} tasks={this.props.workflow.get('tasks')} />
        <Timeline dispatch={this.props.dispatch} />
      </div>
    );
  }
}

Workflow.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  workflow: React.PropTypes.object,
  loaded: React.PropTypes.bool.isRequired,
};

// const makeMapStateToProps = () => {
//   // There might be something wrong with the way we're doing this.
//   // TODO: Investigate https://github.com/reactjs/reselect#accessing-react-props-in-selectors
//   // in the 'But there is a problem!'
//   const mapStateToProps = (state, props) => {
//     return {
//       workflow: getWorkflow(state, props),
//     }
//   };
//   return mapStateToProps;
// };
const mapStateToProps = selectWorkflow();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
