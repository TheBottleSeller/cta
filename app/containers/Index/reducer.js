/*
 *
 * Index reducer
 *
 */

import { fromJS } from 'immutable';
import lodash from 'lodash';

import AppConstants from '../../constants/AppConstants';
import {
  DEFAULT_ACTION,
  LIST_WORKFLOWS_SUCCESS,
  CHECKOUT_SUCCESS,
  LOG_SUCCESS,
} from './constants';

const initialState = fromJS({});

/**
Desired state object:
{
  patients: {
    <patient_id>: {
      ...all existing patient fields (baseline, profile, plan)
    }
  }
  workflows: {
    <workflow_id>: {
      ...all existing workflow fields
      charts: {},
      timeline: {},
    }
  }
}
 */

function indexReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LIST_WORKFLOWS_SUCCESS:
      console.log('workflow success');
      var workflows = {};
      lodash.each(action.workflows, (workflow) => {
        workflows[workflow.id] = workflow;
      });
      var newState = state.set('workflows', workflows);
      console.log(`index state: ${newState}`);
      return newState;
    case CHECKOUT_SUCCESS:
      console.log('checkout success for repo ' + action.repoId);
      if (AppConstants.PATIENT_ID === action.repoId) {
        console.log('got head version of patient');
        var updateMap = {
          patients: {}
        }
        updateMap.patients[AppConstants.PATIENT_ID] = action.chart.patient;
        var newState = state.mergeDeep(updateMap);
        console.log(`index state: ${newState}`);
        return newState;
      } else if (action.workflowId){
        // Checkout requested for the chart associated with workflow.
        // What do you we do with this data??
      }
      console.log(`index state: ${state}`);
      return state;
    case LOG_SUCCESS:
      console.log(`log success for repo ${action.repoId} workflow ${action.workflowId}`);
      var updateMap = {
        workflows: {}
      }
      updateMap.workflows[action.workflowId] = {};
      updateMap.workflows[action.workflowId].charts = action.charts;
      // For each chart
      //   create a timeline object from the diff
      //   modify state

      var newState = state.mergeDeep(updateMap);
      console.log(`index state: ${newState}`);
      console.log(`index state foo: ${newState.get('workflows')}`);
      return newState;
    default:
      console.log(`index state: ${state}`);
      return state;
  }
}

export default indexReducer;
