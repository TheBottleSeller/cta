import { takeEvery } from 'redux-saga'
import {
  LIST_WORKFLOWS_REQUESTED,
  LIST_WORKFLOWS_SUCCESS,
  LIST_WORKFLOWS_FAILURE,
  WORKFLOWS,
} from './constants';

import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
export function* defaultSaga() {
  return;
}

function* listWorkflows() {
  try {
    // const workflows = yield call(WorkflowClient.listWorkflows);
    yield put({type: LIST_WORKFLOWS_SUCCESS, workflows: WORKFLOWS});
  } catch (e) {
    yield put({type: LIST_WORKFLOWS_FAILURE, message: e.message});
  }
}

/*
  Starts fetchWorkflows on each dispatched `LIST_WORKFLOWS_REQUESTED` action.
*/
export function* listWorkflowsSaga() {
  yield* takeEvery(LIST_WORKFLOWS_REQUESTED, listWorkflows)
}

// All sagas to be loaded
export default [
  defaultSaga,
  listWorkflowsSaga,
];
