import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

/**
 * Direct selector to the patientBaseballCard state domain
 */
const selectPatientBaseballCardDomain = () => (state) => state.get('patientBaseballCard');

/**
 * Other specific selectors
 */
const getPatientChart = (state, props) => {
  if (state.get('global').get('patients')) {
    console.log(`selecting patient ${props.patientId} from ${state.get('global').get('patients')}`)
    return state.get('global').get('patients').get(props.patientId);
  }
  return fromJS({
    baseline: {},
    profile: {},
    plan: {},
  });
};


/**
 * Default selector used by PatientBaseballCard
 */

const selectPatientBaseballCard = () => createSelector(
  selectPatientBaseballCardDomain(),
  getPatientChart,
  (substate, chart) => {
    const state = substate.toJS();
    state.chart = chart;
    return state;
  }
);

export default selectPatientBaseballCard;
export {
  selectPatientBaseballCardDomain,
  getPatientChart,
};
