/*
 *
 * Workflow reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';
import {
  LOG_SUCCESS,
} from '../Index/constants';

const initialState = fromJS({});

function workflowReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOG_SUCCESS:
      console.log(`Workflow received log success for repo ${action.repoId} workflow ${action.workflowId}`);
      console.log(`workflow state: ${state}`);
      return state;
    default:
      console.log(`workflow state: ${state}`);
      return state;
  }
}

export default workflowReducer;
