import { takeEvery } from 'redux-saga'
import lodash from 'lodash';
import AppConstants from '../../constants/AppConstants';
import {
  LIST_WORKFLOWS_REQUESTED,
  LIST_WORKFLOWS_SUCCESS,
  LIST_WORKFLOWS_FAILURE,
  CHECKOUT_REQUESTED,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILURE,
  LOG_REQUESTED,
  LOG_SUCCESS,
  LOG_FAILURE,
} from '../App/constants';

import { take, call, put, select } from 'redux-saga/effects';
import WorkflowClient from '../../data/WorkflowClient';
import ChartClient from '../../data/ChartClient';

// Individual exports for testing
export function* defaultSaga() {
  return;
}

function* listWorkflows() {
  console.log('workflow requested');
  try {
    // const workflows = yield call(WorkflowClient.listWorkflows);
    const workflows = [
      {
        id: '1',
        patient_id: AppConstants.PATIENT_ID,
        repo_id: 'user:1/workflow:1',
        tasks: [
          {
            owner_id: 100,
            description: 'Pickup Sally',
            done: false,
          }, {
            owner_id: 200,
            description: 'Review & Send Plan',
            done: false,
          }, {
            owner_id: 200,
            description: 'Edit Notes',
            done: false,
          }, {
            owner_id: 200,
            description: 'Sign off',
            done: false,
          },
        ],
      },
      {
        id: '2',
        patient_id: AppConstants.PATIENT_ID,
        repo_id: 'user:1/workflow:2',
      },
    ];
    yield put({ type: LIST_WORKFLOWS_SUCCESS, workflows });
    // Get the logs for each workflow repo
    var calls = [];
    lodash.each(workflows, (workflow) => {
      console.log('all charts requested for workflow ' + workflow.id);
      calls.push(call(ChartClient.log, workflow.repo_id));
    })
    const allLogs = yield calls;
    console.log('allLogs: ' + allLogs);
    for (var i = 0; i < allLogs.length; ++i) {
      console.log('processing logs ' + i);
      const workflow = workflows[i];
      const charts = allLogs[i];
      yield put({ type: LOG_SUCCESS, repoId: workflow.repo_id, workflowId: workflow.id, charts: charts })
    }
  } catch (e) {
    console.log('Error: ' + e.message);
    yield put({ type: LIST_WORKFLOWS_FAILURE, message: e.message });
  }
}

function* checkout(action) {
  console.log('checkout requested for repo: ' + action.repoId);
  try {
    // const chart = yield call(ChartClient.checkout, action.repoId);
    const chart = {
      patient: {
        profile: {
          full_name: 'Patient Zero',
        },
      },
    }
    yield put({ type: CHECKOUT_SUCCESS, repoId: action.repoId, workflowId: action.workflowId, chart });
  } catch (e) {
    console.log('Error: ' + e.message);
    yield put({ type: CHECKOUT_FAILURE, message: e.message });
  }
}

function* log(action) {
  console.log('log requested for repo: ' + action.repoId);
  try {
    const charts = yield call(ChartClient.log, action.repoId);
    yield put({ type: LOG_SUCCESS, repoId: action.repoId, workflowId: action.workflowId, charts });
  } catch (e) {
    console.log('Error: ' + e.message);
    yield put({ type: LOG_FAILURE, message: e.message });
  }
}

/*
  Starts listWorkflows on each dispatched `LIST_WORKFLOWS_REQUESTED` action.
*/
export function* listWorkflowsSaga() {
  yield* takeEvery(LIST_WORKFLOWS_REQUESTED, listWorkflows);
}

/*
  Starts checkout on each dispatched `CHECKOUT_REQUESTED` action.
*/
export function* checkoutSaga() {
  yield* takeEvery(CHECKOUT_REQUESTED, checkout);
}

/*
  Starts log on each dispatched `LOG_REQUESTED` action.
*/
export function* logSaga() {
  yield* takeEvery(LOG_REQUESTED, log);
}

// All sagas to be loaded
export default [
  defaultSaga,
  listWorkflowsSaga,
  checkoutSaga,
  logSaga,
];
