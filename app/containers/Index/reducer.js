/*
 *
 * Index reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LIST_WORKFLOWS_SUCCESS,
} from './constants';

const initialState = fromJS({});

function indexReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LIST_WORKFLOWS_SUCCESS:
      console.log('workflow success');
      state.set('workflows', action.workflows);
      return state;
    default:
      return state;
  }
}

export default indexReducer;
