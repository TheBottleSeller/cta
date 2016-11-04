/*
 *
 * Index actions
 *
 */

import {
  DEFAULT_ACTION,
  LIST_WORKFLOWS_REQUESTED,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function listWorkflowsRequested() {
  return {
    type: LIST_WORKFLOWS_REQUESTED,
  }
}
