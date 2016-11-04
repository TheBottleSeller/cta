/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import lodash from 'lodash';

import AppConstants from '../../constants/AppConstants';
import {
  LIST_WORKFLOWS_SUCCESS,
  CHECKOUT_SUCCESS,
  LOG_SUCCESS,
} from './constants';

// Initial state of the App
// Mock any data here.
const initialState = fromJS({
  current_user: {
    name: 'Doctor Who',
  },
  profiles: {
    1: {
      name: 'Patient Zero',
    },
    100: {
      name: 'kian',
    },
    200: {
      name: 'turken',
    },
  },
  patients: {},
  workflows: {},
});

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

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LIST_WORKFLOWS_SUCCESS:
      console.log('workflow success');
      var updatedMap = {
        workflows: {},
      };
      lodash.each(action.workflows, (workflow) => {
        // Extend tasks to have owner name
        // Should we extend the proto here or in the selector??
        // Store should hold minimal state...
        lodash.each(workflow.tasks, (task) => {
          if (state.get('profiles').get(`${task.owner_id}`)) {
            task.owner_name = state.get('profiles').get(`${task.owner_id}`);
          }
        })
        updatedMap.workflows[workflow.id] = workflow;
      });
      var newState = state.mergeDeep(updatedMap);
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

export default appReducer;
