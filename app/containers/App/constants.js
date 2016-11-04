/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const LIST_WORKFLOWS_REQUESTED = 'app/Index/LIST_WORKFLOWS_REQUESTED';
export const LIST_WORKFLOWS_SUCCESS = 'app/Index/LIST_WORKFLOWS_SUCCESS';
export const LIST_WORKFLOWS_FAILURE = 'app/Index/LIST_WORKFLOWS_FAILURE';
export const UPDATE_WORKFLOW_REQUESTED = 'app/Index/UPDATE_WORKFLOW_REQUESTED';
export const UPDATE_WORKFLOW_SUCCESS = 'app/Index/UPDATE_WORKFLOW_SUCCESS';
export const UPDATE_WORKFLOW_FAILURE = 'app/Index/UPDATE_WORKFLOW_FAILURE';
export const CHECKOUT_REQUESTED = 'app/Index/CHECKOUT_REQUESTED';
export const CHECKOUT_SUCCESS = 'app/Index/CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'app/Index/CHECKOUT_FAILURE';
export const LOG_REQUESTED = 'app/Index/LOG_REQUESTED';
export const LOG_SUCCESS = 'app/Index/LOG_SUCCESS';
export const LOG_FAILURE = 'app/Index/LOG_FAILURE';
