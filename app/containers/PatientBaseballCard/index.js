/*
 *
 * PatientBaseballCard
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectPatientBaseballCard from './selectors';
import { getPatientChart } from './selectors';

export class PatientBaseballCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="PatientBaseballCard"
          meta={[
            { name: 'description', content: 'Description of PatientBaseballCard' },
          ]}
        />
        Patient Name: {this.props.chart.get('profile').get('full_name')}
      </div>
    );
  }
}

PatientBaseballCard.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  chart: React.PropTypes.object,
};


const makeMapStateToProps = () => {
  // There might be something wrong with the way we're doing this.
  // TODO: Investigate https://github.com/reactjs/reselect#accessing-react-props-in-selectors
  // in the 'But there is a problem!'
  const mapStateToProps = (state, props) => {
    return {
      chart: getPatientChart(state, props),
    };
  };
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(selectPatientBaseballCard(), mapDispatchToProps)(PatientBaseballCard);
