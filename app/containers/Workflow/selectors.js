import { createSelector } from 'reselect';

/**
 * Direct selector to the workflow state domain
 */
const selectWorkflowDomain = () => (state) => state.get('workflow');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Workflow
 */

const selectWorkflow = () => createSelector(
  selectWorkflowDomain(),
  (substate) => substate.toJS()
);

export default selectWorkflow;
export {
  selectWorkflowDomain,
};
