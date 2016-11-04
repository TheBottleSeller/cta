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
  LIST_WORKFLOWS_SUCCESS,
} from '../App/constants';

const initialState = fromJS({
  loaded: false,
});

function workflowReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LIST_WORKFLOWS_SUCCESS:
      return state.set('loaded', true);
    default:
      return state;
  }
}

export default workflowReducer;
