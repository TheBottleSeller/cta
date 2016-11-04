import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import { selectWorkflows } from '../App/selectors';
import lodash from 'lodash';

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
  selectWorkflows(),
  (substate, chart, allWorkflows) => {
    var state = substate.toJS();
    state.chart = chart;
    // TODO: Filter by workflows
    var workflowsJS = lodash.values(allWorkflows.toJS());
    state.workflows = fromJS(workflowsJS);
    return state;
  }
);

export default selectPatient;
export {
  selectPatientDomain,
};
