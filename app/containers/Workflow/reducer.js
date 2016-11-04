/*
 *
 * Workflow reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LIST_WORKFLOWS_SUCCESS,
} from './constants';

const initialState = fromJS({});

function workflowReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LIST_WORKFLOWS_SUCCESS:
      state.set('workflows', action.workflows);
      return state;
    default:
      return state;
  }
}

export default workflowReducer;
