import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

/**
 * Direct selector to the workflow state domain
 */
const selectWorkflowDomain = () => (state) => state.get('workflow');

/**
 * Other specific selectors
 */

const getWorkflow = (state, props) => {
  if (state.get('global').get('workflows')) {
    console.log(`selecting workflow ${props.params.workflowId} from ${state.get('global').get('workflows')}`)
    return state.get('global').get('workflows').get(props.params.workflowId);
  }
  return fromJS({});
};

const selectCurrentWorkflow = () => {
  return createSelector(
    getWorkflow
  )
};

/**
 * Default selector used by Workflow
 */

const selectWorkflow = () => createSelector(
  selectWorkflowDomain(),
  getWorkflow,
  (substate, workflow) => {
    const state = substate.toJS();
    state.workflow = workflow;
    return state;
  }
);

export default selectWorkflow;
export {
  selectWorkflowDomain,
  selectCurrentWorkflow,
  getWorkflow,
};
