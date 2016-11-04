/*
 *
 * Patient
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectPatient from './selectors';
import PatientBaseballCard from '../PatientBaseballCard/index';
import PatientWorkflowList from '../../components/PatientWorkflowList/index';
import AppConstants from '../../constants/AppConstants';
import {
  LIST_WORKFLOWS_REQUESTED,
  CHECKOUT_REQUESTED,
} from '../App/constants';

export class Patient extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log('mounted patient, doing full data refresh');
    setTimeout(() => {
      this.props.dispatch({ type: LIST_WORKFLOWS_REQUESTED })
    }, 0);
    // This gives us the current state of the patient profile.
    setTimeout(() => {
      this.props.dispatch({ type: CHECKOUT_REQUESTED, repoId: this.props.params.patientId })
    }, 0);
  }

  render() {
    return (
      <div>
        <Helmet
          title="Patient"
          meta={[
            { name: 'description', content: 'Description of Patient' },
          ]}
        />
        <PatientBaseballCard dispatch={this.props.dispatch} patientId={this.props.params.patientId} />
        <PatientWorkflowList workflows={this.props.workflows} />
      </div>
    );
  }
}

Patient.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object,
  workflows: React.PropTypes.object,
};

const mapStateToProps = selectPatient();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
