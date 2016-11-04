import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

/**
 * Direct selector to the patient state domain
 */
const selectPatientDomain = () => (state) => state.get('patient');

/**
 * Other specific selectors
 */
const getPatientChartFromRoute = (state, props) => {
  if (state.get('global').get('patients')) {
    console.log(`selecting patient ${props.params.patientId} from ${state.get('global').get('patients')}`)
    return state.get('global').get('patients').get(props.params.patientId);
  }
  return fromJS({
    baseline: {},
    profile: {},
    plan: {},
  });
};

/**
 * Default selector used by Patient
 */

const selectPatient = () => createSelector(
  selectPatientDomain(),
  getPatientChartFromRoute,
  (substate, chart) => {
    var state = substate.toJS();
    state.chart = chart;
    return state;
  }
);

export default selectPatient;
export {
  selectPatientDomain,
};
