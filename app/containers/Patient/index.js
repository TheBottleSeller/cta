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

export class Patient extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Patient"
          meta={[
            { name: 'description', content: 'Description of Patient' },
          ]}
        />
        <PatientBaseballCard dispatch={this.props.dispatch} patientId={this.props.params.patient_id} />
      </div>
    );
  }
}

Patient.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
}

const mapStateToProps = selectPatient();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
