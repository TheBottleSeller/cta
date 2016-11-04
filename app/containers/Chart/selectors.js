import { createSelector } from 'reselect';

/**
 * Direct selector to the chart state domain
 */
const selectChartDomain = () => (state) => state.get('chart');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Chart
 */

const selectChart = () => createSelector(
  selectChartDomain(),
  (substate) => substate.toJS()
);

export default selectChart;
export {
  selectChartDomain,
};
